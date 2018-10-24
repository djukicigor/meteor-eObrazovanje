import { Roles } from 'meteor/alanning:roles';

import './profile.html';

Template.App_profile.onCreated(function () {
    this.encodeImageFileAsURL = (element) => {
        var file = element.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            Meteor.call('changeImage', { image: reader.result }, (err, data) => {

            })
        }
        reader.readAsDataURL(file);
    }
});

Template.App_profile.events({
    'change #js-image': (event, template) => {
        template.encodeImageFileAsURL(event.target);
    },
    'click #js-firstName': (event, template) => {
        if (Roles.userIsInRole(Meteor.userId(), ['admin', 'teacher'], 'main')) {
            event.currentTarget.classList.add('hidden-input')
            document.getElementById('js-firstNameInput').classList.remove('hidden-input')
            document.getElementById('js-firstNameInput').focus();
        }
    },
    'click #js-lastName': (event, template) => {
        if (Roles.userIsInRole(Meteor.userId(), ['admin', 'teacher'], 'main')) {
            event.currentTarget.classList.add('hidden-input')
            document.getElementById('js-lastNameInput').classList.remove('hidden-input')
            document.getElementById('js-lastNameInput').focus();
        }
    },
    'blur #js-firstNameInput': (event, template) => {
        Meteor.call('changeFirstName', { name: event.currentTarget.value }, (err, data) => {

        })
        event.currentTarget.classList.add('hidden-input')
        document.getElementById('js-firstName').classList.remove('hidden-input')
    },
    'blur #js-lastNameInput': (event, template) => {
        Meteor.call('changeLastName', { name: event.currentTarget.value }, (err, data) => {

        })
        event.currentTarget.classList.add('hidden-input')
        document.getElementById('js-lastName').classList.remove('hidden-input')
    },
    'keydown #js-firstNameInput, keydown #js-lastNameInput'(event) {
        // ESC or ENTER
        if (event.which === 13) {
          event.preventDefault();
          event.target.blur();
        }
      },
});