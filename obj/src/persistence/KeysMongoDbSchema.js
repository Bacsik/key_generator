"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.KeysMongoDbSchema = function (collection) {
    collection = collection || 'keys';
    let schema = new mongoose_1.Schema({
        _id: { type: String },
        key: { type: String, required: true },
        last_value: { type: Number, required: true },
    }, {
        collection: collection,
        autiIndex: true
    });
    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    return schema;
};
//# sourceMappingURL=KeysMongoDbSchema.js.map