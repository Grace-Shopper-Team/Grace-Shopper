// stretch: add validation to profile page, covert to higher-order to prevent repeat code

// export const emailValidation = (email) => {
//     const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//     return !email.match(emailRegex) ? 'Please enter a valid email address.' : '';
// }
  
// export const pwdValidation = (password, confirmPass) => {
//     if (password.length < 8) {
//         return "Password must be at least 8 characters.";
//     } else if (password.search(/[a-z]/) < 0) {
//         return "Password must contain at least one lowercase character.";
//     } else if (password.search(/[0-9]/) < 0) {
//         return "Password must contain at least one number.";
//     } else if (password.search(/[A-Z]/) < 0) {
//         return "Password must contain at least one uppercase character.";
//     } else if (password.search(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) < 0) {
//         return "Password must contain at least one special character.";
//     } else if (password !== confirmPass) {
//         return "Passwords do not match.";
//     } else {
//         return '';
//     }
// }