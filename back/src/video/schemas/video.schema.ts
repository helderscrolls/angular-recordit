import * as moongose from 'mongoose';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const VideoSchema = new moongose.Schema({
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: Date,
  description: String,
  exerciceFile: String,
  finished: Boolean,
  name: String,
  position: Number,
  chapterPosition: Number,
  videoDuration: Number,
  videoFile: String,
})
