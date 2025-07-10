const nameInput=document. getElementById('name-input');
const emailInput=document.getElementById('email-input');
const addBtn=document. getElementById('add-button');
const tableBody=document.getElementById('table-body');
const updateNameInput=document.getElementById('update-name-input');
const updateEmailInput=document.getElementById('update-email-input');
const updateBtn=document.getElementById('update-button');
const cancelBtn=document.getElementById('cancle-button');
const validEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let currentUserId=null;
let users = JSON.parse(localStorage.getItem("users"))||[];

function rendertable(){
  tableBody.innerHTML="";
  for(let i=0; i<users.length; i++){
    const user =users[i];
    const tr = document.createElement('tr')
    const idtd = document.createElement('td')
    const nameTD =document.createElement('td')
    const emailtd =document.createElement('td')
    const actiontd = document.createElement('td')
    const editBtn = document.createElement('button')
    editBtn.className="edit-btn";
    const deletebtn = document.createElement('button')
    deletebtn.className="delete-btn";

    idtd.innerText=i+1;

    nameTD.innerText=user.name;
    emailtd.innerText=user.email;
    editBtn.innerText="Edit";
    deletebtn.innerText="Delete";
    editBtn.addEventListener("click",()=>{
      showUpdateForm(user.id)
    });
    deletebtn.addEventListener("click" ,()=>{
      DeleteRecord(user.id)
    });
    actiontd.appendChild(editBtn)
    actiontd.appendChild(deletebtn)
    tr.appendChild(idtd)
    tr.appendChild(nameTD)
    tr.appendChild(emailtd)
    tr.appendChild(actiontd)
    tableBody.appendChild(tr)
  }
}
function addUser(){
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  if(email.match(validEmail)){
    if(name && email != null){
      // var id = 1;
      // var valuelist = users.map(function(x){return x.id}).indexOf(id);
      // while(valuelist != -1){
      //   id++;
      //   valuelist = users.map(function(x){return x.id}).indexOf(id);
      // }
    
      const listUsers ={
        id:users.length+1,
        name:name,
        email:email,
      }
      users.push(listUsers)
      localStorage.setItem("users" , JSON.stringify(users))
      nameInput.value='';
      emailInput.value='';
      rendertable();
      
    }else{
      alert("Please input name ")
    }
  }else{
    alert("Please input name and email")
  }
}
function showUpdateForm(userId){
  const user = users.find((user)=> user.id==userId)
  if(user){
    updateNameInput.value=user.name;
    updateEmailInput.value=user.email;
    currentUserId=user.id
    updateBtn.addEventListener("click",updateUser)
    cancelBtn.addEventListener("click", hideUpdateForm)
    updateNameInput.style.display="inline-block"
    updateEmailInput.style.display="inline-block"
    cancelBtn.style.display="inline-block"
    updateBtn.style.display="inline-block"
    document.getElementById('update-con').style.display="inline-block"
  }
}



function updateUser(){
  const name = updateNameInput.value; 
  const email = updateEmailInput.value;

  if(email.match(validEmail)){
    const index = users.findIndex((user) => user.id==currentUserId)
    if(index != -1){
      users[index].name=name;
      users[index].email=email;
      localStorage.setItem("users" , JSON.stringify(users));
      hideUpdateForm();
      rendertable();
    }
  }else{
    alert("Please input your email")
  }
}


function hideUpdateForm(){
  document.getElementById('update-con').style.display="none"
  updateNameInput.value="";
  updateEmailInput.value="";
  currentUserId=null
  updateBtn.addEventListener("click",updateUser)
  cancelBtn.addEventListener("click", hideUpdateForm)
  updateNameInput.style.display="none"
  updateEmailInput.style.display="none"
  cancelBtn.style.display="none"
  updateBtn.style.display="none"
  
}


function DeleteRecord(userId){
  users=users.filter((user)=> user.id !==userId);
  localStorage.setItem("users",JSON.stringify(users));
  console.log(users);
  if(users.length == 0){
    hideUpdateForm();
  }
  alert(userId)
  rendertable();
}

addBtn.addEventListener("click",addUser);
rendertable();