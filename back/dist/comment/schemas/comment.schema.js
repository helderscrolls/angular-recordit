"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moongose = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
exports.CommentSchema = new moongose.Schema({
    comments: String,
    createdAt: Date,
    message: String,
    user: String,
});
//# sourceMappingURL=comment.schema.js.map