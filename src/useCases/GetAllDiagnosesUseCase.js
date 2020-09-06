import GetAllDiagnosesUseCaseInterface from "../interfaces/useCases/GetAllDiagnosesUseCaseInterface";
import GetAllDiagnosesConnector from "../connectors/GetAllDiagnosesConnector";

export default class GetAllDiagnosesUseCase extends GetAllDiagnosesUseCaseInterface {

    constructor(userEntity) {
        super();
        this.userEntity = userEntity;
        this.getAllDiagnosesConnector = new GetAllDiagnosesConnector(this.userEntity);
    }

    run() {
        return this.getAllDiagnosesConnector.getAllDiagnoses();
            
    }

    getResult() {
        return this.getAllDiagnosesConnector.getDiagnoses();
    }
}