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
        selectBtn.forEach(product => {
            product.classList.remove("active");
        })
        select.classList.add("active");

        selectContents.forEach(contents => {
            contents.classList.remove("active");
        })
        selectContents[num].classList.add("active");
    })
})