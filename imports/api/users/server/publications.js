import { Meteor } from 'meteor/meteor';

Meteor.publish('user.info', function profilePublish() {
    if (!this.userId) {
        return this.ready();
    }
    return Meteor.users.find({
        _id: this.userId
    }, {
        fields: {
            emails: 1,
            profile: 1,
            createdAt: 1
        },
    });
});
