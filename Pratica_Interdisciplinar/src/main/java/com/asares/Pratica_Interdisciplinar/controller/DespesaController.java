package com.asares.Pratica_Interdisciplinar.controller;

import com.asares.Pratica_Interdisciplinar.dto.DespesaRequestDTO;
import com.asares.Pratica_Interdisciplinar.dto.DespesaResponseDTO;
import com.asares.Pratica_Interdisciplinar.service.DespesaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/despesas")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class DespesaController {

    private final DespesaService despesaService;

    // US04 - Cadastrar despesa
    @PostMapping
    public ResponseEntity<DespesaResponseDTO> cadastrar(
            @Valid @RequestBody DespesaRequestDTO dto,
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();

        DespesaResponseDTO despesa = despesaService.cadastrar(email, dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(despesa);
    }

    // Listar despesas do usuário logado
    @GetMapping
    public ResponseEntity<List<DespesaResponseDTO>> listar(
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();

        return ResponseEntity.ok(
                despesaService.listarPorUsuario(email)
        );
    }

    // Editar uma despesa
    @PutMapping("/{id}")
    public ResponseEntity<DespesaResponseDTO> editar(
            @PathVariable Long id,
            @Valid @RequestBody DespesaRequestDTO dto,
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();

        DespesaResponseDTO despesa = despesaService.editar(
                email,
                id,
                dto
        );

        return ResponseEntity.ok(despesa);
    }

    // Excluir uma despesa
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id,
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();

        despesaService.excluir(email, id);

        return ResponseEntity.noContent().build();
    }
}
