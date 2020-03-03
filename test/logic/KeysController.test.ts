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

const KEY1: any = {
    id: 'key_controller1',
};
const KEY2: any = {
    id: 'key_controller2',
};


suite('Keys Controller', () => {
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
                controller.createKey(
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
            // Reset the key
            (callback) => {

                controller.resetKey(
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
                    KEY1.id,
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(KEY1.id, key.id);
                        assert.equal(0, key.last_value);


                        callback();
                    }
                )
            },
            // Create the second key
            (callback) => {
                controller.createKey(
                    null,
                    KEY2.id,
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(KEY2.id, key.id);
                        assert.equal(0, key.last_value);


                        callback();
                    }
                )
            },
            // Get range with 10 id`s
            (callback) => {
                controller.nextKey(
                    null, 'key_controller2', 10,
                    (err, range) => {
                        assert.isNull(err);
                        assert.isString(range);
                        assert.equal(range, JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

                        callback();
                    }
                )
            },
            // Get range with default quantity id`s 
            (callback) => {
                controller.nextKey(
                    null, 'key_controller2', null,
                    (err, range) => {
                        assert.isNull(err);
                        assert.isString(range);
                        assert.equal(range,JSON.stringify([11,12,13,14,15]));

                        callback();
                    }
                )
            },
            // Check last_value
            (callback) => {
                controller.getKeyById(
                    null, 
                    'key_controller2',
                    (err, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(15, key.last_value);

                        callback();
                    }
                )
            },
        ], done);
    });
});