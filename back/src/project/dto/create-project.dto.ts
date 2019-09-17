import { ChapterModel } from "src/chapter/interfaces/chapter.interface";
import { UserModel } from "src/user/interfaces/user.interface";

export class CreateProjectDTO {
	readonly createdAt: Date;
  readonly description: string;
	readonly exerciceDirectory: string;
	readonly folder: string;
	chapters: ChapterModel[];
	readonly name: string;
	readonly options: string;
	readonly users: UserModel[];
}