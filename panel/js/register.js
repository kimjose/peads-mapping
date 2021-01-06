
var btnRegister = document.getElementById('btnRegister');
var inputUsername = document.getElementById('inputUsername');
var inputPassword = document.getElementById('inputPassword');
var inputRepeatPassword = document.getElementById('inputRepeatPassword');
const loginError = document.getElementById("loginError");


btnRegister.addEventListener('click', ()=>{
    let username = inputUsername.value;
    let password = inputPassword.value;
    let confirmPassword = inputRepeatPassword.value;
    let error = false;
    if(username.length <1){
        error = true;
    }
    if(password.length < 4){
        error = true;
    }
    if(confirmPassword != password){
        error = true;
    }
    if(error) return;
    $.ajax({
        type : "POST",
        url: "datascript?request=register",
        data: {
          username: username,
          password: password
        },
        success : function(){
            window.open("login.html");
        },
        error : function(err){
            loginError.classList.add('errors-showing');
        }
    });

});