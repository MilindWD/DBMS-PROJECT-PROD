var data = document.querySelector('.info').textContent;
        if(!!data) data = JSON.parse(data);
        let markup = `
        <table class="main-table">
            <tr>
                <th class="in-table table-head">Name</th>
                <th class="in-table table-head">Location</th>
                <th class="in-table table-head">Contact</th>
                <th class="in-table table-head">CET code</th>
                <th class="in-table table-head">View</th>
            </tr>
        `;
        data.forEach((e) => {
            const curr = `<tr>
                            <td class="in-table">${e.name}</td>
                            <td class="in-table">${e.location}</td>
                            <td class="in-table">${e.contact}</td>
                            <td class="in-table">${e.cetcode}</td>
                            <td><a class="button-main" href="/college/details/${e.cetcode}">details</a><a class="button-main" href="/questions?college=${e._id}">questions</a></td>
        
                        </tr>`;
        markup+=curr;
        });
        markup+='</table>';
        document.querySelector('.main-content').innerHTML = markup;