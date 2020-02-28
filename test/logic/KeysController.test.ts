let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { KeyV1 } from '../../src/data/version1/KeyV1';
import { KeysMemoryPersistence } from '../../src/persistence/KeysMemoryPersistence';
import { KeysController } from '../../src/logic/KeysController';

const KEY1: KeyV1 = {
    id: '1',
    key: 'key_controller1',
    last_value: 12
};
const KEY2: KeyV1 = {
    id: '2',
    key: 'key_controller2',
    last_value: 1
};

const KEY3: KeyV1 = {
    id: '3',
    key: 'key_controller3',
    last_value: 15
};

suite('KeyssController', () => {
    let persistence: KeysMemoryPersistence;
    let controller: KeysController;

    setup((done) => {
        persistence = new KeysMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new KeysController();
        controller.configure(new ConfigParams());

        let references = References.fromTuples(
            new Descriptor('keys', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('keys', 'controller', 'default', 'default', '1.0'), controller
        );

        controller.setReferences(references);

        persistence.open(null, done);
    });

    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        let key1: KeyV1;

        async.series([
            // Create the first key
            (callback) => {
                controller.createKey(
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
                controller.createKey(
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
            // Get all keys
            (callback) => {
                controller.getKeys(
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
            // Update the key
            (callback) => {
                key1.key = 'ABC';

                controller.updateKey(
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
                controller.getKeyById(
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
            // Get key by key
            (callback) => {
                controller.getKeyByKey(
                    null, 
                    key1.key,
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(key1.key, key.key);

                        callback();
                    }
                )
            },
            // Delete the key
            (callback) => {
                controller.deleteKeyById(
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
                controller.getKeyById(
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
    });


    test('Get keys range', (done) => {
        async.series([
           // Create the first key
            (callback) => {
                controller.createKey(
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
                )
            },
            // Create the second key
            (callback) => {
                controller.createKey(
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
                )
            },
            // Get range with 10 id`s 2-11
            (callback) => {
                controller.getKeysRangeByKey(
                    null, 'key_controller2', 10,
                    (err, range) => {
                        assert.isNull(err);

                        assert.isArray(range);
                        assert.lengthOf(range, 10);
                        assert.deepEqual(range, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

                        callback();
                    }
                )
            },
            // Get range with default quantity id`s  12-16
            (callback) => {
                controller.getKeysRangeByKey(
                    null, 'key_controller2', null,
                    (err, range) => {
                        assert.isNull(err);
                        assert.isArray(range);
                        assert.lengthOf(range, 5);
                        assert.deepEqual(range,[12,13,14,15,16]);

                        callback();
                    }
                )
            },
            // Check last_value
            (callback) => {
                controller.getKeyByKey(
                    null, 
                    'key_controller2',
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal('16', key.last_value);

                        callback();
                    }
                )
            },
        ], done);
    });
});