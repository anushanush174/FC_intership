const carModel = [
    "Model",
    "Brand",
    "Date",
    "Horsepower",
    "Transmission",
    "Class",
];
carModel.push("Delete")
let body = document.getElementsByTagName('body')[0];
let div = document.createElement('div')
div.setAttribute("id", "elem")
let divPagination = document.createElement('div');
body.appendChild(div);
body.appendChild(divPagination);
let table = document.createElement('table');
table.setAttribute("id", "table")
const notesOnPage = 10;
let car = JSON.parse(localStorage.getItem("carList"))
let ul;

createTable(car.slice(0, notesOnPage));
deleteRows();

function createTable(cars) {
    let title = document.createElement('tr')

    for(let i = 0; i < carModel.length; i++){
        let th = document.createElement('th')
        th.setAttribute("draggable", "true")
        th.innerText = (carModel[i]);
        title.appendChild(th);
    }

    table.appendChild(title);

    for(let i = 0; i < cars.length; i++) {
        let tr = document.createElement('tr');
        for(let j = 0; j < carModel.length; j++){
            let td = document.createElement('td');
            td.setAttribute("name", `td${j}`);
            cars[i].Delete = "Delete";

            td.innerText = cars[i][carModel[j]];

            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    div.appendChild(table);

    divPagination.innerHTML = ""
    createPagination();
    deleteRows()
}

function createPagination () {
    let amountPages = Math.ceil(car.length / notesOnPage)

    let ul = document.createElement('ul')
    ul.setAttribute("id", "pagination")

    let items = []
    for(let i = 1; i <= amountPages; i++){
        let li = document.createElement('li')
        li.innerHTML = i;
        ul.appendChild(li)
        items.push(li)
    }

    for(let item of items){
         item.addEventListener('click', function(){
            let active = document.querySelector('#pagination li.active')
            if(active){
                active.classList.remove('active')
            }
            this.classList.add('active')

            let pageNum = +this.innerHTML

            let start = (pageNum - 1) * notesOnPage;
            let end = start + notesOnPage;
            let notes = car.slice(start, end)
            table.innerHTML = ""
            createTable(notes);
         })   
    }
    divPagination.appendChild(ul)
}

function deleteRows(){
    for(let i = 1; i < table.rows.length; i++){
        table.rows[i].cells[carModel.length - 1].onclick = function (){
            let question = confirm("Do you want to delete this row?");
            if(question === true){
                let index = this.parentNode.rowIndex;
                table.deleteRow(index);
                car.splice(index, 1);
            }
        }
    }
}ß

// function dragDrop () {
//     let dragArr = [];
//     for(i = 0; i < cars.length; i++){
//         dragArr.push(cars[i].Model)
//     }

//     let elem = document.querySelector("#elem");

//     elem.addEventListener("dragend", function() {
//         dragArr
//     })

// }
// dragDrop () 