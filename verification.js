/* -------------------------------------------------------------
 * Fukuoka Travel Web App - Verification & Test Suite
 * Run by appending ?test=true to the URL in the browser.
 * ------------------------------------------------------------- */

(function() {
    // Check if test mode is enabled in query params
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('test')) {
        return;
    }

    console.log("%c✈️ Fukuoka Travel Guide Test Runner Initiated ✈️", "color: #4CAF50; font-weight: bold; font-size: 14px;");

    // Helper to log test groups
    function group(name, fn) {
        console.group(`%c▶ ${name}`, "color: #2196F3; font-weight: bold;");
        try {
            fn();
        } catch (e) {
            console.error("Test group failed with error:", e);
        }
        console.groupEnd();
    }

    // Helper for assertions
    function assert(condition, message) {
        if (condition) {
            console.log(`%c[PASS] ${message}`, "color: #4CAF50;");
            return true;
        } else {
            console.error(`[FAIL] ${message}`);
            return false;
        }
    }

    window.addEventListener('load', () => {
        // Run tests after DOM is fully loaded and initialized
        setTimeout(runTests, 1000);
    });

    function runTests() {
        // Test 1: SPOTS_DATA DB Integrity
        group("Database (SPOTS_DATA) Integrity Tests", () => {
            assert(typeof SPOTS_DATA !== 'undefined', "SPOTS_DATA database is defined");
            const keys = Object.keys(SPOTS_DATA);
            assert(keys.length > 0, `Database has ${keys.length} spots`);
            
            keys.forEach(key => {
                const spot = SPOTS_DATA[key];
                assert(!!spot.name, `Spot '${key}' has a name: "${spot.name}"`);
                assert(!!spot.category, `Spot '${key}' has a category: "${spot.category}"`);
                assert(['cafe', 'beauty', 'food'].includes(spot.category), `Spot '${key}' category "${spot.category}" is valid`);
                assert(!!spot.menu, `Spot '${key}' has a menu highlighted`);
                assert(!!spot.desc, `Spot '${key}' has a description`);
                assert(!!spot.gmap, `Spot '${key}' has a Google Maps link`);
            });
        });

        // Test 2: HTML Map Pins Consistency
        group("HTML Marker & DOM Connection Tests", () => {
            const markers = document.querySelectorAll('.pin-marker');
            assert(markers.length > 0, `Found ${markers.length} pin markers on the map`);
            
            markers.forEach(marker => {
                const spotId = marker.getAttribute('data-spot');
                assert(!!spotId, "Marker has a [data-spot] attribute");
                assert(!!SPOTS_DATA[spotId], `Marker [data-spot="${spotId}"] matches a spot in SPOTS_DATA database`);
            });
        });

        // Test 3: Interactive Clicking of Pins & Popup Card Card Content
        group("Interactive Spot Popup Card Test", () => {
            const card = document.getElementById('spotDetailCard');
            assert(card.classList.contains('hidden'), "Spot detail card is hidden initially");

            // Click the first pin
            const firstPin = document.querySelector('.pin-marker');
            if (firstPin) {
                const spotId = firstPin.getAttribute('data-spot');
                const data = SPOTS_DATA[spotId];
                
                firstPin.click();
                
                assert(!card.classList.contains('hidden'), "Clicking pin opens the detail card (removes 'hidden' class)");
                
                const cardName = document.getElementById('spotName').textContent;
                assert(cardName === data.name, `Popup displays correct name: Expected "${data.name}", got "${cardName}"`);
                
                const closeBtn = document.getElementById('closeSpotCardBtn');
                if (closeBtn) {
                    closeBtn.click();
                    assert(card.classList.contains('hidden'), "Clicking close button hides the detail card again");
                }
            } else {
                console.warn("Skipping pin click test: no markers found.");
            }
        });

        // Test 4: Tab Switching Mechanics
        group("Itinerary Day Tab Switching Tests", () => {
            const tabBtns = document.querySelectorAll('.tab-btn');
            const dayPlans = document.querySelectorAll('.day-plan');
            
            if (tabBtns.length >= 3) {
                // Click Day 2 Tab
                const day2Tab = Array.from(tabBtns).find(btn => btn.getAttribute('data-day') === 'day2');
                if (day2Tab) {
                    day2Tab.click();
                    assert(day2Tab.classList.contains('active'), "Day 2 tab is now active");
                    
                    const day2Plan = document.getElementById('plan-day2');
                    assert(day2Plan.classList.contains('active'), "Day 2 plan container is active and visible");
                    
                    // Reset to Day 1
                    const day1Tab = Array.from(tabBtns).find(btn => btn.getAttribute('data-day') === 'day1');
                    if (day1Tab) day1Tab.click();
                }
            } else {
                console.warn("Skipping Tab switching tests: missing day tab buttons.");
            }
        });

        // Test 5: Category Filters Functionality
        group("Category Filtering Logic Tests", () => {
            const foodFilterBtn = Array.from(document.querySelectorAll('.filter-btn'))
                                       .find(btn => btn.getAttribute('data-filter') === 'food');
            
            if (foodFilterBtn) {
                foodFilterBtn.click();
                assert(foodFilterBtn.classList.contains('active'), "Food filter button is now active");

                // Check that only food pins are shown
                const pins = document.querySelectorAll('.pin-marker');
                let allCorrect = true;
                pins.forEach(pin => {
                    const spotId = pin.getAttribute('data-spot');
                    const data = SPOTS_DATA[spotId];
                    const isVisible = pin.style.display !== 'none';
                    if (data.category === 'food') {
                        if (!isVisible) allCorrect = false;
                    } else {
                        if (isVisible) allCorrect = false;
                    }
                });
                assert(allCorrect, "Filter correctly hides non-food pins and keeps food pins visible");

                // Reset filter to 'all'
                const allFilterBtn = Array.from(document.querySelectorAll('.filter-btn'))
                                          .find(btn => btn.getAttribute('data-filter') === 'all');
                if (allFilterBtn) allFilterBtn.click();
            } else {
                console.warn("Skipping Filter tests: food filter button not found.");
            }
        });

        console.log("%c🏁 Test Run Completed! Check details above. 🏁", "color: #4CAF50; font-weight: bold; font-size: 12px;");
    }
})();
