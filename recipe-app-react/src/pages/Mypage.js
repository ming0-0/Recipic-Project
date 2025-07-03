import React from 'react';
import { useAuth } from '../context/AuthContext';

const MyPage = () => {
  const { user } = useAuth();

  // PrivateRoute가 이미 처리하지만, 만약을 위한 안전장치
  if (!user) {
    return <p>사용자 정보를 불러오는 중입니다...</p>;
  }

  return (
    <div>
      <h1>내 정보</h1>
      <p><strong>이름:</strong> {user.name}</p>
      <p><strong>이메일:</strong> {user.email}</p>
      <br />
      <p>이곳에 회원 정보 수정, 내가 쓴 글/레시피 보기 등의 기능을 구현할 수 있습니다.</p>
    </div>
  );
};

export default MyPage;
