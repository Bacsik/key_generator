import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { KeysMemoryPersistence } from '../../../src/persistence/KeysMemoryPersistence';
import { KeysController } from '../../../src/logic/KeysController';
import { KeysHttpServiceV1 } from '../../../src/services/version1/KeysHttpServiceV1';
import { KeysHttpClientV1 } from '../../../src/clients/version1/KeysHttpClientV1';
import { KeysClientV1Fixture } from './KeysClientV1Fixture';

suite('KeysHttpClientV1', () => {
    let persistence: KeysMemoryPersistence;
    let controller: KeysController;
    let service: KeysHttpServiceV1;
    let client: KeysHttpClientV1;
    let fixture: KeysClientV1Fixture;

    setup((done) => {
        persistence = new KeysMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new KeysController();
        controller.configure(new ConfigParams());

        let httpConfig = ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.port', 3000,
            'connection.host', 'localhost'
        );

        service = new KeysHttpServiceV1();
        service.configure(httpConfig);

        client = new KeysHttpClientV1();
        client.configure(httpConfig);

        let references = References.fromTuples(
            new Descriptor('keys', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('keys', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('keys', 'service', 'http', 'default', '1.0'), service,
            new Descriptor('keys', 'client', 'http', 'default', '1.0'), client
        );
        controller.setReferences(references);
        service.setReferences(references);
        client.setReferences(references);

        fixture = new KeysClientV1Fixture(client);

        persistence.open(null, (err) => {
            if (err) {
                done(err);
                return;
            }

            service.open(null, (err) => {
                if (err) {
                    done(err);
                    return;
                }

                client.open(null, done);
            });
        });
    });

    teardown((done) => {
        client.close(null, (err) => {
            service.close(null, (err) => {
                persistence.close(null, done);
            });    
        });
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get keys range', (done) => {
        fixture.testGetKeysRange(done);
    });

});