
import NewPatientUseCaseInterface from '../interfaces/useCases/NewPatientUseCaseInterface.js';
import NewPatientConnector from '../connectors/NewPatientConnector.js';

export default class NewPatientUseCase extends NewPatientUseCaseInterface {

    constructor(userId, patientEntity) {
        super();
        this.userId = userId;
        this.patientEntity = patientEntity;
        this.newPatientConnector = new NewPatientConnector(this.userId, this.patientEntity);
    }

    run() {
        return this.newPatientConnector.createPatient();
    }
}