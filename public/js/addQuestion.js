var data = document.querySelector('.info').textContent;
if(!!data) data = JSON.parse(data);

console.log(data);

//making dropdow branch options
let markup = ``;
data.branches.forEach(element => {
    const curr = `<option value=${element.branch._id}>${element.branch.name}</option>`;
    markup += curr;
});

document.querySelector('.branches').insertAdjacentHTML('beforeend',markup);

//adding auth type to form
document.querySelector('form').action += ('?auth='+localStorage.getItem('profile'));

//adding college and company ids
document.querySelector('#collegeid').value = data.college;
document.querySelector('#companyid').value = data.company;
document.querySelector('#token').value = localStorage.getItem('token');

//add another question
let i=1;
const markupAddAnother = `<input type="text" class="main-input id-topic" name="topic${i}" placeholder="Topic"  required>
<input type="text" class="main-input id-round" name="round${i}" placeholder="Round"  required><br>
<textarea class="main-input description-input" rows = "5" cols = "60" name = "description${i++}" placeholder="Description" required></textarea><br>`;

document.querySelector('.add-another').addEventListener('click', () => {
    console.log('fire');
    document.querySelector('.add-another').insertAdjacentHTML('beforebegin',markupAddAnother);
});


