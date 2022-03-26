const input = document.querySelector("input");

input.addEventListener("keydown", function(e){
    if(e.key == "Enter"){
        const value = e.target.value;
        console.log(value);
        const result = eval(value);
        input.value = result;
    }
})