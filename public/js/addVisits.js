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

//fetch college branches
var xhr = new XMLHttpRequest();
    xhr.open("POST", `college/branches/details`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        token: localStorage.getItem('token')
    }));
    xhr.onload = () => {
        const postData = JSON.parse(xhr.responseText);
        console.log(postData);
        addRadioBranhces(postData.branches);
    }

//adding branches radio buttons
// <input type="radio" id="male" name="gender" value="male">
// <label for="male">Male</label>

let i=0;
const addRadioBranhces = (postdata) => {
    postdata.forEach(element => {
        const curr = `<br><input class="main-checkbox" type="checkbox" id="branch${++i}" name="branch${i}" value="${element.branch._id}"
        onclick="makeRequired(${i})">
        <label class="check-label" for="branch${i}">${element.branch.name}</label>
        <input class="main-input" type="number" name="numberOfSelected${i}" id="students${i}" placeholder="Number of students Placed" disabled> 
        <br>`;
        console.log(curr);
        document.querySelector('#averagePackage').insertAdjacentHTML('afterend',curr);
    });
}

const makeRequired = (i) => {
    console.log('fire111111');
    document.querySelector(`#students${i}`).disabled = document.querySelector(`#students${i}`).disabled?false:true;
    document.querySelector(`#students${i}`).required = document.querySelector(`#students${i}`).required?false:true;
}