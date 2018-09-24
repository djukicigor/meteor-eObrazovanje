import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { _ } from 'meteor/underscore';

import { Exams } from '../exams.js';
import { Subjects } from '../../subjects/subjects.js';

Meteor.publish('all.exams', function allExams() {
    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin'], 'main')) {
        return this.ready();
    }
    return Exams.find({}, {
        subject: 1,
        date: 1,
        results: 1
    })
})

Meteor.publish('passing.exams', function passingExams() {
    if (!this.userId) {
        return this.ready();
    }

    let subjectIds = [];

    if (Roles.userIsInRole(this.userId, ['teacher'], 'main')) {
        const subjects = Subjects.find({
            lecturers: this.userId
        }).fetch();
        subjects.forEach(sub => subjectIds.push(sub._id));
    } else {
        const subjects = Subjects.find({
            students: this.userId
        }).fetch();
        subjects.forEach(sub => subjectIds.push(sub._id));
    }

    return Exams.find({
        subject: { $in: subjectIds }
    }, {
        fields: {
            date: 1
        }
    })
})