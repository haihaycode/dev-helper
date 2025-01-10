class UserEntity {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.role = data.role;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      role: this.role,
      created_at: this.created_at,
      updated_at: this.updated_at,
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    };
  }

  toAuthJSON(accessToken, refreshToken) {
    return {
      ...this.toJSON(),
      accessToken,
      refreshToken,
    };
  }
}

module.exports = UserEntity;
