import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import { Subjects } from '../subjects.js';

Meteor.publish('subjects', function subjectsPublish() {
    if (!this.userId) {
        return this.ready();
    }
    if (Roles.userIsInRole(this.userId, ['admin'])) {
        return Subjects.find({}, {
            fields: {
                title: 1,
                description: 1
            },
        });
    } else if (Roles.userIsInRole(this.userId, ['teacher'], 'lecturer')) {
        return Subjects.find({
            lecturers: this.userId
        }, {
            fields: {
                title: 1,
                description: 1
            },
        });
    } else {
        return Subjects.find({
            students: this.userId
        }, {
            fields: {
                title: 1,
                description: 1
            },
        });
    }
});