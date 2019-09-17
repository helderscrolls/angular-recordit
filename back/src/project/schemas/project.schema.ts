import * as moongose from 'mongoose';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

import { UserSchema } from 'src/user/schemas/user.schema';
import { ChapterSchema } from 'src/chapter/schemas/chapter.schema';

export const ProjectSchema = new moongose.Schema({
	createdAt: Date,
	description: String,
	exerciceDirectory: String,
	folder: String,
	chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
	name: String,
	options: String,
	users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})
