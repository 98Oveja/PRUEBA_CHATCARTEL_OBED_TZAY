import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  credits: any;
  relatedMovies: any[] = [];
  voteValue: number = 0;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['id'];
    this.getMovieDetails(movieId);
    this.getMovieCredits(movieId);
    this.getRelatedMovies(movieId);
  }

  getMovieDetails(id:number): void{
    this.movieService.getMovieDetails(id).subscribe((data:any)=>{
      this.movie = data;
    });
  }
  getMovieCredits(id:number):void{
    this.movieService.getMovieCredits(id).subscribe((data:any) => {
      this.credits = data;
    });
  }
  getRelatedMovies(id:number):void{
    this.movieService.getRelatedMovies(id).subscribe((data:any) => {
      this.relatedMovies = data.results;
    });
  }

  voteMovie(): void {
    if (this.voteValue >= 1 && this.voteValue <= 10) {
      const movieId = this.route.snapshot.params['id'];
      this.movieService.voteMovie(movieId, this.voteValue).subscribe(response => {
        console.log('Vote submitted:', response);
      });
    }
  }

}
