import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-root',
  standalone: true, // Standalone component flag
  imports: [RouterModule], // Import RouterModule here
  styleUrls: ['./app.component.css'],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <span class="navbar-brand font-weight-bold">Online Voting System</span>
        <div class="ml-auto">
          <a routerLink="/" class="btn btn-success mx-1">Home</a>
          <a routerLink="/voter" class="btn btn-dark mx-1">Voters</a>
          <a routerLink="/candidate" class="btn btn-secondary mx-1"
            >Candidates</a
          >
          <a routerLink="/election" class="btn btn-info mx-1">Election</a>
          <a routerLink="/candidateElection" class="btn btn-danger mx-1">Candidate-Election</a>
          <a routerLink="/voterElectionCandidate" class="btn btn-primary mx-1">Voter-Election-Candidate</a>
          <a routerLink="/electionStatistics" class="btn btn-warning mx-1">Election Statistics</a>
        </div>
      </div>
    </nav>

    <router-outlet></router-outlet>
    <!-- Routed components will appear here -->
  `,
})
export class AppComponent {
  // Any logic for this page
}
