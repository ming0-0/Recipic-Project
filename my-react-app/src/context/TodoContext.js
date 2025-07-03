import React, { createContext, useReducer, useContext } from 'react';

// 1. Action 타입을 상수로 정의합니다.
export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo',
};

// 2. 리듀서(reducer) 함수: 상태를 업데이트하는 로직을 담고 있습니다.
//    이 함수는 Context Provider 내부에서 사용됩니다.
function todoReducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id);
    default:
      return todos;
  }
}

// 새 할 일 객체를 만드는 헬퍼 함수
function newTodo(name) {
  return { id: Date.now(), name: name, completed: false };
}

// 3. Context 생성
//    Context는 { state, dispatch } 객체를 전달할 것입니다.
const TodoContext = createContext(null);

// 4. Context를 쉽게 사용하기 위한 커스텀 훅 생성
//    이 훅을 사용하면 컴포넌트에서 useContext와 TodoContext를 직접 임포트할 필요 없이
//    전역 todos 상태와 dispatch 함수에 접근할 수 있습니다.
export function useTodos() {
  return useContext(TodoContext);
}

// 5. Provider 컴포넌트 생성
//    이 컴포넌트는 useReducer를 사용하여 상태를 관리하고,
//    그 상태와 dispatch 함수를 하위 컴포넌트들에게 제공합니다.
export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, []); // 초기 상태는 빈 배열

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}