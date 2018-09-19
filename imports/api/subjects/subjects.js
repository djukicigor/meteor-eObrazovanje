import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Subjects = new Mongo.Collection('Subjects');

Subjects.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
})

Subjects.schema = new SimpleSchema({
    title: {
        type: String,
        label: 'Title'
    },
    Description: {
        type: String
    },
    students: {
        type: Array,
    },
    'students.$': {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    lecturers: {
        type: Array
    },
    'lecturers.$': {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    }
})