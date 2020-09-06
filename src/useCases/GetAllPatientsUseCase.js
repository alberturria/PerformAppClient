import GetAllPatientsUseCaseInterface from "../interfaces/useCases/GetAllPatientsUseCaseInterface";
import GetAllPatientsConnector from "../connectors/GetAllPatientsConnector";

export default class GetAllPatientsUseCase extends GetAllPatientsUseCaseInterface {

    constructor(userEntity) {
        super();
        this.userEntity = userEntity;
        this.getAllPatientsConnector = new GetAllPatientsConnector(this.userEntity);
    }

    run() {
        return this.getAllPatientsConnector.getAllPatients();
            
    }

    getResult() {
        return this.getAllPatientsConnector.getPatients();
    }
}