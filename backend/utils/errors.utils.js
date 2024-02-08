module.exports.signUpErrors = (err) => {
    let errors = { username: "", password: "" };
  
    if (err.message.includes("username"))
      errors.username = "username incorrect ou déjà pris";
  
    if (err.message.includes("password"))
      errors.password = "Le mot de passe doit faire 6 caractères minimum";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("username"))
      errors.username = "Ce username est déjà pris";
  
    return errors;
  };
  
  module.exports.signInErrors = (err) => {
    let errors = { username: '', password: ''};
  
    if (err.message.includes('username not found')) {
      errors.username = "username inconnu";
    } else {
      errors.username = "";
    }
  
    if (err.message.includes('password')) {
      errors.password = "Le mot de passe ne correspond pas";
    } else {
      errors.password = "";
    }
  
    return errors;
  }
  

  
 
  