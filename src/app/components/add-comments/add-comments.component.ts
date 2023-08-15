import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import newCommentInputValidator from './add-comments-input-validator';
import Comment from '../../interfaces/comment.interface';
import { v1 as uuid } from 'uuid';

@Component({
  selector: 'app-add-comments',
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.css'],
})
export class AddCommentsComponent {
  @Output() newCommentEvent = new EventEmitter();
  @Output() resetEvent = new EventEmitter();
  editCommentObj: any = null;
  replyCommentObj: any = null;
  newCommentForm = new FormGroup({
    name: new FormControl('', [Validators.required, newCommentInputValidator]),
    comment: new FormControl('', [
      Validators.required,
      newCommentInputValidator,
    ]),
  });
  disableSubmit: boolean = true;

  constructor() { }

  enableSubmitButton() {
    this.disableSubmit = this.newCommentForm.status === 'INVALID';
  }

  resetForm() {
    this.newCommentForm.setValue({ name: '', comment: '' });
    this.editCommentObj = null;
    this.replyCommentObj = null;
    this.resetEvent.emit();
    this.enableSubmitButton();
  }

  addCommentToCollection() {
    const newDate = new Date();
    let newComment: Comment;
    if (this.editCommentObj === null) {
      newComment = {
        _id: uuid(),
        commentText: this.newCommentForm.value.comment ?? '',
        createdOn: newDate,
        modifiedOn: newDate,
        author: {
          name: this.newCommentForm.value.name ?? '',
          _id: uuid(),
        },
        parent: null,
        children: [],
        expanded: true,
      };
      if (this.replyCommentObj !== null) {
        newComment.parent = this.replyCommentObj._id;
      }
    } else {
      newComment = Object.assign({}, this.editCommentObj, { commentText: this.newCommentForm.value.comment ?? '', author: { name: this.newCommentForm.value.name ?? '', _id: this.editCommentObj.author._id ?? uuid() } });
    }
    this.newCommentEvent.emit({ newComment, edit: this.editCommentObj !== null, parent: this.replyCommentObj });
    this.resetForm();
  }

  setEditObjValue(obj: any) {
    this.editCommentObj = obj;
    this.newCommentForm.setValue({
      name: this.editCommentObj.author.name ?? '',
      comment: this.editCommentObj.commentText ?? '',
    });
  }

  setReplyObjValue(obj: any) {
    this.replyCommentObj = obj;
  }
}
