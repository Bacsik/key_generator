import { ConfigParams } from 'pip-services3-commons-node';

import { KeysFilePersistence } from '../../src/persistence/KeysFilePersistence';
import { KeysPersistenceFixture } from './KeysPersistenceFixture';

suite('KeysFilePersistence', () => {
    let persistence: KeysFilePersistence;
    let fixture: KeysPersistenceFixture;

    setup((done) => {
        persistence = new KeysFilePersistence('data/keys.test.json');
        persistence.configure(new ConfigParams());

        fixture = new KeysPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
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