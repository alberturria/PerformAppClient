export default class DiagnosisEntity{
    constructor (id, name, description, video, ownerId, suiteId, suiteName=null, patientName=null) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.video = video;
        this.ownerId = ownerId;
        this.suiteId = suiteId;
        this.suiteName = suiteName
        this.patientName = patientName
    }
}