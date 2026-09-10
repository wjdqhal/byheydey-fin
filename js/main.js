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

        //main-slider 
        var mainswiper = new Swiper('.main-slider', {
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        // best
        var swiper = new Swiper('.best', {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },

            slidesPerView: 2,
            spaceBetween: 12,
            centeredSlides: false,

            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 18,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
                1400: {
                    slidesPerView: 5,
                    spaceBetween: 36,
                },
            },
        });

        //clubmovement
        var swiper = new Swiper('.clubmovement-list-wrap', {
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            centeredSlides: false,
            loop: true,
            breakpoints: {
                1279: {
                    slidesPerView: 5,
                    spaceBetween: 35,
                    centeredSlides: false,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    centeredSlides: false,
                },
                0: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    centeredSlides: false,
                },
            },
        });


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



        //header scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            const threshold = 100;

            if (window.scrollY > threshold) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
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