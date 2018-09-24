import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

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
        const _id = template.data.subject._id;
        Meteor.call('editSubject', {
            _id,
            title: event.currentTarget[0].value,
            description: event.currentTarget[1].value
        }, (err, data) => {
            if (data) {
                FlowRouter.go('App.subject', { _id })
            }
        })
    }
});