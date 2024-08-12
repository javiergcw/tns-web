// models/AuthResponse.js
class AuthResponse {
  constructor(status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

class AuthData {
  constructor(id, profile_id, email, createdAt, token) {
    this.id = id;
    this.profile_id = profile_id;
    this.email = email;
    this.createdAt = createdAt;
    this.token = token;
  }
}

export { AuthResponse, AuthData };
