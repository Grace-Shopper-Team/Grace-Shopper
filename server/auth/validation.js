
// function to validate email and password inputs on change
////////////////////////////////////////// add check for existing users?
export const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const emailValid = emailRegex.test(e.target.value);
    const passwordValid = (
        password.length >= 8 &&
        password.search(/[a-z]/) >= 0 &&
        password.search(/[0-9]/) >= 0 &&
        password.search(/[A-Z]/) >= 0 &&
        password.search(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) >= 0
    );
    const passwordsMatch = e.target.name === 'confirmPass' ? e.target.value === password : true;
    if (!emailValid) {
        setFormError("Please enter a valid email address.");
    } else if (!passwordValid) {
        setFormError("Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
    } else if (!passwordsMatch) {
        setFormError("Passwords must match.");
    } else {
        setFormError('');
    }
    if (e.target.name === 'email') {
        setEmail(e.target.value);
    } else if (e.target.name === 'password') {
        setPassword(e.target.value);
    } else if (e.target.name === 'confirmPass') {
        setConfirmPass(e.target.value);
    }
};

const emailValidation= (e) => {
    const email = email.value;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!email.match(emailRegex)){
        setEmailError("Please enter a valid email address.");
    } else {
        setEmailError('');
    }
}

// const usernameValidation= (e) => {
//     if (index !== -1) {
//         setUsernameError(`The username you entered already exists. Please <a href="login.html">Sign in</a> or select a new username.`);
//     } else {
//         setUsernameError('');
//     }
// }

const pwdValidation= (e) => {
    const passwordsMatch = e.target.name === 'confirmPass' ? e.target.value === password : true;
    if(pwd.length < 8){
        setPwdError("Password must be at least 8 characters.");
    } else if(pwd.search(/[a-z]/) < 0){
        setPwdError("Password must contain at least one lowercase character.");
    } else if(pwd.search(/[0-9]/) < 0){
        setPwdError("Password must contain at least one number.");
    } else if(pwd.search(/[A-Z]/) < 0){
        setPwdError("Password must contain at least one uppercase character.");
    } else if(pwd.search(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) < 0){
        setPwdError("Password must contain at least one special character.");
    } else if (!passwordsMatch){
        setPwdError("Passwords must match.");  
    } else {
        setPwdError('')
    }
}



