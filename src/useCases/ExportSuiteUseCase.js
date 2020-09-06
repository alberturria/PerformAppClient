import ExportSuiteConnector from '../connectors/ExportSuiteConnector.js';
import ExportSuiteUseCaseInterface from '../interfaces/useCases/ExportSuiteUseCaseInterface.js';

export default class ExportSuiteUseCase extends ExportSuiteUseCaseInterface {

    constructor(userEntity, suiteId, selectOptions) {
        super();
        this.userEntity = userEntity;
        this.suiteId = suiteId;
        this.selectOptions = selectOptions;
        this.exportSuiteConnector = new ExportSuiteConnector(this.userEntity, this.suiteId, this.selectOptions);
    }

    run() {
        return this.exportSuiteConnector.export();
    }
}