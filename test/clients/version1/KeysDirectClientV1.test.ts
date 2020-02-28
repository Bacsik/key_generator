
import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { KeysMemoryPersistence } from '../../../src/persistence/KeysMemoryPersistence';
import { KeysController } from '../../../src/logic/KeysController';
import { KeysDirectClientV1 } from '../../../src/clients/version1/KeysDirectClientV1';
import { KeysClientV1Fixture } from './KeysClientV1Fixture';

suite('KeysDirectClientV1', () => {
    let persistence: KeysMemoryPersistence;
    let controller: KeysController;
    let client: KeysDirectClientV1;
    let fixture: KeysClientV1Fixture;

    setup((done) => {
        persistence = new KeysMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new KeysController();
        controller.configure(new ConfigParams());

        client = new KeysDirectClientV1();

        let references = References.fromTuples(
            new Descriptor('keys', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('keys', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('keys', 'client', 'direct', 'default', '1.0'), client
        );

        controller.setReferences(references);
        client.setReferences(references);

        fixture = new KeysClientV1Fixture(client);

        persistence.open(null, done);
    });

    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get keys range', (done) => {
        fixture.testGetKeysRange(done);
    });
});