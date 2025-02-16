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
    this.profile = profile ? new UserProfileDTO(profile) : null;
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

class AreaDTO { // Nueva clase para manejar 'area'
  constructor({ id, name, description }) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

class AccountTypeDTO { // Nueva clase para manejar 'account_type'
  constructor({ id, name, cupo }) {
    this.id = id;
    this.name = name;
    this.cupo = cupo;
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
    title,
    description,
    category,
    status,
    user,
    products,
    account_type_id,
    innovated,
    unidad,
    iva,
    retefuente,
    facturacion,
    area,
    account_type,
    total,
    subtotal,
  }) {
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.request_date = request_date;
    this.pending_date = pending_date;
    this.date_approval = date_approval;
    this.title = title;
    this.description = description;
    this.category = category ? new CategoryDTO(category) : null;
    this.status = status ? new StatusDTO(status) : null;
    this.user = user ? new UserDTO(user) : null;
    this.products = Array.isArray(products) ? products.map((product) => new ProductDTO(product)) : [];
    this.account_type_id = account_type_id;

    // Conversión de valores numéricos
    this.innovated = Boolean(innovated);
    this.unidad = unidad;
    this.iva = parseFloat(iva) || 0;
    this.retefuente = parseFloat(retefuente) || 0;
    this.facturacion = facturacion;

    // Manejo de objetos anidados con validación
    this.area = area ? new AreaDTO(area) : null;
    this.account_type = account_type ? new AccountTypeDTO(account_type) : null;

    // Conversión de total y subtotal a número
    this.total = parseFloat(total) || 0;
    this.subtotal = parseFloat(subtotal) || 0;
  }
}



export { ShoppingDTO };

