// models/User.js
class User {
    constructor(email, password, passwordConfirmation = null, name = null) {
      this.user = {
        email,
        password,
        ...(passwordConfirmation && { password_confirmation: passwordConfirmation }),
        ...(name && { name }),
      };
    }
  }
  
  export default User;
  