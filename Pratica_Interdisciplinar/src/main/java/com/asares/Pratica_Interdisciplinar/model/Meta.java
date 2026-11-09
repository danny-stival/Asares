package com.asares.Pratica_Interdisciplinar.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "metas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Meta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nome da meta financeira
    @Column(nullable = false, length = 120)
    private String nome;

    // Descrição opcional
    @Column(length = 300)
    private String descricao;

    // Valor que o usuário deseja alcançar
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal valorObjetivo;

    // Valor que o usuário já conseguiu guardar
    @Column(nullable = false, precision = 12, scale = 2)
    @Builder.Default
    private BigDecimal valorAtual = BigDecimal.ZERO;

    // Prazo para alcançar a meta
    @Column(nullable = false)
    private LocalDate prazo;

    // Usuário proprietário da meta
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
}

