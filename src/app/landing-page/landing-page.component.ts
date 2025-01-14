import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterModule],
  styleUrls: ['./landing-page.component.css'],
  template: `
    <!-- <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-md-8 text-center">
          <h1 class="display-4 mb-4">Welcome to the Online Voting System</h1>
          <p class="lead">Choose an option to proceed:</p>
          <div class="btn-group-vertical w-100">
            <a routerLink="/voter" class="btn btn-primary btn-lg mb-3">View Voters</a>
            <a routerLink="/candidate" class="btn btn-success btn-lg mb-3">View Candidates</a>
            <a routerLink="/election" class="btn btn-info btn-lg mb-3">View Elections</a>
          </div>
        </div>
      </div>
    </div> -->


    <div class=" bg-container container-fluid">
    <!-- Navbar -->
    
  
    <!-- Main Content -->
    <div class="d-flex align-items-center justify-content-center vh-100 flex-column">
      <h1 class="display-4 landing-heading text-center shadow-sm">Welcome to Online Voting Application</h1>
      <p class="landing-para text-center"> This is the Landing page Click on the Button on Nav Bar !</p>
    </div>
  </div>

  `,
})
export class LandingPageComponent {}
