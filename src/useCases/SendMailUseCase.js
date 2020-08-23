import SendMailUseCaseInterface from "../interfaces/useCases/SendMailUseCaseInterface";
import SendMailConnector from "../connectors/SendMailConnector";

export default class SendMailUseCase extends SendMailUseCaseInterface {

    constructor(userId, suiteId, selectedOptions) {
        super();
        this.userId = userId;
        this.suiteId = suiteId;
        this.selectedOptions = selectedOptions;
        this.sendMailConnector = new SendMailConnector(this.userId, this.suiteId, this.selectedOptions);
    }

    run() {
        return this.sendMailConnector.sendMail();
    }
}