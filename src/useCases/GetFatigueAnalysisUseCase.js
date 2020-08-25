import GetWaveStatisticsConnector from "../connectors/GetWaveStatisticsConnector";
import GetFatigueAnalysisUseCaseInterface from "../interfaces/useCases/GetFatigueAnalysisUseCaseInterface";
import GetFatigueAnalysisConnector from "../connectors/GetFatigueAnalysisConnector";

export default class GetFatigueAnalysisUseCase extends GetFatigueAnalysisUseCaseInterface {

    constructor(userId, suiteId) {
        super();
        this.userId = userId;
        this.suiteId = suiteId;
        this.getFatigueAnalysisConnector = new GetFatigueAnalysisConnector(this.userId, this.suiteId);
    }

    run() {
        return this.getFatigueAnalysisConnector.getFatigueAnalysis();
            
    }

    getFatigueEntities() {
        return this.getFatigueAnalysisConnector.getFatigueEntities();
    }


}