import { ProcessContainer } from 'pip-services3-container-node';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

import {KeysServiceFactory} from '../build/KeysServiceFactory';

export class KeysProcess extends ProcessContainer{
    public constructor(){
        super('keys', 'Keys microservice');

        this._factories.add(new KeysServiceFactory());
        this._factories.add(new DefaultRpcFactory());
    }
}