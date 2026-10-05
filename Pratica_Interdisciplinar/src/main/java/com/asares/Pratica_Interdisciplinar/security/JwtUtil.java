package com.asares.Pratica_Interdisciplinar.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expiration-ms}")
    private long expirationMs;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // Gera o token
    public String gerarToken(String email) {

        Date agora = new Date();

        Date expiracao =
                new Date(agora.getTime() + expirationMs);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(agora)
                .setExpiration(expiracao)
                .signWith(
                        getSigningKey(),
                        SignatureAlgorithm.HS256
                )
                .compact();
    }

    // Pega o e-mail dentro do token
    public String extrairEmail(String token) {

        return extrairClaims(token).getSubject();
    }

    // Verifica se o token ainda é válido
    public boolean tokenValido(String token) {

        try {

            Claims claims = extrairClaims(token);

            return claims.getExpiration()
                    .after(new Date());

        } catch (Exception e) {

            return false;
        }
    }

    // Lê os dados do JWT
    private Claims extrairClaims(String token) {

        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}