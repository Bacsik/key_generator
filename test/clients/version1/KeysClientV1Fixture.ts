let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { KeyV1 } from '../../../src/data/version1/KeyV1';
import { IKeysClientV1 } from '../../../src/clients/version1/IKeysClientV1';

const KEY1: any = {
    id: 'key1',
};
const KEY2: any = {
    id: 'key2',
};

export class KeysClientV1Fixture {
    private _client: IKeysClientV1;

    public constructor(client: IKeysClientV1) {
        assert.isNotNull(client);
        this._client = client;
    }

    public testCrudOperations(done) {
        let key1: KeyV1;

        async.series([
            // Create the first key
            (callback) => {
                this._client.createKey(
                    null,
                    KEY1.id,
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(KEY1.id, key.id);
                        assert.equal(0, key.last_value);

                        callback();
                    }
                );
            },
            // Create the second key
            (callback) => {
                this._client.createKey(
                    null,
                    KEY2.id,
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(KEY2.id, key.id);
                        assert.equal(0, key.last_value);

                        callback();
                    }
                );
            },
            // Get all keys
            (callback) => {
                this._client.getKeys(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        key1 = page.data[0];

                        callback();
                    }
                )
            },

            // Reset the key
            (callback) => {

                this._client.resetKey(
                    null,
                    key1.id,
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(key1.id, key.id);
                        assert.equal(0, key.last_value);

                        callback();
                    }
                )
            },
             // Get key by id
             (callback) => {
                this._client.getKeyById(
                    null, 
                    key1.id,
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(key1.id, key.id);

                        callback();
                    }
                )
            },
            // Delete the key
            (callback) => {
                this._client.deleteKeyById(
                    null,
                    key1.id,
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(key1.id, key.id);

                        callback();
                    }
                )
            },
            // Try to get deleted key
            (callback) => {
                this._client.getKeyById(
                    null,
                    key1.id,
                    (err, key) => {
                        assert.isNull(err);

                        assert.isNull(key || null);

                        callback();
                    }
                )
            }
        ], done);
    }

    public testGetKeysRange(done) {
        async.series([
              // Create the first key
              (callback) => {
                this._client.createKey(
                    null,
                    KEY1.id,
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(KEY1.id, key.id);
                        assert.equal(0, key.last_value);

                        callback();
                    }
                );
            },

            //Get id-range by key
            (callback) => {
                this._client.nextKey(
                    null, 'key1', 10,
                    (err, range) => {
                        assert.isNull(err);

                        assert.isArray(range);
                        assert.lengthOf(range, 10);
                        assert.deepEqual(range, [1,2, 3, 4, 5, 6, 7, 8, 9, 10]);

                        callback();
                    }
                )
            },
            (callback) => {
                this._client.nextKey(
                    null, 'key1', null,
                    (err, range) => {
                        assert.isNull(err);

                        assert.isArray(range);
                        assert.lengthOf(range, 5);
                        assert.deepEqual(range, [11, 12, 13, 14, 15]);

                        callback();
                    }
                )
            },
        ], done);
    }
}

