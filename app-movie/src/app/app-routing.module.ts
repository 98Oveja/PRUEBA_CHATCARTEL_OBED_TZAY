import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NowPlayingComponent} from './components/now-playing/now-playing.component'
import { PopularMoviesComponent } from './components/popular-movies/popular-movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  { path: 'now-playing', component: NowPlayingComponent, canActivate: [AuthGuard] },
  { path: 'popular', component: PopularMoviesComponent, canActivate: [AuthGuard] },
  { path: 'movie/:id', component: MovieDetailsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/now-playing', pathMatch: 'full' },
  { path: '**', redirectTo: '/now-playing' }
];
// comentario
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
