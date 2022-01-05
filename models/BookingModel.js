const mongoose = require('mongoose');

// Create the schema
const BookingSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: false
        }
    }
)

// Create the model
const BookingModel = mongoose.model('booking', BookingSchema);

// Export the model
module.exports = BookingModel;