import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { FormsComponent } from './components/forms/forms.component';
import { RandomComponent } from './components/random/random.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ErrorComponent } from './components/error/error.component';
import { MovieComponent } from './components/movie/movie.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    BlogComponent,
    FormsComponent,
    RandomComponent,
    MoviesComponent,
    ErrorComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
