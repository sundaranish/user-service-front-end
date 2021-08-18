const authenticate_api_url = 
"http://localhost:8080/user-service/authenticate";

const getusers_api_url = 
"http://localhost:8080/user-service/user";

const addusers_api_url = 
"http://localhost:8080/user-service/user";

const handleLogout = () => {
  //window.localStorage.clear();
 // window.location.reload(true);
  document.getElementById("users").hidden = true;
  disable_enable('home');
  //window.location.replace('/');
};

function disable_enable(_this)
{
    if (_this == 'login')
    {
      document.getElementById('loginbutton').hidden=true;
      document.getElementById('container').hidden=true;
      document.getElementById('login').hidden=true;
    }
    if (_this == 'home')
    {
      document.getElementById('loginbutton').hidden=false;
      document.getElementById('container').hidden=false;
      document.getElementById('login').hidden=false;
    }
}

window.onbeforeunload = function() { return "Your work will be lost."; };

async function authenticate(uname,pwd) {
    fetch(authenticate_api_url, {
    mode: 'cors',
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Access-Control-Allow-Methods': 'POST,OPTIONS,GET',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'false',
      'Origin': 'http://localhost:8080'
    },
    Origin: 'http://localhost:8080',
    origin: 'http://localhost:8080',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({userName: uname, password: pwd})
  })

  .then(response => response.json())
  .then(data => {
    console.log(data); 
    if (data) {
      hideloader();
    }
    //show(data);
    if(data.token){
      disable_enable('login');
      getusers(data,getusers_api_url);
    }
    else{
      disable_enable('home');
      alert("Invalid Username/Password");
      
    }
    //addusers(data,addusers_api_url);
  })
.catch(error => {
  console.log('Authentication failed : ' + error.message);
  alert("Invalid Username/Password");
});

}


function hideloader() {
  document.getElementById('loading').style.display = 'none';
}

function getusers(data,url) {
  fetch(url, {
    mode: 'cors',
    method: 'GET',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Authorization': 'Bearer '+ data.token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Access-Control-Allow-Methods': 'POST,OPTIONS,GET',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'false',
      'Origin': 'http://localhost:8080'
    },
    Origin: 'http://localhost:8080',
    origin: 'http://localhost:8080',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })

  .then(response => response.json())
  .then(data => {
    console.log(data); 
    if (data) {
      hideloader();
    }
    showUsers(data);
  })
.catch(error => console.log('Authentication failed : ' + error.message));
}


function addusers(data,url) {
  fetch(url, {
    mode: 'cors',
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Authorization': 'Bearer '+ data.token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Access-Control-Allow-Methods': 'POST,OPTIONS,GET',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'false',
      'Origin': 'http://localhost:8080'
    },
    Origin: 'http://localhost:8080',
    origin: 'http://localhost:8080',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({userId: 57, title: 'Docker1', description: 'Docker1 is a storage platform for images', userName: 'Sundar' , password: 'Rahane123*#'})
  })

  .then(response => response.json())
  .then(data => {
    console.log(data); 
    if (data) {
      hideloader();
    }
    show(data);
  })
.catch(error => console.log('Authentication failed : ' + error.message));
}

function show(data) {
  let tab = 
    `<tr>
      <th>token</th>
      <th>expiresIn</th>
    </tr>`;

  tab += `<tr> 
  <td>${data.token} </td>
  <td>${data.expiresIn}</td>
  </tr>`;

  document.getElementById("authenticate").innerHTML = tab;
}

function showUsers(data) {
  let tab = 
    `<thead>
    <tr>
        <th>UserId</th>
        <th>Title</th>
        <th>Description</th>
    </tr>
</thead> `;

  for (var i = 0; i < data.length; i++) { 
      tab += `<tr> 
      <td>${data[i].userId} </td>
      <td>${data[i].title}</td>
      <td>${data[i].description}</td>        
    </tr>`;
  }

  document.getElementById("users").innerHTML = tab;
}