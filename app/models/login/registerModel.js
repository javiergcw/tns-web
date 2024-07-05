export class RegisterResponse {
  constructor(id, email, createdAt, token) {
    this.id = id;
    this.email = email;
    this.createdAt = createdAt;
    this.token = token;
  }
}

export class RegisterData {
  constructor(status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data; // data es una instancia de RegisterResponse
  }
}
