import GetAllDiagnosesUseCaseInterface from "../interfaces/useCases/GetAllDiagnosesUseCaseInterface";
import GetAllDiagnosesConnector from "../connectors/GetAllDiagnosesConnector";

export default class GetAllDiagnosesUseCase extends GetAllDiagnosesUseCaseInterface {

    constructor(userId) {
        super();
        this.userId = userId;
        this.getAllDiagnosesConnector = new GetAllDiagnosesConnector(this.userId);
    }

    run() {
        return this.getAllDiagnosesConnector.getAllDiagnoses();
            
    }

    getResult() {
        return this.getAllDiagnosesConnector.getDiagnoses();
    }
}