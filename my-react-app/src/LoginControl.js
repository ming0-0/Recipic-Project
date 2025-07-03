// React와 useState Hook을 불러옴
import React, {useState} from 'react';
import MessageList from './MessageList'; // MessageList 컴포넌트를 불러옵니다.

function LoginControl() {
    // 'isLoggedIn' 이라는 state를 선언합니다. 초기값은 false(로그아웃 상태)입니다.
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // 알림 메시지가 있다고 가정하는 state입니다.
    const [unreadMessages, setUnreadMessages] = useState(['React', 'Re: React', 'Re:Re: React']);
    
    // 로그인 버튼 클릭 시 호출될 함수
    const handleLoginClick = () => {
        setIsLoggedIn(true);
    };
    
    // 로그아웃 버튼 클릭 시 호출될 함수
    const handleLogoutClick = () => {
        setIsLoggedIn(false);
    };

    return (
        <div>
            <h2>로그인 상태에 따라 다른 UI 보여주기 (조건부 렌더링)</h2>
            {/* 방법 1: 삼항 연산자 (Ternary Operator) `조건 ? A : B` */}
            {/* isLoggedIn이 true이면 '로그아웃' 버튼을, false이면 '로그인' 버튼을 보여줍니다. */}
            {/* JSX 내에서 간단한 if-else 구문을 구현할 떄 가장 흔하게 사용됩니다. */}
            {isLoggedIn ? (
                <button onClick={handleLogoutClick}>로그아웃</button>
                ) : (
                <button onClick={handleLoginClick}>로그인</button>
            )}
            {/* 환영 메시지도 삼항 연산자로 표시합니다. */}
            <h1>
                {isLoggedIn ? '환영합니다!' : '로그인을 해주세요.'}
            </h1>
            <hr />
            {/* 방법 2: 논리 && 연산자 (Logical && Operator) `조건 && A` */}
      {/* 조건이 true일 때만 뒤따라오는 표현식(JSX)을 렌더링합니다. */}
      {/* false이면 아무것도 렌더링하지 않습니다. */}
      {isLoggedIn && unreadMessages.length > 0 && (
        <div>
          {/* MessageList 컴포넌트에 unreadMessages 배열을 props로 전달하여 렌더링합니다. */}
          <MessageList messages={unreadMessages} />
          {/* '모두 읽음' 버튼을 추가하여 unreadMessages state를 업데이트합니다. */}
          <button onClick={() => setUnreadMessages([])}>모두 읽음</button>
        </div>
      )}
        </div>
    );
}

export default LoginControl;