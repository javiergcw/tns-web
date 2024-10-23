// models/AdmissionModel.js
class AdmissionModel {
    constructor(
      student_name = '',
      student_age = 0,
      birth_date = '',
      religion = '',
      living_with = '',
      aspired_grade = '',
      has_siblings = false,
      sibling_name = '',
      previous_school = '',
      school_calendar = '',
      previous_school_duration = '',
      city_country = '',
      english_level = '',
      therapy_support = false,
      therapy_type= '',
      referral_source = '',
      mother_name = '',
      mother_id_type = '',
      mother_id_number = '',
      mother_phone = '',
      mother_email = '',
      mother_education_level = '',
      mother_occupation = '',
      father_name = '',
      father_id_type = '',
      father_id_number = '',
      father_phone = '',
      father_email = '',
      father_education_level = '',
      father_occupation = '',
      info_clear = false
    ) {
      this.student_name = student_name;
      this.student_age = student_age;
      this.birth_date = birth_date;
      this.religion = religion;
      this.living_with = living_with;
      this.aspired_grade = aspired_grade;
      this.has_siblings = has_siblings;
      this.sibling_name = sibling_name;
      this.previous_school = previous_school;
      this.school_calendar = school_calendar;
      this.previous_school_duration = previous_school_duration;
      this.city_country = city_country;
      this.english_level = english_level;
      this.therapy_support = therapy_support;
      this.therapy_type=therapy_type
      this.referral_source = referral_source;
      this.mother_name = mother_name;
      this.mother_id_type = mother_id_type;
      this.mother_id_number = mother_id_number;
      this.mother_phone = mother_phone;
      this.mother_email = mother_email;
      this.mother_education_level = mother_education_level;
      this.mother_occupation = mother_occupation;
      this.father_name = father_name;
      this.father_id_type = father_id_type;
      this.father_id_number = father_id_number;
      this.father_phone = father_phone;
      this.father_email = father_email;
      this.father_education_level = father_education_level;
      this.father_occupation = father_occupation;
      this.info_clear = info_clear;
    }
  }
  
  export default AdmissionModel;
  