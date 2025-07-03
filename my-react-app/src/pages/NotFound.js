import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h1>404 - 페이지를 찾을 수 없습니다.</h1>
            <p>요청하신 페이지를 찾을 수 없습니다. 주소를 다시 확인하거나, 아래 링크를 통해 홈으로 돌아가세요.</p>
            <Link to="/" style={{textDecoration: 'none', color: '#61dafb', fontSize: '1.2em'}} >홈으로 돌아가기</Link>
        </div>
    );
};
export default NotFound;