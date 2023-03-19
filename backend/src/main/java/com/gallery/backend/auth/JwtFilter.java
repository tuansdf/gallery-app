package com.gallery.backend.auth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        boolean isAuthHeaderFormatCorrect = authHeader != null && authHeader.startsWith("Bearer ");
        if (!isAuthHeaderFormatCorrect) {
            filterChain.doFilter(request, response);
            return;
        }

        final int TOKEN_BEGIN_INDEX_IN_AUTH_HEADER = 7;
        String jwtToken = authHeader.substring(TOKEN_BEGIN_INDEX_IN_AUTH_HEADER);
        String usernameFromToken = jwtUtils.extractUsername(jwtToken);
        boolean isUsernameFoundInToken = usernameFromToken != null;
        boolean isUserAuthenticated = SecurityContextHolder.getContext().getAuthentication() != null;
        if (!isUsernameFoundInToken || isUserAuthenticated) {
            filterChain.doFilter(request, response);
            return;
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(usernameFromToken);
        boolean isTokenValid = jwtUtils.isTokenValid(jwtToken, userDetails);
        if (!isTokenValid) {
            filterChain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}
