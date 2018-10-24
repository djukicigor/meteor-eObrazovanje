import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';

const changeImage = new ValidatedMethod({
    name: 'changeImage',
    validate: new SimpleSchema({
        image: String
    }).validator(),
    run({ image }) {
        if (!this.userId) {
            throw new Meteor.Error(403, "Access denied")
        }

        return Meteor.users.update({ _id: this.userId }, {
            $set: {
                "profile.image": image
            }
        })
    }
})

const changeFirstName = new ValidatedMethod({
    name: 'changeFirstName',
    validate: new SimpleSchema({
        name: String
    }).validator(),
    run({ name }) {
        if (!Roles.userIsInRole(this.userId, ['admin', 'teacher'], 'main')) {
            throw new Meteor.Error(403, "Access denied")
        }

        return Meteor.users.update({ _id: this.userId }, {
            $set: {
                "profile.firstName": name,
            }
        })
    }
})

const changeLastName = new ValidatedMethod({
    name: 'changeLastName',
    validate: new SimpleSchema({
        name: String
    }).validator(),
    run({ name }) {

        if (!Roles.userIsInRole(this.userId, ['admin', 'teacher'], 'main')) {
            throw new Meteor.Error(403, "Access denied")
        }

        return Meteor.users.update({ _id: this.userId }, {
            $set: {
                "profile.lastName": name,
            }
        })
    }
})