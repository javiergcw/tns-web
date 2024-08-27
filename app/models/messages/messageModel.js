// Archivo: models/MessageDTO.js

class MessageDTO {
  constructor(id, body, userId, userName, userEmail, shoppingId, createdAt, updatedAt) {
    this.id = id;
    this.body = body;
    this.userId = userId;
    this.userName = userName;
    this.userEmail = userEmail;
    this.shoppingId = shoppingId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromApiResponse(response) {
    return new MessageDTO(
      response.id,
      response.body,
      response.user.id,
      response.user.profile?.name || "Usuario Desconocido",
      response.user.email || "Correo no disponible",
      response.shopping_id,
      response.created_at,
      response.updated_at
    );
  }
}

export default MessageDTO;
