// shoppingDTO.js

class ProductDTO {
  constructor({ id, name, description, price }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }
}

class UserProfileDTO {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}

class UserDTO {
  constructor({ id, profile }) {
    this.id = id;
    this.profile = new UserProfileDTO(profile);
  }
}

class CategoryDTO {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}

class StatusDTO {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}

class ShoppingDTO {
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
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.request_date = request_date;
    this.pending_date = pending_date;
    this.date_approval = date_approval;
    this.category = new CategoryDTO(category);
    this.status = new StatusDTO(status);
    this.user = new UserDTO(user);
    this.products = products.map((product) => new ProductDTO(product));
  }
}

export { ShoppingDTO };
