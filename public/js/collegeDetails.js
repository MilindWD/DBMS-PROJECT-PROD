//onload
let data = document.querySelector('.info').textContent;
if(data) data = JSON.parse(data);
console.log(data);
//markup
const placed = (placedData) => {
    let text = ``;
    if(placedData.length===0) {
        return `<tr>
            <td class="in-table" style="width: 24vw;">No info</td>
        </tr>
        `;
    }
    placedData.forEach(element => {
        text += `
        <tr>
            <th class="in-table table-head">${element.year}</th>
            <td class="in-table">${element.number}</td>
        <tr>
        `
    });
    return text;
}

let markup = ``;
data.collegeBranches.forEach((element,i) => {
    markup = `<table class="main-table">
        <tr>
            <th class="in-table table-head">Branch</th>
            <td class="in-table"><div class="branch-name">&nbsp;&nbsp;&nbsp;${element.branch.name}</div><a class="button-main" href="/questions?college=${data.college}&branch=${element.branch._id}">questions</a></td>
        <tr>
        <tr>
            <th class="in-table table-head">Average Package</th>
            <td class="in-table">${+element.averagePackage!==0?'&#x20B9;'+Math.round(parseFloat(element.averagePackage)).toLocaleString('en-IN')+' p.a.':'No info'} </td>
        <tr>
        <tr>
            <th class="in-table table-head">Placed</th>
            <td >
                <table class="mini-table">
                    ${placed(element.placed)}
                </table>
            </td>
        <tr>
    </table>
    `;
    document.querySelector('.branch-card-wrapper').insertAdjacentHTML('afterbegin',markup);
});