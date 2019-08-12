import mongoose from 'mongoose';

let GeoLocationSchema = mongoose.Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    time : { type : Date, default: Date.now },
    activate: { type: String, required: true },
    location : {
        lat: { type: Number, required: true },
        long: { type: Number, required: true },
    }
}, {
    timestamps: true
});

export default mongoose.model('GeoLocation', GeoLocationSchema);