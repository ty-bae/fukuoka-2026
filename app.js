/* -------------------------------------------------------------
 * Fukuoka Travel Web App - JavaScript Interactive Logic
 * ES6+ Vanilla JS
 * ------------------------------------------------------------- */

// Spots Database
const SPOTS_DATA = {
    ropponmatsu: {
        name: "마츠빵 & 커피맨",
        category: "cafe",
        desc: "롯폰마츠 골목에 붙어있는 두 가게의 환상적인 콜라보. 마츠빵에서 쫀득한 소금빵이나 달콤한 연유빵을 산 뒤 바로 옆 커피맨 매장에 들어가 라떼를 주문해보세요. 현지인들이 아침을 여는 소박하고 힙한 분위기입니다.",
        menu: "소금빵, 연유빵 & 아이스 카페 라떼",
        image: "assets/latte_and_bread.png",
        day: "Day 2 (오전)",
        gmap: "https://maps.google.com/?q=Matsupang+Fukuoka"
    },
    nishinakasu: {
        name: "팡 스톡 & 커피 카운티 니시나카스점",
        category: "cafe",
        desc: "후쿠오카의 3대 명물 베이커리인 '팡 스톡'과 구루메의 스페셜티 로스터리 '커피 카운티'가 협업한 플래그십 매장입니다. 고소함의 극치인 라떼와 명란 바게트의 조합은 후쿠오카 최고라 할 수 있습니다.",
        menu: "명란 바게트(멘타이 프랑스) & 고소한 카페 라떼",
        image: "assets/latte_and_bread.png",
        day: "Day 1 (오후) / Day 3 (오전)",
        gmap: "https://maps.google.com/?q=pain+stock+Nishinakasu"
    },
    akasaka: {
        name: "비오톱 후쿠오카 (BIOTOP FUKUOKA)",
        category: "beauty",
        desc: "가드닝 숍과 세계적인 디자이너 의류, 그리고 오가닉 뷰티 스토어가 결합된 복합 라이프스타일 숍입니다. 이솝, 딥티크를 비롯하여 현지에서 인기 있는 오가닉 스킨케어 브랜드를 조용하게 둘러보기 최적입니다.",
        menu: "니치 스킨케어, 오가닉 화장품 & 바디 밤",
        image: "assets/fukuoka_travel_map.png", // Fallback to map illustration
        day: "Day 2 (오전)",
        gmap: "https://maps.google.com/?q=BIOTOP+FUKUOKA"
    },
    takasago: {
        name: "굿 업 커피 (Good up Coffee)",
        category: "cafe",
        desc: "야쿠인 남쪽 타카사고 골목의 감성 가득한 아주 작은 동네 카페입니다. 인스타를 달군 바삭하고 짭조름달콤한 '앙버터 토스트'와 바리스타의 정성이 깃든 쫀쫀한 밀크 폼 라떼의 조화가 예술입니다.",
        menu: "앙버터 토스트 & 시그니처 카페 라떼",
        image: "assets/latte_and_bread.png",
        day: "Day 2 (오후)",
        gmap: "https://maps.google.com/?q=Good+up+Coffee+Fukuoka"
    },
    ainz_tulpe: {
        name: "아인즈&토르페 텐진 니시도리점",
        category: "beauty",
        desc: "텐진 최대 규모의 2층 코스메틱 전문 숍입니다. CANMAKE, KATE, CEZANNE, EXCEL 등 일본 현지의 모든 프치프라(저가/고성능) 드럭스토어 화장품 브랜드를 직접 테스트하고 비교 구매할 수 있습니다.",
        menu: "일본 인기 드럭스토어 화장품 & 메이크업 툴",
        image: "assets/fukuoka_travel_map.png",
        day: "Day 2 (오후)",
        gmap: "https://maps.google.com/?q=Ainz+%26+Tulpe+Fukuoka+Tenjin"
    },
    iwataya: {
        name: "이와타야 백화점 본점",
        category: "beauty",
        desc: "본관 1층에 텐진 유일의 '메이크업 포에버' 매장이 입점해 있습니다. 그 외에도 RMK, SUQQU, THREE, 코스메 데코르테 등 프로 뷰티 어드바이저들의 전문 상담과 테스팅을 제공하는 백화점 브랜드들이 집결해 있습니다.",
        menu: "메이크업 포에버, RMK, SUQQU 및 면세 혜택",
        image: "assets/fukuoka_travel_map.png",
        day: "Day 2 (오후)",
        gmap: "https://maps.google.com/?q=Iwataya+Main+Store"
    },
    cosmeteria: {
        name: "코스메테리아 (솔라리아 스테이지)",
        category: "beauty",
        desc: "KOSE 계열의 뷰티 전문 편집숍입니다. 코스메 데코르테, 어딕션(Addiction), 질 스튜어트 등 국내외 뷰티 매니아들이 사랑하는 중고가 메이크업 브랜드를 번잡한 백화점 매장 밖에서 한 곳에 비교하며 테스트하기 좋은 공간입니다.",
        menu: "어딕션 아이섀도우, 질 스튜어트 블러셔",
        image: "assets/fukuoka_travel_map.png",
        day: "Day 2 (오후)",
        gmap: "https://maps.google.com/?q=Cosmeteria+Solaria+Stage"
    },
    ikke_haruyoshi: {
        name: "모츠나베 이케이 하루요시 본점",
        category: "food",
        desc: "국산 와규의 신선한 소창만을 엄선하여 특유의 잡내가 전혀 없는 깔끔한 국물 맛을 자랑합니다. 숯불에 초벌 구이한 구운 모츠나베가 시그니처이며, 텐진남역과 나카스 주변에서 현지인들이 줄 서는 진짜 로컬 맛집입니다.",
        menu: "구운 모츠나베 (쇼유 베이스) & 시메 짬뽕면",
        image: "assets/latte_and_bread.png",
        day: "Day 2 (저녁 - 예약필수)",
        gmap: "https://maps.google.com/?q=motsunabe+Ikkei+Haruyoshi"
    },
    yatai: {
        name: "나카스 야타이(포장마차) 거리",
        category: "food",
        desc: "나카강을 끼고 쭉 늘어선 후쿠오카의 대표 명물 포장마차들입니다. 명란 구이, 명란 치즈 계란말이, 돼지꼬치 구이와 따뜻한 도톤보리식 오뎅에 시원한 나마비루(생맥주)를 곁들이며 강변 야경과 정취를 느낄 수 있습니다. (카드 사용 불가, 현금 필수)",
        menu: "명란 계란말이, 하카타 라멘, 야키토리 & 나마비루",
        image: "assets/latte_and_bread.png",
        day: "Day 1 (저녁)",
        gmap: "https://maps.google.com/?q=Nakasu+Yatai+Street"
    },
    rakutenti: {
        name: "원조 모츠나베 라쿠텐치 텐진 총본점",
        category: "food",
        desc: "48년 전통의 하카타 모츠나베 원조 브랜드입니다. 산더미처럼 쌓아 올린 부추와 6가지 국산 내장을 특제 비전 간장 수프에 끓여 먹습니다. 양이 아주 푸짐하고 가격이 합리적이며 텐진역 바로 옆이라 접근성이 뛰어납니다.",
        menu: "원조 모츠나베 & 시메 짬뽕면 사리",
        image: "assets/latte_and_bread.png",
        day: "Day 2 (저녁 대안)",
        gmap: "https://maps.google.com/?q=Rakutenti+Tenjin+Sohonten"
    },
    nooice: {
        name: "NOOICE tenjin (호주 스타일 브런치)",
        category: "cafe",
        desc: "호주 멜버른 스타일의 감각적인 브런치 전문점으로, 아내의 추억이 담긴 현지 힐링 푸드를 제공합니다. 달콤하고 바삭하게 구워낸 브뤼레 팬케이크와 고소한 플랫 화이트 라떼가 최고 인기를 끄는 감성 넘치는 곳입니다.",
        menu: "브뤼레 팬케이크, 아보카도 토스트 & 플랫 화이트",
        image: "assets/latte_and_bread.png",
        day: "Day 2 (오전 브런치)",
        gmap: "https://maps.google.com/?q=NOOICE+tenjin"
    },
    oyama_hakata: {
        name: "모츠나베 오야마 KITTE博多점",
        category: "food",
        desc: "진하고 고소한 규슈 미소(된장) 베이스의 모츠나베로 유명한 유명 브랜드입니다. 하카타역과 바로 연결되는 KITTE 빌딩 9층에 위치하여 출국 직전 점심 식사로 이상적입니다. 전 좌석 개별실/칸막이 구조라 조용히 식사할 수 있습니다.",
        menu: "미소 모츠나베 정식 & 하카타 한입 교자",
        image: "assets/latte_and_bread.png",
        day: "Day 3 (점심)",
        gmap: "https://maps.google.com/?q=Motsunabe+Ooyama+KITTE+Hakata"
    },
    hachibei_tenjin: {
        name: "焼とりの八兵衛 天神店 (야키토리 하치베에)",
        category: "food",
        desc: "하카타식 야키토리의 대명사입니다. 엄선된 닭고기 꼬치와 일본 현지인들이 필수로 주문하는 고소한 삼겹살 꼬치(豚バラ)를 맛볼 수 있습니다. 트렌디한 인테리어와 활기찬 로컬 맛집 분위기입니다.",
        menu: "하카타 삼겹살 꼬치, 츠쿠네 & 시원한 생맥주",
        image: "assets/latte_and_bread.png",
        day: "Day 2 (저녁 후보 - 예약필수)",
        gmap: "https://maps.google.com/?q=Yakitori+Hachibei+Tenjin"
    },
    toriden_yakuin: {
        name: "博多水炊き とり田 薬院本店 (토리덴 미즈타키)",
        category: "food",
        desc: "후쿠오카의 3대 명물 요리 중 하나인 미즈타키(닭 전골) 전문점입니다. 오랜 시간 푹 고아낸 뽀얗고 진한 닭 육수에 신선한 닭고기와 야채를 넣어 먹는 보양식으로, 커플 여행에 추천하는 깔끔한 분위기입니다.",
        menu: "미즈타키 코스, 닭고기 가라아게 & 사케",
        image: "assets/latte_and_bread.png",
        day: "Day 2 (저녁 후보 - 예약권장)",
        gmap: "https://maps.google.com/?q=Toriden+Yakuin"
    },
    bakuro_yakuin: {
        name: "焼肉バクロ 薬院本店 (야키니쿠 바쿠로)",
        category: "food",
        desc: "가고시마현 목장 직영 와규 전문 야키니쿠 맛집입니다. 최상급 흑우의 다양한 부위를 직화 구이로 가성비 있게 즐길 수 있어, 후쿠오카 현지 젊은 커플들에게 압도적인 지지를 받는 세련된 고깃집입니다.",
        menu: "바쿠로 와규 모듬 세트, 우설 구이 & 와인",
        image: "assets/latte_and_bread.png",
        day: "Day 2 (저녁 후보 - 예약권장)",
        gmap: "https://maps.google.com/?q=Yakiniku+Bakuro+Yakuin"
    },
    hyotan_sushi: {
        name: "ひょうたん寿司 본점 (효탄스시)",
        category: "food",
        desc: "텐진 한복판에 위치한 현지 최고 인기 대중 스시집입니다. 두툼하고 신선한 제철 생선 초밥과 바삭한 게살 크로켓이 명물입니다. 인터넷 예약이 불가능하며, 늘 긴 대기 행렬이 이어지는 로컬 대표 맛집입니다.",
        menu: "특선 모듬 스시 세트, 게살 크로켓 & 하이볼",
        image: "assets/latte_and_bread.png",
        day: "Day 2 (점심/저녁 후보 - 예약불가)",
        gmap: "https://maps.google.com/?q=Hyotan+Sushi+Fukuoka"
    }
};

// DOM Elements
const pinMarkers = document.querySelectorAll('.pin-marker');
const spotCard = document.getElementById('spotDetailCard');
const closeSpotBtn = document.getElementById('closeSpotCardBtn');
const spotName = document.getElementById('spotName');
const spotCategory = document.getElementById('spotCategory');
const spotMenuText = document.getElementById('spotMenuText');
const spotDesc = document.getElementById('spotDesc');
const spotImg = document.getElementById('spotImg');
const spotDayBadge = document.getElementById('spotDayBadge');
const spotMapLink = document.getElementById('spotMapLink');

const tabBtns = document.querySelectorAll('.tab-btn');
const dayPlans = document.querySelectorAll('.day-plan');

const filterBtns = document.querySelectorAll('.filter-btn');
const timelineItems = document.querySelectorAll('.timeline-item');

const calcToggleBtn = document.getElementById('calcToggleBtn');
const calcCard = document.getElementById('exchangeCalcCard');
const closeCalcBtn = document.getElementById('closeCalcBtn');
const jpyInput = document.getElementById('jpyInput');
const krwInput = document.getElementById('krwInput');

const checklistToggleBtn = document.getElementById('checklistToggleBtn');
const checklistCard = document.getElementById('travelChecklistCard');
const closeChecklistBtn = document.getElementById('closeChecklistBtn');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    setupMapPins();
    setupTabs();
    setupFilters();
    setupCalc();
    setupChecklists();
    restoreSavedState();
});

// 1. Interactive Map Pins Setup
function setupMapPins() {
    pinMarkers.forEach(pin => {
        pin.addEventListener('click', () => {
            const spotId = pin.getAttribute('data-spot');
            const data = SPOTS_DATA[spotId];
            if (!data) return;

            // Fill card details
            spotName.textContent = data.name;
            
            if (data.category === 'cafe') {
                spotCategory.textContent = 'Cafe & Bread';
                spotCategory.className = 'spot-category tag-cafe';
            } else if (data.category === 'beauty') {
                spotCategory.textContent = 'Beauty & Spa';
                spotCategory.className = 'spot-category tag-beauty';
            } else if (data.category === 'food') {
                spotCategory.textContent = 'Food & Restaurant';
                spotCategory.className = 'spot-category tag-food';
            }
            
            spotMenuText.textContent = data.menu;
            spotDesc.textContent = data.desc;
            spotImg.src = data.image;
            spotImg.alt = data.name;
            spotDayBadge.textContent = data.day;
            spotMapLink.href = data.gmap;

            // Show Card
            spotCard.classList.remove('hidden');
            
            // Scroll to the card smoothly
            spotCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });

    closeSpotBtn.addEventListener('click', () => {
        spotCard.classList.add('hidden');
    });
}

// 2. Day-by-Day Tabs Setup
function setupTabs() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetDay = btn.getAttribute('data-day');
            
            // Toggle active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle active plan
            dayPlans.forEach(plan => {
                plan.classList.remove('active');
                if (plan.id === `plan-${targetDay}`) {
                    plan.classList.add('active');
                }
            });

            // Re-apply filters on tab change if active
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            applyFilter(activeFilter);
        });
    });
}

// 3. Smart Filters Setup
function setupFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            applyFilter(filterValue);
        });
    });
}

function applyFilter(filter) {
    // Filter timeline items
    timelineItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || !cat || cat === filter) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });

    // Filter map pins
    pinMarkers.forEach(pin => {
        const spotId = pin.getAttribute('data-spot');
        const data = SPOTS_DATA[spotId];
        if (filter === 'all' || (data && data.category === filter)) {
            pin.style.display = 'flex';
        } else {
            pin.style.display = 'none';
        }
    });
}

// 4. Exchange Calculator Setup (100 JPY = 900 KRW)
function setupCalc() {
    calcToggleBtn.addEventListener('click', () => {
        calcCard.classList.toggle('hidden');
        if (!calcCard.classList.contains('hidden')) {
            jpyInput.focus();
        }
    });

    closeCalcBtn.addEventListener('click', () => {
        calcCard.classList.add('hidden');
    });

    // Convert JPY to KRW
    jpyInput.addEventListener('input', () => {
        const jpy = parseFloat(jpyInput.value);
        if (isNaN(jpy) || jpy <= 0) {
            krwInput.value = '';
            return;
        }
        krwInput.value = Math.round(jpy * 9); // 1 JPY = 9 KRW
    });

    // Convert KRW to JPY
    krwInput.addEventListener('input', () => {
        const krw = parseFloat(krwInput.value);
        if (isNaN(krw) || krw <= 0) {
            jpyInput.value = '';
            return;
        }
        jpyInput.value = Math.round(krw / 9);
    });
}

// 5. Checklist Modals & State Preservation
function setupChecklists() {
    // Toggle Checklist Card
    checklistToggleBtn.addEventListener('click', () => {
        checklistCard.classList.toggle('hidden');
    });

    closeChecklistBtn.addEventListener('click', () => {
        checklistCard.classList.add('hidden');
    });

    // Listen to checklists & save state
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Apply visual checked style if timeline item
            const timelineItem = checkbox.closest('.timeline-item');
            if (timelineItem) {
                if (checkbox.checked) {
                    timelineItem.classList.add('checked');
                } else {
                    timelineItem.classList.remove('checked');
                }
            }
            saveState();
        });
    });

    // Setup "View on Map" shortcut buttons inside timeline
    const mapShortcutBtns = document.querySelectorAll('.view-on-map-btn');
    mapShortcutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const spotId = btn.getAttribute('data-spot');
            const matchingPin = document.querySelector(`.pin-marker[data-spot="${spotId}"]`);
            if (matchingPin) {
                // Scroll map into view
                document.querySelector('.map-section').scrollIntoView({ behavior: 'smooth' });
                // Trigger pin click
                setTimeout(() => {
                    matchingPin.click();
                }, 400);
            }
        });
    });
}

// Save all check states in LocalStorage
function saveState() {
    const checkState = {};
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach(chk => {
        checkState[chk.id] = chk.checked;
    });
    localStorage.setItem('fukuoka_checklist_state', JSON.stringify(checkState));
}

// Restore check states from LocalStorage
function restoreSavedState() {
    const saved = localStorage.getItem('fukuoka_checklist_state');
    if (!saved) return;
    
    try {
        const checkState = JSON.parse(saved);
        for (const id in checkState) {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = checkState[id];
                // Apply visual checked style to timeline content
                const timelineItem = checkbox.closest('.timeline-item');
                if (timelineItem && checkbox.checked) {
                    timelineItem.classList.add('checked');
                }
            }
        }
    } catch (e) {
        console.error('Failed to restore checklist state:', e);
    }
}
