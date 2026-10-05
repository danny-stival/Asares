package com.asares.Pratica_Interdisciplinar.service;

import com.asares.Pratica_Interdisciplinar.dto.ReceitaRequestDTO;
import com.asares.Pratica_Interdisciplinar.dto.ReceitaResponseDTO;
import com.asares.Pratica_Interdisciplinar.model.Receita;
import com.asares.Pratica_Interdisciplinar.model.Usuario;
import com.asares.Pratica_Interdisciplinar.repository.ReceitaRepository;
import com.asares.Pratica_Interdisciplinar.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReceitaService {

    private final ReceitaRepository receitaRepository;
    private final UsuarioRepository usuarioRepository;

    // US03 - Cadastrar receita
    @Transactional
    public ReceitaResponseDTO cadastrar(String emailUsuarioLogado, ReceitaRequestDTO dto) {

        Usuario usuario = buscarUsuario(emailUsuarioLogado);

        Receita receita = Receita.builder()
                .descricao(dto.descricao())
                .valor(dto.valor())
                .data(dto.data())
                .categoria(dto.categoria())
                .usuario(usuario)
                .build();

        Receita receitaSalva = receitaRepository.save(receita);

        return new ReceitaResponseDTO(receitaSalva);
    }

    // Listar receitas do usuário logado
    @Transactional(readOnly = true)
    public List<ReceitaResponseDTO> listarPorUsuario(String emailUsuarioLogado) {

        Usuario usuario = buscarUsuario(emailUsuarioLogado);

        return receitaRepository
                .findByUsuarioIdOrderByDataDesc(usuario.getId())
                .stream()
                .map(ReceitaResponseDTO::new)
                .toList();
    }

    // Editar uma receita
    @Transactional
    public ReceitaResponseDTO editar(
            String emailUsuarioLogado,
            Long id,
            ReceitaRequestDTO dto) {

        Usuario usuario = buscarUsuario(emailUsuarioLogado);

        Receita receita = receitaRepository
                .findByIdAndUsuarioId(id, usuario.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Receita não encontrada ou não pertence ao usuário."
                        ));

        receita.setDescricao(dto.descricao());
        receita.setValor(dto.valor());
        receita.setData(dto.data());
        receita.setCategoria(dto.categoria());

        Receita receitaAtualizada = receitaRepository.save(receita);

        return new ReceitaResponseDTO(receitaAtualizada);
    }

    // Excluir uma receita
    @Transactional
    public void excluir(
            String emailUsuarioLogado,
            Long id) {

        Usuario usuario = buscarUsuario(emailUsuarioLogado);

        Receita receita = receitaRepository
                .findByIdAndUsuarioId(id, usuario.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Receita não encontrada ou não pertence ao usuário."
                        ));

        receitaRepository.delete(receita);
    }

    // Busca o usuário pelo email do token JWT
    private Usuario buscarUsuario(String email) {

        return usuarioRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalStateException(
                                "Usuário não encontrado."
                        ));
    }
}

