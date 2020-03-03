import { IStringIdentifiable } from 'pip-services3-commons-node';

export class KeyV1 implements IStringIdentifiable {
    public id: string;
    public last_value: number;
}