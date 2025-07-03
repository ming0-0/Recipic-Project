import React, { useState } from 'react';

function ReservationForm() {
  // 여러 입력 필드를 하나의 state 객체로 관리합니다.
  // 각 키(key)는 input의 name 속성과 일치시킵니다.
  const [inputs, setInputs] = useState({
    guestName: '',
    isGoing: true,
    numberOfGuests: 2,
  });

  // 모든 input 요소의 변경을 처리하는 단일 함수입니다.
  const handleInputChange = (event) => {
    const target = event.target;
    // target.type이 'checkbox'이면 value는 target.checked(true/false)가 되고,
    // 아니면 기존처럼 target.value(입력된 텍스트/숫자)가 됩니다.
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // event.target.name을 통해 어떤 입력 필드가 변경되었는지 식별합니다.
    const name = target.name;

    // ES6의 계산된 속성 이름(computed property name) 문법을 사용합니다.
    // ...inputs는 기존 state 객체를 복사하는 '스프레드 문법'입니다.
    // 그 다음, 변경된 필드([name]: value)만 새 값으로 덮어씁니다.
    // 예를 들어 guestName input이 변경되면 [name]은 'guestName'이 됩니다.
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // JSON.stringify를 사용해 객체를 문자열로 예쁘게 출력합니다.
    alert(`제출된 정보: ${JSON.stringify(inputs, null, 2)}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>여러 입력 필드 다루기</h2>
      <label>
        참석자 이름:
        <input name="guestName" type="text" value={inputs.guestName} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        참석 여부:
        <input name="isGoing" type="checkbox" checked={inputs.isGoing} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        손님 수:
        <input name="numberOfGuests" type="number" value={inputs.numberOfGuests} onChange={handleInputChange} />
      </label>
      <br />
      <button type="submit">제출</button>
    </form>
  );
}

export default ReservationForm;

