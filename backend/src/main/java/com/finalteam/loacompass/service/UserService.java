package com.finalteam.loacompass.service;

import com.finalteam.loacompass.dto.SignupRequest;
import com.finalteam.loacompass.entity.Role;
import com.finalteam.loacompass.entity.User;
import com.finalteam.loacompass.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
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

    @Transactional
    public void changePassword(String username, String currentPassword, String newPassword) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + username));

        // 현재 비밀번호 확인
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new BadCredentialsException("현재 비밀번호가 일치하지 않습니다.");
        }

        // 새 비밀번호가 현재 비밀번호와 같은지 확인
        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            throw new RuntimeException("새 비밀번호는 현재 비밀번호와 달라야 합니다.");
        }

        // 비밀번호 변경하기 위한 새로운 User 객체 생성 (User는 불변객체처럼 설계되어 있는 듯함)
        User updatedUser = User.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .password(passwordEncoder.encode(newPassword))
                .nickname(user.getNickname())
                .role(user.getRole())
                .build();

        userRepository.save(updatedUser);
    }

    @Transactional
    public void deleteUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + username));

        // 사용자 삭제
        userRepository.delete(user);
    }
}
