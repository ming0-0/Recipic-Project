import pinksalt from '../assets/images/pinksalt.jpg';
import pink from '../assets/images/pink.jpg';
import pink1 from '../assets/images/pink1.jpg';
import oliveoil from '../assets/images/oliveoil.jpg';
import oliv from '../assets/images/oliv.jpg';
import oliv1 from '../assets/images/oliv1.jpg';
import balsamic from '../assets/images/balsamic.jpg';
import balsa from '../assets/images/balsa.jpg';
import balsa1 from '../assets/images/balsa1.jpg';
import board from '../assets/images/board.jpg';
import board1 from '../assets/images/board1.jpg';
import board2 from '../assets/images/board2.jpg';
import per1 from '../assets/images/per1.jpg';
import per from '../assets/images/per.jpg';
import per2 from '../assets/images/per2.jpg';
import pan from '../assets/images/pan.jpg';
import pan1 from '../assets/images/pan1.jpg';
import pan2 from '../assets/images/pan2.jpg';

export const dummyProducts = [
  {
    id: 1,
    name: '히말라야 핑크솔트',
    price: 10000,
    imageUrl: pinksalt,
    description: '미네랄이 풍부한 히말라야 핑크 솔트입니다.',
    imageGallery: [pinksalt, pink, pink1],
    longDescription: '히말라야 산맥의 순수한 자연에서 온 핑크 솔트는 음식의 풍미를 한층 더 깊게 만들어줍니다. 일반 소금보다 나트륨 함량이 적고 다양한 미네랄을 함유하고 있어 건강한 식단에 도움을 줍니다. 스테이크, 샐러드, 파스타 등 모든 요리에 특별한 맛을 더해보세요.'
  },
  {
    id: 2,
    name: '엑스트라 버진 올리브오일',
    price: 30000,
    imageUrl: oliveoil,
    description: '최고급 올리브를 압착하여 만든 엑스트라 버진 올리브 오일입니다.',
    imageGallery: [oliveoil, oliv, oliv1],
    longDescription: '지중해의 햇살을 받고 자란 최고급 올리브를 냉압착 방식으로 추출한 엑스트라 버진 올리브 오일입니다. 신선한 풀 향과 과일 향이 특징이며, 샐러드 드레싱이나 빵에 곁들여 먹으면 본연의 맛을 가장 잘 느낄 수 있습니다.'
  },
  {
    id: 3,
    name: '발사믹 식초',
    price: 20000,
    imageUrl: balsamic,
    description: '이탈리아 모데나에서 숙성된 고급 발사믹 식초입니다.',
    imageGallery: [balsamic, balsa, balsa1],
    longDescription: '이탈리아 모데나 지역의 전통적인 방식으로 오랜 시간 숙성하여 만든 발사믹 식초입니다. 깊고 진한 포도의 풍미와 새콤달콤한 맛이 조화롭게 어우러져 샐러드, 스테이크 소스, 아이스크림 토핑 등 다양하게 활용할 수 있습니다.'
  },
  {
    id: 4,
    name: '호두나무 도마',
    price: 45000,
    imageUrl: board,
    description: '칼날을 보호하고 위생적인 호두나무로 만든 도마입니다.',
    imageGallery: [board, board1, board2],
    longDescription: '견고하고 밀도가 높은 너도밤나무로 제작되어 칼날 손상을 최소화하고, 위생적으로 사용할 수 있는 프리미엄 도마입니다. 자연스러운 나뭇결이 주방의 품격을 높여주며, 플레이팅 용도로도 손색이 없습니다.'
  },
  {
    id: 5,
    name: '통후추 그라인더',
    price: 15000,
    imageUrl: per,
    description: '갓 갈아 신선한 향이 일품인 유기농 통후추입니다.',
    imageGallery: [per1, per, per2],
    longDescription: '요리 직전에 직접 갈아 사용하여 후추 본연의 신선하고 강렬한 향을 느낄 수 있는 그라인더입니다. 세라믹 그라인더를 사용하여 분쇄 굵기를 쉽게 조절할 수 있으며, 어떤 요리에든 깊은 풍미를 더해줍니다.'
  },
  {
    id: 6,
    name: '무쇠 주물 프라이팬',
    price: 78000,
    imageUrl: pan,
    description: '열 보존율이 뛰어나 어떤 요리든 맛있게 만들어주는 시즈닝된 무쇠 프라이팬입니다.',
    imageGallery: [pan, pan1, pan2],
    longDescription: '뛰어난 열 보존율과 열전도율로 재료 본연의 맛을 최대한 끌어올려 주는 무쇠 주물 프라이팬입니다. 스테이크 시어링부터 볶음 요리, 베이킹까지 다용도로 활용 가능하며, 사용할수록 길이 들어 더욱 가치 있는 주방 도구가 됩니다.'
  }
];