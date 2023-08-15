import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddCommentsComponent } from './components/add-comments/add-comments.component';
import { CommentListViewComponent } from './components/comment-list-view/comment-list-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCommentsComponent,
    CommentListViewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
