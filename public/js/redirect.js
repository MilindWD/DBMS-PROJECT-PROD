//onload
let data = document.querySelector('.info').textContent;
if(data) data = JSON.parse(data);

//saving localStorage
if(data.localSave) {
    localStorage.setItem('profile', data.localSave.profile);
    localStorage.setItem('name', data.localSave.name);
    localStorage.setItem('token', data.localSave.token);
}

//fail or success
const success = document.querySelector('.success');
if(success.textContent.length<5) success.style.display = 'none';

const fail = document.querySelector('.fail');
if(fail.textContent.length<5) fail.style.display = 'none';


//redirect
setTimeout(() => {
    window.location.href = data.redirectURL;
}, 1000);
