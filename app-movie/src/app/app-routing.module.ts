import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NowPlayingComponent} from './components/now-playing/now-playing.component'
import { PopularMoviesComponent } from './components/popular-movies/popular-movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';



const routes: Routes = [
  {path: 'now-playing', component: NowPlayingComponent},
  {path: 'popular', component: PopularMoviesComponent},
  {path: 'movie/:id', component: MovieDetailsComponent},
  {path: '', redirectTo: '/now-playing', pathMatch: 'full'},
];
// comentario
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
