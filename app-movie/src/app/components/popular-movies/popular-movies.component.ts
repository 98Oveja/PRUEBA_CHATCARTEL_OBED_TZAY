import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.scss'],
})
export class PopularMoviesComponent implements OnInit {
  movies: any[] = [];
  currentPage: number = 1; //this variable is count pages
  totalPages: number = 1; //this variable get totalPages to render when the user make scroll
  filterForm: FormGroup;

  constructor(private movieService: MovieService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      query: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  ngOnInit(): void {
    console.log("prueba");
    this.loadMovies();

    this.filterForm.get('query')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(()=>{
      this.onSubmit();
    });
    this.filterForm.get('startDate')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(()=>{
      this.onSubmit();
    });
    this.filterForm.get('endDate')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(()=>{
      this.onSubmit();
    });

    // this.movieService.getPopularMovies().subscribe((data: any) => {
    //   this.movies = data.results;
    // });
  }

  loadMovies():void{
    if(this.currentPage > this.totalPages) return;
    const searchParams = this.filterForm.value;
    this.movieService.getPopularMovies(this.currentPage, searchParams).subscribe((data:any)=>{
      this.movies = [...this.movies, ...data.results];
      this.totalPages = data.total_pages;
      this.currentPage++;
    });
  }
  //active loadMovies when the user make scroll
  onScroll():void{
    this.loadMovies();
  }
  //when the user apply filters
  onSubmit(): void{
    this.currentPage = 1;
    this.movies = [];
    this.loadMovies();
  }
}
