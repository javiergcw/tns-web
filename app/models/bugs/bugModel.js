class Bug {
  constructor({ id, title, category_bug, description, user_id, created_at, updated_at, user = {} }) {
    this.id = id;
    this.title = title;
    this.category_bug = category_bug;
    this.description = description;
    this.user_id = user_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.user = user ? {
      id: user.id,
      email: user.email,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    } : null;
  }
}

export default Bug;
