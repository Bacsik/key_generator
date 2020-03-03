import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { KeyV1 } from '../../src/data/version1/KeyV1';
import { IKeysController } from './IKeysController';
export declare class KeysController implements IKeysController, IConfigurable, IReferenceable, ICommandable {
    private _persistence;
    private _commandSet;
    constructor();
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getKeys(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<KeyV1>) => void): void;
    getKeyById(correlationId: string, keyId: string, callback: (err: any, key: KeyV1) => void): void;
    nextKey(correlationId: string, keyKey: string, number: number | null, callback: (err: any, range: number[]) => void): void;
    createKey(correlationId: string, key: string, callback: (err: any, key: KeyV1) => void): void;
    resetKey(correlationId: string, key: string, callback: (err: any, key: KeyV1) => void): void;
    deleteKeyById(correlationId: string, keyId: string, callback: (err: any, key: KeyV1) => void): void;
}
