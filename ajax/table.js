const requestURL = 'https://jsonplaceholder.typicode.com/users';

function sendRequest(method, url, body = null) {
    return fetch(url).then(response => {
        return response.json()
    })
}

sendRequest('GET', requestURL).then(data => {
    createTable(data);
}).catch(error => console.error(error));

function createTable(data) {
    let table = document.createElement('table');

    for (let i = 0; i < data.length; i++) {

        let tr = document.createElement('tr');
        let indexes = Object.keys(data[i]);
        for (let j = 0; j < Object.keys(data[i]).length; j++) {
            let td = document.createElement('td');
            if (typeof(data[i][indexes[j]]) != 'object')
                td.innerHTML = data[i][indexes[j]];
            else
                multiCell(data[i][indexes[j]], td);
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }
    document.body.append(table);
}

function multiCell(data, parent) {
    if (typeof(data) != 'object') return;
    let indexes = Object.keys(data);
    for (let i = 0; i < Object.keys(data).length; i++) {
        let tr = document.createElement('tr');
        if (typeof(data[indexes[i]]) != 'object')
            tr.innerHTML = indexes[i] + ": " + data[indexes[i]];
        else
            multiCell(data[indexes[i]], tr);
        parent.appendChild(tr);
    }
}