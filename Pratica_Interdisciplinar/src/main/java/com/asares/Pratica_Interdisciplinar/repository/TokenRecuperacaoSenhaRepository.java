
package com.asares.Pratica_Interdisciplinar.repository;

import com.asares.Pratica_Interdisciplinar.model.TokenRecuperacaoSenha;
import com.asares.Pratica_Interdisciplinar.model.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRecuperacaoSenhaRepository
        extends JpaRepository<TokenRecuperacaoSenha, Long> {

    // Procura um token pelo seu valor armazenado (hash)
    Optional<TokenRecuperacaoSenha> findByToken(String token);

    // Procura os tokens associados a um usuário
    Optional<TokenRecuperacaoSenha> findByUsuario(Usuario usuario);

    // Exclui os tokens anteriores de um usuário
    void deleteByUsuario(Usuario usuario);
}
