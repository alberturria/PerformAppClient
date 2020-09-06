import GetWaveStatisticsUseCaseInterface from "../interfaces/useCases/GetWaveStatisticsUseCaseInterface";
import GetWaveStatisticsConnector from "../connectors/GetWaveStatisticsConnector";

export default class GetWaveStatisticsUseCase extends GetWaveStatisticsUseCaseInterface {

    constructor(userEntity, suiteId) {
        super();
        this.userEntity = userEntity;
        this.suiteId = suiteId;
        this.getWaveStatisticsConnector = new GetWaveStatisticsConnector(this.userEntity, this.suiteId);
    }

    run() {
        return this.getWaveStatisticsConnector.getStatistics();
            
    }

    getStatisticsEntities() {
        return this.getWaveStatisticsConnector.getStatisticsEntities();
    }


}