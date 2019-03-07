redirect = () => {
  window.location="file:///home/blue/PoliticoDC/Politico/HTML/userpage.html"
}
window.onsubmit = function userLogin(e) {
  e.preventDefault();

  const url = 'http://127.0.0.1:5000/api/v2/auth/login';

  let formData = new FormData();

  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  formData.append('email', email)
  formData.append('password', password)

  let head = new Headers();
  head.append('Accept', 'application/json')


  fetch(url,{
    method: 'POST',
    headers: head,
    body: formData
  })
  .then((data) => data.json())
  .then((data) => {
    console.log(data.Message)
    if (data['Message'] == "You must provide an email") {
      document.getElementById('erremail').innerHTML = data.Message
      return false;
    }
    else if (data['Message'] == "You must provide a password") {
      document.getElementById('errpass').innerHTML = data.Message
      return false;
    }
    else if (data['Message'] == "Logged in as "+email) {
      alert(data['Message'])
      localStorage.accessToken = data.data['Access Token'];
      redirect();
      }
    else {
      document.getElementById('allerrors').innerHTML = data.Message
    }
    })
}
