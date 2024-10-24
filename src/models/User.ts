import { Schema, model, Document, ObjectId } from 'mongoose';

interface IUser extends Document {
    _id: ObjectId;
    username: string;
    email: string;
    thoughts: ObjectId[];
    friends: ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, },
        thoughts: [{type: Schema.Types.ObjectId, ref: 'thought' }],
        friends: [{type: Schema.Types.ObjectId, ref: 'user'}]
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }

);

// Create a virtual property `friendCount ` that gets the number of friendCount for user
userSchema.virtual('friendCount').get(function () {
    return this.friends?.length;
});

//Initialize user model
const User = model('user', userSchema);

export default User;