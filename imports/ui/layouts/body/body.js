import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import './body.html';
import '../../../ui/components/profile/profile.js';

Template.App_body.events({
    'click #js-logout': function(event, template) {
        event.preventDefault();
        AccountsTemplates.logout();
    }
});