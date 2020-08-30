const carModel = [
    "Model",
    "Brand",
    "Date",
    "Horsepower",
    "Transmission",
    "Class",
];

let body = document.getElementsByTagName('body')[0];
let div = document.createElement('div');
let divPagination = document.createElement('div');
body.appendChild(div);
body.appendChild(divPagination);
let table = document.createElement('table');
const notesOnPage = 10;

createTable(cars.slice(0, notesOnPage));
createPagination();

function createTable(cars) {
    let title = document.createElement('tr')

    for(let i = 0; i < carModel.length; i++){
        let th = document.createElement('th')
        th.innerText = (carModel[i]);
        title.appendChild(th);
    }

    table.appendChild(title);

    for(let i = 0; i < cars.length; i++) {
        let tr = document.createElement('tr');
        for(let j = 0; j < carModel.length; j++){
            let td = document.createElement('td');
            td.innerText = cars[i][carModel[j]];       
            tr.appendChild(td)
        }
        
        table.appendChild(tr)
    }

    div.appendChild(table);
}

function createPagination () {
    let amountPages = Math.ceil(cars.length / notesOnPage)

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
            let notes = cars.slice(start, end)
            table.innerHTML = ""
            createTable(notes);
         })   
    }
    divPagination.appendChild(ul)
}