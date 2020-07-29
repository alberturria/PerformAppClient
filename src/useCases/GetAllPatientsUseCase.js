import GetAllPatientsUseCaseInterface from "../interfaces/useCases/GetAllPatientsUseCaseInterface";
import GetAllPatientsConnector from "../connectors/GetAllPatientsConnector";

export default class GetAllPatientsUseCase extends GetAllPatientsUseCaseInterface {

    constructor(userId) {
        super();
        this.userId = userId;
        this.getAllPatientsConnector = new GetAllPatientsConnector(this.userId);
    }

    run() {
        return this.getAllPatientsConnector.getAllPatients();
            
    }

    getResult() {
        return this.getAllPatientsConnector.getPatients();
    }
}