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
    'change #js-image': function (event, template) {
        template.encodeImageFileAsURL(event.target);
    }
});