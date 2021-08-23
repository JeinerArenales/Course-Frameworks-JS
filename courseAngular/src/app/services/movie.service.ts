import { Injectable } from "@angular/core";
import { Movie } from '../models/movie';

@Injectable()

export class MovieService {

    public movies:  Array<Movie> = [
        new Movie(2019, "Spiderman", "https://sm.ign.com/ign_es/screenshot/default/maxresdefault-29_ccvn.jpg"),
        new Movie(2020, "Avengers: EndGame", "https://lumiere-a.akamaihd.net/v1/images/image_1e5c5703.jpeg?region=0%2C0%2C540%2C810"),
        new Movie(2017, "Justice League", "https://images-na.ssl-images-amazon.com/images/I/91JNWWQKGgL._RI_.jpg")
    ];

    getMovies(){
        return this.movies;
    }


}