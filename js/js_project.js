let tabButton = document.querySelectorAll(".project-tab-menu>li")
let tabContents = document.querySelectorAll(".project-type-list>div")
let tabCircle = document.querySelectorAll(".tab-circle>span")

tabButton.forEach((tab, id) => {
    tab.addEventListener("click", () => {
        tabButton.forEach(item => {
            item.classList.remove("active");
        })
        tab.classList.add("active");

        tabContents.forEach(content => {
            content.classList.remove("active");
        })
        tabContents[id].classList.add("active");

        tabCircle.forEach(circle => {
            circle.classList.remove("active");
        })
        tabCircle[id].classList.add("active");
    })
})

let selectBtn = document.querySelectorAll(".room-section>button")
let selectContents = document.querySelectorAll(".stay-project-list>div")


selectBtn.forEach((select, num) => {
    select.addEventListener("click", () => {
        moveBanner(num)
    })
})


function moveBanner(num) {
    selectBtn.forEach(product => {
        product.classList.remove("active");
    })
    selectBtn[num].classList.add("active");

    selectContents.forEach(contents => {
        contents.classList.remove("active");
    })
    selectContents[num].classList.add("active");
}

let current = 0;

let right = document.querySelector(".next-btn")
let left = document.querySelector(".prev-btn")
right.addEventListener("click",()=>{
    current++;
    if (current >= selectContents.length) {
        current = 0;
    }
    moveBanner(current);
    console.log("ddd:")
})

left.addEventListener("click",()=>{
    current--;
    if (current==0) {
        current = selectContents.length;
    }
    moveBanner(current)
})
