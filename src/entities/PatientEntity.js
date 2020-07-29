export default class PatientEntity{
    constructor (id, name, mail, gender, age, phoneNumber, photo, ownerId) {
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.gender = gender;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.photo = photo;
        this.ownerId = ownerId;
    }
}