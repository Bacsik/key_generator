let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';

import { KeyV1 } from '../data/version1/KeyV1';
import { KeysPersistence } from './KeysPersistence';

export class KeysMemoryPersistence
    extends IdentifiableMemoryPersistence<KeyV1, string>
    implements KeysPersistence {

        constructor() {
            super();
    
            this._maxPageSize = 1000;
        }
        
        private composeFilter(filter: FilterParams): any {
            filter = filter || new FilterParams();
    
            let id = filter.getAsNullableString('id');
            let key = filter.getAsNullableString('key');
            let last_value = filter.getAsNullableInteger('last_value');
    
            return (item) => {
                if (id != null && item.id != id)
                    return false;
                if (key != null && item.key != key)
                    return false;
                if (last_value != null && item.last_value != last_value)
                    return false;
                return true;
            };
        }
    
        public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
            callback: (err: any, page: DataPage<KeyV1>) => void): void {
            super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
        }
        

        public getOneById(correlationId: string, id: string,
            callback: (err: any, item: KeyV1) => void): void {
            let item = _.find(this._items, (item) => item.id == id);
            if (item != null) this._logger.trace(correlationId, "Found key by %s", id);
            else this._logger.trace(correlationId, "Cannot find key by %s", id);
            callback(null, item);
        }
        public getOneByKey(correlationId: string, key: string,
            callback: (err: any, item: KeyV1) => void): void {
            let item = _.find(this._items, (item) => item.key == key);
            if (item != null) this._logger.trace(correlationId, "Found key by %s", key);
            else this._logger.trace(correlationId, "Cannot find key by %s", key);
            callback(null, item);
        }
        public getRangeByKey(correlationId: string, key: string, number: number,
            callback: (err, key: KeyV1) => void): void {
                let item = _.find(this._items, (item) => item.key == key);
                if (item != null) {
                    this._logger.trace(correlationId, "Found key by %s", key);
                    if (number < 0) number = 5;
                    
                }
                else this._logger.trace(correlationId, "Cannot find key by %s", key);
                callback(null, item);
                item.last_value = item.last_value + number;
        }
}