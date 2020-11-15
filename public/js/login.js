//onload
const query = window.location.href.split('?q=')[1];

const hide = {
    college: ['.admin-login'],
    admin: ['.college-login']
}


//hiding
hide[query].forEach(element => {
    console.log(element);
    document.querySelector(element).style.display = 'none';
});
