// models/AuthResponse.js
class AuthResponse {
    constructor(status, message, data) {
      this.status = status;
      this.message = message;
      this.data = data;
    }
  }
  
  class AuthData {
    constructor(id, email, createdAt, token) {
      this.id = id;
      this.email = email;
      this.createdAt = createdAt;
      this.token = token;
    }
  }
  
  export { AuthResponse, AuthData };
  