import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import './body.html';

Template.App_body.events({
    'click #js-item': function(event, template) {
        const el = document.getElementsByClassName("menu-item active")[0];
        el.classList.remove('active');
        event.currentTarget.classList.add('active');
    },
    'click #js-logout': function(event, template) {
        event.preventDefault();
        AccountsTemplates.logout();
    }
});