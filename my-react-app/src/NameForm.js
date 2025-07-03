// React와 useState Hook을 불러옵니다.
import React, { useState } from 'react';

// 사용자의 입력을 받는 폼 컴포넌트입니다.
function NameForm() {
  // 폼 입력 값을 위한 state를 생성하고, 초기값은 빈 문자열입니다.
  const [value, setValue] = useState('');

  // input 필드의 내용이 변경될 때마다 호출되는 함수입니다.
  const handleChange = (event) => {
    // event.target.value는 input 필드의 현재 텍스트 값입니다.
    // 이 값으로 state를 업데이트합니다.
    setValue(event.target.value);
  };

  // 폼이 제출될 때 호출되는 함수입니다.
  const handleSubmit = (event) => {
    // 폼 제출 시 기본 동작(페이지 새로고침)을 방지합니다.
    event.preventDefault();
    // 현재 state에 저장된 값(입력된 이름)을 사용하여 알림창을 띄웁니다.
    alert('제출된 이름: ' + value);
  };

  return (
    // onSubmit 이벤트 핸들러를 form 태그에 연결합니다.
    <form onSubmit={handleSubmit}>
      <h2>양식(Form) 다루기</h2>
      <label>
        이름:
        {/* 
          React에서는 input, textarea, select 같은 폼 엘리먼트의 값을
          컴포넌트의 state로 관리하는 것을 '제어 컴포넌트(Controlled Component)'라고 합니다.
          - value={value}: input의 값을 항상 React state와 일치시킵니다.
          - onChange={handleChange}: 사용자가 입력할 때마다 state를 업데이트합니다.
        */}
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <button type="submit">제출</button>
    </form>
  );
}

export default NameForm;

