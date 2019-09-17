"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moongose = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
exports.VideoSchema = new moongose.Schema({
    createdAt: Date,
    description: String,
    exerciceFile: String,
    finished: Boolean,
    name: String,
    position: Number,
    chapterPosition: Number,
    videoDuration: Number,
    videoFile: String,
});
//# sourceMappingURL=video.schema.js.map