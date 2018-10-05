import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { ReactiveVar } from 'meteor/reactive-var';

import './body.html';
import '../../../ui/components/profile/profile.js';

Template.App_body.onCreated(function() {
    this.user = new ReactiveVar(null)
    Tracker.autorun(() => {
        userSub = Meteor.subscribe('user.info');
        if (userSub.ready()) {
            this.user.set(Meteor.users.findOne({}))
        }
    });
});

Template.App_body.events({
    'click #js-logout': function(event, template) {
        event.preventDefault();
        AccountsTemplates.logout();
    }
});

Template.App_body.helpers({
    user: function() {
        console.log(Template.instance().user.get());
        return Template.instance().user.get();
    }
});