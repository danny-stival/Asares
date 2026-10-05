package com.asares.Pratica_Interdisciplinar.service;

import com.asares.Pratica_Interdisciplinar.dto.CadastroRequestDTO;
import com.asares.Pratica_Interdisciplinar.dto.LoginRequestDTO;
import com.asares.Pratica_Interdisciplinar.dto.TokenResponseDTO;
import com.asares.Pratica_Interdisciplinar.model.Usuario;
import com.asares.Pratica_Interdisciplinar.repository.UsuarioRepository;
import com.asares.Pratica_Interdisciplinar.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    // US02 - Cadastro de usuario
    @Transactional
    public TokenResponseDTO cadastrar(CadastroRequestDTO dto) {

        String nome = dto.nome().trim();
        String email = dto.email().trim();

        if (usuarioRepository.existsByEmail(email)) {
            throw new IllegalArgumentException(
                    "Ja existe um usuario cadastrado com este email"
            );
        }

        Usuario usuario = Usuario.builder()
                .nome(nome)
                .email(email)
                .senha(passwordEncoder.encode(dto.senha()))
                .build();

        usuarioRepository.save(usuario);

        String token = jwtUtil.gerarToken(usuario.getEmail());

        return new TokenResponseDTO(
                token,
                usuario.getNome(),
                usuario.getEmail()
        );
    }

    // US01 - Login
    public TokenResponseDTO login(LoginRequestDTO dto) {

        String email = dto.email().trim();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            email,
                            dto.senha()
                    )
            );
        } catch (Exception e) {
            throw new BadCredentialsException(
                    "Email ou senha invalidos"
            );
        }

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() ->
                        new BadCredentialsException(
                                "Email ou senha invalidos"
                        )
                );

        String token = jwtUtil.gerarToken(usuario.getEmail());

        return new TokenResponseDTO(
                token,
                usuario.getNome(),
                usuario.getEmail()
        );
    }
}