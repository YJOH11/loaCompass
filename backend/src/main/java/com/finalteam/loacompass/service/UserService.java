package com.finalteam.loacompass.service;

import com.finalteam.loacompass.dto.SignupRequest;
import com.finalteam.loacompass.entity.Role;
import com.finalteam.loacompass.entity.User;
import com.finalteam.loacompass.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + username));
    }

    @Transactional
    public User registerUser(SignupRequest signupRequest) {
        // 사용자명 중복 검사
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            throw new RuntimeException("이미 사용중인 아이디입니다.");
        }
        
        // 이메일 중복 검사
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new RuntimeException("이미 사용중인 이메일입니다.");
        }

        // 닉네임 중복 검사
        if (userRepository.existsByNickname(signupRequest.getNickname())) {
            throw new RuntimeException("이미 사용중인 닉네임입니다.");
        }

        // 사용자 생성
        User user = User.builder()
                .username(signupRequest.getUsername())
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .nickname(signupRequest.getNickname())
                .role(Role.USER)
                .build();

        return userRepository.save(user);
        }
    }

            