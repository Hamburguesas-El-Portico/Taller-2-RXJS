import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { PostComponent } from './posts/post/post.component';
import { UserDataComponent } from '../app/user/user-data/user-data.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDataComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
