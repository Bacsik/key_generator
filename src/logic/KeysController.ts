let _ = require('lodash');
let async = require('async');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { IdGenerator } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';

import { KeyV1 } from '../../src/data/version1/KeyV1';
import { KeysPersistence } from '../../src/persistence/KeysPersistence';
import { IKeysController } from './IKeysController';
import { KeysCommandSet } from './KeysCommandSet';

export class KeysController implements IKeysController, IConfigurable, IReferenceable, ICommandable {
    private _persistence: KeysPersistence;
    private _commandSet: KeysCommandSet;
    public constructor() { }

    public configure(config: ConfigParams): void {

    }

    public setReferences(references: IReferences): void {
        this._persistence = references.getOneRequired<KeysPersistence>(
            new Descriptor('keys', 'persistence', '*', '*', '1.0')
        );
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null) {
            this._commandSet = new KeysCommandSet(this);
        }

        return this._commandSet;
    }

    public getKeys(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<KeyV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getKeyById(correlationId: string, keyId: string,
        callback: (err: any, key: KeyV1) => void): void {
            this._persistence.getOneById(correlationId, keyId, callback);
    }

    public nextKey(correlationId: string, keyKey: string, number: number | null,
        callback: (err:any, range: string) => void): void {
            let last_value: number;
            let range: number[];
            if(number < 0 || number == null) number = 5;
            async.series([
                (callback) => {
                    this._persistence.nextKey(
                        correlationId,
                        keyKey,
                        number,
                        (err, key) => {
                            last_value = key ? key.last_value : null;
                            
                            callback(err);
                        }
                    );
                },
                (callback) => {
                    range = Array(number).fill(0).map((e,i)=>i+last_value+1);
                    callback();
                }
                
            ], (err) => { callback(err, JSON.stringify(range));  });
        }

    public createKey(correlationId: string, key: string,
        callback: (err: any, key: KeyV1) => void): void {
            this._persistence.createKey(correlationId, key, callback);
    }

    public resetKey(correlationId: string, key: string,
        callback: (err: any, key: KeyV1) => void): void {
            this._persistence.resetKey(correlationId, key, callback);
    }

    public deleteKeyById(correlationId: string, keyId: string,
        callback: (err: any, key: KeyV1) => void): void {
            this._persistence.deleteById(correlationId, keyId, callback);
    }

}