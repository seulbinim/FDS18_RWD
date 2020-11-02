# BACKUP

JavaScript로 컨트롤하게 되면서 불필요해진 HTML 하드 코딩 마크업 백업

<br>

> **🍿 잠깐! 왜 코드를 백업했나요?**<br>
> 
> 해외 개발 환경과 달리 퍼블리셔와 프론트엔드 개발자로 구분되는 국내 실무 업무 범위 특성 상, 퍼블리셔가 HTML, CSS 코드를 짜서 정적(Static) 마크업을 하게 되면
> 프론트엔드 개발자 또는 백엔드 개발자가 데이터와 템플릿으로 코드를 분리해 동적(Dynamic)으로 관리하게 됩니다. 이 과정에서 정적 마크업 코드를
> 제거하게 됩니다. 결과적으로 두 번 일하는 꼴이고, 수정이 잦을 경우 진행이 더뎌짐은 물론! 팀원간 불화의 소지가 발생할 수 있어 매우 비효율이지만, 안타깝게도 현 실정이 그러합니다. 
>
> 하지만 (해외 개발 환경처럼) 퍼블리셔 직군이 별도로 존재하지 않는 경우, 프론트엔드 개발자가 UI 개발의 모든 것을 책임지므로 처음부터 동적 데이터 바인딩(Binding, 연결)을 
> 염두에 두고 마크업, 스타일링, 스크립팅을 처리합니다. 데이터를 토대로 구조, 표현, 동작이 한데 엮여 작동하는 과정을 큰 그림으로 그릴 수 있는 능력이 있기 때문입니다. 
> 프론트 엔드 개발자가 되려면 이러한 능력을 갖춰야 합니다.
>
> 이디야 커피 브랜드 사이트 (학습용) 예제는 그러한 절차를 과정 별 목표에 따라 정적, 동적 마크업 처리가 나눠져 HTML, CSS 학습을 위해 정적 마크업 코드를 백업합니다.
> 호스팅 되고 있는 결과물은 JavaScript에 의해 동적으로 컨트롤되고 있기 때문입니다.

<br>

## index.html

내비게이션 아이템 하드코딩

> 효율적인 내비게이션 아이템 관리를 위해 데이터를 분리하기 위함입니다. ([api/navigation.json](../api/navigation.json))

<details>
  <summary>백업된 마크업 코드</summary>

  ```html
  <li><a href="./views/login.html">로그인</a></li>
  <li><a href="./views/signup.html">회원 가입</a></li>
  <li><a href="./views/ui-design.html">이디야 디자인</a></li>
  <li><a href="./views/beverage.html">이디야 음료</a></li>
  <li><a href="./views/news.html">이디야 뉴스</a></li>
  <li><a href="./views/store.html">매장 찾기</a></li>
  ```
</details>

<br>

## beverage.html

음료 리스트 아이템(`.ediya-menu__item`) 하드코딩

> 지속적으로 추가, 수정 가능한 음료 리스트 아이템 관리를 위해 데이터를 분리하기 위함입니다. ([api/beverages.json](../api/beverages.json))

<details>
  <summary>백업된 마크업 코드</summary>

  ```html
  <li class="ediya-menu__item">
    <a href="#" role="button" aria-haspopup="dialog" aria-pressed="false">
      <figure>
        <img src="./images/iced-cherry-blossoms-latte.png" alt width="323" height="323" />
        <figcaption>ICED 벚꽃라떼</figcaption>
      </figure>
    </a>
    <div hidden class="ediya-menu__item--detail" role="dialog" aria-modal="false" aria-labelledby=" ediya-menu__item1">
      <h3 id="ediya-menu__item1" class="ediya-menu__item--name">ICED 벚꽃라떼<span lang="en">Cherry Blossom Latte</span></h3>
      <p>은은한 벚꽃향과 라즈베리 화이트 초콜릿 토핑이 올라간 핑크빛 라떼</p>
      <div class="ediya-menu__item--multi-column is-2">
        <dl>
          <dt>칼로리</dt>
          <dd>(393kcal)</dd>
          <dt>당류</dt>
          <dd>(35g)</dd>
          <dt>단백질</dt>
          <dd>(7g)</dd>
          <dt>포화지방</dt>
          <dd>(18.6g)</dd>
          <dt>나트륨</dt>
          <dd>(149mg)</dd>
          <dt>카페인</dt>
          <dd>(0mg)</dd>
        </dl>
      </div>
      <button type="button" class="button is-close-panel" title="닫기" aria-label="음료 정보 패널 닫기">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  </li>
  <li class="ediya-menu__item">
    <a href="#" role="button" aria-haspopup="dialog" aria-pressed="false">
      <figure>
        <img src="./images/hot-cherry-blossoms-latte.png" alt width="323" height="323" />
        <figcaption>HOT 벚꽃라떼</figcaption>
      </figure>
    </a>
    <div hidden class="ediya-menu__item--detail" role="dialog" aria-modal="false" aria-labelledby=" ediya-menu__item2">
      <h3 id="ediya-menu__item2" class="ediya-menu__item--name">HOT 벚꽃라떼<span lang="en">Cherry Blossom Latte</span></h3>
      <p>은은한 벚꽃향과 라즈베리 화이트 초콜릿 토핑이 올라간 핑크빛 라떼</p>
      <div class="ediya-menu__item--multi-column is-2">
        <dl>
          <dt>칼로리</dt>
          <dd>(430kcal)</dd>
          <dt>당류</dt>
          <dd>(38g)</dd>
          <dt>단백질</dt>
          <dd>(10g)</dd>
          <dt>포화지방</dt>
          <dd>(19.0g)</dd>
          <dt>나트륨</dt>
          <dd>(190mg)</dd>
          <dt>카페인</dt>
          <dd>(0mg)</dd>
        </dl>
      </div>
      <button type="button" class="button is-close-panel" title="닫기" aria-label="음료 정보 패널 닫기">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  </li>
  <li class="ediya-menu__item">
    <a href="#" role="button" aria-haspopup="dialog" aria-pressed="false">
      <figure>
        <img src="./images/iced-brownie-chocolate.png" alt width="323" height="323" />
        <figcaption>ICED 브라우니 쇼콜라</figcaption>
      </figure>
    </a>
    <div hidden class="ediya-menu__item--detail" role="dialog" aria-modal="false" aria-labelledby=" ediya-menu__item3">
      <h3 id="ediya-menu__item3" class="ediya-menu__item--name">ICED 브라우니 쇼콜라<span lang="en">Brownie Chocolate</span></h3>
      <p>깊고 진한 초콜릿의 맛에 부드러운 휘핑크림과 브라우니를 함께 어울러져 고급스러운 디저트 같은 초콜릿 음료</p>
      <div class="ediya-menu__item--multi-column is-2">
        <dl>
          <dt>칼로리</dt>
          <dd>(503kcal)</dd>
          <dt>당류</dt>
          <dd>(42g)</dd>
          <dt>단백질</dt>
          <dd>(9g)</dd>
          <dt>포화지방</dt>
          <dd>(20.8g)</dd>
          <dt>나트륨</dt>
          <dd>(262mg)</dd>
          <dt>카페인</dt>
          <dd>(12mg)</dd>
        </dl>
      </div>
      <button type="button" class="button is-close-panel" title="닫기" aria-label="음료 정보 패널 닫기">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  </li>
  <li class="ediya-menu__item">
    <a href="#" role="button" aria-haspopup="dialog" aria-pressed="false">
      <figure>
        <img src="./images/hot-brownie-chocolate.png" alt width="323" height="323" />
        <figcaption>HOT 브라우니 쇼콜라</figcaption>
      </figure>
    </a>
    <div hidden class="ediya-menu__item--detail" role="dialog" aria-modal="false" aria-labelledby=" ediya-menu__item4">
      <h3 id="ediya-menu__item4" class="ediya-menu__item--name">HOT 브라우니 쇼콜라<span lang="en">Brownie Chocolate</span></h3>
      <p>깊고 진한 초콜릿의 맛에 부드러운 휘핑크림과 브라우니를 함께 어울러져 고급스러운 디저트 같은 초콜릿 음료</p>
      <div class="ediya-menu__item--multi-column is-2">
        <dl>
          <dt>칼로리</dt>
          <dd>(503kcal)</dd>
          <dt>당류</dt>
          <dd>(42g)</dd>
          <dt>단백질</dt>
          <dd>(9g)</dd>
          <dt>포화지방</dt>
          <dd>(20.9g)</dd>
          <dt>나트륨</dt>
          <dd>(299mg)</dd>
          <dt>카페인</dt>
          <dd>(12mg)</dd>
        </dl>
      </div>
      <button type="button" class="button is-close-panel" title="닫기" aria-label="음료 정보 패널 닫기">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  </li>
  <li class="ediya-menu__item">
    <a href="#" role="button" aria-haspopup="dialog" aria-pressed="false">
      <figure>
        <img src="./images/jeju-green-tangerine-tea.png" alt width="323" height="323" />
        <figcaption>제주청귤 오리지널</figcaption>
      </figure>
    </a>
    <div hidden class="ediya-menu__item--detail" role="dialog" aria-modal="false" aria-labelledby=" ediya-menu__item5">
      <h3 id="ediya-menu__item5" class="ediya-menu__item--name">제주청귤 오리지널<span lang="en">Jeju Green Tangerine Tea</span></h3>
      <p>청정 제주지역에서 자라난 귀한 청귤의 풍부한 과육을 맛볼 수 있는 새콤달콤한 홈메이드 스타일 과일차</p>
      <div class="ediya-menu__item--multi-column is-2">
        <dl>
          <dt>칼로리</dt>
          <dd>(218kcal)</dd>
          <dt>당류</dt>
          <dd>(51g)</dd>
          <dt>단백질</dt>
          <dd>(0g)</dd>
          <dt>포화지방</dt>
          <dd>(0.1g)</dd>
          <dt>나트륨</dt>
          <dd>(4mg)</dd>
          <dt>카페인</dt>
          <dd>(0mg)</dd>
        </dl>
      </div>
      <button type="button" class="button is-close-panel" title="닫기" aria-label="음료 정보 패널 닫기">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  </li>
  <li class="ediya-menu__item">
    <a href="#" role="button" aria-haspopup="dialog" aria-pressed="false">
      <figure>
        <img src="./images/jeju-green-tangerine-blossom.png" alt width="323" height="323" />
        <figcaption>제주청귤 블라썸</figcaption>
      </figure>
    </a>
    <div hidden class="ediya-menu__item--detail" role="dialog" aria-modal="false" aria-labelledby=" ediya-menu__item6">
      <h3 id="ediya-menu__item6" class="ediya-menu__item--name">제주청귤 블라썸<span lang="en">Jeju Green Tangerine Blossom</span></h3>
      <p>청귤의 새콤함이 복숭아, 포도 등의 다양한 과일향과 함께 어우러져 밸런스가 훌륭한 블렌딩티</p>
      <div class="ediya-menu__item--multi-column is-2">
        <dl>
          <dt>칼로리</dt>
          <dd>(202kcal)</dd>
          <dt>당류</dt>
          <dd>(46g)</dd>
          <dt>단백질</dt>
          <dd>(1g)</dd>
          <dt>포화지방</dt>
          <dd>(0.1g)</dd>
          <dt>나트륨</dt>
          <dd>(5mg)</dd>
          <dt>카페인</dt>
          <dd>(0mg)</dd>
        </dl>
      </div>
      <button type="button" class="button is-close-panel" title="닫기" aria-label="음료 정보 패널 닫기">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  </li>
  <li class="ediya-menu__item">
    <a href="#" role="button" aria-haspopup="dialog" aria-pressed="false">
      <figure>
        <img src="./images/pomegranate-tea.png" alt width="323" height="323" />
        <figcaption>석류 오리지널</figcaption>
      </figure>
    </a>
    <div hidden class="ediya-menu__item--detail" role="dialog" aria-modal="false" aria-labelledby=" ediya-menu__item7">
      <h3 id="ediya-menu__item7" class="ediya-menu__item--name">석류 오리지널<span lang="en">Pomegranate Tea</span></h3>
      <p>석류 특유의 산뜻한 향과 깔끔한 뒷맛이 느껴지며, 과육이 한알 한알 살아있는 붉은 빛의 매력적인 과일차</p>
      <div class="ediya-menu__item--multi-column is-2">
        <dl>
          <dt>칼로리</dt>
          <dd>(210kcal)</dd>
          <dt>당류</dt>
          <dd>(42g)</dd>
          <dt>단백질</dt>
          <dd>(0g)</dd>
          <dt>포화지방</dt>
          <dd>(0.1g)</dd>
          <dt>나트륨</dt>
          <dd>(5mg)</dd>
          <dt>카페인</dt>
          <dd>(0mg)</dd>
        </dl>
      </div>
      <button type="button" class="button is-close-panel" title="닫기" aria-label="음료 정보 패널 닫기">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  </li>
  <li class="ediya-menu__item">
    <a href="#" role="button" aria-haspopup="dialog" aria-pressed="false">
      <figure>
        <img src="./images/pomegranate-apple-lime.png" alt width="323" height="323" />
        <figcaption>석류 애플라임</figcaption>
      </figure>
    </a>
    <div hidden class="ediya-menu__item--detail" role="dialog" aria-modal="false" aria-labelledby=" ediya-menu__item8">
      <h3 id="ediya-menu__item8" class="ediya-menu__item--name">석류 애플라임<span lang="en">Pomegranate Apple Lime</span></h3>
      <p>산뜻한 석류에 다양한 과일과 꽃, 그리고 샴페인의 향이 더해져 보다 깊고 중후한 맛이 느껴지는 블렌딩티</p>
      <div class="ediya-menu__item--multi-column is-2">
        <dl>
          <dt>칼로리</dt>
          <dd>(220kcal)</dd>
          <dt>당류</dt>
          <dd>(42g)</dd>
          <dt>단백질</dt>
          <dd>(1g)</dd>
          <dt>포화지방</dt>
          <dd>(0.1g)</dd>
          <dt>나트륨</dt>
          <dd>(7mg)</dd>
          <dt>카페인</dt>
          <dd>(0mg)</dd>
        </dl>
      </div>
      <button type="button" class="button is-close-panel" title="닫기" aria-label="음료 정보 패널 닫기">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  </li>
  ```
</details>

<br>

## news.html

뉴스 → "언론 속 이디야" 검색 폼, 테이블, 페이지네이션 하드코딩

> 검색, 페이지 탐색, 콘텐츠 추가/수정 가능한 뉴스 테이블 관리를 위해 데이터를 분리하기 위함입니다. ([api/press.json](../api/press.json))

### 🔎 뉴스 검색 폼

<details>
  <summary>백업된 마크업 코드</summary>

  ```html
  <form class="news__press-form" action="#" method="GET">
    <fieldset>
      <legend>언론 속 이디야 검색</legend>
      <div class="press-search-container">
        <select name="newSelect" id="newsSelect" aria-label="검색 범위 선택">
          <option value="title">제목</option>
          <option value="content">내용</option>
        </select>
        <input type="search" name="newsKeyword" id="newsKeyword" class="keyword" placeholder="검색어 입력(예: 이디야)" aria-required="true" aria-label="검색어">
        <button type="submit" class="button-search" aria-label="검색">
          <span class="icon-search"></span>
        </button>
      </div>
    </fieldset>
  </form>
  ```

</details>

### 🗄 뉴스 테이블

<details>
  <summary>백업된 마크업 코드</summary>

  ```html
  <table class="news__press-table">
    <caption class="a11y-hidden">이디야 소식 안내</caption>
    <thead>
      <tr>
        <th scope="col">순서</th>
        <th scope="col">내용</th>
        <th scope="col">날짜</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>999</td>
        <td>
          <figure class="press-thumbnail">
            <img src="../images/news-thumbnail.jpg" alt="">
          </figure>
          <dl class="press-article">
            <dt data-original-text="[MTN] 이디야커피, 조각 케이크 2종 출시…디저트 강화">[MTN] 이디야커피, 조각 케이크 2종 출시…디저트...</dt>
            <dd data-original-text="이디야커피가 조각 케이크 신제품 2종과 기존 조각 케이크 3종을 리뉴얼해 출시하며 디저트 케이크 라인업을 강화">이디야커피가 조각 케이크 신제품 2종과 기존 조각 케이크 3종을 리뉴얼해 출시하며 디저트 케이크 라인업을 ...</dd>
          </dl>
        </td>
        <td><time class="press-date" datetime="2020-09-08T17:30:45">2020.09.08</time></td>
      </tr>
      <tr>
        <td>998</td>
        <td>
          <figure class="press-thumbnail">
            <img src="../images/ediya-table-thumb.jpg" alt="">
          </figure>
          <dl class="press-article">
            <dt data-original-text="[매일경제] 이디야커피, 공정거래조정원 '착한 프랜차이즈' 선정">[매일경제] 이디야커피, 공정거래조정원 '착한 프랜차...</dt>
            <dd data-original-text="이디야커피는 가맹점을 위해 상생정책을 시행한 노력을 인정받아 25일 공정거래조정원이 인증하는 `착한 프랜차이즈`에 ...">이디야커피는 가맹점을 위해 상생정책을 시행한 노력을 인정받아 25일 공정거래조정원이 인증하는 `착한 프랜차...</dd>
          </dl>
        </td>
        <td><time class="press-date" datetime="2020-09-08T17:30:45">2020.09.08</time></td>
      </tr>
      <tr>
        <td>997</td>
        <td>
          <figure class="press-thumbnail">
            <img src="../images/ediya-table-thumb.jpg" alt="">
          </figure>
          <dl class="press-article">
            <dt data-original-text="[MTN] 이디야커피, 조각 케이크 2종 출시…디저트 강화">[MTN] 이디야커피, 조각 케이크 2종 출시…디저트...</dt>
            <dd data-original-text="이디야커피가 조각 케이크 신제품 2종과 기존 조각 케이크 3종을 리뉴얼해 출시하며 디저트 케이크 라인업을 강화">이디야커피가 조각 케이크 신제품 2종과 기존 조각 케이크 3종을 리뉴얼해 출시하며 디저트 케이크 라인업을 ...</dd>
          </dl>
        </td>
        <td><time class="press-date" datetime="2020-09-08T17:30:45">2020.09.08</time></td>
      </tr>
      <tr>
        <td>996</td>
        <td>
          <figure class="press-thumbnail">
            <img src="../images/ediya-table-thumb.jpg" alt="">
          </figure>
          <dl class="press-article">
            <dt data-original-text="[매일경제] 이디야커피, 공정거래조정원 '착한 프랜차이즈' 선정">[매일경제] 이디야커피, 공정거래조정원 '착한 프랜차...</dt>
            <dd data-original-text="이디야커피는 가맹점을 위해 상생정책을 시행한 노력을 인정받아 25일 공정거래조정원이 인증하는 `착한 프랜차이즈`에 ...">이디야커피는 가맹점을 위해 상생정책을 시행한 노력을 인정받아 25일 공정거래조정원이 인증하는 `착한 프랜차...</dd>
          </dl>
        </td>
        <td><time class="press-date" datetime="2020-09-08T17:30:45">2020.09.08</time></td>
      </tr>
      <tr>
        <td>995</td>
        <td>
          <figure class="press-thumbnail">
            <img src="../images/ediya-table-thumb.jpg" alt="">
          </figure>
          <dl class="press-article">
            <dt data-original-text="[매일경제] 이디야커피, 공정거래조정원 '착한 프랜차이즈' 선정">[매일경제] 이디야커피, 공정거래조정원 '착한 프랜차...</dt>
            <dd data-original-text="이디야커피는 가맹점을 위해 상생정책을 시행한 노력을 인정받아 25일 공정거래조정원이 인증하는 `착한 프랜차이즈`에 ...">이디야커피는 가맹점을 위해 상생정책을 시행한 노력을 인정받아 25일 공정거래조정원이 인증하는 `착한 프랜차...</dd>
          </dl>
        </td>
        <td><time class="press-date" datetime="2020-09-08T17:30:45">2020.09.08</time></td>
      </tr>
    </tbody>
  </table>
  ```
</details>

### 🔢 뉴스 페이지네이션

<details>
  <summary>백업된 마크업 코드</summary>

  ```html
  <div class="pagination-container">
    <button type="button" class="button button-prev" aria-label="이전" disabled="">
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8865 10.981C21.9625 11.479 22.0005 11.99 22.0005 12.5C22.0005 18.014 17.5145 22.5 12.0005 22.5C6.48649 22.5 2.00049 18.014 2.00049 12.5C2.00049 6.986 6.48649 2.5 12.0005 2.5C15.1285 2.5 18.0175 3.923 19.9275 6.402C20.1725 6.72 20.1125 7.178 19.7955 7.422C19.4775 7.668 19.0215 7.607 18.7745 7.29C17.1435 5.169 14.6735 3.954 12.0005 3.954C7.28849 3.954 3.45449 7.787 3.45449 12.5C3.45449 17.212 7.28849 21.045 12.0005 21.045C16.7125 21.045 20.5465 17.212 20.5465 12.5C20.5465 12.063 20.5135 11.626 20.4485 11.201C20.3885 10.805 20.6605 10.434 21.0575 10.373C21.4565 10.307 21.8255 10.584 21.8865 10.981ZM9.20629 12.4992C9.20629 12.3002 9.28529 12.1092 9.42729 11.9682L12.9133 8.4972C13.2073 8.2042 13.6823 8.2052 13.9743 8.4992C14.2663 8.7932 14.2663 9.2672 13.9723 9.5592L11.0193 12.4992L13.9723 15.4392C14.2663 15.7312 14.2663 16.2062 13.9743 16.5002C13.6823 16.7932 13.2073 16.7942 12.9133 16.5022L9.42729 13.0302C9.28529 12.8902 9.20629 12.6992 9.20629 12.4992Z" fill="#0F0F0F"></path>
      </svg>
    </button>

    <ul class="pagination reset-list">
      <li><a href="#page-1" class="on _pagerNo" data-page-no="1" aria-current="page">1</a></li>
      <li><a href="#page-2" class=" _pagerNo" data-page-no="2">2</a></li>
      <li><a href="#page-3" class=" _pagerNo" data-page-no="3">3</a></li>
      <li><a href="#page-4" class=" _pagerNo" data-page-no="4">4</a></li>
      <li><a href="#page-5" class=" _pagerNo" data-page-no="5">5</a></li>
      <li><a href="#page-6" class=" _pagerNo" data-page-no="6">6</a></li>
      <li><a href="#page-7" class=" _pagerNo" data-page-no="7">7</a></li>
      <li><a href="#page-8" class=" _pagerNo" data-page-no="8">8</a></li>
      <li><a href="#page-9" class=" _pagerNo" data-page-no="9">9</a></li>
      <li><a href="#page-10" class=" _pagerNo" data-page-no="10">10</a></li>
    </ul>

    <button type="button" class="button button-next" aria-label="다음">
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4805 22.386C10.9785 22.462 11.4895 22.5 11.9995 22.5C17.5135 22.5 21.9995 18.014 21.9995 12.5C21.9995 6.986 17.5135 2.5 11.9995 2.5C6.48551 2.5 1.99951 6.986 1.99951 12.5C1.99951 15.628 3.42251 18.517 5.90151 20.427C6.21951 20.672 6.67751 20.612 6.92151 20.295C7.16751 19.977 7.10651 19.521 6.78951 19.274C4.66851 17.643 3.45351 15.173 3.45351 12.5C3.45351 7.788 7.28651 3.954 11.9995 3.954C16.7115 3.954 20.5445 7.788 20.5445 12.5C20.5445 17.212 16.7115 21.046 11.9995 21.046C11.5625 21.046 11.1255 21.013 10.7005 20.948C10.3045 20.888 9.93351 21.16 9.87251 21.557C9.80651 21.956 10.0835 22.325 10.4805 22.386ZM14.7937 12.4992C14.7937 12.3002 14.7147 12.1092 14.5727 11.9682L11.0867 8.49719C10.7927 8.20419 10.3177 8.20519 10.0257 8.49919C9.73369 8.79319 9.73369 9.26719 10.0277 9.55919L12.9807 12.4992L10.0277 15.4392C9.73369 15.7312 9.73369 16.2062 10.0257 16.5002C10.3177 16.7932 10.7927 16.7942 11.0867 16.5022L14.5727 13.0302C14.7147 12.8902 14.7937 12.6992 14.7937 12.4992Z" fill="#0F0F0F"></path>
      </svg>
    </button>
  </div>
  ```
</details>

<br>

## GoToTop 버튼

페이지 상단 이동 버튼 하드코딩

> 매 페이지 마다 반복 추가된 정적 마크업 대신, 효율적 관리를 위해 스크립트로 동적 관리합니다.

<details>
  <summary>백업된 마크업 코드</summary>

  ```html
  <button type="button" class="button-goToTop is--active">
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      <title>페이지 상단 이동</title>
      <circle cx="25" cy="25" r="25" fill="#C8CDE2"></circle>
      <path d="M25 38C25.6072 38 26.1 37.5147 26.1 36.9167V15.3047L34.1037 23.5803C34.3198 23.804 34.6097 23.9167 34.9001 23.9167C35.1723 23.9167 35.4457 23.8175 35.6585 23.6177C36.0985 23.2049 36.1156 22.5192 35.6965 22.0858L26.556 12.6348C26.1402 12.2259 25.588 12 25 12C24.412 12 23.8598 12.2259 23.4259 12.6538L14.3035 22.0864C13.8844 22.5197 13.9015 23.2055 14.3415 23.6182C14.7815 24.031 15.4783 24.0142 15.8969 23.5808L23.9 15.2706V36.9167C23.9 37.5147 24.3928 38 25 38Z" fill="#0F0F0F"></path>
    </svg>
  </button>
  ```
</details>