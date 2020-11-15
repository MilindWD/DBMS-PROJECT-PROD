//onload
document.querySelector('#token').value = localStorage.getItem('token');
var data = document.querySelector('.info').textContent;
if(!!data) data = JSON.parse(data);
//hiding
document.querySelector('#name').style.display = 'none';
document.querySelector('#tier').style.display = 'none';
//adding companies dropdown
let markup = ``;
data.forEach(element => {
    const curr = `<option value="${element._id}">${element.name}</option>`;
    markup += curr;
});
markup += `<option value="other">Other</option>`
document.querySelector('.company-name').insertAdjacentHTML('beforeend',markup);

if(document.querySelector('.company-name').value==='other'){
    document.querySelector('#name').style.display = 'inline';
    document.querySelector('#tier').style.display = 'inline';
}

//detecting other switch
document.querySelector('.company-name').addEventListener('change', () => {
    if(document.querySelector('.company-name').value==='other') {
        document.querySelector('#name').style.display = 'inline';
        document.querySelector('#tier').style.display = 'inline';
    } else {
        document.querySelector('#name').style.display = 'none';
        document.querySelector('#tier').style.display = 'none';
    }
});