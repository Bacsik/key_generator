import { ConfigParams } from 'pip-services3-commons-node';

import { KeysMemoryPersistence } from '../../src/persistence/KeysMemoryPersistence';
import { KeysPersistenceFixture } from './KeysPersistenceFixture';

suite('KeysMemoryPersistence', () => {
    let persistence: KeysMemoryPersistence;
    let fixture: KeysPersistenceFixture;

    setup((done) => {
        persistence = new KeysMemoryPersistence();
        persistence.configure(new ConfigParams());

        fixture = new KeysPersistenceFixture(persistence);

        persistence.open(null, done);
    });

    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilters(done);
    });

});