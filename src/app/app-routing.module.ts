/**
 * In Angular, the best practice is to load and configure the router in a separate, top-level module. The router is 
 * dedicated to routing and imported by the root AppModule.
 * 
 * By convention, the module class name is AppRoutingModule and it belongs in the app-routing.module.ts in the src/app directory.
 * 
 * Generated with 'ng generate module app-routing --flat --module=app'.
 * PARAMETER	     DETAILS
 * --flat	         Puts the file in src/app instead of its own directory.
 * --module=app	   Tells ng generate to register it in the imports array of the AppModule.
 */
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
/**
 * app-routing.module.ts file imports RouterModule and Routes so the application can have routing capability. The next
 * import, HeroesComponent, gives the Router somewhere to go once you configure the routes.
*/
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';

/**
 * Routes tell the Router which view to display when a user clicks a link or pastes a URL into the browser address bar.
 * 
 * PROPERTIES	       DETAILS
 * - path:           A string that matches the URL in the browser address bar.
 * - component:	     The component that the router should create when navigating to this route.
 */
const routes: Routes = [
  /**
   * When the application starts, the browser's address bar points to the web site's root. The application navigates to
   * the dashboard automatically.
   * This route redirects a URL that fully matches the empty path to the route whose path is '/dashboard'.
   * After the browser refreshes, the router loads the DashboardComponent and the browser address bar shows the /dashboard URL.
   */
  { path: '', redirectTo:'/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
];

// The @NgModule metadata initializes the router and starts it listening for browser location changes.
@NgModule({
  /**
   * The CommonModule references and declarations array generated as default after execution of 
   * 'ng generate module app-routing --flat --module=app'
   * are unnecessary, so are no longer part of AppRoutingModule. They can be deleted (They have beeen commented out to understand 
   * module generation history.).
   */
  
  // declarations: [],

  /**
   * The following line adds the RouterModule to the AppRoutingModule imports array and configures it with the routes
   * in one step by calling RouterModule.forRoot():
   */
  imports: [
    // CommonModule,
    /**
     * The method is called forRoot() because you configure the router at the application's root level. The forRoot()
     * method supplies the service providers and directives needed for routing, and performs the initial navigation
     * based on the current browser URL.
     */
    RouterModule.forRoot(routes)], 
  // AppRoutingModule exports RouterModule to be available throughout the application.
  exports: [RouterModule], 
})
export class AppRoutingModule { }
