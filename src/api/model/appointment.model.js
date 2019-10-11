import mongoose from 'mongoose'

const {
    Schema
} = mongoose;
const AppointmentSchema = new Schema({
    tokenno: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phoneno: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
    },
    note: {
        type: String,
    },
    status: {
        type: String,
    }

});



export default mongoose.model('Appointment', AppointmentSchema);