// React 라이브러리를 불러옵니다.
import React from 'react';

// messages 배열을 props로 받아서 리스트를 렌더링하는 컴포넌트
function MessageList({messages}) {
    // 배열이 비어있거나 내용이 없으면 간단한 메시지를 표현합니다.
    if(!messages || messages.length === 0) {
        return <p>새로운 메시지가 있습니다.</p>;
    }

    return (
        <div>
            <h3>읽지 않은 메시지 목록</h3>
            <ul>
                {/* 
                    JavaScript의 map() 함수를 사용하여 messages 배열의 각 항목을 <li> 태그로 변환합니다.
                    map() 함수는 배열의 모든 요소에 대해 제공된 함수를 호출하고, 그 결과로 새로운 배열을 생성합니다.
                */}
                {messages.map((message, index) => (
                    // 중요 : 배열을 렌더링할 때는 각 항목에 교유한 'key' prop을 제공해야 함.
                    // 'key'는 React가 어떤 항목이 변경, 추가, 제거되었는지 식별하는 데 도움을 준다.
                    // 여기서는 메시지 내용과 인덱스를 조합하여 고유한 키를 만들었지만,
                    // 실제 데이터에는 보통 교유 ID(예 : message.id)가 있으며 그것을 사용하는 것이 가장 좋습니다.
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    )
}
export default MessageList;