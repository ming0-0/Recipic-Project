<div align="center">
  <img src="https://github.com/user-attachments/assets/bc103ad5-4108-4241-bbbb-5eee4b18d4fb" alt="logo" width="800" height="350">
</div>

# RecipePic 프론트엔드

RecipePic은 React 기반의 레시피 공유 및 요리 커뮤니티 웹앱입니다.  
프론트엔드에서 사용자 친화적인 UI와 다양한 요리 관련 기능을 제공합니다.

## 주요 프론트엔드 기능

### 1. 레시피 페이지
<div align="center">
  <img src="" alt="mainpage" width="800" height="350">
</div>
- 다양한 카테고리별 레시피 목록 제공<br>
- 레시피 상세 페이지에서 재료, 조리법, 이미지, 동영상 확인 가능<br>
- 레시피 검색 및 필터링 기능<br>
- 사용자가 직접 레시피 작성, 수정, 삭제 가능<br>
- 레시피 저장(북마크), 좋아요, 댓글 작성 및 삭제 기능<br>

### 2. 릴스 페이지
<div align="center">
  <img src="https://github.com/user-attachments/assets/cc880323-c111-42ad-83a9-5fb2c655d944" alt="reels" width="800" height="350">
</div>
- 요리 영상 릴스 목록 및 상세 보기<br>
- 릴스 업로드(영상 등록) 및 삭제<br>
- 릴스에 좋아요, 댓글, 공유 기능 제공<br>
- 댓글 모달을 통한 실시간 소통<br>

### 3. 스토어 페이지
<div align="center">
  <img src="https://github.com/user-attachments/assets/a8d0637a-d97a-4817-b723-db19283b9878" alt="reels" width="800" height="350">
</div>
- 프리미엄 식재료 및 주방용품 상품 목록/상세 페이지<br>
- 상품 장바구니 담기, 수량 변경, 삭제 기능<br>
- 주문/결제 UI 및 주문내역 확인<br>
- 상품별 리뷰 및 평점 표시<br>

### 4. 마이페이지
<div align="center">
  <img src="https://github.com/user-attachments/assets/6e08c92d-48e4-4121-ac6e-11173b897586" alt="mypage" width="800" height="350">
</div>
- 내 정보(프로필, 비밀번호 등) 확인 및 수정<br>
- 내가 작성한 레시피, 저장한 레시피 목록 관리<br>
- 주문내역 및 주문 상세 정보 확인<br>

### 5. 회원/소셜 로그인 UI
<div align="center">
  <img src="https://github.com/user-attachments/assets/451b7b84-b9de-4530-94b7-1371ad389b61" alt="sig/log" width="800" height="350">
</div>
- 이메일/비밀번호 회원가입 및 로그인 폼<br>
- 카카오, 네이버, 구글 소셜 로그인 버튼 제공<br>
- 로그인 상태에 따라 메뉴 및 접근 권한 제어<br>

## 폴더 구조

- `src/pages` : 주요 페이지 컴포넌트  <br>
- `src/components` : 공통 UI 컴포넌트  <br>
- `src/context` : 전역 상태 관리  <br>
- `src/data` : 프론트엔드 더미 데이터  <br>
- `public/` : 정적 파일  <br>

## 실행 방법

```sh
npm install
npm start
