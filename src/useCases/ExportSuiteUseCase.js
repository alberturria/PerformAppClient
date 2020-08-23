import ExportSuiteConnector from '../connectors/ExportSuiteConnector.js';
import ExportSuiteUseCaseInterface from '../interfaces/useCases/ExportSuiteUseCaseInterface.js';

export default class ExportSuiteUseCase extends ExportSuiteUseCaseInterface {

    constructor(userId, suiteId, selectOptions) {
        super();
        this.userId = userId;
        this.suiteId = suiteId;
        this.selectOptions = selectOptions;
        this.exportSuiteConnector = new ExportSuiteConnector(this.userId, this.suiteId, this.selectOptions);
    }

    run() {
        return this.exportSuiteConnector.export();
    }
}