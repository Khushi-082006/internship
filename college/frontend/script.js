const form=document.getElementById('form');
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const formData={
        name:document.getElementById('name').value,
        email:document.getElementById('email').value
    };
    fetch('http://localhost:3270/students',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
    .then(response=>response.json())
    .then(values=>{
        form.reset();
    }) 
    .catch(error => {
            console.log(error);
        });     
    
})