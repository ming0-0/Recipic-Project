import {useState, useEffect} from 'react';
/**
 * 지정된 URL에서 데이터를 가져오는 커스텀 훅입니다.
 * @param {string} url - 데이터를 가져올 API의 URL
 * @returns {{data: any, loading: boolean, error: Error | null}} - 데이터, 로딩 상태, 에러 객체를 포함하는 객체
 */
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // AbortController를 사용하여 컴포넌트 언마운트 시 fetch 요청을 취소합니다.
        // 이는 메모리 누수를 방지하는 좋은 습관입니다.
        const controller = new AbortController();

        const fetchData = async () => {
            
        }
    })
}