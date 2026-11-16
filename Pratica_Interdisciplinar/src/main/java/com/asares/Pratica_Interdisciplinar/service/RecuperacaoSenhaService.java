
package com.asares.Pratica_Interdisciplinar.service;

import com.asares.Pratica_Interdisciplinar.model.TokenRecuperacaoSenha;
import com.asares.Pratica_Interdisciplinar.model.Usuario;
import com.asares.Pratica_Interdisciplinar.repository.TokenRecuperacaoSenhaRepository;
import com.asares.Pratica_Interdisciplinar.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HexFormat;

@Service
@RequiredArgsConstructor
public class RecuperacaoSenhaService {

    private final UsuarioRepository usuarioRepository;
    private final TokenRecuperacaoSenhaRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    private final SecureRandom secureRandom = new SecureRandom();

    // Endereço do frontend que receberá o usuário pelo link
    @Value("${app.frontend-url:http://localhost:5173}")
    private String frontendUrl;

    // Solicita a recuperação de senha
    @Transactional
    public void solicitarRecuperacao(String email) {

        String emailNormalizado = email.trim();

        // Procura o usuário pelo e-mail
        Usuario usuario = usuarioRepository
                .findByEmail(emailNormalizado)
                .orElse(null);

        // Não informa se o e-mail está cadastrado
        if (usuario == null) {
            return;
        }

        // Remove tokens anteriores do usuário
        tokenRepository.deleteByUsuario(usuario);

        // Gera um token aleatório e seguro
        String tokenOriginal = gerarToken();

        // Armazena somente o hash do token
        String tokenHash = gerarHash(tokenOriginal);

        // Cria o registro de recuperação
        TokenRecuperacaoSenha token = TokenRecuperacaoSenha.builder()
                .token(tokenHash)
                .usuario(usuario)
                .expiraEm(LocalDateTime.now().plusMinutes(15))
                .utilizado(false)
                .build();

        tokenRepository.save(token);

        // Monta o link para o frontend
        String link = frontendUrl
                + "/redefinir-senha?token="
                + tokenOriginal;

        // Envia o e-mail
        emailService.enviarEmailRecuperacao(
                usuario.getEmail(),
                link
        );
    }

    // Redefine a senha utilizando o token recebido
    @Transactional
    public void redefinirSenha(String tokenOriginal, String novaSenha) {

        // Gera o hash do token recebido
        String tokenHash = gerarHash(tokenOriginal);

        // Procura o token no banco
        TokenRecuperacaoSenha token = tokenRepository
                .findByToken(tokenHash)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Token inválido ou expirado"
                        )
                );

        // Verifica se o token já foi utilizado
        if (token.isUtilizado()) {
            throw new IllegalArgumentException(
                    "Token inválido ou expirado"
            );
        }

        // Verifica se o token expirou
        if (!token.getExpiraEm().isAfter(LocalDateTime.now())) {
            throw new IllegalArgumentException(
                    "Token inválido ou expirado"
            );
        }

        // Recupera o usuário relacionado ao token
        Usuario usuario = token.getUsuario();

        // Criptografa a nova senha com BCrypt
        usuario.setSenha(passwordEncoder.encode(novaSenha));

        usuarioRepository.save(usuario);

        // Marca o token como utilizado
        token.setUtilizado(true);

        tokenRepository.save(token);
    }

    // Gera um token aleatório de 32 bytes
    private String gerarToken() {

        byte[] bytes = new byte[32];

        secureRandom.nextBytes(bytes);

        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(bytes);
    }

    // Gera o hash SHA-256 do token
    private String gerarHash(String token) {

        try {

            MessageDigest digest =
                    MessageDigest.getInstance("SHA-256");

            byte[] hash = digest.digest(
                    token.getBytes(StandardCharsets.UTF_8)
            );

            return HexFormat.of().formatHex(hash);

        } catch (NoSuchAlgorithmException e) {

            throw new IllegalStateException(
                    "Não foi possível gerar o hash do token",
                    e
            );
        }
    }
}
