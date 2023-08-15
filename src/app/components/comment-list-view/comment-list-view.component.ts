import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Comment from '../../interfaces/comment.interface';

@Component({
  selector: 'app-comment-list-view',
  templateUrl: './comment-list-view.component.html',
  styleUrls: ['./comment-list-view.component.css']
})
export class CommentListViewComponent implements OnInit {
  @Input() comments: Comment[] = [];
  @Input() isLoading: boolean = true;
  @Output() deleteComment = new EventEmitter();
  @Output() editComment = new EventEmitter();
  @Output() replyComment = new EventEmitter();
  deleteCommentId: string | null = null;

  constructor() { }

  ngOnInit() { }

  deleteCommentHandler(cancelDelete = false, index: number = -1, commentId: string = '', parentIndex: number = -1) {
    if (cancelDelete) {
      this.deleteCommentId = null;
      return;
    }
    if (this.deleteCommentId === null || this.deleteCommentId !== commentId) {
      this.deleteCommentId = commentId;
    } else {
      this.deleteComment.emit({ index, parentIndex });
    }
  }

  editCommentHandler(index: any) {
    this.editComment.emit(index);
  }

  replyCommentHandler(index: any) {
    this.replyComment.emit(index);
  }
}
