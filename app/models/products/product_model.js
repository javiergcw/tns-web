// models/ProductModel.js

class ProductModel {
    constructor({ id, name, url, description, price, created_at, updated_at }) {
      this.id = id;
      this.name = name;
      this.url = url;
      this.description = description;
      this.price = price;
      this.createdAt = created_at;
      this.updatedAt = updated_at;
    }
  }
  
export default ProductModel;
  