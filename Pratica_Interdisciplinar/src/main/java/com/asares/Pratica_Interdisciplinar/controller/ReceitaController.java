
package com.asares.Pratica_Interdisciplinar.controller;

import com.asares.Pratica_Interdisciplinar.dto.ReceitaRequestDTO;
import com.asares.Pratica_Interdisciplinar.dto.ReceitaResponseDTO;
import com.asares.Pratica_Interdisciplinar.service.ReceitaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receitas")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class ReceitaController {

    private final ReceitaService receitaService;

    // US03 - Cadastrar receita
    @PostMapping
    public ResponseEntity<ReceitaResponseDTO> cadastrar(
            @Valid @RequestBody ReceitaRequestDTO dto,
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();

        ReceitaResponseDTO receita = receitaService.cadastrar(email, dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(receita);
    }

    // Listar receitas do usuário autenticado
    @GetMapping
    public ResponseEntity<List<ReceitaResponseDTO>> listar(
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();

        return ResponseEntity.ok(receitaService.listarPorUsuario(email));
    }

    // Editar uma receita
    @PutMapping("/{id}")
    public ResponseEntity<ReceitaResponseDTO> editar(
            @PathVariable Long id,
            @Valid @RequestBody ReceitaRequestDTO dto,
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();

        ReceitaResponseDTO receita = receitaService.editar(email, id, dto);

        return ResponseEntity.ok(receita);
    }

    // Excluir uma receita
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id,
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();

        receitaService.excluir(email, id);

        return ResponseEntity.noContent().build();
    }
}

