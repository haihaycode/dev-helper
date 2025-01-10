class UserEntity {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.role = data.role;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      role: this.role,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  toAuthJSON(token) {
    return {
      ...this.toJSON(),
      token,
    };
  }
}

module.exports = UserEntity;
