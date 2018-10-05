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
            createdAt: 1,
            roles: 1
        },
    });
});

Meteor.publish('all.users', function allUsers() {
    if (!this.userId) {
        return this.ready();
    }
    return Meteor.users.find({}, {
        fields: {
            profile: 1,
        },
    });
})
