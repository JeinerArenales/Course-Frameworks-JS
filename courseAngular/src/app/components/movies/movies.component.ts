import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MovieService]
})
export class MoviesComponent implements OnInit {

  movies: Array<Movie> = [];
  favorite: Movie = new Movie(0,'','');

  constructor(
    private movieSvc : MovieService
  ) {
  }

  ngOnInit(): void {
    this.movies = this.movieSvc.getMovies();
  }

  viewFavorite(event: any){
    this.favorite = event.movie;
  }



}
