import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { VoterComponent } from './voter-page/voter-page.component';
import { CandidatePageComponent } from './candidate-page/candidate-page.component';
import { ElectionPageComponent } from './election-page/election-page.component';
import { CandidateElectionPageComponent } from './candidate-election-page/candidate-election-page.component';
import { VoterElectionCandidatePageComponent } from './voter-election-candidate-page/voter-election-candidate-page.component';
import { ElectionStatisticsComponent } from './election-statistics/election-statistics.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
    { path: 'home', component: LandingPageComponent },
    { path: 'voter', component: VoterComponent }, // Route for voter-page
    { path: 'candidate', component: CandidatePageComponent },
    { path: 'election', component: ElectionPageComponent },
    { path: 'candidateElection', component: CandidateElectionPageComponent },
    { path: 'voterElectionCandidate', component: VoterElectionCandidatePageComponent },
    { path: 'electionStatistics', component: ElectionStatisticsComponent },
];
