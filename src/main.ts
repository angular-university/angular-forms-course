import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { CoursesService } from './app/services/courses.service';
import { provideHttpClient, withXhr, withInterceptorsFromDi } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule),
    CoursesService,
    provideHttpClient(withXhr(), withInterceptorsFromDi())
  ]
}).catch(err => console.log(err));
