"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    email: String,
    firstname: String,
    lastname: String,
    password: String,
    roles: String,
});
//# sourceMappingURL=user.schema.js.map