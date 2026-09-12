const form = document.getElementById('contactForm');
const dataTableBody = document.getElementById('dataTableBody');
const apiUrl = 'http://localhost:3270/student';

function loadStoredData() {
    dataTableBody.innerHTML = '';
    // const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    // contacts.forEach(contact => {
    //     const row = document.createElement('tr');
    //     row.innerHTML = `
    //         <td>${contact.firstName}</td>
    //         <td>${contact.lastName}</td>
    //         <td>${contact.address}</td>
    //         <td>${contact.town}</td>
    //         <td>${contact.postCode}</td>
    //         <td>${contact.telephone}</td>
    //         <td>${contact.mobile}</td>
    //         <td>${contact.email}</td>
    //     `;
    //     dataTableBody.appendChild(row);
    // });
    fetch(apiUrl)
        .then(response => response.json())
        .then(contacts => {
            console.log(contacts);
            contacts.forEach(contact => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${contact.firstName}</td>
                    <td>${contact.lastName}</td>
                    <td>${contact.address}</td>
                    <td>${contact.town}</td>
                    <td>${contact.postCode}</td>
                    <td>${contact.telephone}</td>
                    <td>${contact.mobile}</td>
                    <td>${contact.email}</td>
                `;
                dataTableBody.appendChild(row);
            });
        })
        .catch(err => {
            console.error('Error:', err);
        });
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
     const formData = {
        firstName: document.getElementById('name').value,
        lastName: document.getElementById('name1').value,
        address: document.getElementById('name3').value,
        town: document.getElementById('name4').value,
        postCode: document.getElementById('name5').value,
        telephone: document.getElementById('name6').value,
        mobile: document.getElementById('name7').value,
        email: document.getElementById('name8').value
    };
    fetch(apiUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
              form.reset();
    loadStoredData();      
        })
        .catch(err => {
            console.error('Error:', err);
        });
   

    // const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    // contacts.push(formData);
    // localStorage.setItem('contacts', JSON.stringify(contacts));

  
});

window.onload = loadStoredData;