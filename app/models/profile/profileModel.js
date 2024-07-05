// models/Profile.js
class Profile {
  constructor({ id, name, identification_type, identification_number, photo, created_at, updated_at, user, rol }) {
    this.id = id;
    this.name = name;
    this.identificationType = identification_type;
    this.identificationNumber = identification_number;
    this.photo = photo;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
    this.user = user ? {
      id: user.id,
      email: user.email,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    } : null;
    this.rol = rol ? {
      id: rol.id,
      name: rol.name,
      createdAt: rol.created_at,
      updatedAt: rol.updated_at,
    } : null;
  }
}

export default Profile;
