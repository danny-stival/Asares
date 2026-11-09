
package com.asares.Pratica_Interdisciplinar.dto;

import com.asares.Pratica_Interdisciplinar.model.Meta;

import java.math.BigDecimal;
import java.time.LocalDate;

public record MetaResponseDTO(

        Long id,
        String nome,
        String descricao,
        BigDecimal valorObjetivo,
        BigDecimal valorAtual,
        LocalDate prazo,
        BigDecimal percentualProgresso

) {

    public MetaResponseDTO(Meta meta) {
        this(
                meta.getId(),
                meta.getNome(),
                meta.getDescricao(),
                meta.getValorObjetivo(),
                meta.getValorAtual(),
                meta.getPrazo(),
                calcularProgresso(meta)
        );
    }

    // Calcula automaticamente o percentual da meta alcançado
    private static BigDecimal calcularProgresso(Meta meta) {

        if (meta.getValorObjetivo() == null ||
                meta.getValorObjetivo().compareTo(BigDecimal.ZERO) <= 0) {
            return BigDecimal.ZERO;
        }

        BigDecimal percentual = meta.getValorAtual()
                .multiply(BigDecimal.valueOf(100))
                .divide(meta.getValorObjetivo(), 2,
                        java.math.RoundingMode.HALF_UP);

        // O progresso visual não ultrapassa 100%
        return percentual.min(BigDecimal.valueOf(100));
    }
}
