package com.asares.Pratica_Interdisciplinar.repository;

import com.asares.Pratica_Interdisciplinar.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {

    // Lista somente as receitas do usuário logado
    List<Receita> findByUsuarioIdOrderByDataDesc(Long usuarioId);

    // Busca uma receita pelo ID garantindo que ela pertence ao usuário
    Optional<Receita> findByIdAndUsuarioId(Long id, Long usuarioId);
}
