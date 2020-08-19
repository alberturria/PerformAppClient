export default class SuiteEntity{
    constructor (id, name, date, userId, username, patientId=null, diagnosisId=null, csv=null, video=null, customFields=null) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.userId = userId;
        this.username = username;
        this.patientId = patientId;
        this.diagnosisId = diagnosisId;
        this.csv = csv;        
        this.video = video;        
        this.customFields = customFields;
    }
}