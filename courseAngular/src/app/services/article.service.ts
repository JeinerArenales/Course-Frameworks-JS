import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Article } from '../models/article';
import { Global } from './global';
import { Observable } from "rxjs";

@Injectable()

export class ArticleService {

    public url: string;

    constructor(
        private http: HttpClient
    ) {
        this.url = Global.url;
    }

    getArticles(): Observable<any> {
        return this.http.get(this.url + 'articles');
    }
}
