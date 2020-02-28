import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let KeysMongoDbSchema = function(collection?: string) {
    collection = collection || 'keys';

    let schema = new Schema(
        {
            _id: { type: String },
            key: { type: String, required: true },
            last_value: { type: Number, required: true },
        },
        {
            collection: collection,
            autiIndex: true
        }
    );

    schema.set('toJSON', {
        transform: function(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    return schema;
}