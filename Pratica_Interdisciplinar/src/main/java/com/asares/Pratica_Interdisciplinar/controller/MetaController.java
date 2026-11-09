
package com.asares.Pratica_Interdisciplinar.controller;

import com.asares.Pratica_Interdisciplinar.dto.MetaRequestDTO;
import com.asares.Pratica_Interdisciplinar.dto.MetaResponseDTO;
import com.asares.Pratica_Interdisciplinar.service.MetaService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/metas")
@RequiredArgsConstructor
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class MetaController {

    private final MetaService metaService;

    // Cadastrar uma meta
    @PostMapping
    public ResponseEntity<MetaResponseDTO> cadastrar(
            @Valid @RequestBody MetaRequestDTO dto,
            Authentication authentication) {

        if (authentication == null ||
                !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();

        MetaResponseDTO meta = metaService.cadastrar(email, dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(meta);
    }

    // Listar metas do usuário autenticado
    @GetMapping
    public ResponseEntity<List<MetaResponseDTO>> listar(
            Authentication authentication) {

        if (authentication == null ||
                !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();

        return ResponseEntity.ok(metaService.listarPorUsuario(email));
    }

    // Editar uma meta
    @PutMapping("/{id}")
    public ResponseEntity<MetaResponseDTO> editar(
            @PathVariable Long id,
            @Valid @RequestBody MetaRequestDTO dto,
            Authentication authentication) {

        if (authentication == null ||
                !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();

        MetaResponseDTO meta = metaService.editar(email, id, dto);

        return ResponseEntity.ok(meta);
    }

    // Excluir uma meta
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id,
            Authentication authentication) {

        if (authentication == null ||
                !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();

        metaService.excluir(email, id);

        return ResponseEntity.noContent().build();
    }
}
