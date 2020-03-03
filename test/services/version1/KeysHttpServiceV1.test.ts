let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;
let restify = require('restify');

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { KeyV1 } from '../../../src/data/version1/KeyV1';
import { KeysMemoryPersistence } from '../../../src/persistence/KeysMemoryPersistence';
import { KeysController } from '../../../src/logic/KeysController';
import { KeysHttpServiceV1 } from '../../../src/services/version1/KeysHttpServiceV1';

const KEY1: any = {
    id: 'key1',
};
const KEY2: any = {
    id: 'key2',
};



suite('KeyssHttpServiceV1', () => {
    let persistence: KeysMemoryPersistence;
    let controller: KeysController;
    let service: KeysHttpServiceV1;
    let rest: any;

    setup((done) => {
        let url = "http://localhost:3000";
        rest = restify.createJsonClient({ url: url, version: '*'});

        persistence = new KeysMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new KeysController();
        controller.configure(new ConfigParams());

        service = new KeysHttpServiceV1();
        service.configure(ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.port', 3000,
            'connection.host', 'localhost'
        ));

        let references = References.fromTuples(
            new Descriptor('keys', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('keys', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('keys', 'service', 'http', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        persistence.open(null, (err) => {
            if (err) {
                done(err);
                return;
            }

            service.open(null, done);
        });
    });

    teardown((done) => {
        service.close(null, (err) => {
            persistence.close(null, done);
        });
    });

    test('CRUD Operations', (done) => {
        let key1: KeyV1;

        async.series([
            // Create the first key
            (callback) => {
                rest.post('/v1/keys/create_key',
                    {
                        key: KEY1.id
                    },
                    (err, req, res, key) => {
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
                rest.post('/v1/keys/create_key',
                    {
                        key: KEY2.id
                    },
                    (err, req, res, key) => {
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
                rest.post('/v1/keys/get_keys',
                    {
                        filter: new FilterParams(),
                        paging: new PagingParams()
                    },
                    (err, req, res, page) => {
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
                rest.post('/v1/keys/reset_key',
                    {
                        key: key1.id
                    },
                    (err, req, res, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(key1.id, key.id);
                        assert.equal(0, key.last_value);

                        callback();
                    }
                )
            },
            // Get keys range by key
            (callback) => {
                rest.post('/v1/keys/get_keys_range',
                    {
                        key: 'key2',
                        number: 10
                    },
                    (err, req, res, range) => {

                        assert.isNull(err);
                        assert.isString(range);
                        assert.equal(range, JSON.stringify([1,2, 3, 4, 5, 6, 7, 8, 9, 10]));

                        callback();
                    }
                )
            },
            // Delete the key
            (callback) => {
                rest.post('/v1/keys/delete_key_by_id',
                    {
                        key_id: key1.id
                    },
                    (err, req, res, key) => {
                        assert.isNull(err);

                        assert.isObject(key);
                        assert.equal(key1.id, key.id);

                        callback();
                    }
                )
            },
            // Try to get deleted key
            (callback) => {
                rest.post('/v1/keys/get_key_by_id',
                    {
                        key_id: key1.id
                    },
                    (err, req, res, key) => {
                        assert.isNull(err);

                        callback();
                    }
                )
            }
        ], done);
    });

});