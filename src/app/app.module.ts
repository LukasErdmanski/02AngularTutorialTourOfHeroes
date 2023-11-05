import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Required for ngModel, two-way data binding between the <input> form element in the template and the property in the ts-class.
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessageComponent } from './message/message.component';
import { AppRoutingModule } from './app-routing.module';

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
    declarations: [AppComponent, HeroesComponent, HeroDetailComponent, MessageComponent],
    // The imports array contains the list of external modules that the application needs.
    imports: [BrowserModule, FormsModule, AppRoutingModule],
    providers: [ 
        // No need to place any providers due to the `providedIn` flag in the @Injectable symbol, e.g. in HeroesServvice or MessageService.
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
