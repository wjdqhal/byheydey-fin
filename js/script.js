let hamBtn = document.querySelector(".ham>button");
let menu = document.querySelector("nav");

hamBtn.addEventListener("click",()=>{
    hamBtn.classList.toggle("on");
    menu.classList.toggle("active");
})