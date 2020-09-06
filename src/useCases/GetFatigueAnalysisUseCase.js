import GetWaveStatisticsConnector from "../connectors/GetWaveStatisticsConnector";
import GetFatigueAnalysisUseCaseInterface from "../interfaces/useCases/GetFatigueAnalysisUseCaseInterface";
import GetFatigueAnalysisConnector from "../connectors/GetFatigueAnalysisConnector";

export default class GetFatigueAnalysisUseCase extends GetFatigueAnalysisUseCaseInterface {

    constructor(userEntity, suiteId) {
        super();
        this.userEntity = userEntity;
        this.suiteId = suiteId;
        this.getFatigueAnalysisConnector = new GetFatigueAnalysisConnector(this.userEntity, this.suiteId);
    }

    run() {
        return this.getFatigueAnalysisConnector.getFatigueAnalysis();
            
    }

    getFatigueEntities() {
        return this.getFatigueAnalysisConnector.getFatigueEntities();
    }


}