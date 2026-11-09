
package com.asares.Pratica_Interdisciplinar.service;

import com.asares.Pratica_Interdisciplinar.dto.MetaRequestDTO;
import com.asares.Pratica_Interdisciplinar.dto.MetaResponseDTO;
import com.asares.Pratica_Interdisciplinar.model.Meta;
import com.asares.Pratica_Interdisciplinar.model.Usuario;
import com.asares.Pratica_Interdisciplinar.repository.MetaRepository;
import com.asares.Pratica_Interdisciplinar.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MetaService {

    private final MetaRepository metaRepository;
    private final UsuarioRepository usuarioRepository;

    // Cadastrar uma nova meta
    @Transactional
    public MetaResponseDTO cadastrar(
            String emailUsuarioLogado,
            MetaRequestDTO dto) {

        Usuario usuario = buscarUsuario(emailUsuarioLogado);

        Meta meta = Meta.builder()
                .nome(dto.nome().trim())
                .descricao(dto.descricao())
                .valorObjetivo(dto.valorObjetivo())
                .valorAtual(dto.valorAtual())
                .prazo(dto.prazo())
                .usuario(usuario)
                .build();

        Meta metaSalva = metaRepository.save(meta);

        return new MetaResponseDTO(metaSalva);
    }

    // Listar somente as metas do usuário logado
    @Transactional(readOnly = true)
    public List<MetaResponseDTO> listarPorUsuario(
            String emailUsuarioLogado) {

        Usuario usuario = buscarUsuario(emailUsuarioLogado);

        return metaRepository
                .findByUsuarioIdOrderByPrazoAsc(usuario.getId())
                .stream()
                .map(MetaResponseDTO::new)
                .toList();
    }

    // Editar uma meta
    @Transactional
    public MetaResponseDTO editar(
            String emailUsuarioLogado,
            Long id,
            MetaRequestDTO dto) {

        Usuario usuario = buscarUsuario(emailUsuarioLogado);

        Meta meta = metaRepository
                .findByIdAndUsuarioId(id, usuario.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Meta não encontrada ou não pertence ao usuário."
                        ));

        meta.setNome(dto.nome().trim());
        meta.setDescricao(dto.descricao());
        meta.setValorObjetivo(dto.valorObjetivo());
        meta.setValorAtual(dto.valorAtual());
        meta.setPrazo(dto.prazo());

        Meta metaAtualizada = metaRepository.save(meta);

        return new MetaResponseDTO(metaAtualizada);
    }

    // Excluir uma meta
    @Transactional
    public void excluir(
            String emailUsuarioLogado,
            Long id) {

        Usuario usuario = buscarUsuario(emailUsuarioLogado);

        Meta meta = metaRepository
                .findByIdAndUsuarioId(id, usuario.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Meta não encontrada ou não pertence ao usuário."
                        ));

        metaRepository.delete(meta);
    }

    // Buscar usuário pelo e-mail extraído do token JWT
    private Usuario buscarUsuario(String email) {

        return usuarioRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalStateException(
                                "Usuário não encontrado."
                        ));
    }
}
