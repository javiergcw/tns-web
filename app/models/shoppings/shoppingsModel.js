// models/shoppings/shoppingsModel.js

class Shopping {
  constructor({
    id,
    created_at,
    updated_at,
    request_date,
    pending_date,
    date_approval,
    category,
    status,
    user,
    products,
  }) {
    this.id = id;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
    this.requestDate = request_date;
    this.pendingDate = pending_date;
    this.dateApproval = date_approval;
    this.category = new Category(category); // Instancia de la clase Category
    this.status = new Status(status); // Instancia de la clase Status
    this.user = new User(user); // Instancia de la clase User
    this.products = products.map(
      (product) => new Product(product)
    );
  }
}

class Product {
  constructor({ id, name, description, price, url }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.url = url;
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

class User {
  constructor({ id, profile }) {
    this.id = id;
    this.profile = new Profile(profile); // Instancia de la clase Profile
  }
}

class Profile {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}

export default Shopping;
