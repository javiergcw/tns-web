// models/accountTypeModel.js

class AccountTypeModel {
    constructor({ id, name, cupo, created_at, updated_at }) {
        this.id = id;
        this.name = name;
        this.cupo = cupo;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

export default AccountTypeModel;
