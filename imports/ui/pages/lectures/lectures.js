import './lectures.html';
import '../subjects/subjects.js';

Template.App_lectures.events({
    'submit #js-apply': function(event, template) {
        event.preventDefault();
        const date = new Date(event.currentTarget[0].value + "T" + event.currentTarget[1].value);
        const subjectId = event.currentTarget.getAttribute('subjectId');
        Meteor.call('makeExam', { subjectId, date }, (err, data) => {
            if (err) {
                throw new Meteor.Error(400, err);
            }
            event.currentTarget.reset()
        })
    }
});