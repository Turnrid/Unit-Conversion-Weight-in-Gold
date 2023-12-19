/* TODO: Build up the HTML document by using JavaScript DOM manipulation functions.
 * Do not rely on changes you may have made to index.html because the grader won't use that file.
 */


document.title = "Worth your weight in Gold";

// Main div and app title
let div = document.createElement('div');
let h1 =  document.createElement('h1');
let p = document.createElement('p');
div.setAttribute('class', 'yellow stuff-box shadowed');
h1.textContent = "Worth Your Weight in Gold";
document.body.appendChild(div);
div.appendChild(h1);

// paragraph text prompt
p = document.createElement('p');
p.textContent = "Create An Expression:";
div.appendChild(p);

// First Number input field
p = document.createElement('p');
div.appendChild(p);
let input = document.createElement('input');
input.type = 'number';
input.id = 'input1';
input.defaultValue = '0';
p.appendChild(input);

// Operation selector
let select = document.createElement('select');
select.id = "units"
let units = {"Pound":"lb", "Kilogram":"kg", "Ton":"T", "Grams":"g", "Troy Ounce":"t_oz",  "Ounce":"oz"}
for (let unit in units){
let un = document.createElement('option');
un.value = units[unit];
un.id = unit;
un.innerHTML = unit;
select.appendChild(un);
}
select.addEventListener('change', (event) => {
    select.value = event.target.value;
})

p.appendChild(select);


// Compute Button
let button = document.createElement('button')
button.innerHTML = 'Compute';
button.addEventListener('click', createDiv);
p.appendChild(button);


// text
p = document.createElement('p');
p.id = "waiting"
div.appendChild(p);

let masterDiv = document.createElement('div');
document.body.appendChild(masterDiv)



// fetch for price of gold
let currentDate = new Date();
let lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

function formatDate(date) {
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

let currentDateString = formatDate(currentDate);
let lastMonthString = formatDate(lastMonth);

console.log(currentDateString);
console.log(lastMonthString);

document.querySelector('#waiting').textContent = "Thinking about it...";
fetch(`/gold/api/gold-price-proxy?start_date=${lastMonthString}&end_date=${currentDateString}`)
    .then(r => r.json())
    .then(json => {
        if (json.hasOwnProperty('error')) {
            throw json.error;
            document.querySelector('#waiting').textContent = `Error: ${json.error}`;
        }
        else {
            document.querySelector('#waiting').textContent = `The price of gold as of ${json.dataset.data[0][0]}
            is $${json.dataset.data[0][2]} per Troy Ounce`;
            document.querySelector('#waiting').value = `${json.dataset.data[0][2]}`
        }
    })
    .catch(err => {
        document.querySelector('#waiting').textContent = `Error: ${err}`;
    })


function createDiv(){
    let div = document.createElement('div');
    div.id = "div"
    div.setAttribute('class', 'green stuff-box shadowed');


    div.addEventListener('click', () => div.remove());
    let p = document.createElement('p')
    let s = document.createElement('span');
    let s2 = document.createElement('span');
    s2.id = "result"

    let n = document.querySelector('#input1').value;
    if (n == "") {
        document.querySelector('#waiting').textContent = "The number cannot be blank!";
    } else {
    conversion();
    s.innerHTML = new Date().toLocaleString();
    s2.style.fontSize = 'x-large';
    p.appendChild(s);
    p.appendChild(s2)
    div.appendChild(p)
    masterDiv.prepend(div);
    }
}

var conversion = function() {
        let n = document.querySelector('#input1').value;
        let unit = document.querySelector('#units').value
        let URL = `http://localhost:8000/unitconv/convert?from=${unit}&to=t_oz&value=${n}`;
        fetch(URL)
            .then(r => r.json())
            .then(json => {
                if (json.hasOwnProperty('error')) {
                    throw json.error;
                    document.querySelector('#result').textContent = `Error: ${json.error}`
                    let div = document.querySelector('#div');
                    div.setAttribute('class', 'red stuff-box shadowed');
                }
                else {
                    document.querySelector('#result').value = `${json.value}`
                }
            })
            .catch(err => {
                document.querySelector('#result').textContent = `Error: ${err}`;
                let div = document.querySelector('#div');
                div.setAttribute('class', 'red stuff-box shadowed');
            })
            .finally(() => {
                let mass = document.querySelector('#result').value
                let price = document.querySelector('#waiting').value
                let total = (mass * price).toFixed(2);

                document.querySelector('#result').innerHTML = " $" + new Intl.NumberFormat().format(total);
            });
    }













