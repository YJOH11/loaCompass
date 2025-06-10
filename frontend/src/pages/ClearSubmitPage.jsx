import React from 'react';
import ClearSubmitForm from '../components/clear/ClearSubmitForm';

const ClearSubmitPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          레이드 클리어 인증 제출
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          클리어 타임과 파티 구성 정보를 입력하고 인증 스크린샷을 업로드해주세요.
        </p>
        <ClearSubmitForm />
      </div>
    </div>
  );
};

export default ClearSubmitPage;
