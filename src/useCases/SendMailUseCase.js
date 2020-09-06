import SendMailUseCaseInterface from "../interfaces/useCases/SendMailUseCaseInterface";
import SendMailConnector from "../connectors/SendMailConnector";

export default class SendMailUseCase extends SendMailUseCaseInterface {

    constructor(userEntity, suiteId, selectedOptions) {
        super();
        this.userEntity = userEntity;
        this.suiteId = suiteId;
        this.selectedOptions = selectedOptions;
        this.sendMailConnector = new SendMailConnector(this.userEntity, this.suiteId, this.selectedOptions);
    }

    run() {
        return this.sendMailConnector.sendMail();
    }
}