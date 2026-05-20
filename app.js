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
            spotCategory.textContent = data.category === 'cafe' ? 'Cafe & Bread' : 'Beauty & Spa';
            spotCategory.className = `spot-category ${data.category === 'cafe' ? 'tag-cafe' : 'tag-beauty'}`;
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
