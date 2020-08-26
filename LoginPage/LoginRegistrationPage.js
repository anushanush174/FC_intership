class UserLogin{
    constructor(name, password){
        this.name = name;
        this.password = password;
    }
}

class UserInfo extends UserLogin{
    constructor(nameEmail, passw, email){
        super(nameEmail, passw)  
        this.email = email;
    }
}

const passwordlength = 6;

function userInfoToLocalStorage(){ 
    const currentUser = new UserInfo(document.getElementById('registerName').value,
                                    document.getElementById("registerPassword").value, 
                                    document.getElementById('email').value) 

    let users = JSON.parse(localStorage.getItem('curUser'));

    if(users){
        users.push(currentUser);
    }else{
        users = [currentUser];
    }

    localStorage.setItem("curUser", JSON.stringify(users))
}

function registerButtonClick(){
    const userName = document.getElementById("registerName").value
    const userEmail= document.getElementById("email").value
    const password = document.getElementById("registerPassword").value
    const rePassword = document.getElementById("confirmPassw").value

    if(userName.length > 0 && userEmail.length > 0){
        if(password.length < passwordlength || rePassword.length < passwordlength ){
            alert("Minimum Password Symbols Must Be 6!");
        }else{
            if(password !== rePassword){
                alert("Incorrect password!");
            }else{
                let users = JSON.parse(localStorage.getItem('curUser'));

                if(users){
                    const emailValue = users.find(x => x.email === userEmail)
                    console.log(emailValue)
                    if(emailValue !== undefined) {
                        alert("The user with such Email already exists")
                    }else{
                        console.log(emailValue)
                        userInfoToLocalStorage()
                    }
                }else{
                    userInfoToLocalStorage()
                }
            }
        }
    }else{
        alert("Name or email fildes can't be empty")
    }
}


function loginButtonClick(){
    const logName = document.getElementById("loginName").value;
    const logPass = document.getElementById("loginPasswprd").value;

    if(logName == "" || (logPass.length < passwordlength)){
        alert("Fields are Incorrect")
    }else{
        let users = JSON.parse(localStorage.getItem('curUser'));
        if(users){
            if((users.find(x => x.name === logName) || users.find(x => x.email === logName)) && users.find(x => x.password === logPass)){
                alert("Successfully Logged In")
            }else{
                alert('Wrong Password or UserName')
            }
        }else{
            alert("please Register")
        } 
    }
}