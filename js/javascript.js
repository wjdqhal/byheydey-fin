

//    상품 이미지


const thumbnails = document.querySelectorAll(".thumb");
const mainImage = document.querySelector(".main-image img");
const paginationDots = document.querySelectorAll(".image-pagination span");

function changeImage(index) {
    const thumbnailImage = thumbnails[index].querySelector("img");

    // 메인 이미지 변경
    mainImage.src = thumbnailImage.src;
    mainImage.alt = thumbnailImage.alt;

    // 썸네일 active 초기화
    thumbnails.forEach((item) => {
        item.classList.remove("active");
    });

    // 페이지네이션 active 초기화
    paginationDots.forEach((dot) => {
        dot.classList.remove("active");
    });

    // 현재 선택된 썸네일 active
    thumbnails[index].classList.add("active");

    // 현재 선택된 페이지네이션 active
    if (paginationDots[index]) {
        paginationDots[index].classList.add("active");
    }
}


// 썸네일 클릭

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
        changeImage(index);
    });
});



//    수량 증가 / 감소


const minusBtn = document.querySelector(".minus-btn");
const plusBtn = document.querySelector(".plus-btn");
const quantityNumber = document.querySelector(".quantity-number");
const totalPrice = document.querySelector(".total-price strong");
const price = 850000;
let quantity = Number(quantityNumber.textContent);


// 가격 업데이트 함수
function updatePrice() {
    const total = price * quantity;

    quantityNumber.textContent = quantity;
    totalPrice.textContent = total.toLocaleString() + "원";
}
// + 버튼
plusBtn.addEventListener("click", () => {
    quantity++;
    updatePrice();
});
// - 버튼
minusBtn.addEventListener("click", () => {
    if (quantity > 0) {
        quantity--;
        updatePrice();
    }
});
// 수량 증가

// plusBtn.addEventListener("click", () => {
//     quantity++;
//     quantityNumber.textContent = quantity;
// });


// 수량 감소

minusBtn.addEventListener("click", () => {
    if (quantity > 0) {
        quantity--;
        quantityNumber.textContent = quantity;
    }
});



