import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';

import { Transactions } from './transactions.js';

const addTransaction = new ValidatedMethod({
    name: 'addTransaction',
    validate: new SimpleSchema({
        amount: {
            type: Number,
            min: 1
        },
        studentId: {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        }
    }).validator(),
    run({ amount, studentId }) {
        if (!Roles.userIsInRole(this.userId, ['admin'], 'main')) {
            throw new Meteor.Error(403, "Access denied")
        }

        Transactions.insert({
            amount,
            student: studentId,
            createdAt: new Date()
        })
    }
})