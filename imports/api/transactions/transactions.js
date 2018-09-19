import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Transactions = new Mongo.Collection('Transactions');

Transactions.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
})

Transactions.schema = new SimpleSchema({
    amount: {
        type: Number,
        label: 'Amount'
    },
    createdAt: {
        type: Date
    },
    student: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    }
})