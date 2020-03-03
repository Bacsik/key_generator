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
    
            let key = filter.getAsNullableString('key');
            let last_value = filter.getAsNullableInteger('last_value');
    
            return (item) => {
                if (key != null && item.id != key)
                    return false;
                if (last_value != null && item.last_value != last_value)
                    return false;
                return true;
            };
        }
    
        public createKey(correlationId: string,  key: string,
            
            callback: (err: any, item: KeyV1) => void): void {
                let key_model = new KeyV1;
                key_model.id = key;
                key_model.last_value = 0;
                super.create(null,key_model,
                    (err, item) => {
                        if (item != null) this._logger.trace(correlationId, "Create key by %s", key);
                        else this._logger.trace(correlationId, "Cannot create key by %s", key);
                        callback(err, item);
                    });
        }
        
        public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
            callback: (err: any, page: DataPage<KeyV1>) => void): void {
            super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
        }
        

        public getOneById(correlationId: string, key: string,
            callback: (err: any, item: KeyV1) => void): void {
            let item = _.find(this._items, (item) => item.id == key);
            if (item != null) this._logger.trace(correlationId, "Found key by %s", key);
            else this._logger.trace(correlationId, "Cannot find key by %s", key);
            callback(null, item);
        }

        public nextKey(correlationId: string, key: string, number: number,
            callback: (err, key_model: KeyV1) => void): void {
                let item = _.find(this._items, (item) => item.id == key);
                if (item != null) {
                    this._logger.trace(correlationId, "Found key by %s", key);
                    if (number < 0) number = 5;
                    
                }
                else this._logger.trace(correlationId, "Cannot find key by %s", key);
                callback(null, item);
                item.last_value = item.last_value + number;
        }
        public resetKey(correlationId: string, key: string, 
            callback: (err, key_model: KeyV1) => void): void {
                let item = _.find(this._items, (item) => item.id == key);
                if (item != null) {
                    item.last_value = 0;
                    this._logger.trace(correlationId, "Reset key by %s", key);
                }
                else this._logger.trace(correlationId, "Cannot reset key by %s", key);
                callback(null, item);

        }
}