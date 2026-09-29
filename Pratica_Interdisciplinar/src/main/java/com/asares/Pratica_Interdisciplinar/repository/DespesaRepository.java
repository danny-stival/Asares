package com.asares.Pratica_Interdisciplinar.repository;

import com.asares.Pratica_Interdisciplinar.model.Despesa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DespesaRepository extends JpaRepository<Despesa, Long> {

    // Lista somente as despesas do usuário logado
    List<Despesa> findByUsuarioIdOrderByDataDesc(Long usuarioId);

    // Busca uma despesa pelo ID garantindo que ela pertence ao usuário
    Optional<Despesa> findByIdAndUsuarioId(Long id, Long usuarioId);
}
