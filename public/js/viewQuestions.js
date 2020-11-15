var data = document.querySelector('.info').textContent;
if(!!data) data = JSON.parse(data);
console.log(data);
let state = {};
//call to all three
const labels = ['college','company','branch'];
let result = false;
labels.forEach(element => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `/${element}/id_name`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        const postData = JSON.parse(xhr.responseText);
        let markup = `<select id='${element}' class="main-select" name='${element}'>`;
        const curr = `<option class="main-option" value='all'>ALL</option>`;
        markup+=curr;
        const currURL = window.location.href;
        postData.forEach(el => {
            if(currURL.search(el._id)>0) state[element] = el.name;
            const curr = `<option class="main-option" value='${el._id}'>${el.name}</option>`;
            markup+=curr;
        });
        document.querySelector(`.${element}-select-wrap`).insertAdjacentHTML('beforebegin',markup);
        focus();
        make();
        if(result===false) {
            document.querySelector('.main-content').innerHTML = '<div class="no-result">No results  :( </div>';
        }
    }
});



document.querySelector('#filter').addEventListener('click', () => {
    let href = `/questions?`;
    labels.forEach(element => {
        if(document.querySelector(`#${element}`).value!=='all') {
            href+=`${element}=${document.querySelector(`#${element}`).value}&`;
        }
    });
    window.location.href = href.slice(0,-1);
});

const make = () => {
    data.forEach(element => {
        result = true;
        const markup = `<table class="main-table">
            <!--<tr>
                <th class="in-table table-head" id="top-left">College</th>
                <th class="in-table table-head">Company</th>
                <th class="in-table table-head">Branch</th>
                <th class="in-table table-head">Topic</th>
                <th class="in-table table-head" id="top-right">Round</th>
            </tr>-->
            <tr>
                <td class="in-table" id="top-left">${(element.college.name?`${element.college.name}`:`${state['college']}`)}</td>
                <td class="in-table">${(element.company.name?`${element.company.name}`:`${state['company']}`)}</td>
                <td class="in-table">${(element.branch.name?`${element.branch.name}`:`${state['branch']}`)}</td>
                <td class="in-table">${element.topic}</td>
                <td class="in-table" id="top-right">${element.round}</td>
            </tr>
            </table>
            <table class="main-table table-description">
                <!--<tr><th class="in-table table-head table-head-description">Description</th></tr>-->
                <tr><td class="in-table in-table-description">${element.description}</td></tr>
            </table>
        `;
        document.querySelector('.main-content').insertAdjacentHTML('beforeend', markup);
    });
}


//focusing
const focus = () => {
    const url = window.location.href;
    labels.forEach(element => {
        let highlight;
        if(url.search(element)>0) {
            highlight=element;
        } else highlight = 'all';
        const select = document.querySelector(`#${element}`);
        for (var i = 0; i < select.length; i++){
            var option = select.options[i];
            if(highlight!=='all') {
                if(url.search(option.value)>0) option.selected = 'selected';
            } else {
                if(option.value==='all') option.selected = 'selected';
            }
        }
    });
}