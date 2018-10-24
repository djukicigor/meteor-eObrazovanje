import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

const changeImage = new ValidatedMethod({
    name: 'changeImage',
    validate: new SimpleSchema({
        image: String
    }).validator(),
    run({ image }) {
        if (!this.userId) {
            throw new Meteor.Error(403, "Access denied")
        }

        return Meteor.users.update({ _id: this.userId }, {
            $set: {
                "profile.image": image
            }
        })
    }
})