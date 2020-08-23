export default class SuiteEntity{
    constructor (id, name, date, userId, username, patientId=null, patientName=null, diagnosisId=null, diagnosisName=null, csv=null, video=null, customFields=null, type=null) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.userId = userId;
        this.username = username;
        this.patientId = patientId;
        this.diagnosisId = diagnosisId;
        this.patientName = patientName;
        this.diagnosisName = diagnosisName;
        this.csv = csv;        
        this.video = video;        
        this.customFields = customFields;
        this.type = type
    }
}