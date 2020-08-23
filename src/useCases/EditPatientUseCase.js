import EditPatientUseCaseInterface from "../interfaces/useCases/EditPatientUseCaseInterface";
import EditPatientConnector from "../connectors/EditPatientConnector";

export default class EditPatientUseCase extends EditPatientUseCaseInterface {

    constructor(userId, patientEntity) {
        super();
        this.userId = userId;
        this.patientEntity = patientEntity;
        this.editPatientConnector = new EditPatientConnector(this.userId, this.patientEntity);
    }

    run() {
        return this.editPatientConnector.editPatient();
            
    }

    getPatientEntity() {
        return this.editPatientConnector.getPatientEntity();
    }


}