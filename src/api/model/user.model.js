import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs'

const {
    Schema
} = mongoose;
const UserSchema = new Schema({

    name: {
        type: String,
        required: true,
        
    },
    mobileno: {
        type: Number,
        required: true,
        index:true,
         unique:true,
         sparse:true
    },
    password: {
        type: String,
        required: true,
        
    },


});

UserSchema.pre('save',async function(){
    if (this.isModified('password') || this.isNew) {
        const salt = await bcryptjs.genSalt();
        const hash = await bcryptjs.hash(this.password, salt);
        this.password = hash;
      }
})

export default mongoose.model('User', UserSchema);