import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // react-router-dom에서 BrowserRouter를 불러옵니다.
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* App 컴포넌트를 BrowserRouter로 감싸주면, App 컴포넌트와 그 모든 자식 컴포넌트에서 라우팅 기능을 사용할 수 있게 됩니다. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();

// If you want to start measuring performance in your app, pass a function
