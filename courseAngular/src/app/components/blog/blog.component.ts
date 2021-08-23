import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Global } from 'src/app/services/global';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ArticleService]
})

export class BlogComponent implements OnInit {

  public articles: Article[] = [];
  public url: string = Global.url;

  constructor(
    private articleSvc: ArticleService
  ) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.articleSvc.getArticles().subscribe(
      response => {
        if(response.articles){
          this.articles = response.articles;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
