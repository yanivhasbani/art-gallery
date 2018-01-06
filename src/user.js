const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type: String,
        validate: {
            // Always returns bool
            validator:(name) => name.length > 2,
            message: 'Name must be longer than 2 characters'
        },
        // Validate the property to true 
        // If not, print second parameter
        required : [true, 'Name is required.']
    },
    postCount : Number
});

/*

params:
'user' - The name of the collection
The scheme

return:
The WHOLE collection of users
*/
const User = mongoose.model('user', UserSchema);

//When require('User'), return this class
module.exports = User;