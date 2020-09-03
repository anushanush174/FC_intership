const carModel = [
    `Model`,
    `Brand`,
    `Date`,
    `Horsepower`,
    `Transmission`,
    `Class`,
];
carModel.push(`ADD`)
let body = document.getElementsByTagName(`body`)[0];
let div = document.createElement(`div`)
div.setAttribute(`id`, 'tableDiv')
let divPagination = document.createElement(`div`);
divPagination.setAttribute(`id`, `paginationDiv`)
body.appendChild(div);
body.appendChild(divPagination);
let table = document.createElement(`table`);
table.setAttribute(`id`, `table`)
const notesOnPage = 10;
let car = JSON.parse(localStorage.getItem(`carList`))
let ul;

createTable(car.slice(0, notesOnPage));
deleteRows();

function createTable(cars) {
    let title = document.createElement(`tr`)

    for (let i = 0; i < carModel.length; i++) {
        let th = document.createElement(`th`)
        if (i < carModel.length - 1) {
            th.setAttribute(`draggable`, `true`)
            th.setAttribute(`ondragover`, `onDragOver()`)
            th.setAttribute(`ondrop`, `onDrop(event)`)
            th.setAttribute(`ondragstart`, `onDragStart(${i}, event)`)
        } else {
            th.setAttribute(`button`, `ADD`)
            th.setAttribute(`onclick`, `createRow()`)
        }
        th.innerText = (carModel[i]);
        title.appendChild(th);
    }

    table.appendChild(title);

    for (let i = 0; i < cars.length; i++) {
        let tr = document.createElement(`tr`);
        for (let j = 0; j < carModel.length; j++) {
            let td = document.createElement(`td`);
            td.setAttribute(`name`, `td${j}`);
            cars[i].ADD = `Delete`;

            td.innerText = cars[i][carModel[j]];

            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    div.appendChild(table);

    divPagination.innerHTML = ``
    createPagination();
    deleteRows()
}

function createPagination() {
    let amountPages = Math.ceil(car.length / notesOnPage)

    let ul = document.createElement(`ul`)
    ul.setAttribute(`id`, `pagination`)

    let items = []
    for (let i = 1; i <= amountPages; i++) {
        let li = document.createElement(`li`)
        li.innerHTML = i;
        ul.appendChild(li)
        items.push(li)
    }

    for (let item of items) {
        item.addEventListener(`click`, function () {
            let active = document.querySelector(`#pagination li.active`)
            if (active) {
                active.classList.remove(`active`)
            }
            this.classList.add(`active`)

            let pageNum = +this.innerHTML

            let start = (pageNum - 1) * notesOnPage;
            let end = start + notesOnPage;
            let notes = car.slice(start, end)
            table.innerHTML = ``
            createTable(notes);
        })
    }
    divPagination.appendChild(ul)
}

function deleteRows() {
    for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].cells[carModel.length - 1].onclick = function () {
            let question = confirm(`Do you want to delete this row?`);
            if (question === true) {
                let index = this.parentNode.rowIndex;
                table.deleteRow(index);
                car.splice(index, 1);
            }
        }
    }
}

function addRows() {
    let model = document.getElementById(`model`);
    let brand = document.getElementById(`brand`);
    let date = document.getElementById(`date`);
    let horsepower = document.getElementById(`horsepower`);
    let transmission = document.getElementById(`transmission`);
    let clas = document.getElementById(`clas`);

    let newCar = {}
    newCar.Model = model.value
    newCar.Brand = brand.value
    newCar.Date = date.value
    newCar.Horsepower = horsepower.value
    newCar.Transmission = transmission.value
    newCar.Class = clas.value

    car.unshift(newCar)
    table.innerHTML = ``
    createTable(car.slice(0, notesOnPage))
    document.getElementById(`divAddCarId`).style.display = `none`

    model.value = ``
    brand.value = ``
    date.value = ``
    horsepower.value = ``
    transmission.value = ``
    clas.value = ``
}

function onDragStart(index, event) {
    event.dataTransfer.setData(`index`, index);
}

function onDragOver() {
    event.preventDefault();
}

function onDrop(event) {
    let data = event.dataTransfer.getData(`index`)
    changeArray(carModel, data, carModel.indexOf(event.target.innerHTML))
}

function changeArray(arr, arg1, arg2) {
    let del = arr.splice(arg1, 1).toString();
    arr.splice(arg2, 0, del)
    table.innerHTML = ``
    createTable(car.slice(0, notesOnPage))
}

function createRow() {
    let form = document.getElementById(`divAddCarId`)
    if (form.style.display === `block`) {
        form.style.display = `none`;
    } else {
        form.style.display = `block`;
    }
}
