import { Component, ViewChild } from '@angular/core';
import JsonBinService from './services/json-bin.service';
import Comment from '../app/interfaces/comment.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  @ViewChild('addComments') addComments: any;
  comments: Comment[] = [];
  isLoading: boolean = true;
  editCmntObj: any = null;
  editIndex: number = -1;
  replyCmntObj: any = null;
  replyIndex: number = -1;
  errorHandler = (err: any) => {
    console.error(err);
    alert('Failed to fetch data. Please refresh to continue');
  };

  constructor(private jsonBinService: JsonBinService) {
    this.jsonBinService.logWelcomeText();
    this.jsonBinService.fetchComments().subscribe({
      next: (data: any) => {
        this.comments = data.comments.map((c: Comment) => {
          c.expanded = true;
          return c;
        });
        this.isLoading = false;
      },
      error: this.errorHandler,
    });
  }

  handleReset() {
    this.editCmntObj = null;
    this.editIndex = -1;
    this.replyCmntObj = null;
    this.replyIndex = -1;
  }

  updateCommentCollection() {
    this.jsonBinService.updateCommentsCollection(this.comments).subscribe({
      error: this.errorHandler,
    });
  }

  handleNewComment(e: any) {
    if (!e.edit && e.parent === null) {
      this.comments.unshift(e.newComment);
    } else if (e.parent !== null) {
      const parent = this.comments.find(c => c._id === e.parent._id);
      parent?.children.push(e.newComment);
    } else {
      this.comments.splice(this.editIndex, 1, e.newComment);
    }
    this.updateCommentCollection();
  }

  handleDelete(e: any) {
    this.addComments.resetForm();
    if (e.parentIndex !== -1) {
      this.comments[e.parentIndex].children.splice(e.index, 1);
    } else {
      this.comments.splice(e.index, 1);
    }
    this.updateCommentCollection();
  }

  handleEditComment(index: any) {
    this.addComments.resetForm();
    this.editIndex = index;
    this.editCmntObj = this.comments[index];
    this.addComments.setEditObjValue(this.editCmntObj);
  }

  handleReplyComment(index: any) {
    this.addComments.resetForm();
    this.replyIndex = index;
    this.replyCmntObj = this.comments[index];
    this.addComments.setReplyObjValue(this.replyCmntObj);
  }
}
