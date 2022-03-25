let button = document.querySelector("button");
let toast = document.querySelector(".toast");

button.addEventListener("click", runOnClick);

function runOnClick(e){
    toast.classList.add("show");
    setTimeout(function(){
        toast.classList.remove("show")
    }, 1500)
}