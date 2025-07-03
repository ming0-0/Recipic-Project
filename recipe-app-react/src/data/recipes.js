// 1. 로컬 이미지들을 import 합니다.
//    src/assets/images/ 폴더를 만드시고, 그 안에 아래 이름으로 이미지들을 넣어주세요.
//    (이미지는 unsplash.com 등에서 다운로드 받으실 수 있습니다.)
import carbonara from '../assets/images/ab.jpg';
import kimchiStew from '../assets/images/kimch.jpg';
import chickenTenders from '../assets/images/cht.jpg';
import applePie from '../assets/images/applepie.jpg';
import beefRadishSoup from '../assets/images/sogo.jpg';
import salmonSalad from '../assets/images/sim.jpg';

// 2. thumbnail 속성에 import한 이미지 변수를 연결합니다.
export const dummyRecipes = [
  { id: 1, title: '클래식 까르보나라', author: '요리왕 비룡', thumbnail: carbonara, description: '전통적인 이탈리아 방식으로 만드는 진한 풍미의 까르보나라입니다. 크림 없이 계란 노른자와 치즈만으로 맛을 냅니다.' },
  { id: 2, title: '매콤한 김치찌개', author: '백주부', thumbnail: kimchiStew, description: '잘 익은 김치와 돼지고기로 만드는 한국인의 소울푸드, 김치찌개입니다. 얼큰하고 깊은 맛이 일품입니다.' },
  { id: 3, title: '바삭한 치킨 텐더', author: '고든 램지', thumbnail: chickenTenders, description: '겉은 바삭하고 속은 촉촉한 수제 치킨 텐더입니다. 아이들 간식이나 맥주 안주로 최고입니다.' },
  { id: 4, title: '달콤한 애플파이', author: '제이미 올리버', thumbnail: applePie, description: '새콤달콤한 사과 필링이 가득 들어간 홈메이드 애플파이입니다. 시나몬 향이 매력적입니다.' },
  { id: 5, title: '든든한 소고기 뭇국', author: '우리 엄마', thumbnail: beefRadishSoup, description: '맑고 시원한 국물이 일품인 소고기 뭇국입니다. 밥 한 그릇 말아먹으면 속이 든든해집니다.' },
  { id: 6, title: '상큼한 연어 샐러드', author: '샐러드마스터', thumbnail: salmonSalad, description: '신선한 채소와 훈제 연어, 상큼한 드레싱이 어우러진 건강하고 맛있는 샐러드입니다.' },
];