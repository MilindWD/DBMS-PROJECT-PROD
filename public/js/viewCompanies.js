var data = document.querySelector('.info').textContent;
if(!!data) data = JSON.parse(data);
        let markup = `
        <table class="main-table">
            <tr>
                <th class="in-table table-head">Name</th>
                <th class="in-table table-head">Tier</th>
                <th class="in-table table-head">View</th>
            </tr>
        `;
        data.forEach((e) => {
            const curr = `<tr>
                            <td class="in-table">${e.name}</td>
                            <td class="in-table">${e.tier}</td>
                            <td><a class="button-main" href="/questions?company=${e._id}">questions</a></td>
                        </tr>`;
        markup+=curr;
        });
        markup+='</table>';
        document.querySelector('.main-content').innerHTML = markup;