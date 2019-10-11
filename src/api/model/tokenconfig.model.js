import mongoose from 'mongoose'

const {
    Schema
} = mongoose;
const TokenConfigSchema = new Schema({

    tokenno: {
        type: String,
        required: true,
    },

});



export default mongoose.model('TokenConfig', TokenConfigSchema);