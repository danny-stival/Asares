
package com.asares.Pratica_Interdisciplinar.service;

import lombok.RequiredArgsConstructor;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    // Envia o e-mail com o link de recuperação de senha
    public void enviarEmailRecuperacao(String email, String link) {

        SimpleMailMessage mensagem = new SimpleMailMessage();

        mensagem.setFrom("nao-responda@asares.local");

        mensagem.setTo(email);

        mensagem.setSubject("Recuperação de senha - ASARES");

        mensagem.setText(
                "Olá!\n\n" +
                "Recebemos uma solicitação para redefinir sua senha no ASARES.\n\n" +
                "Para cadastrar uma nova senha, acesse o link abaixo:\n\n" +
                link + "\n\n" +
                "Este link é válido por 15 minutos e poderá ser utilizado apenas uma vez.\n\n" +
                "Se você não solicitou a recuperação de senha, ignore este e-mail.\n\n" +
                "Atenciosamente,\n" +
                "Equipe ASARES"
        );

        mailSender.send(mensagem);
    }
}
