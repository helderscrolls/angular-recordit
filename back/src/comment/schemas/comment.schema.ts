import * as moongose from 'mongoose';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const CommentSchema = new moongose.Schema({
  comment: String,
  createdAt: Date,
  user: String,
})