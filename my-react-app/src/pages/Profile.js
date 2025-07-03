import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 가짜 사용자 데이터. 실제 애플리케이션에서는 서버 API를 통해 받아옵니다.
const profileData = {
  velopert: {
    name: '김민준',
    description: 'React를 사랑하는 프론트엔드 개발자',
  },
  gildong: {
    name: '홍길동',
    description: '고전 소설 속 주인공',
  },
};

// 가짜 API 함수: 사용자 이름을 받아 1초 후에 해당 사용자 정보를 반환하는 Promise를 리턴합니다.
const fetchUser = (username) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = profileData[username];
      if (user) {
        resolve(user);
      } else {
        reject(new Error('사용자를 찾을 수 없습니다.'));
      }
    }, 1000); // 1초 딜레이
  });
};


const Profile = () => {
  // useParams 훅을 사용하여 URL 파라미터 값을 가져옵니다.
  // App.js에서 <Route path="/profile/:username" ... /> 이렇게 설정했기 때문에
  // 'username'이라는 이름으로 파라미터를 조회할 수 있습니다.
  const { username } = useParams();
  // useNavigate 훅을 호출하여 navigate 함수를 가져옵니다.
  // 이 함수를 사용하여 프로그래밍 방식으로 페이지를 이동시킬 수 있습니다.
  const navigate = useNavigate();

  // 사용자 정보, 로딩 상태, 에러 상태를 관리하는 state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect를 사용하여 컴포넌트가 마운트되거나 username이 변경될 때 데이터를 불러옵니다.
  useEffect(() => {
    // 리디렉션을 위한 타이머 ID를 저장할 변수
    let timeoutId = null;

    // 데이터를 불러오는 비동기 함수
    const loadUser = async () => {
      setLoading(true); // 로딩 시작
      setError(null);   // 이전 에러 초기화
      setUser(null);    // 이전 사용자 정보 초기화
      try {
        const userData = await fetchUser(username);
        setUser(userData); // 성공 시 사용자 정보 업데이트
      } catch (e) {
        // 실패 시 에러 상태를 업데이트하고, 3초 후에 홈으로 이동시킨다는 메시지를 추가합니다.
        setError(`${e.message} 3초 후 홈으로 이동합니다.`);
        // 3초 후에 홈('/') 경로로 이동시키는 타이머를 설정합니다.
        timeoutId = setTimeout(() => {
          navigate('/');
        }, 3000);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    loadUser(); // 함수 호출

    // 클린업(cleanup) 함수: 컴포넌트가 언마운트되거나, 의존성(username)이 변경되어
    // effect가 다시 실행되기 전에 호출됩니다.
    return () => {
      // 만약 타이머가 설정되어 있다면(즉, 에러가 발생했다면),
      // 사용자가 다른 페이지로 이동하는 등 컴포넌트가 사라질 때 타이머를 취소합니다.
      // 이렇게 하지 않으면 컴포넌트가 사라진 후에도 리디렉션이 실행될 수 있습니다.
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [username, navigate]); // username 또는 navigate 함수가 변경될 때마다 이 effect를 다시 실행합니다.

  // 로딩 중일 때 보여줄 UI
  if (loading) return <div>로딩 중...</div>;
  // 에러가 발생했을 때 보여줄 UI
  if (error) return <div>에러: {error}</div>;
  // 사용자를 찾지 못했을 때 보여줄 UI
  if (!user) return <div>사용자 정보를 찾을 수 없습니다.</div>;

  return (
    <div>
      <h2>{username}님의 프로필</h2>
      <p><strong>이름:</strong> {user.name}</p>
      <p><strong>소개:</strong> {user.description}</p>
      <br />
      {/* navigate(-1)을 호출하여 브라우저의 뒤로 가기 기능처럼 동작하는 버튼 */}
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
    </div>
  );
}

export default Profile;
