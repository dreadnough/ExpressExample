/**
 * Created by User on 25.01.2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//book schema definition
var BookSchema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        price:{ type:Number, required:true},
        shortDescription:{type:String}
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('book', BookSchema);