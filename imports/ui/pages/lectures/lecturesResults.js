import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import './lecturesResults.html';

Template.App_lecturesResults.events({
    'submit #js-mark': function(event, template) {
        event.preventDefault();
        const examId = FlowRouter.getParam('_id');
        const studentId = event.currentTarget.getAttribute('studentId');
        const result = Number(event.currentTarget[0].value);
        Meteor.call('setResult', { examId, studentId, result }, (err, data) => {
            if (err) {
                throw Meteor.Error(400, err)
            }
        })
    }
});