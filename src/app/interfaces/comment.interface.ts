export default interface Comment {
  _id: string;
  commentText: string;
  createdOn: Date;
  modifiedOn: Date;
  author: {
    name: string;
    _id: string;
  };
  parent: string | null;
  children: any[];
  expanded: boolean;
}
