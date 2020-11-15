//onload
const query = window.location.href.split('?q=')[1];
document.querySelector('#token').value = localStorage.getItem('token');
document.querySelector('.token').value = localStorage.getItem('token');

const hide = {
    college: ['.add-branch-admin', '.all-branch-added'],
    admin: ['.add-branch-college']
}


//hiding
console.log(query);
hide[query].forEach(element => {
    console.log(element);
    document.querySelector(element).style.display = 'none';
});

//request data
if(query==='college') {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/branches/college/data', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        id: localStorage.getItem('id'),
        token: localStorage.getItem('token')
    }));
    xhr.onload = () => {
        const postData = JSON.parse(xhr.responseText);
        addOptions(postData);
    }
}

const addOptions = (data) => {
    if(data.length===0) {
        document.querySelector('.all-branch-added').style.display = 'block';
        document.querySelector('.add-branch-college-form').style.display = 'none';
    }
    let markup = ``;
    data.forEach(element => {
        markup += `<option value="${element._id}" name="branch">${element.name}</option>`;
    });
    document.querySelector('#branches').insertAdjacentHTML('beforeend', markup);
}
