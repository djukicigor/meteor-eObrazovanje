import { ReactiveVar } from 'meteor/reactive-var';

import './users.html';

Template.App_users.onCreated(function () {
    this.users = new ReactiveVar(this.data.users);
    this.searchString = new ReactiveVar('');
    const usersSub = Meteor.subscribe('all.users');
    this.autorun(() => {
        if (usersSub.ready()) {
            this.users.set(Meteor.users.find({ 'roles.main': { $in: ['student', 'teacher'] } }).fetch())
        }
    });
});

Template.App_users.onRendered(function() {
    $('.selection.dropdown').dropdown();
});

Template.App_users.events({
    'submit #js-addUser': (event, templateInstance) => {
        event.preventDefault();
        const form = event.currentTarget;
        const firstName = form[0].value;
        const lastName = form[1].value;
        const email = form[2].value;
        const role = form[3].value;
        Meteor.call('addUser', {firstName, lastName, email, role}, (err, data) => {
            if (err) {
                throw new Meteor.Error(err);
            }
        })
    },
    'click #js-delete': (event, templateInstance) => {
        const userId = event.currentTarget.getAttribute("userId");
        Meteor.call('deleteUser', { userId }, (err, data) => {
            if (err) {
                throw new Meteor.Error(err);
            }
        })
    },
    'keyup #js-search': (event, templateInstance) => {
        if (event.currentTarget.value.length > 2) {
            templateInstance.searchString.set(event.currentTarget.value)
        } else {
            templateInstance.searchString.set('')
        }
    }
});

Template.App_users.helpers({
    users: () => {
        return Template.instance().users.get().filter(i => {
            let reg = new RegExp(Template.instance().searchString.get(), 'i')
            return reg.test(i.profile.firstName) || reg.test(i.profile.lastName) || reg.test(i.roles.main)
        })
    },
});