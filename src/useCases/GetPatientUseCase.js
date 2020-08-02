import GetPatientConnector from "../connectors/GetPatientConnector";
import GetPatientUseCaseInterface from "../interfaces/useCases/GetPatientUseCaseInterface";

export default class GetPatientUseCase extends GetPatientUseCaseInterface {

    constructor(userId, patientId) {
        super();
        this.userId = userId;
        this.patientId = patientId;
        this.getPatientConnector = new GetPatientConnector(this.userId, this.patientId);
    }

    run() {
        return this.getPatientConnector.getPatient();
            
    }

    getPatientEntity() {
        return this.getPatientConnector.getPatientEntity();
    }

    getRelatedSuitesEntities() {
        return this.getPatientConnector.getRelatedSuitesEntities();
    }


}