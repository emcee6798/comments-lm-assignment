import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Comment from '../interfaces/comment.interface';
declare const environment: any;

@Injectable({
  providedIn: 'root',
})
export default class JsonBinService {
  private keyLength: number = 60;
  private xMasterKey: string = environment.X_MASTER_KEY;
  private xAccessKey: string = environment.X_ACCESS_KEY;
  private jsonRootURL: string = 'https://api.jsonbin.io/v3/b/64d62e53b89b1e2299cf052d';
  private headers: HttpHeaders = new HttpHeaders()
    .set('X-Master-Key', this.xMasterKey)
    .set('X-Access-Key', this.xAccessKey)
    .set('Content-Type', 'application/json')
    .set('X-Bin-Meta', 'false');

  constructor(private http: HttpClient) { }

  logWelcomeText() {
    console.log('welcome to comments!');
    console.log(`${Object.keys(environment)} keys provided from environment`);
    if (
      this.xMasterKey.length === this.keyLength &&
      this.xAccessKey.length === this.keyLength
    ) {
      console.log('app supplied with valid keys');
    }
  }

  fetchComments() {
    return this.http.get(`${this.jsonRootURL}`, { headers: this.headers });
  }

  updateCommentsCollection(comments: Comment[]) {
    return this.http.put(`${this.jsonRootURL}`, { comments }, { headers: this.headers });
  }
}
