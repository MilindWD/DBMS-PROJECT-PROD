let data = document.querySelector('.info').textContent;
if(data) data = JSON.parse(data);

document.querySelector('#name').value = data.name;
document.querySelector('#cetcode').value = data.cetcode;
document.querySelector('#contact').value = data.contact;
document.querySelector('#location').value = data.location;
document.querySelector('#token').value = localStorage.getItem('token');