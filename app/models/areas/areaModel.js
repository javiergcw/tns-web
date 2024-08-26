// models/areaModel.js

class AreaModel {
    constructor({ id, name, description, created_at, updated_at }) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  export default AreaModel;
  