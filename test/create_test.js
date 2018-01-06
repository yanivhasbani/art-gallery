const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('saves a user', (done) => {
        const joe = new User({
            name: "Joe"
        });
        
        //Does the actual saving
        joe.save()
            .then(() => {
                assert(!joe.isNew);
                done();
            });
    });
});