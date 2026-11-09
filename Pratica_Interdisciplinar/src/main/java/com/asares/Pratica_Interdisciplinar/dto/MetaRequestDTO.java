
package com.asares.Pratica_Interdisciplinar.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;
import java.time.LocalDate;

public record MetaRequestDTO(

        @NotBlank(message = "Nome da meta e obrigatorio")
        String nome,

        String descricao,

        @NotNull(message = "Valor objetivo e obrigatorio")
        @Positive(message = "Valor objetivo deve ser maior que zero")
        BigDecimal valorObjetivo,

        @NotNull(message = "Valor atual e obrigatorio")
        @PositiveOrZero(message = "Valor atual nao pode ser negativo")
        BigDecimal valorAtual,

        @NotNull(message = "Prazo e obrigatorio")
        LocalDate prazo

) {
}
