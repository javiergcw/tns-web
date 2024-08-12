export class RegisterResponse {
  constructor(id, email, createdAt, token, profile) {
    this.id = id;
    this.email = email;
    this.createdAt = createdAt;
    this.token = token;
    this.profile = profile;
  }
}

export class RegisterData {
  constructor(status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
