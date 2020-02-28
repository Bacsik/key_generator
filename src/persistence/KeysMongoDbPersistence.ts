let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { KeyV1 } from '../data/version1/KeyV1';
import { KeysPersistence } from './KeysPersistence';
import { KeysMongoDbSchema } from './KeysMongoDbSchema';

export class KeysMongoDbPersistence
    extends IdentifiableMongoDbPersistence<KeyV1, string>
    implements KeysPersistence {

    constructor() {
        super('keys', KeysMongoDbSchema());
        this._maxPageSize = 1000;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let id = filter.getAsNullableString('id');
        if (id != null) 
            criteria.push({ _id: id });

        let key = filter.getAsNullableString('key');
        if (key != null) 
            criteria.push({ key: key });


            
        let last_value = filter.getAsNullableString('last_value');
        if (last_value != null)
            criteria.push({ last_value: last_value });

        return criteria.length > 0 ? { $and: criteria } : null;
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<KeyV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public getOneById(correlationId: string, id: string,
        callback: (err: any, item: KeyV1) => void): void {

        let criteria = {
            _id: id
        };

        this._model.findOne(criteria, (err, item) => {
            item = this.convertFromPublic(item);

            if (item != null) this._logger.trace(correlationId, "Found key by %s", id);
            else this._logger.trace(correlationId, "Cannot find key by %s", id);

            callback(err, item);
        });
    }

    public getOneByKey(correlationId: string, key: string,
        callback: (err: any, item: KeyV1) => void): void {

        let criteria = {
            key: key
        };

        this._model.findOne(criteria, (err, item) => {
            item = this.convertFromPublic(item);

            if (item != null) this._logger.trace(correlationId, "Found key by %s", key);
            else this._logger.trace(correlationId, "Cannot find key by %s", key);

            callback(err, item);
        });
    }
    public getRangeByKey(correlationId: string, key: string, number: number,
        callback: (err, item: KeyV1) => void): void {
            let criteria = {
                key: key
            };
            if (number < 0) number = 5;
            this._model.findOneAndUpdate(criteria,{$inc:{last_value:number}}, (err, item) => {
                item = this.convertFromPublic(item);
                callback(err, item);
            });

    }
}