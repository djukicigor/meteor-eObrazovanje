import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import './editUser.html';

Template.App_editUser.events({
    'submit #js-editUser': function (event, template) {
        event.preventDefault();
        const form = event.currentTarget;
        const firstName = form[0].value;
        const lastName = form[1].value;
        const email = form[2].value;
        const userId = this.user._id;
        Meteor.call('editUser', { firstName, lastName, email, userId }, (err, data) => {
            if (err) {
                throw new Meteor.Error(err)
            }
            FlowRouter.go('App.users')
        })
    }
});