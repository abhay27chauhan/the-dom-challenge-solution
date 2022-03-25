function Star(el, count, getStar){
    let active = -1;
    const starContainer = document.querySelector(el);
    const fragment = document.createDocumentFragment();

    for(let i=0; i<count; i++){
        const iElem = document.createElement("i");
        iElem.classList.add("fa");
        iElem.classList.add("fa-star-o")
        iElem.dataset.val = i;
        fragment.appendChild(iElem);
    }

    starContainer.addEventListener("mouseover", runOnMouseOver);
    starContainer.addEventListener("mouseleave", runOnMouseLeave);
    starContainer.addEventListener("click", runOnClick);

    function runOnClick(e){
       const index = e.target.dataset.val;
       active = Number(index);
       getStar(active+1);
    }

    function runOnMouseOver(e){
        if(!e.target.dataset.val) return;
        const children = e.currentTarget.children;
        for(let i=0; i<count; i++){
            if(i <= e.target.dataset.val){
                children[i].classList.remove("fa-star-o");
                children[i].classList.add("fa-star");
            }else{
                children[i].classList.add("fa-star-o");
                children[i].classList.remove("fa-star");
            }
        }
    }

    function runOnMouseLeave(e){
        const children = e.currentTarget.children;
        for(let i=0; i<count; i++){
            if(i <= active){
                children[i].classList.remove("fa-star-o");
            children[i].classList.add("fa-star");
            }else{
                children[i].classList.add("fa-star-o");
                children[i].classList.remove("fa-star");
            }
        }
    }

    starContainer.appendChild(fragment);
}