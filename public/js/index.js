//onload
let profile = localStorage.getItem('profile');
if(!profile) {
    localStorage.setItem('profile','public');
    profile = 'public';
}
//hide classes
const hide = {
    public: ['.logout-btn', '.add-college', '.add-branch-admin', '.add-branch-college', '.add-question', '.login-name', '.add-visits','.delete-profile','.delete-update'],
    college: ['.adm-login-btn','.clg-login-btn', '.add-college', '.add-branch-admin'],
    admin: ['.clg-login-btn','.adm-login-btn', '.add-branch-college', '.add-question', '.add-visits','.delete-profile','.delete-update']
}
if(profile!=='public') {
    document.querySelector('.login-name').innerHTML = `Logged in as <span class="capitalize">${localStorage.getItem('profile')}<span> ${localStorage.getItem('name')}`;
}

//hiding
hide[profile].forEach(element => {
    console.log(element);
    document.querySelector(element).style.display = 'none';
});

//logout function
document.querySelector('.logout-btn').addEventListener('click', ()=>{
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `/logout/${localStorage.getItem('profile')}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        token: localStorage.getItem('token')
    }));
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.setItem('profile','public');
    window.location.href = window.location.href;
});

//adding profile to add question
document.querySelector('.add-question').href += ('?q='+localStorage.getItem('profile'))+('&id='+localStorage.getItem('id'));

//delete profile section 
document.querySelector('.delete-profile').addEventListener('click', () => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/remove/college', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        token: localStorage.getItem('token')
    }));
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.setItem('profile','public');
    window.location.href = window.location.href;
});

//update key insertion
document.querySelector('#update-college').value = localStorage.getItem('token');