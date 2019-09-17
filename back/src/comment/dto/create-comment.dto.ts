export class CreateCommentDTO {
    readonly comment: string;
    readonly user: string;
    readonly createdAt: Date;
    readonly description: string;
    readonly video: string [];
  }