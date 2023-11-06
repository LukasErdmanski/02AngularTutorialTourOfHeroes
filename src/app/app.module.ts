import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Required for ngModel, two-way data binding between the <input> form element in the template and the property in the ts-class.
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessageComponent } from './message/message.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

/**
 * Angular needs to know how the pieces of your application fit together and what other files and libraries
 * the application requires. This information is called metadata.
 * Some of the metadata is in the @Component decorators that you added to your component classes.
 * Other critical metadata is in @NgModule decorators.
 * The most important @NgModule decorator annotates the top-level AppModule class.
 */
@NgModule({
    /**
     * Every component must be declared in exactly one NgModule.
     *
     * You didn't declare the HeroesComponent. Why did the application work?
     * It worked because the ng generate declared HeroesComponent in AppModule when it created that component.
     */
    declarations: [AppComponent, HeroesComponent, HeroDetailComponent, MessageComponent, DashboardComponent],
    // The imports array contains the list of external modules that the application needs.
    // HttpClient available everywhere in the application due to the import here.
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        // Required to send requests and get reponses to the server.
        HttpClientModule,
        /**
         *
         * HttpClientInMemoryWebApiModule and InMemoryDataService are required to mimics communication with
         * a remote data server by using the In-memory Web API module.
         *
         * The HttpClientInMemoryWebApiModule module intercepts HTTP requests
         * and returns simulated server responses.
         * Remove it when a real server is ready to receive requests.
         *
         * The forRoot() configuration method takes an InMemoryDataService class that primes the in-memory database.
         * The in-memory-data.service.ts file takes over the function of mock-heroes.ts.
         * After the server is ready, detach the In-memory Web API so the application's requests can go through to the server.
         */
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    ],
    providers: [
        // No need to place any providers due to the `providedIn` flag in the @Injectable symbol, e.g. in HeroesServvice or MessageService.
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
