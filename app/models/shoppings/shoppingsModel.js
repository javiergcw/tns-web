// models/Profile.js
class Shopping {
  constructor({
    id,
    status_id,
    user_id,
    category_id,
    created_at,
    updated_at,
    request_date,
    pending_date,
    date_approval,
    category,
    status,
    products,
  }) {
    this.id = id;
    this.statusId = status_id;
    this.userId = user_id;
    this.categoryId = category_id;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
    this.requestDate = request_date;
    this.pendingDate = pending_date;
    this.dateApproval = date_approval;
    this.category = new Category(category); // Instancia de la clase Category
    this.status = new Status(status); // Instancia de la clase Status
    this.products = products.map(
      (product) => new Product(product)
    );
  }
}

class Product {
  constructor({ id, name, description, price }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.url=this.url;
  }
}

class Category {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}

class Status {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}