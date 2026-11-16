
package com.asares.Pratica_Interdisciplinar.controller;

import com.asares.Pratica_Interdisciplinar.dto.RecuperacaoSenhaRequestDTO;
import com.asares.Pratica_Interdisciplinar.dto.RedefinirSenhaRequestDTO;
import com.asares.Pratica_Interdisciplinar.service.RecuperacaoSenhaService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class RecuperacaoSenhaController {

    private final RecuperacaoSenhaService recuperacaoSenhaService;

    // Solicita a recuperação de senha
    @PostMapping("/recuperar-senha")
    public ResponseEntity<String> solicitarRecuperacao(
            @Valid @RequestBody RecuperacaoSenhaRequestDTO dto) {

        recuperacaoSenhaService.solicitarRecuperacao(dto.email());

        return ResponseEntity.ok(
                "Se o e-mail estiver cadastrado, você receberá um link de recuperação."
        );
    }

    // Redefine a senha utilizando o token recebido
    @PostMapping("/redefinir-senha")
    public ResponseEntity<String> redefinirSenha(
            @Valid @RequestBody RedefinirSenhaRequestDTO dto) {

        recuperacaoSenhaService.redefinirSenha(
                dto.token(),
                dto.novaSenha()
        );

        return ResponseEntity.ok(
                "Senha redefinida com sucesso!"
        );
    }
}
