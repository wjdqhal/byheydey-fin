document.addEventListener('DOMContentLoaded', () => {
            // [수정] 메인 메뉴 및 서브메뉴 클릭 시 포커스 해제 (텍스트/메뉴가 남아있는 문제 해결)
            const allNavLinks = document.querySelectorAll('.main-menu a, .sub-menu a, .header-wrap a');
            // ※ 만약 네비게이션 선택자명이 다르다면 상단 헤더 영역 전체의 a 태그를 지정하는 'header a' 등으로 변경하셔도 됩니다.

            allNavLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    // 아직 링크(href) 연결을 안 했거나 '#'일 경우 페이지 최상단으로 튕기는 현상 방지
                    const href = link.getAttribute('href');
                    if (!href || href === '#' || href === '') {
                        e.preventDefault();
                    }

                    // 클릭 직후 포커스(Focus) 상태를 즉시 해제하여 잔상이 남지 않게 함
                    link.blur();
                });
            });

            // 파트너 탭/슬라이더 로직
            const partnerTabButtons = document.querySelectorAll('.partner-tab button');
            const partnerTabLists = document.querySelectorAll('.partner-wrap .partner-slider-track > ul');

            let partnerInterval = null;
            let partnerCurrentIndex = 0;
            let isPartnerTransitioning = false;

            function initPartnerSlider() {
                if (partnerInterval) clearInterval(partnerInterval);

                const activeList = document.querySelector('.partner-wrap .partner-slider-track > ul.active');
                if (!activeList) return;

                if (window.innerWidth > 1279) {
                    activeList.querySelectorAll('.clone').forEach(el => el.remove());
                    activeList.style.transform = 'none';
                    activeList.style.transition = 'none';
                    return;
                }

                activeList.querySelectorAll('.clone').forEach(el => el.remove());

                const originalItems = Array.from(activeList.querySelectorAll('li:not(.clone)'));
                if (originalItems.length === 0) return;

                originalItems.forEach(item => {
                    const clone = item.cloneNode(true);
                    clone.classList.add('clone');
                    activeList.appendChild(clone);
                });

                partnerCurrentIndex = 0;
                updatePartnerSlidePosition(activeList, false);

                partnerInterval = setInterval(() => {
                    slideNextPartner(activeList, originalItems.length);
                }, 2000);
            }

            function updatePartnerSlidePosition(list, animate = true) {
                const item = list.querySelector('li');
                if (!item) return;

                const itemWidth = item.offsetWidth;
                const gap = 16;
                const moveDistance = (itemWidth + gap) * partnerCurrentIndex;

                list.style.transition = animate ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
                list.style.transform = `translateX(-${moveDistance}px)`;
            }

            function slideNextPartner(list, originalCount) {
                if (isPartnerTransitioning) return;
                isPartnerTransitioning = true;

                partnerCurrentIndex++;
                updatePartnerSlidePosition(list, true);

                setTimeout(() => {
                    if (partnerCurrentIndex >= originalCount) {
                        partnerCurrentIndex = 0;
                        updatePartnerSlidePosition(list, false);
                    }
                    isPartnerTransitioning = false;
                }, 400);
            }

            partnerTabButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const targetTab = e.currentTarget.getAttribute('data-tab');

                    partnerTabButtons.forEach(btn => btn.parentElement.classList.remove('active'));
                    e.currentTarget.parentElement.classList.add('active');

                    partnerTabLists.forEach(list => {
                        list.classList.remove('active');
                        list.style.transform = 'none';
                    });

                    const activeList = document.querySelector(`.partner-wrap .partner-slider-track .${targetTab}-list`);
                    if (activeList) {
                        activeList.classList.add('active');
                        initPartnerSlider();
                    }
                });
            });

            initPartnerSlider();
            window.addEventListener('resize', initPartnerSlider);
        });

        // 앱 슬라이더 로직
        const appTrack = document.getElementById('appTrack');
        let appInterval = null;
        let appIndex = 0;

        function initAppSlider() {
            if (appInterval) clearInterval(appInterval);
            if (!appTrack) return;

            function autoSlideApp() {
                if (window.innerWidth <= 1279) {
                    const totalCards = appTrack.querySelectorAll('.phone-card').length;
                    appIndex++;

                    if (appIndex > totalCards - 2) {
                        appIndex = 0;
                    }

                    const percentage = appIndex * 50;
                    const gapOffset = appIndex * 10;
                    appTrack.style.transform = `translateX(calc(-${percentage}% - ${gapOffset}px))`;
                } else {
                    appTrack.style.transform = 'translateX(0)';
                    appIndex = 0;
                }
            }

            appInterval = setInterval(autoSlideApp, 2000);
        }

        initAppSlider();



        //search modal
        const searchModal = document.querySelector('.search-modal');
        const searchOpenBtns = document.querySelectorAll('.search-open');
        const searchCloseBtn = document.querySelector('.search-close');


        // 열기
        searchOpenBtns.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();

                searchModal.classList.add('active');
                searchModal.setAttribute('aria-hidden', 'false');
            });
        });


        // 닫기 버튼
        searchCloseBtn.addEventListener('click', function () {
            searchModal.classList.remove('active');
            searchModal.setAttribute('aria-hidden', 'true');
        });


        // 배경 클릭
        searchModal.addEventListener('click', function (e) {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
                searchModal.setAttribute('aria-hidden', 'true');
            }
        });

        // floating buttons
        const topBtn = document.querySelector('.top-btn');
        const chatbotBtn = document.querySelector('.chatbot-btn');
        const chatbotPanel = document.querySelector('.chatbot-panel');
        const chatbotClose = document.querySelector('.chatbot-close');
        const chatbotForm = document.querySelector('.chatbot-form');
        const chatbotInput = chatbotForm.querySelector('input');

        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        chatbotBtn.addEventListener('click', () => {
            const isOpen = chatbotPanel.classList.toggle('is-open');
            chatbotBtn.setAttribute('aria-expanded', String(isOpen));
            chatbotPanel.setAttribute('aria-hidden', String(!isOpen));
            if (isOpen) setTimeout(() => chatbotInput.focus(), 200);
        });

        chatbotClose.addEventListener('click', () => {
            chatbotPanel.classList.remove('is-open');
            chatbotBtn.setAttribute('aria-expanded', 'false');
            chatbotPanel.setAttribute('aria-hidden', 'true');
        });

        chatbotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = chatbotInput.value.trim();
            if (!message) return;
            const reply = document.createElement('p');
            reply.className = 'chatbot-message chatbot-message-user';
            reply.textContent = message;
            chatbotForm.insertAdjacentElement('beforebegin', reply);
            chatbotInput.value = '';
        });


        window.addEventListener('resize', () => {
            initAppSlider();
        });

        //ham-btn
        let bgHam = document.querySelector(".ham");
        let menu = document.querySelector("nav");
        bgHam.addEventListener("click", () => {
            menu.classList.add("active");
            document.body.classList.add("menu-open");
        })

        let closeBtn = document.querySelector(".hamClose");
        closeBtn.addEventListener("click", () => {
            menu.classList.remove("active");
            document.body.classList.remove("menu-open");
        })


        // tablet / mobile accordion menu
        const mainMenuItems = document.querySelectorAll(".main-menu > li");
        const subMenuItems = document.querySelectorAll(".sub-list > li");

        mainMenuItems.forEach((item) => {
            const link = item.querySelector(":scope > a");
            const subList = item.querySelector(":scope > .sub-list");

            // sub-list가 있는 메뉴만 클릭 이벤트 적용
            if (!subList) return;

            link.addEventListener("click", (e) => {

                // PC에서는 기존 hover 방식 유지
                if (window.innerWidth > 1279) return;

                e.preventDefault();

                const isActive = item.classList.contains("active");

                // 다른 1depth 닫기
                mainMenuItems.forEach((menuItem) => {
                    menuItem.classList.remove("active");

                    const menuLink = menuItem.querySelector(":scope > a");
                    if (menuLink) {
                        menuLink.setAttribute("aria-expanded", "false");
                    }
                });

                // 다시 클릭하면 닫기
                if (!isActive) {
                    item.classList.add("active");
                    link.setAttribute("aria-expanded", "true");
                }
            });
        });

        subMenuItems.forEach((item) => {
            const link = item.querySelector(":scope > a");
            const depth = item.querySelector(":scope > .depth");

            // depth가 없는 메뉴는 그냥 링크로 사용
            if (!depth) return;

            link.addEventListener("click", (e) => {

                // 모바일에서만 depth accordion
                if (window.innerWidth > 767) return;

                e.preventDefault();

                const isActive = item.classList.contains("active");

                // 같은 sub-list 안의 다른 depth 닫기
                item.parentElement.querySelectorAll(":scope > li").forEach((subItem) => {
                    subItem.classList.remove("active");
                });

                if (!isActive) {
                    item.classList.add("active");
                }
            });
        });