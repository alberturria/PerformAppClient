import ExportSuiteConnector from '../connectors/ExportSuiteConnector.js';
import ExportSuiteUseCaseInterface from '../interfaces/useCases/ExportSuiteUseCaseInterface.js';

export default class ExportSuiteUseCase extends ExportSuiteUseCaseInterface {

    constructor(userId, suiteId) {
        super();
        this.userId = userId;
        this.suiteId = suiteId;
        this.exportSuiteConnector = new ExportSuiteConnector(this.userId, this.suiteId);
    }

    run() {
        return this.exportSuiteConnector.export();
    }
}