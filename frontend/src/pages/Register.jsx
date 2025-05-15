import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        agreeTerms: false
    });
    
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // 입력 시 해당 필드의 에러 메시지 제거
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors = {};
        
        // 사용자 이름 검증
        if (!formData.username.trim()) {
            newErrors.username = '사용자 이름을 입력해주세요';
        } else if (formData.username.length < 4) {
            newErrors.username = '사용자 이름은 4자 이상이어야 합니다';
        }
        
        // 이메일 검증
        if (!formData.email.trim()) {
            newErrors.email = '이메일을 입력해주세요';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = '유효한 이메일 주소를 입력해주세요';
        }
        
        // 비밀번호 검증
        if (!formData.password) {
            newErrors.password = '비밀번호를 입력해주세요';
        } else if (formData.password.length < 6) {
            newErrors.password = '비밀번호는 6자 이상이어야 합니다';
        }
        
        // 비밀번호 확인 검증
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = '비밀번호 확인을 입력해주세요';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
        }
        
        // 닉네임 검증
        if (!formData.nickname.trim()) {
            newErrors.nickname = '닉네임을 입력해주세요';
        }
        
        // 약관 동의 검증
        if (!formData.agreeTerms) {
            newErrors.agreeTerms = '서비스 이용약관에 동의해주세요';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validate()) return;
        
        setIsLoading(true);
        try {
            // 실제 API 연동 시 이 부분을 수정
            const response = await axios.post('http://localhost:8080/api/auth/signup', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                nickname: formData.nickname
            });
            
            // 성공 메시지를 서버 응답에서 가져옴
            setSuccessMessage(response.data);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(prev => ({
                    ...prev,
                    serverError: error.response.data.message || '회원가입 처리 중 오류가 발생했습니다'
                }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    serverError: '서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.'
                }));
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">회원가입</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        이미 계정이 있으신가요?{' '}
                        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                            로그인
                        </Link>
                    </p>
                </div>
                
                {successMessage && (
                    <div className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
                        <p>{successMessage}</p>
                    </div>
                )}
                
                {errors.serverError && (
                    <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p>{errors.serverError}</p>
                    </div>
                )}
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            아이디 *
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`block w-full px-3 py-2 border ${errors.username ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white`}
                            placeholder="4자 이상의 아이디"
                        />
                        {errors.username && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.username}</p>
                        )}
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            이메일 *
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white`}
                            placeholder="your@email.com"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.email}</p>
                        )}
                    </div>
                    
                    <div>
                        <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            닉네임 *
                        </label>
                        <input
                            id="nickname"
                            name="nickname"
                            type="text"
                            value={formData.nickname}
                            onChange={handleChange}
                            className={`block w-full px-3 py-2 border ${errors.nickname ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white`}
                            placeholder="사이트에서 사용할 닉네임"
                        />
                        {errors.nickname && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.nickname}</p>
                        )}
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            비밀번호 *
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white`}
                            placeholder="6자 이상의 비밀번호"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.password}</p>
                        )}
                    </div>
                    
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            비밀번호 확인 *
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white`}
                            placeholder="비밀번호 다시 입력"
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.confirmPassword}</p>
                        )}
                    </div>
                    
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="agreeTerms"
                                name="agreeTerms"
                                type="checkbox"
                                checked={formData.agreeTerms}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="agreeTerms" className="text-gray-700 dark:text-gray-300">
                                <a href="#" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">서비스 이용약관</a> 및 <a href="#" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">개인정보 처리방침</a>에 동의합니다.
                            </label>
                            {errors.agreeTerms && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.agreeTerms}</p>
                            )}
                        </div>
                    </div>
                    
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {isLoading ? '처리 중...' : '회원가입'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register; 