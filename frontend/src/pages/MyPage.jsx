import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [tokenExists, setTokenExists] = useState(false);
  const [isDiscordUser, setIsDiscordUser] = useState(false); // 디스코드 로그인 여부

  // 비밀번호 변경 관련 상태
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // 회원탈퇴 관련 상태
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  const navigate = useNavigate();

  // 로그인 상태 확인 및 즐겨찾기 캐릭터 불러오기
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const discordUser = localStorage.getItem('discordUser'); // 디스코드 사용자 정보 확인

    if (token) {
      setTokenExists(true);

      // 먼저 localStorage에서 사용자 정보 로드
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setIsDiscordUser(false);
        } catch (e) {
          console.error('Error parsing stored user data', e);
        }
      } else if (discordUser) {
        // 디스코드 사용자 정보가 있는 경우 사용
        try {
          const parsedDiscordUser = JSON.parse(discordUser);
          setUser({
            id: parsedDiscordUser.id,
            username: parsedDiscordUser.username,
            discriminator: parsedDiscordUser.discriminator,
            email: parsedDiscordUser.email,
            avatar: parsedDiscordUser.avatar
          });
          setIsDiscordUser(true); // 디스코드 로그인 사용자로 설정
        } catch (e) {
          console.error('Error parsing stored discord user data', e);
        }
      }

      // 사용자 정보 가져오기 (API 호출)
      axios.get(`/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
    .catch(error => {
      console.error('Error fetching user data:', error);
      // API 호출 실패 시에도 디스코드 로그인이 있으면 로그인 상태로 처리
      if (discordUser) {
        setTokenExists(true);
      }
      setLoading(false);
    });

  // 로컬 스토리지에서 즐겨찾기 캐릭터 불러오기
  const favoriteHistory = localStorage.getItem('favoriteHistory');
  if (favoriteHistory) {
    try {
      const parsedFavorites = JSON.parse(favoriteHistory);
      setFavoriteCharacters(parsedFavorites);

      // 즐겨찾기 캐릭터 이름 목록 설정
      setCharacters(parsedFavorites.map(name => ({
        name,
        class: '정보 로딩 중...',
        server: '정보 로딩 중...'
      })));

      // 각 캐릭터 정보를 API에서 가져오기
      const fetchCharacterDetails = async () => {
        const updatedCharacters = [];

        for (const characterName of parsedFavorites) {
          try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/character/${characterName}`);
            if (response.data?.profile) {
              updatedCharacters.push({
                name: response.data.profile.CharacterName,
                class: response.data.profile.CharacterClassName,
                server: response.data.profile.ServerName,
                itemLevel: response.data.profile.ItemAvgLevel,
                image: response.data.profile.CharacterImage
              });
            }
          } catch (err) {
            console.error(`Error fetching character ${characterName}:`, err);
            // 에러가 발생해도 기본 정보라도 표시
            updatedCharacters.push({ name: characterName, class: '정보 없음', server: '정보 없음' });
          }
        }

        setCharacters(updatedCharacters);
      };

      fetchCharacterDetails();

    } catch (e) {
      console.error('Error parsing favorite characters data', e);
      setCharacters([]);
      setFavoriteCharacters([]);
    }
  } else {
    setCharacters([]);
    setFavoriteCharacters([]);
  }
} else if (discordUser) {
  // 토큰은 없지만 디스코드 사용자 정보가 있는 경우
  setTokenExists(true);
  setIsDiscordUser(true); // 디스코드 로그인 사용자로 설정
  try {
    const parsedDiscordUser = JSON.parse(discordUser);
    setUser({
      id: parsedDiscordUser.id,
      username: parsedDiscordUser.username,
      discriminator: parsedDiscordUser.discriminator,
      email: parsedDiscordUser.email,
      avatar: parsedDiscordUser.avatar
    });
    setLoading(false);
  } catch (e) {
    console.error('Error parsing discord user data', e);
    setLoading(false);
  }

  // 즐겨찾기 캐릭터 로드 로직 추가
  const favoriteHistory = localStorage.getItem('favoriteHistory');
  if (favoriteHistory) {
    try {
      const parsedFavorites = JSON.parse(favoriteHistory);
      setFavoriteCharacters(parsedFavorites);

      // 즐겨찾기 캐릭터 이름 목록 설정
      setCharacters(parsedFavorites.map(name => ({
        name,
        class: '정보 로딩 중...',
        server: '정보 로딩 중...'
      })));

      // 각 캐릭터 정보를 API에서 가져오기
      const fetchCharacterDetails = async () => {
        const updatedCharacters = [];

        for (const characterName of parsedFavorites) {
          try {
            const response = await axios.get(`/api/character/${characterName}`);
            if (response.data?.profile) {
              updatedCharacters.push({
                name: response.data.profile.CharacterName,
                class: response.data.profile.CharacterClassName,
                server: response.data.profile.ServerName,
                itemLevel: response.data.profile.ItemAvgLevel,
                image: response.data.profile.CharacterImage
              });
            }
          } catch (err) {
            console.error(`Error fetching character ${characterName}:`, err);
            // 에러가 발생해도 기본 정보라도 표시
            updatedCharacters.push({ name: characterName, class: '정보 없음', server: '정보 없음' });
          }
        }

        setCharacters(updatedCharacters);
      };

      fetchCharacterDetails();
    } catch (e) {
      console.error('Error parsing favorite characters data', e);
      setCharacters([]);
      setFavoriteCharacters([]);
    }
  }
} else {
  setLoading(false);
}
  }, []);

// 로컬 스토리지 변경 이벤트 감지
useEffect(() => {
  const handleStorageChange = () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const discordUser = localStorage.getItem('discordUser');

    if (token || discordUser) {
      setTokenExists(true);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsDiscordUser(false);
      } else if (discordUser) {
        const parsedDiscordUser = JSON.parse(discordUser);
        setUser({
          id: parsedDiscordUser.id,
          username: parsedDiscordUser.username,
          discriminator: parsedDiscordUser.discriminator,
          email: parsedDiscordUser.email,
          avatar: parsedDiscordUser.avatar
        });
        setIsDiscordUser(true); // 디스코드 로그인 사용자로 설정
      }
    } else {
      setTokenExists(false);
      setUser(null);
    }
  };

  window.addEventListener('storage', handleStorageChange);
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
}, []);

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('discordUser'); // 디스코드 사용자 정보도 삭제

  // 로컬 스토리지 이벤트 강제 발생 (다른 탭/창에서 변경 감지)
  window.dispatchEvent(new Event('storage'));

  window.location.href = '/';
};

// 즐겨찾기 캐릭터 삭제
const removeCharacter = (index) => {
  const characterName = favoriteCharacters[index];
  const updatedFavorites = [...favoriteCharacters];
  updatedFavorites.splice(index, 1);

  // 로컬스토리지 업데이트
  localStorage.setItem('favoriteHistory', JSON.stringify(updatedFavorites));

  // 상태 업데이트
  setFavoriteCharacters(updatedFavorites);
  setCharacters(prevCharacters => prevCharacters.filter((_, i) => i !== index));
};

// 비밀번호 변경 처리 함수
const handlePasswordChange = (e) => {
  e.preventDefault();

  // 유효성 검사
  if (!currentPassword || !newPassword || !confirmPassword) {
    setPasswordError('모든 필드를 입력해주세요.');
    return;
  }

  if (newPassword !== confirmPassword) {
    setPasswordError('새 비밀번호가 일치하지 않습니다.');
    return;
  }

  if (newPassword.length < 6) {
    setPasswordError('비밀번호는 6자 이상이어야 합니다.');
    return;
  }

  setPasswordError('');
  setPasswordSuccess('');
  setPasswordLoading(true);

  const token = localStorage.getItem('token');

  // 비밀번호 변경 API 호출
  axios.post(`/api/user/password/change`, {
    currentPassword,
    newPassword
  }, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(response => {
      setPasswordSuccess('비밀번호가 성공적으로 변경되었습니다.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordLoading(false);
    })
    .catch(error => {
      console.error('Error changing password:', error);
      setPasswordError(error.response?.data?.message || '비밀번호 변경 중 오류가 발생했습니다.');
      setPasswordLoading(false);
    });
};

// 회원탈퇴 처리 함수
const handleDeleteAccount = (e) => {
  e.preventDefault();

  // 유효성 검사
  if (deleteConfirm !== user?.username) {
    setDeleteError('사용자 이름을 정확하게 입력해주세요.');
    return;
  }

  setDeleteError('');
  setDeleteLoading(true);

  const token = localStorage.getItem('token');

  // 회원탈퇴 API 호출
  axios.delete(`/api/user/delete`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(response => {
      // 로그아웃 및 홈으로 이동
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    })
    .catch(error => {
      console.error('Error deleting account:', error);
      setDeleteError(error.response?.data?.message || '회원탈퇴 중 오류가 발생했습니다.');
      setDeleteLoading(false);
    });
};

// 로딩 중일 때 표시할 UI
if (loading) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

// 로그인되어 있지 않으면 로그인 페이지로 리다이렉트
if (!tokenExists) {
  return <Navigate to="/login" />;
}

return (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-lg shadow-lg p-6 mb-6 text-white">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* 프로필 아바타 */}
          <div className="w-32 h-32 rounded-full bg-blue-700 flex items-center justify-center border-4 border-amber-400">
            <span className="text-4xl font-bold">{user?.username?.charAt(0)?.toUpperCase() || '?'}</span>
          </div>

          {/* 유저 정보 */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-amber-300">{user?.username || '모험가'}</h1>
            <p className="text-blue-200 mt-1">{user?.email || 'email@example.com'}</p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-blue-800 rounded-full text-sm">
                가입일: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '알 수 없음'}
              </span>
              <span className="px-3 py-1 bg-amber-600 rounded-full text-sm">
                보유 캐릭터: {characters.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          className={`py-3 px-6 font-medium ${activeTab === 'profile'
            ? 'border-b-2 border-amber-500 text-amber-500'
            : 'text-gray-600 dark:text-gray-300'}`}
          onClick={() => setActiveTab('profile')}
        >
          프로필
        </button>
        <button
          className={`py-3 px-6 font-medium ${activeTab === 'characters'
            ? 'border-b-2 border-amber-500 text-amber-500'
            : 'text-gray-600 dark:text-gray-300'}`}
          onClick={() => setActiveTab('characters')}
        >
          캐릭터
        </button>
        <button
          className={`py-3 px-6 font-medium ${activeTab === 'settings'
            ? 'border-b-2 border-amber-500 text-amber-500'
            : 'text-gray-600 dark:text-gray-300'}`}
          onClick={() => setActiveTab('settings')}
        >
          설정
        </button>
      </div>

      {/* 탭 내용 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">나의 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">계정 정보</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">닉네임</span>
                    <span className="font-medium text-gray-800 dark:text-white">{user?.username || '모험가'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">이메일</span>
                    <span className="font-medium text-gray-800 dark:text-white">{user?.email || 'email@example.com'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">가입일</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                  {isDiscordUser && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">로그인 방식</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">디스코드 로그인</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">활동 내역</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">마지막 로그인</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">보유 캐릭터</span>
                    <span className="font-medium text-gray-800 dark:text-white">{characters.length}개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">게시글</span>
                    <span className="font-medium text-gray-800 dark:text-white">0개</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'characters' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">즐겨찾기한 캐릭터</h2>
            {characters.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characters.map((character, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-md p-4 relative">
                    <button
                      onClick={() => removeCharacter(index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="flex items-center gap-3">
                      {character.image ? (
                        <img
                          src={character.image}
                          alt={character.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-md bg-blue-600 flex items-center justify-center">
                          <span className="text-white font-bold">{character.itemLevel || '??'}</span>
                        </div>
                      )}
                      <div>
                        <Link to={`/character/${character.name}`} className="font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">{character.name}</Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{character.class} · {character.server}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-md text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">즐겨찾기한 캐릭터가 없습니다.</p>
                <Link to="/character/search" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block">
                  캐릭터 검색하기
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">계정 설정</h2>
            <div className="space-y-6">
              {isDiscordUser ? (
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-md">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">디스코드 계정으로 로그인 중</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    디스코드 계정으로 로그인한 사용자는 비밀번호 변경이나 회원탈퇴 기능을 이용할 수 없습니다.
                    계정 관리는 디스코드 서비스에서 진행해주세요.
                  </p>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      로그아웃
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">비밀번호 변경</h3>

                    {passwordError && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {passwordError}
                      </div>
                    )}

                    {passwordSuccess && (
                      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {passwordSuccess}
                      </div>
                    )}

                    <form onSubmit={handlePasswordChange} className="space-y-3">
                      <div>
                        <label className="block text-gray-600 dark:text-gray-400 mb-1">현재 비밀번호</label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 dark:text-gray-400 mb-1">새 비밀번호</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 dark:text-gray-400 mb-1">새 비밀번호 확인</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={passwordLoading}
                        className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-2 ${passwordLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {passwordLoading ? '변경 중...' : '비밀번호 변경'}
                      </button>
                    </form>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-3">회원 탈퇴</h3>

                    {deleteError && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {deleteError}
                      </div>
                    )}

                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      회원 탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
                      진행하려면 아래에 사용자 이름(<span className="font-bold">{user?.username}</span>)을 입력해주세요.
                    </p>

                    <form onSubmit={handleDeleteAccount} className="space-y-3">
                      <div>
                        <label className="block text-gray-600 dark:text-gray-400 mb-1">사용자 이름 확인</label>
                        <input
                          type="text"
                          value={deleteConfirm}
                          onChange={(e) => setDeleteConfirm(e.target.value)}
                          placeholder={user?.username}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={deleteLoading}
                        className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 mt-2 ${deleteLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {deleteLoading ? '처리 중...' : '회원 탈퇴'}
                      </button>
                    </form>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      로그아웃
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default MyPage; 