package com.gallery.backend.email;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ForgotPasswordEmailSender {

    private final EmailService emailService;

    @Value(value = "${email.from}")
    private String EMAIL_AUTHOR;
    @Value(value = "${email.url-prefix.forgot-password}")
    private String FORGOT_PASSWORD_URL_PREFIX;

    public String buildContent(String name, String token) {
        String content = String.format("""
                        Hi %s,

                        Please follow this link to reset your password:
                        %s%s

                        Best regards.""",
                name, FORGOT_PASSWORD_URL_PREFIX, token);

        return content;
    }

    public void send(String to, String content) {
        emailService.send(EMAIL_AUTHOR, to, "Reset your password", content);
    }
}
