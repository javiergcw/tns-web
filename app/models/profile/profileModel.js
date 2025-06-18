class Profile {
    constructor({
                    id, name, identification_type, identification_number, photo, created_at, updated_at, user, rol,
                    issue_place, position, contract_type, hire_date, base_salary, study_bonus, responsibility_bonus, status,
                    total_earned
                }) {
        this.id = id;
        this.name = name;
        this.identification_type = identification_type;
        this.identification_number = identification_number;
        this.photo = photo;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.user = user ? { id: user.id, email: user.email, created_at: user.created_at, updated_at: user.updated_at } : null;
        this.rol = rol ? { id: rol.id, name: rol.name, created_at: rol.created_at, updated_at: rol.updated_at } : null;
        this.issue_place = issue_place;
        this.position = position;
        this.contract_type = contract_type;
        this.hire_date = hire_date;
        this.base_salary = base_salary;
        this.study_bonus = study_bonus;
        this.responsibility_bonus = responsibility_bonus;
        this.status = status;
        this.total_earned = total_earned || 0;
    }
}

export default Profile;