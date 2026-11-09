package com.asares.Pratica_Interdisciplinar.repository;

import com.asares.Pratica_Interdisciplinar.model.Meta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MetaRepository extends JpaRepository<Meta, Long> {

    // Lista somente as metas do usuário logado
    List<Meta> findByUsuarioIdOrderByPrazoAsc(Long usuarioId);

    // Busca uma meta pelo ID garantindo que pertence ao usuário
    Optional<Meta> findByIdAndUsuarioId(Long id, Long usuarioId);
}
