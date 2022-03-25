let container = document.querySelector(".container");
let arr = []

for(let i=0; i<8; i++){
    let row = document.createElement("div");
    row.classList.add("row");

    for(let j=0; j<8; j++){
        let cell = document.createElement("div");
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);
        cell.classList.add("cell");
        row.appendChild(cell);

        if(i%2 == 0){
            if(j%2 != 0){
                cell.style.backgroundColor = "black";
            }
        }else {
            if(j%2 == 0){
                cell.style.backgroundColor = "black";
            }
        }
    }
    container.appendChild(row);
}

container.addEventListener("click", runOnClick);

function runOnClick(e){
    if(arr.length > 0){
        arr.forEach(obj => {
            let {row, col} = obj
            let cell = document.querySelector(`.cell[rid="${row}"][cid="${col}"]`);
            cell.classList.remove("red");
        })
        arr = [];
    }
    const elem = e.target;
    const row = Number(elem.getAttribute("rid"));
    const col = Number(elem.getAttribute("cid"));
   
    arr.push({row, col})
    for(let i=row-1, j=col-1; i>=0 && j>=0; i--, j--){
        arr.push({row: i, col: j});
    }

    for(i=row-1, j=col+1; i>=0 && j<8; i--, j++){
        arr.push({row: i, col: j});
    }

    for(i=row+1, j=col-1; i<8 && j>=0; i++, j--){
        arr.push({row: i, col: j});
    }

    for(i=row+1, j=col+1; i<8 && j<8; i++, j++){
        arr.push({row: i, col: j});
    }
    
    arr.forEach(obj => {
        let {row, col} = obj
        let cell = document.querySelector(`.cell[rid="${row}"][cid="${col}"]`);
        cell.classList.add("red");
    })
}