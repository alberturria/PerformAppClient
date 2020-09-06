import EditPatientUseCaseInterface from "../interfaces/useCases/EditPatientUseCaseInterface";
import EditPatientConnector from "../connectors/EditPatientConnector";

export default class EditPatientUseCase extends EditPatientUseCaseInterface {

    constructor(userEntity, patientEntity) {
        super();
        this.userEntity = userEntity;
        this.patientEntity = patientEntity;
        this.editPatientConnector = new EditPatientConnector(this.userEntity, this.patientEntity);
    }

    run() {
        return this.editPatientConnector.editPatient();
            
    }

    getPatientEntity() {
        return this.editPatientConnector.getPatientEntity();
    }


}