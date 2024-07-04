// models/Profile.js
class Profile {
    constructor({ id, name, identification_type, identification_number, photo, rol_id, user_id, created_at, updated_at }) {
      this.id = id;
      this.name = name;
      this.identificationType = identification_type;
      this.identificationNumber = identification_number;
      this.photo = photo;
      this.rolId = rol_id;
      this.userId = user_id;
      this.createdAt = created_at;
      this.updatedAt = updated_at;
    }
  }
  
  export default Profile;
  