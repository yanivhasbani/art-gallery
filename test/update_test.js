const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({name:'Joe', postCount:0});
        joe.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'JJJ')
                done(); 
            })
    }

    it('instance set n save', (done) => {
        //Remove instance
        joe.set('name', 'JJJ');
        assertName(joe.save(), done)
    });

    it('instance update', (done) => {
        //Remove multiple instances 
        assertName(joe.update({name: 'JJJ'}), done);
    });

    it('Model class update', (done) => {
        assertName(User.update({name:'Joe'}, {name: 'JJJ'}), done);
    });

    it('Model class update one record', (done) => {
        assertName(User.findOneAndUpdate({name:'Joe'}, {name: 'JJJ'}), done);
    });


    it('class method findByIdAndUpdate', (done) => {
        assertName(
            User.findByIdAndUpdate(joe._id, {name: 'JJJ'}),
            done
        );  
    });

    // Mongo update modifiers(operators)
    // http://lmgtfy.com/?q=mongo+update+modifiers
    it('All users can have their postcount incremented by 1', (done) => {
        // Note: we are not using the scheme but the DNb itself!
        // This will mean that the whole find + update will be done inside mongo
        // In such case, mongo will also take care of concurrency of the DB and
        // sync between queries.
        User.update({name: 'Joe'}, {$inc: {postCount: 10}})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user.postCount === 10);
                done();
            })
    });
});