let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { KeyV1 } from '../../src/data/version1/KeyV1';
import { KeysPersistence } from '../../src/persistence/KeysPersistence';

const KEY1: KeyV1 = {
    id: '1',
    key: 'key1',
    last_value: 1
};
const KEY2: KeyV1 = {
    id: '2',
    key: 'key2',
    last_value: 12
};

const KEY3: KeyV1 = {
    id: '3',
    key: 'key3',
    last_value: 15
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
                this._persistence.create(
                    null,
                    KEY1,
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(KEY1.id, key.id);
                        assert.equal(KEY1.key, key.key);
                        assert.equal(KEY1.last_value, key.last_value);

                        callback();
                    }
                );
            },
            // Create the second key
            (callback) => {
                this._persistence.create(
                    null,
                    KEY2,
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(KEY2.id, key.id);
                        assert.equal(KEY2.key, key.key);
                        assert.equal(KEY2.last_value, key.last_value);

                        callback();
                    }
                );
            },
            // Create the third key
            (callback) => {
                this._persistence.create(
                    null,
                    KEY3,
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(KEY3.id, key.id);
                        assert.equal(KEY3.key, key.key);
                        assert.equal(KEY3.last_value, key.last_value);

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
            // Update the key
            (callback) => {
                key1.key = 'ABC';

                this._persistence.update(
                    null,
                    key1,
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(key1.id, key.id);
                        assert.equal('ABC', key.key);

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
                        'id', '3'
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
                        'id', '2'
                    ),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                )
            },
            // Filter by key
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
                        'last_value', '12'
                    ),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                )
            },

            //Get by key
            (callback) => {
                this._persistence.getOneByKey(
                    null, 
                    'key3',
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal('key3', key.key);

                        callback();
                    }
                )
            },

            //Get id-range by key
            (callback) => {
                this._persistence.getRangeByKey(
                    null, 
                    'key3',
                    2,
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(key.last_value, 15);

                        callback();
                    }
                )
            },
            //Check changed last_value
            (callback) => {
                this._persistence.getOneByKey(
                    null, 
                    'key3',
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(key.last_value, 17);

                        callback();
                    }
                )
            },
        ], done);
    }
}
