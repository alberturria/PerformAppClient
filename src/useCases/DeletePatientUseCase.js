import DeleteSuiteConnector from "../connectors/DeleteSuiteConnector";
import DeletePatientUseCaseInterface from "../interfaces/useCases/DeletePatientUseCaseInterface";
import DeletePatientConnector from "../connectors/DeletePatientConnector";

export default class DeletePatientUseCase extends DeletePatientUseCaseInterface {

    constructor(userEntity, patientId) {
        super();
        this.userEntity = userEntity;
        this.patientId = patientId;
        this.deletePatientConnector = new DeletePatientConnector(this.userEntity, this.patientId);
    }

    run() {
        return this.deletePatientConnector.deletePatient();    
    }
}