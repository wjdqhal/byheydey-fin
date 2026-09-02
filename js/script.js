let hamBtn = document.querySelector(".ham>button");
let menuWrap = document.querySelector("nav");

let menu = document.querySelectorAll(".main-menu>li>a");

hamBtn.addEventListener("click",()=>{
    hamBtn.classList.toggle("on");
    menuWrap.classList.toggle("active");
})

// menu.forEach((m)=>{
//     m.addEventListener("click",()=>{
//         let sub = m.nextElementSibling;
//         if(sub){
//             sub.classList.toggle("active");
//             m.classList.toggle("active");
//         }
//     })
// })