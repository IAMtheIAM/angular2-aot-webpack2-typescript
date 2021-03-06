// login.component.ts
/*
 * Angular 2 decorators and services
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/*
 * Shared Utilities
 */
import { Logging } from '../services/utility.service';
import { AppState } from '../services/appstate.service';
import { Authentication } from '../services/authentication.service';
import { UtilityService } from '../services/utility.service';

/*
 * Imported Components
 */
// const jwt_decode = require('jwt-decode');

/**
 * This is where CSS/SCSS files that the component depends on are required.
 *
 * Function: To enable "Hot Module Replacement" of CSS/SCSS files
 * during development. During productions, all styles will be extracted into
 *  external stylesheets. Do NOT add styles the "Angular2 Way" in
 */
import './login.style.scss';

@Component({
   selector: 'login',
   templateUrl: './login.template.html'
})
export class LoginComponent {
   //@Input() loginText: string = 'Login';
   isAuthenticated: boolean;
   token: string = '';

   constructor(
      /** This is where we setup/construct all the constants and variables as well as inject
       *  Angular dependenciesto be called in the class methods
       *  NOTE: Injected Dependencies must be called using "this". Example: this.depencencyName.someMethod
       */
      //public isAuthenticated,
      public appState: AppState,
      public authService: Authentication,
      public utilityService: UtilityService,
      public router: Router) {

      this.isAuthenticated = this.authService.isLoggedIn();
      this.appState.set('isAuthenticated', this.isAuthenticated);

   }

   ngOnInit() {
      // If user is already logged in, skip the login page
      if (this.isAuthenticated) {
         if (Logging.isEnabled.light) {
            console.log('%c Already logged in! Navigating to Subscriber-Lookup Component', Logging.normal.purple);
         }
         this.utilityService.navigate(['/']);
      }

      if (Logging.isEnabled.light) {
         console.log('%c Hello \"Login\" component!', Logging.normal.lime);
      }
   }

   login(
      event,
      username,
      password) {

      this.authService.login(event, username, password)
          .subscribe(
             response => {
                // On response

                if (Logging.isEnabled.verbose) {
                   console.log("Response: ", response);
                }

                // True or false
                this.authService.validAuth = response.Success;

                // Update the appState with the response
                this.appState.set('isAuthenticated', this.authService.validAuth);

                // Fire the loginSuccess function
                this.loginSuccess(response);
             },
             error => {
                // this.notificationService.printErrorMessage('Authentication required');

                // Manual override: Allow admin login even without Active Directory running
                if (username === 'superadmin' || username === 'Superadmin') {

                   // True or false
                   this.authService.validAuth = true;

                   // Update the appState with the response
                   this.appState.set('isAuthenticated', this.authService.validAuth);

                   // Fire the loginSuccess function
                   return this.loginSuccess(); // 'return' stops the function from continuing
                }

                if (error.status === 401 || error.status === 404) {
                   // this.notificationService.printErrorMessage('Authentication required');
                   if (Logging.isEnabled.verbose) {
                      console.log("Login Component: login(error): ", error);
                   }
                }
                alert(error);
                // return Observable.of(this.isLoggedIn());
             }, () => {
                // Always

                if (Logging.isEnabled.verbose) {
                   console.log('%c API Call Complete', Logging.normal.orange);
                }

                return this.authService.isLoggedIn();
             });

   }

   loginSuccess(response?) {

      // if we're overriding with an admin login, fake a JWT
      if (!response) {
         response = {
            Token: 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhMjU2Iiwia2lkIjoiNjY4QThCQjE5OENCOTFCNEJGREMzMDdCOEM3QTVFM0U2QzA1NzA4NSIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJucGFyc29uIiwibmJmIjoxNDc0NjYyMDQwLCJleHAiOjE0NzQ2NjU2NDAsImlzcyI6ImFybWxzX2lkX3NlcnZlciIsImF1ZCI6ImFybWxzX2lkX3NlcnZlciJ9.bVImq8ceJSQ_cjfA2_TbvAJcYk6qCgsHc6GEd1xby0RUdXIs7k-qvsFlDyGT9NSumiTY6B_eHkedBiaGwnMUBvMlUvjeMEYKffIB2odzg8pY4Z-2VGCA1HDJV1xis0odqIOtTr9n0uA_mD88NraM39HkxYFSNB4HbQyKc35QFgmnWVQaD0T6AG2nRHQLvkxtMVAumrV2XSDHeV_32E4p7evdZyCWbQ7seh7nvWeWXIOQlnHxfJrBfL25gBwyRytASMiuotIBCjdgRTHlVcOXJYpkwSzgAGUX_c2lodqmg6nZFkDfWdmTdU8bQkyetzx4hVLhMv8EENo6hCQL1fVBEA'
         };
      }

      if (this.authService.validAuth) {

         if (response.id_token) {
            this.token = response.id_token;
         }
         else if (response.Token) {
            this.token = response.Token;
         }
         else if (response !== null) {
            // .Net generated JWT
            this.token = response.access_token;

            // Set the JWT
            localStorage.setItem('jwt', this.token);
         }

         // Token debugging
         const splitToken = this.token.split('.');
         const responseHeaders = JSON.parse(atob(splitToken[0]));
         const responseBody = JSON.parse(atob(splitToken[1]));
         console.log(responseHeaders);
         console.log(responseBody);

         // Set the JWT
         localStorage.setItem('jwt', this.token);

      }
      if (Logging.isEnabled.verbose) {
         console.log("Login Component: login(response): ", response);
         console.log(`%c Logged In: ${this.authService.isLoggedIn()}`, Logging.normal.white);
      }

      // Get the redirect URL from our appState. If no redirect has been set, use the default
      let redirect = this.appState.state.redirectUrl
         ? this.appState.state.redirectUrl
         : '/';

      // Clear redirect URL after initial redirect
      this.appState.set('redirectUrl', ''); // Index page

      // Navigate the view
      this.utilityService.navigate([redirect]);
      return this.authService.isLoggedIn();
   }

   logout() {
      this.authService.logout();
   }
}
