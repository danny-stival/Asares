
package com.asares.Pratica_Interdisciplinar.service;

import com.asares.Pratica_Interdisciplinar.dto.CadastroRequestDTO;
import com.asares.Pratica_Interdisciplinar.model.Usuario;
import com.asares.Pratica_Interdisciplinar.repository.UsuarioRepository;
import com.asares.Pratica_Interdisciplinar.security.JwtUtil;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.ArgumentCaptor;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    // TESTE 1: Cadastrar usuario com sucesso
    @Test
    void deveCadastrarUsuarioComSucesso() {

        // Dados utilizados no cadastro
        CadastroRequestDTO dto = new CadastroRequestDTO(
                "Maria Silva",
                "maria@email.com",
                "123456"
        );

        // Simula que o email ainda nao existe
        when(usuarioRepository.existsByEmail("maria@email.com"))
                .thenReturn(false);

        // Simula a criptografia da senha
        when(passwordEncoder.encode("123456"))
                .thenReturn("senhaCriptografada");

        // Simula o salvamento do usuario
        when(usuarioRepository.save(any(Usuario.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // Simula a geracao do token
        when(jwtUtil.gerarToken("maria@email.com"))
                .thenReturn("tokenTeste");

        // Executa o cadastro
        var resposta = authService.cadastrar(dto);

        // Verifica se a resposta foi criada
        assertNotNull(resposta);

        // Captura o usuario enviado ao repositorio
        ArgumentCaptor<Usuario> captor =
                ArgumentCaptor.forClass(Usuario.class);

        verify(usuarioRepository).save(captor.capture());

        Usuario usuarioSalvo = captor.getValue();

        // Verifica os dados cadastrados
        assertEquals("Maria Silva", usuarioSalvo.getNome());
        assertEquals("maria@email.com", usuarioSalvo.getEmail());
        assertEquals("senhaCriptografada", usuarioSalvo.getSenha());

        // Verifica se o token foi gerado
        assertEquals("tokenTeste", resposta.token());

        // Confirma a geracao do token
        verify(jwtUtil).gerarToken("maria@email.com");
    }

    // TESTE 2: Impedir cadastro com email ja existente
    @Test
    void naoDeveCadastrarUsuarioComEmailExistente() {

        // Dados utilizados no cadastro
        CadastroRequestDTO dto = new CadastroRequestDTO(
                "Maria Silva",
                "maria@email.com",
                "123456"
        );

        // Simula que o email ja esta cadastrado
        when(usuarioRepository.existsByEmail("maria@email.com"))
                .thenReturn(true);

        // Verifica se o sistema lanca uma excecao
        assertThrows(
                IllegalArgumentException.class,
                () -> authService.cadastrar(dto)
        );

        // Verifica se o usuario nao foi salvo
        verify(usuarioRepository, never()).save(any(Usuario.class));

        // Verifica se a senha nao foi criptografada
        verify(passwordEncoder, never()).encode(anyString());

        // Verifica se nenhum token foi gerado
        verify(jwtUtil, never()).gerarToken(anyString());
    }
}
