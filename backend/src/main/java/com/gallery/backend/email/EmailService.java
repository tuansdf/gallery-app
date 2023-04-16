package com.gallery.backend.email;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    @Async
    public void send(String from, String to, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setText(content);
        message.setTo(to);
        message.setSubject(subject);
        message.setFrom(from);
        mailSender.send(message);
    }
}
