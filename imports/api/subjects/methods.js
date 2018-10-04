import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';

import { Subjects } from './subjects.js';

const editSubject = new ValidatedMethod({
    name: 'editSubject',
    validate: new SimpleSchema({
        _id: { type: String, regEx: SimpleSchema.RegEx.Id },
        title: { type: String },
        description: { type: String }
    }).validator({ clean: true }),
    run({ _id, title, description }) {
        if (!Roles.userIsInRole(this.userId, ['teacher'], _id) && !Roles.userIsInRole(this.userId, ['admin'], 'main')) {
            throw new Meteor.Error(403, "Access denied")
        }
        if (title === '' || description === '') {
            return false;
        }
        return Subjects.update({ _id }, {
            $set: {
                title,
                description,
            }
        });
    },
});