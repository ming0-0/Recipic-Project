import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dummyReels } from '../data/reels';
import { FaHeart, FaComment, FaShare, FaPlay, FaVolumeUp, FaVolumeMute, FaPlus, FaTrash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import CommentModal from '../components/CommentModal';
import './ReelsPage.css';

// 각 릴에 대한 초기 좋아요 수와 같은 추가 정보를 생성합니다.
const initialReelsData = dummyReels.reduce((acc, reel) => {
  acc[reel.id] = {
    liked: false,
    likes: Math.floor(Math.random() * 1000) + 50, // 50 ~ 1049 사이의 랜덤 좋아요 수
    // 초기 댓글 목록 추가
    commentsList: [
      { author: '요리왕', text: '와, 정말 맛있어 보여요!' },
      { author: '맛잘알', text: '이번 주말에 꼭 해봐야겠어요. 꿀팁 감사!' },
    ].slice(0, Math.floor(Math.random() * 3)), // 0, 1, or 2개의 랜덤 댓글
  };
  // 댓글 수 초기화
  acc[reel.id].comments = acc[reel.id].commentsList.length;
  return acc;
}, {});

const ReelsPage = () => {
  const [reels, setReels] = useState(dummyReels); // 릴 목록을 상태로 관리
  const [reelsData, setReelsData] = useState(initialReelsData);
  const videoRefs = useRef({});
  const [isPausedMap, setIsPausedMap] = useState({});
  const [isMutedMap, setIsMutedMap] = useState({});
  const [progressMap, setProgressMap] = useState({});
  const itemRefs = useRef({}); // 각 릴 아이템 div에 대한 ref
  const [activeCommentReelId, setActiveCommentReelId] = useState(null);
  const { user } = useAuth();

  const handleLike = (reelId) => {
    setReelsData(prevData => {
      const currentReel = prevData[reelId];
      const newLikedState = !currentReel.liked;
      const newLikesCount = newLikedState ? currentReel.likes + 1 : currentReel.likes - 1;

      return {
        ...prevData,
        [reelId]: {
          ...currentReel,
          liked: newLikedState,
          likes: newLikesCount,
        },
      };
    });
  };

  const handleVideoClick = (reelId) => {
    const video = videoRefs.current[reelId];
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleMuteToggle = (reelId) => {
    const video = videoRefs.current[reelId];
    if (!video) return;

    const newMutedState = !video.muted;
    video.muted = newMutedState;
    setIsMutedMap(prev => ({ ...prev, [reelId]: newMutedState }));
  };

  const handleTimeUpdate = (e, reelId) => {
    const video = e.target;
    if (!video.duration) return;

    const progress = (video.currentTime / video.duration) * 100;
    setProgressMap(prev => ({ ...prev, [reelId]: progress }));
  };

  const handleAddComment = (reelId, commentText) => {
    // 실제 앱에서는 API 호출 후 상태를 업데이트합니다.
    const newComment = {
      author: user?.name || '익명', // 로그인한 사용자 이름 또는 '익명'
      text: commentText,
    };

    setReelsData(prevData => {
      const currentReel = prevData[reelId];
      return {
        ...prevData,
        [reelId]: {
          ...currentReel,
          commentsList: [...currentReel.commentsList, newComment],
          comments: currentReel.comments + 1, // 댓글 수 증가
        },
      };
    });
  };

  const handleProgressClick = (e, reelId) => {
    const video = videoRefs.current[reelId];
    // 비디오나 프로그레스 바가 없거나, 비디오 총 재생시간을 알 수 없으면 중단
    if (!video || !video.duration || !e.currentTarget) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    // 프로그레스 바 내부에서 클릭된 가로 위치 계산
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * video.duration;
    
    // 계산된 시간으로 비디오 재생 위치를 업데이트
    video.currentTime = newTime;
  };

  const handleDeleteReel = (reelId) => {
    if (window.confirm('정말로 이 릴스를 삭제하시겠습니까?')) {
      // 릴 목록에서 해당 릴을 제거합니다.
      setReels(prevReels => prevReels.filter(reel => reel.id !== reelId));

      // 관련된 좋아요, 댓글 등의 부가 데이터도 함께 제거합니다.
      setReelsData(prevData => {
        const newData = { ...prevData };
        delete newData[reelId];
        return newData;
      });

      console.log(`Reel ${reelId} deleted.`);
    }
  };

  useEffect(() => {
    const options = {
      root: null, // 뷰포트를 root로 사용
      rootMargin: '0px',
      threshold: 0.6, // 아이템이 60% 이상 보일 때 콜백 실행
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target.querySelector('video');
        if (!video) return;

        if (entry.isIntersecting) {
          // 뷰포트에 들어오면 재생
          video.play().catch(error => console.error("Video play failed:", error));
        } else {
          // 뷰포트에서 나가면 일시정지
          video.pause();
        }
      });
    }, options);

    // 모든 릴 아이템을 관찰 대상으로 등록
    const currentItems = itemRefs.current;
    Object.values(currentItems).forEach(item => {
      if (item) observer.observe(item);
    });

    // 컴포넌트 언마운트 시 관찰 중지
    return () => {
      Object.values(currentItems).forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  const activeReelForModal = activeCommentReelId ? dummyReels.find(r => r.id === activeCommentReelId) : null;

  return (
    <>
      {user && (
        <Link to="/reels/new" className="new-reel-button" title="새 릴스 등록">
          <FaPlus />
        </Link>
      )}
      <div className="reels-container">
      {reels.map((reel) => (
        <div key={reel.id} className="reel-item" ref={el => (itemRefs.current[reel.id] = el)}>
          <video
            ref={el => (videoRefs.current[reel.id] = el)}
            src={reel.videoSrc}
            className="reel-video"
            muted // 브라우저 정책상 자동 재생을 위해 muted는 필수입니다.
            loop
            playsInline // iOS에서 전체화면으로 자동 전환되는 것을 방지합니다.
            onClick={() => handleVideoClick(reel.id)}
            onPlay={() => setIsPausedMap(prev => ({ ...prev, [reel.id]: false }))}
            onPause={() => setIsPausedMap(prev => ({ ...prev, [reel.id]: true }))}
            onTimeUpdate={(e) => handleTimeUpdate(e, reel.id)}
          />
          <button className="mute-button" onClick={() => handleMuteToggle(reel.id)}>
            {/* isMutedMap[reel.id]가 false일 때만(소리가 켜져있을 때) VolumeUp 아이콘 표시 */}
            {isMutedMap[reel.id] === false
              ? <FaVolumeUp />
              : <FaVolumeMute />}
          </button>
          {isPausedMap[reel.id] && (
            <div className="play-icon-overlay" onClick={() => handleVideoClick(reel.id)}>
              <FaPlay className="play-icon" />
            </div>
          )}
          <div className="reel-info">
            <h3 className="reel-title">{reel.title}</h3>
            <p className="reel-author">by {reel.author}</p>
            <p className="reel-description">{reel.description}</p>
          </div>
          <div 
            className="progress-bar-container"
            onClick={(e) => handleProgressClick(e, reel.id)}
          >
            <div
              className="progress-bar"
              style={{ width: `${progressMap[reel.id] || 0}%` }}
            />
          </div>
          <div className="reel-actions">
            <button
              className={`action-button ${reelsData[reel.id]?.liked ? 'liked' : ''}`}
              onClick={() => handleLike(reel.id)}
            >
              <FaHeart className="icon-heart" />
              <span>{reelsData[reel.id]?.likes.toLocaleString()}</span>
            </button>
            <button className="action-button" onClick={() => setActiveCommentReelId(reel.id)}>
              <FaComment />
              <span>{reelsData[reel.id]?.comments.toLocaleString()}</span>
            </button>
            <button className="action-button">
              <FaShare />
              <span>공유</span>
            </button>
            {user && user.name === reel.author && (
              <button className="action-button" onClick={() => handleDeleteReel(reel.id)} title="삭제하기">
                <FaTrash />
              </button>
            )}
          </div>
        </div>
      ))}
      </div>
      {activeReelForModal && (
        <CommentModal
          reel={activeReelForModal}
          comments={reelsData[activeReelForModal.id]?.commentsList || []}
          onClose={() => setActiveCommentReelId(null)}
          onAddComment={handleAddComment}
        />
      )}
    </>
  );
};

export default ReelsPage;
