import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

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

const addUser = new ValidatedMethod({
    name: 'addUser',
    validate: new SimpleSchema({
        firstName: String,
        lastName: String,
        email: String,
        role: String,
    }).validator(),
    run({ firstName, lastName, role, email }) {
        if (!Roles.userIsInRole(this.userId, ['admin'], 'main')) {
            throw new Meteor.Error(403, "Access denied")
        }
        const newUser = Meteor.users.insert({
            createdAt: new Date(),
            emails: [
                {
                    address: email,
                    verified: false
                }
            ],
            profile: {
                firstName,
                lastName
            }
        })
        Accounts.setPassword(newUser, 'fakultet');
        Roles.addUsersToRoles(newUser, [role], 'main');
    }
})

const deleteUser = new ValidatedMethod({
    name: 'deleteUser',
    validate: new SimpleSchema({
        userId: String,
    }).validator(),
    run({ userId }) {
        if (!Roles.userIsInRole(this.userId, ['admin'], 'main')) {
            throw new Meteor.Error(403, "Access denied")
        }

        Meteor.users.remove({ _id: userId });
    }
})