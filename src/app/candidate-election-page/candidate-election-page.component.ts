import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import for standalone components
import { FormsModule } from '@angular/forms'; // Import for two-way data binding
import { CandidateElectionService } from './candidate-election-page.service';

@Component({
  selector: 'app-candidate-election-page',
  templateUrl: './candidate-election-page.component.html',
  styleUrls: ['./candidate-election-page.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule], // Import necessary Angular modules
})
export class CandidateElectionPageComponent implements OnInit {
  candidates: { id: number; name: string }[] = [];
  elections: { electionType: string; id: number }[] = [];
  registrations: { candidateName: string; electionName: string }[] = [];
  
  selectedCandidateId: number = 0;
  selectedElectionId: number = 0;

  isCandidatesLoading = true; // Track loading state of candidates
  isElectionsLoading = true;  // Track loading state of elections
  isDataLoaded = false;       // Flag to check if both data sets are loaded
  isRegistering: any;

  constructor(private candidateElectionService: CandidateElectionService) {}

  ngOnInit(): void {
    console.log('Initializing CandidateElectionPageComponent...');
    this.loadCandidates();
    this.loadElections();
    this.loadRegistrations();
  }

  // Fetches candidates from the backend
  loadCandidates(): void {
    this.candidateElectionService.getCandidates().subscribe({
      next: (data) => {
        console.log('Candidates data:', data);
        this.candidates = data;
        this.isCandidatesLoading = false;  // Mark candidates loading as done
        this.checkIfDataLoaded();
      },
      error: (error) => {
        console.error('Failed to load candidates:', error);
        alert('Error loading candidates. Please try again later.');
        this.isCandidatesLoading = false;  // Mark candidates loading as done
      },
    });
  }

  // Fetches elections from the backend
  loadElections(): void {
    this.candidateElectionService.getElections().subscribe({
      next: (data) => {
        console.log('Election data:', data);
        this.elections = data;
        this.isElectionsLoading = false;  // Mark elections loading as done
        this.checkIfDataLoaded();
      },
      error: (error) => {
        console.error('Failed to load elections:', error);
        alert('Error loading elections. Please try again later.');
        this.isElectionsLoading = false;  // Mark elections loading as done
      },
    });
  }


  loadRegistrations(): void {
    this.candidateElectionService.getRegistrations().subscribe({
      next: (data) => {
        console.log('Registrations data:', data);
        this.registrations = data.map((registration: any) => ({
          candidateName: registration.candidate.name,
          electionName: registration.election.electionType,
        }));
      },
      error: (error) => {
        console.error('Failed to load registrations:', error);
        alert('Error loading registrations. Please try again later.');
      },
    });
  }
  



  // Check if both candidates and elections data are loaded
  checkIfDataLoaded(): void {
    if (!this.isCandidatesLoading && !this.isElectionsLoading) {
      this.isDataLoaded = true; // Set the flag to true when both are loaded
    }
  }

  // Registering a candidate to an election
  registerCandidateToElection(): void {

    if (!this.selectedCandidateId || !this.selectedElectionId) {
      alert('Please select both a candidate and an election.');
      return;
    }

    const selectedCandidate = this.candidates.find((c) => c.id == this.selectedCandidateId);
    const selectedElection = this.elections.find((e) => e.id == this.selectedElectionId);

    console.log('Candidate id:', this.selectedCandidateId);
    console.log('Election id:', this.selectedElectionId);

    if (!selectedCandidate || !selectedElection) {
      alert('Invalid candidate or election selected.');
      return;
    }

    this.candidateElectionService
    .registerCandidateToElection(this.selectedCandidateId, this.selectedElectionId)
    .subscribe({
      next: () => {
        alert('Candidate registered successfully.');
        // Update frontend registrations
        this.registrations.push({
          candidateName: selectedCandidate.name,
          electionName: selectedElection.electionType,
        });
      },
      error: (error) => {
        console.error('Registration failed:', error);

        // Extract the error message from the backend response
        if (error.status === 500) {
          alert('The candidate has been already registered.');
        } else {
          alert('Failed to register candidate. Please try again.');
        }
      },
      });
  }
}
