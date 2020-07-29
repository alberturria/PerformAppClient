import DeleteSuiteConnector from "../connectors/DeleteSuiteConnector";
import DeletePatientUseCaseInterface from "../interfaces/useCases/DeletePatientUseCaseInterface";
import DeletePatientConnector from "../connectors/DeletePatientConnector";

export default class DeletePatientUseCase extends DeletePatientUseCaseInterface {

    constructor(userId, patientId) {
        super();
        this.userId = userId;
        this.patientId = patientId;
        this.deletePatientConnector = new DeletePatientConnector(this.userId, this.patientId);
    }

    run() {
        return this.deletePatientConnector.deletePatient();    
    }
}