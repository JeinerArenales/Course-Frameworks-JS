import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() movie: Movie = new Movie(2021, "Cruella", '');
  @Output() favoriteMovie = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  select(event: any, movie: Movie){
    this.favoriteMovie.emit({
      movie
    })
  }

}
