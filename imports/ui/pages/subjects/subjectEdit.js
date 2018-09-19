import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';

import './subjectEdit.html';

Template.App_subjectEdit.onRendered(function () {
    $('#js-editSubject').form({
        on: 'blur',
        fields: {
            title: 'empty',
            description: 'empty',
        }
    })
});

Template.App_subjectEdit.events({
    'submit #js-editSubject': function (event, template) {
        event.preventDefault();
        Meteor.call('editSubject', {
            _id: template.data.subject._id,
            title: event.currentTarget[0].value,
            description: event.currentTarget[1].value
        })
    }
});