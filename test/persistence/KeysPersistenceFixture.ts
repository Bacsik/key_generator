let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { KeyV1 } from '../../src/data/version1/KeyV1';
import { KeysPersistence } from '../../src/persistence/KeysPersistence';

const KEY1: any = {
    id: 'key1',
};
const KEY2: any = {
    id: 'key2',
};

const KEY3: any = {
    id: 'key3',
};

export class KeysPersistenceFixture {
    private _persistence: KeysPersistence;

    public constructor(persistence: KeysPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateKeys(done) {
        async.series([
            // Create the first key
            (callback) => {
                this._persistence.createKey(
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
                this._persistence.createKey(
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
            // Create the third key
            (callback) => {
                this._persistence.createKey(
                    null,
                    KEY3.id,
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(KEY3.id, key.id);
                        assert.equal(0, key.last_value);

                        callback();
                    }
                );
            },
        ], done);
    }

    public testCrudOperations(done) {
        let key1: KeyV1;

        async.series([
            // Create items
            (callback) => {
                this.testCreateKeys(callback);
            },
            // Get all keys
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        key1 = page.data[0];

                        callback();
                    }
                )
            },
            // Reset the key
            (callback) => {

                this._persistence.resetKey(
                    null,
                    'key3',
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal('key3', key.id);
                        assert.equal(0, key.last_value);

                        callback();
                    }
                )
            },
            // Get key by id
            (callback) => {
                this._persistence.getOneById(
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
                this._persistence.deleteById(
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
                this._persistence.getOneById(
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

    public testGetWithFilters(done) {
        async.series([
            // Create items
            (callback) => {
                this.testCreateKeys(callback);
            },
            // Filter by id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'key', 'key3'
                    ),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                )
            },
            // Filter by id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'key', 'key2'
                    ),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                )
            },

            // Filter by last_value
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'last_value', '0'
                    ),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 3);

                        callback();
                    }
                )
            },



            //Get id-range by key
            (callback) => {
                this._persistence.nextKey(
                    null, 
                    'key3',
                    2,
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(key.last_value, 0);

                        callback();
                    }
                )
            },
            //Check changed last_value
            (callback) => {
                this._persistence.getOneById(
                    null, 
                    'key3',
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(key.last_value, 2);

                        callback();
                    }
                )
            },
        ], done);
    }
}
