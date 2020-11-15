import mongoose from 'mongoose';

var assormentBarcodeLineSchema = new mongoose.Schema({

    barcode: {
        type: String
    },
    qty: {
        type: Number
    }
});

var BarcodeSchema = new mongoose.Schema({

    barcode: {
        type: String
    },
    description: {
        type: String
    },
    localDescription: {
        type: String
    },
    countryOfOrigin: {
        type: String
    },
    isAssortment: {
        type: Boolean,
        default: false
    },
    isReady: {
        type: Boolean,
        default: false
    },
    numberOfBarcodes: {
        type: Number
    },
    assormentBarcodeLines: [assormentBarcodeLineSchema],
    
}, { timestamps: true });


BarcodeSchema.index({ barcode: 1}, { unique: true });

export default mongoose.model('Barcode', BarcodeSchema);