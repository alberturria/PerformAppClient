import GetWaveStatisticsUseCaseInterface from "../interfaces/useCases/GetWaveStatisticsUseCaseInterface";
import GetWaveStatisticsConnector from "../connectors/GetWaveStatisticsConnector";

export default class GetWaveStatisticsUseCase extends GetWaveStatisticsUseCaseInterface {

    constructor(userId, suiteId) {
        super();
        this.userId = userId;
        this.suiteId = suiteId;
        this.getWaveStatisticsConnector = new GetWaveStatisticsConnector(this.userId, this.suiteId);
    }

    run() {
        return this.getWaveStatisticsConnector.getStatistics();
            
    }

    getStatisticsEntities() {
        return this.getWaveStatisticsConnector.getStatisticsEntities();
    }


}