import { CommandableHttpService } from 'pip-services3-rpc-node';
import { Descriptor } from 'pip-services3-commons-node';

export class KeysHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/keys');
        this._dependencyResolver.put('controller', new Descriptor('keys', 'controller', '*', '*', '1.0'));
    }
}