
package com.asares.Pratica_Interdisciplinar.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "tokens_recuperacao_senha")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenRecuperacaoSenha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Token único enviado ao e-mail do usuário
    @Column(nullable = false, unique = true, length = 255)
    private String token;

    // Usuário relacionado ao token
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    // Data e horário em que o token expira
    @Column(nullable = false)
    private LocalDateTime expiraEm;

    // Indica se o token já foi utilizado
    @Column(nullable = false)
    @Builder.Default
    private boolean utilizado = false;
}
