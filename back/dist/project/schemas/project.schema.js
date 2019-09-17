"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moongose = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user_schema_1 = require("src/user/schemas/user.schema");
const chapter_schema_1 = require("src/chapter/schemas/chapter.schema");
exports.ProjectSchema = new moongose.Schema({
    createdAt: Date,
    description: String,
    exerciceDirectory: String,
    folder: String,
    chapters: [{ type: Schema.Types.Object, ref: 'Chapter' }],
    name: String,
    option: String,
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});
const User = mongoose.model('User', user_schema_1.UserSchema);
const Chapter = mongoose.model('Chapter', chapter_schema_1.ChapterSchema);
//# sourceMappingURL=project.schema.js.map