import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Exams = new Mongo.Collection('Exams');

Exams.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
})

Exams.schema = new SimpleSchema({
    subject: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    date: {
        type: Date,
    },
})