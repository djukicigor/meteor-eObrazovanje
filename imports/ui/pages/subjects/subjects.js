import { Meteor } from 'meteor/meteor';

import './subjects.html';

Template.App_subjects.events({
    'click #js-apply': function (event, template) {
        const examId = event.currentTarget.getAttribute('examId');
        const subjectId = event.currentTarget.getAttribute('subjectId');
        event.currentTarget.classList.add('loading');
        Meteor.call('applyExam', { subjectId, examId }, (err, data) => {
            event.currentTarget.classList.remove('loading', 'primary');
            if (err) {
                event.currentTarget.innerHTML = "Error";
                event.currentTarget.classList.add('negative');
                throw new Meteor.Error(500, err)
            }
            event.currentTarget.innerHTML = "Applied";
            event.currentTarget.classList.add('positive');
        })
    }
});