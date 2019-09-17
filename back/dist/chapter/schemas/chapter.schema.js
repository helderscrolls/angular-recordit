"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moongose = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const video_schema_1 = require("src/video/schemas/video.schema");
exports.ChapterSchema = new moongose.Schema({
    description: String,
    name: String,
    position: Number,
    videos: [{ type: Schema.Types.Object, ref: 'Video' }]
});
const Video = mongoose.model('Video', video_schema_1.VideoSchema);
//# sourceMappingURL=chapter.schema.js.map