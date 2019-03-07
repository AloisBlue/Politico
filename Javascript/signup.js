redirect = () => {
  window.location="file:///home/blue/PoliticoDC/Politico/HTML/confirmemail.html"
}
window.onsubmit = function userSignup(e) {
  e.preventDefault();


  const url = 'http://127.0.0.1:5000/api/v2/auth/signup';

  let formData = new FormData();

  let email = document.getElementById('email').value;
  let firstname = document.getElementById('firstname').value;
  let lastname = document.getElementById('lastname').value;
  let othername = document.getElementById('othername').value;
  let phonenumber = document.getElementById('phonenumber').value;
  let passporturl = document.getElementById('passporturl').value;
  let password = document.getElementById('password').value;
  let passwordconfirm = document.getElementById('passwordconfirm').value;

  formData.append('email', email)
  formData.append('firstname', firstname)
  formData.append('lastname', lastname)
  formData.append('othername', othername)
  formData.append('phonenumber', phonenumber)
  formData.append('passporturl', passporturl)
  formData.append('password', password)
  formData.append('passwordconfirm', passwordconfirm)

  let head = new Headers();
  head.append('Accept', 'application/json')

  let state = {
    errors: {}
  }

  fetch(url, {
    method: 'POST',
    headers: head,
    body: formData
  })
  .then((res) => res.json())
  .then((res) => {
    if (res['Message'] == "Email cannot be empty") {
      document.getElementById('erremail').innerHTML = res.Message
      return false;
    }
    else if (res['Message'] == "Firstname cannot be empty") {
      document.getElementById('errfname').innerHTML = res.Message
      return false;
    }
    else if (res['Message'] == "Lastname cannot be empty") {
      document.getElementById('errlname').innerHTML = res.Message
      return false;
    }
    else if (res['Message'] == "Othername cannot be empty") {
      document.getElementById('erroname').innerHTML = res.Message
      return false;
    }
    else if (res['Message'] == "You must provide a phone number") {
      document.getElementById('errpnumber').innerHTML = res.Message
      return false;
    }
    else if (res['Message'] == "Passport url is needed") {
      document.getElementById('errpurl').innerHTML = res.Message
      return false;
    }
    else if (res['Message'] == "Password is empty") {
      document.getElementById('errpword').innerHTML = res.Message
      return false;
    }
    else if (res['Message'] == "Password confirm is empty") {
      document.getElementById('errcpword').innerHTML = res.Message
      return false;
    }
    else if (res['Message'] == "The passport URL is invalid") {
      document.getElementById('errpurl').innerHTML = res.Message
      return false;
    }
    else if (res['Message'] == "A good password should contain uppercase, lowercase, special characters @#$%&^+= , digits and above 8 characters") {
      document.getElementById('errpword').innerHTML = res.Message
      return false;
    }
    else if (res['Message'] == "Passwords must match") {
      document.getElementById('errcpword').innerHTML = res.Message
      return false;
    }
    else if (res['Message'] == "User with such email already exists.") {
      document.getElementById('erremail').innerHTML = res.Message
      return false;
    }
    else if (res['Message'] == "Account for "+firstname+" was succesfully created!!!") {
      alert(res['Message'])
      while (res.data['Access Token'] != "") {
        localStorage.accessToken = res.data['Access Token'];
        return redirect();
      }
    }
    else {
      document.getElementById('allerrors').innerHTML = res.Message
      return false;
    }
  })
}
