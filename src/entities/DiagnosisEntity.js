export default class DiagnosisEntity{
    constructor (id, name, description, video, ownerId, suiteId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.video = video;
        this.ownerId = ownerId;
        this.suiteId = suiteId;
    }
}