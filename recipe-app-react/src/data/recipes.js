import carbonara from '../assets/images/ab.jpg';
import kimchiStew from '../assets/images/kimch.jpg';
import chickenTenders from '../assets/images/cht.jpg';
import applePie from '../assets/images/applepie.jpg';
import beefRadishSoup from '../assets/images/sogo.jpg';
import salmonSalad from '../assets/images/sim.jpg';

export const dummyRecipes = [
  {
    id: 1,
    title: '클래식 까르보나라',
    author: '요리왕 비룡',
    thumbnail: carbonara,
    category: '양식',
    description: '전통적인 이탈리아 방식으로 만드는 진한 풍미의 까르보나라입니다. 크림 없이 계란 노른자와 치즈만으로 맛을 냅니다.',
    ingredients: [
      { name: '스파게티면', amount: '200g' },
      { name: '판체타 또는 베이컨', amount: '100g' },
      { name: '계란 노른자', amount: '4개' },
      { name: '파르미지아노 레지아노 치즈', amount: '50g' },
      { name: '통후추 그라인더', amount: '약간', productId: 5 },
      { name: '엑스트라 버진 올리브오일', amount: '1큰술', productId: 2 },
      { name: '히말라야 핑크솔트', amount: '약간', productId: 1 },
    ],
    steps: [
      { order: 1, description: '끓는 물에 소금을 넣고 스파게티면을 삶아줍니다. (포장지에 적힌 시간보다 1분 덜 삶기)', time: '00:30' },
      { order: 2, description: '면이 삶아지는 동안, 판체타(베이컨)를 작은 조각으로 썰고, 계란 노른자와 갈아둔 치즈, 빻은 후추를 섞어 소스를 만듭니다.', time: '02:00' },
      { order: 3, description: '팬에 올리브 오일을 두르고 판체타를 넣어 중간 불에서 바삭하게 볶습니다.', time: '05:00' },
      { order: 4, description: '알덴테로 삶아진 면을 건져 판체타를 볶던 팬에 넣고, 면수 1~2국자를 추가하여 빠르게 섞어줍니다.', time: '08:00' },
      { order: 5, description: '불을 끈 후, 만들어둔 계란-치즈 소스를 부어 잔열로 빠르게 섞어 크리미하게 만듭니다. (계란이 익지 않도록 주의!)', time: '08:30' },
      { order: 6, description: '그릇에 담고 후추와 치즈를 추가로 뿌려 완성합니다.', time: '09:00' },
    ],
    measurementGuide: [
      { unit: '1큰술 (T)', amount: '15ml' },
      { unit: '1작은술 (t)', amount: '5ml' },
      { unit: '1컵', amount: '200ml' },
    ],
    comments: [
      { id: 1, author: '맛잘알', text: '이 레시피 정말 최고예요! 크림 없이도 이렇게 진한 맛이 나다니...' },
      { id: 2, author: '요리초보', text: '저도 따라해봤는데 성공했어요! 감사합니다 :)' }
    ]
  },
  {
    id: 2,
    title: '매콤한 김치찌개',
    author: '백주부',
    thumbnail: kimchiStew,
    category: '한식',
    description: '잘 익은 김치와 돼지고기로 만드는 한국인의 소울푸드, 김치찌개입니다. 얼큰하고 깊은 맛이 일품입니다.',
    ingredients: [
      { name: '잘 익은 김치', amount: '300g' },
      { name: '돼지고기(목살 또는 삼겹살)', amount: '200g' },
      { name: '두부', amount: '1/2모' },
      { name: '대파', amount: '1/2대' },
      { name: '양파', amount: '1/4개' },
      { name: '멸치 다시마 육수', amount: '500ml' },
    ],
    seasonings: [
      { name: '고춧가루', amount: '1큰술' },
      { name: '다진 마늘', amount: '1큰술' },
      { name: '국간장', amount: '1큰술' },
      { name: '설탕', amount: '1/2큰술' },
      { name: '통후추 그라인더', amount: '약간', productId: 5 },
    ],
    steps: [
      { order: 1, description: '돼지고기는 먹기 좋게 썰고, 김치도 한 입 크기로 썹니다. 두부, 대파, 양파도 썰어 준비합니다.', time: '00:00' },
      { order: 2, description: '냄비에 식용유를 두르고 돼지고기를 볶다가 김치를 넣고 함께 볶아줍니다.', time: '03:00' },
      { order: 3, description: '김치가 부드러워지면 멸치 육수를 붓고 양념 재료(고춧가루, 다진마늘, 국간장, 설탕)를 넣고 끓입니다.', time: '06:00' },
      { order: 4, description: '찌개가 끓어오르면 중불로 줄여 10분간 더 끓여 깊은 맛을 냅니다.', time: '10:00' },
      { order: 5, description: '양파와 두부를 넣고 5분 더 끓인 후, 마지막에 대파와 후추를 넣고 마무리합니다.', time: '20:00' },
    ],
    comments: [
      { id: 3, author: '자취생', text: '이거 하나면 밥 두공기 뚝딱입니다!' }
    ]
  },
  { id: 3,
     title: '바삭한 치킨 텐더',
     author: '고든 램지',
     thumbnail: chickenTenders,
     category: '양식',
     description: '겉은 바삭하고 속은 촉촉한 수제 치킨 텐더입니다. 아이들 간식이나 맥주 안주로 최고입니다.',
     ingredients: [
      { name: '닭안심', amount: '300g'},
      { name: '밀가루', amount: '1컵' },
      { name: '통후추 그라인더', amount: '약간', productId: 5},
      { name:  '식용유', amount: '1큰술' },
      { name:  '소금', amount: '약간' },
      { name:  '후추', amount: '약간' },
      { name:  '올리브 오일', amount: '1큰술' },
      { name:  '레몬즙', amount: '1큰술' },
      { name:  '마늘', amount: '1쪽' },
      { name:  '파슬리', amount: '약간' },
     ],
     steps: [
      { order: 1, description: '닭안심을 얇게 썰어줍니다.', time: '02:00' },
      { order: 2, description: '밀가루, 통후추, 소금, 후추를 섞어 치킨 텐더를 두껍게 밀가루를 입힙니다.', time: '05:00' },
     ] 
  },

  { id: 4, title: '달콤한 애플파이', author: '제이미 올리버', thumbnail: applePie, category: '디저트', description: '새콤달콤한 사과 필링이 가득 들어간 홈메이드 애플파이입니다. 시나몬 향이 매력적입니다.', ingredients: [], steps: [] },
  { id: 5, title: '든든한 소고기 뭇국', author: '우리 엄마', thumbnail: beefRadishSoup, category: '한식', description: '맑고 시원한 국물이 일품인 소고기 뭇국입니다. 밥 한 그릇 말아먹으면 속이 든든해집니다.', ingredients: [], steps: [] },
  { id: 6, title: '상큼한 연어 샐러드', author: '샐러드마스터', thumbnail: salmonSalad, category: '샐러드', description: '신선한 채소와 훈제 연어, 상큼한 드레싱이 어우러진 건강하고 맛있는 샐러드입니다.', ingredients: [], steps: [] },
];