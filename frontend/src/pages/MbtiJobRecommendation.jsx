import React, { useState } from 'react';
import axios from 'axios';
import '../styles/MbtiJobRecommendation.css';

const MbtiJobRecommendation = () => {
  const [mbti, setMbti] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const mbtiTypes = [
    'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
    'ISTP', 'ISFP', 'INFP', 'INTP',
    'ESTP', 'ESFP', 'ENFP', 'ENTP',
    'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!mbti) {
      setError('MBTI를 선택해주세요.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:8080/api/mbti/job-recommendation', {
        mbti: mbti
      });
      
      setResult(response.data);
    } catch (err) {
      console.error('API 호출 중 오류 발생:', err);
      setError('직업 추천을 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mbti-container">
      <div className="mbti-header">
        <h1>MBTI 기반 로스트아크 직업 추천</h1>
        <p>당신의 MBTI를 선택하고 어울리는 로스트아크 직업을 찾아보세요!</p>
      </div>
      
      <div className="mbti-form-container">
        <form onSubmit={handleSubmit} className="mbti-form">
          <div className="mbti-selection">
            <label htmlFor="mbti-select">MBTI 선택:</label>
            <select 
              id="mbti-select"
              value={mbti}
              onChange={(e) => setMbti(e.target.value)}
              className="mbti-select"
            >
              <option value="">-- MBTI 선택 --</option>
              {mbtiTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? '로딩 중...' : '직업 추천 받기'}
          </button>
          
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
      
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>AI가 당신에게 맞는 직업을 찾고 있습니다...</p>
        </div>
      )}
      
      {result && !loading && (
        <div className="result-container">
          <h2>{result.mbti} 유형을 위한 추천 직업</h2>
          
          <div className="job-list">
            {result.recommendedJobs.map((job, index) => (
              <div key={index} className="job-card">
                <h3>{job}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MbtiJobRecommendation; 