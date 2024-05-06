const params = new URLSearchParams(window.location.search);
let error = params.get('error');

if(error){
    document.getElementById('error').style.display = 'block';
    document.getElementById('error').innerHTML = error;
}