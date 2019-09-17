import { Document } from 'mongoose';
export interface Project extends Document {
    readonly createdAt: Date;
    readonly description: string;
    readonly exerciceDirectory: string;
    readonly folder: string;
    readonly index: string[];
    readonly name: string;
    readonly option: string;
    readonly users: string[];
}
