const assert = require('assert');
const User = require('../src/user');

// Test env with server for develop

describe('Validation test', () => {
    it('Requiers a user name', (done) => {
        const user = new User({ name: undefined });
        // Syncronius validation
        const validationResult = user.validateSync();

        // ASync validation - same as in real life
        // user.validate((validationResult) => {

        // });

        const {message} = validationResult.errors.name;
        assert(message === 'Name is required.');
        done();
    });

    it('Requirs a user name longer than 2 characters', () => {
        const user = new User({ name:'Al' });
        const validationResult = user.validateSync();
        const {message} = validationResult.errors.name;
        
        assert(message === 'Name must be longer than 2 characters');
    });

    it('disallows invalid records from being saved', (done) => {
        const user = new User({ name:'Al' });
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;
                console.log(message);
                assert(message === 'Name must be longer than 2 characters');
                done();
            });
    });
});