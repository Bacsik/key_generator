import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class KeyV1Schema extends ObjectSchema {
    
    public constructor()
    {
        super();
        this.withRequiredProperty('id', TypeCode.String);
        this.withRequiredProperty('last_value', TypeCode.Integer);
    }
}