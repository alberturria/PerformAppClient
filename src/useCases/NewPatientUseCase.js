
import NewPatientUseCaseInterface from '../interfaces/useCases/NewPatientUseCaseInterface.js';
import NewPatientConnector from '../connectors/NewPatientConnector.js';

export default class NewPatientUseCase extends NewPatientUseCaseInterface {

    constructor(userEntity, patientEntity) {
        super();
        this.userEntity = userEntity;
        this.patientEntity = patientEntity;
        this.newPatientConnector = new NewPatientConnector(this.userEntity, this.patientEntity);
    }

    run() {
        return this.newPatientConnector.createPatient();
    }
}