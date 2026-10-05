package com.asares.Pratica_Interdisciplinar.service;

import com.asares.Pratica_Interdisciplinar.dto.DespesaRequestDTO;
import com.asares.Pratica_Interdisciplinar.dto.DespesaResponseDTO;
import com.asares.Pratica_Interdisciplinar.model.Despesa;
import com.asares.Pratica_Interdisciplinar.model.Usuario;
import com.asares.Pratica_Interdisciplinar.repository.DespesaRepository;
import com.asares.Pratica_Interdisciplinar.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DespesaService {

    private final DespesaRepository despesaRepository;
    private final UsuarioRepository usuarioRepository;

    // US04 - Cadastrar despesa
    @Transactional
    public DespesaResponseDTO cadastrar(
            String emailUsuarioLogado,
            DespesaRequestDTO dto) {

        Usuario usuario = buscarUsuario(emailUsuarioLogado);

        Despesa despesa = Despesa.builder()
                .descricao(dto.descricao())
                .valor(dto.valor())
                .data(dto.data())
                .categoria(dto.categoria())
                .paga(dto.paga() != null && dto.paga())
                .usuario(usuario)
                .build();

        Despesa despesaSalva = despesaRepository.save(despesa);

        return new DespesaResponseDTO(despesaSalva);
    }

    // Listar despesas do usuário logado
    @Transactional(readOnly = true)
    public List<DespesaResponseDTO> listarPorUsuario(
            String emailUsuarioLogado) {

        Usuario usuario = buscarUsuario(emailUsuarioLogado);

        return despesaRepository
                .findByUsuarioIdOrderByDataDesc(usuario.getId())
                .stream()
                .map(DespesaResponseDTO::new)
                .toList();
    }

    // Editar uma despesa
    @Transactional
    public DespesaResponseDTO editar(
            String emailUsuarioLogado,
            Long id,
            DespesaRequestDTO dto) {

        Usuario usuario = buscarUsuario(emailUsuarioLogado);

        // Procura a despesa pelo ID e pelo ID do usuário
        Despesa despesa = despesaRepository
                .findByIdAndUsuarioId(id, usuario.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Despesa não encontrada ou não pertence ao usuário."
                        ));

        // Atualiza os dados da despesa
        despesa.setDescricao(dto.descricao());
        despesa.setValor(dto.valor());
        despesa.setData(dto.data());
        despesa.setCategoria(dto.categoria());
        despesa.setPaga(dto.paga() != null && dto.paga());

        Despesa despesaAtualizada = despesaRepository.save(despesa);

        return new DespesaResponseDTO(despesaAtualizada);
    }

    // Excluir uma despesa
    @Transactional
    public void excluir(
            String emailUsuarioLogado,
            Long id) {

        Usuario usuario = buscarUsuario(emailUsuarioLogado);

        // Procura a despesa pelo ID e pelo usuário
        Despesa despesa = despesaRepository
                .findByIdAndUsuarioId(id, usuario.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Despesa não encontrada ou não pertence ao usuário."
                        ));

        despesaRepository.delete(despesa);
    }

    // Busca o usuário pelo email presente no token JWT
    private Usuario buscarUsuario(String email) {

        return usuarioRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalStateException(
                                "Usuário logado não encontrado."
                        ));
    }
}
