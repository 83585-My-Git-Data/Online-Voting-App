import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VoterElectionCandidateService } from './voter-election-candidate-page.service';

@Component({
  selector: 'app-voter-election-candidate-page',
  templateUrl: './voter-election-candidate-page.component.html',
  styleUrl: './voter-election-candidate-page.component.css',
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class VoterElectionCandidatePageComponent implements OnInit {
  votersList: any[] = [];
  electionsList: any[] = [];
  filteredCandidates: any[] = [];
  votesList: any[] = []; // Holds the votes loaded from the database
  selectedVoter: number | null = null;
  selectedElection: number | null = null;
  selectedCandidate: number | null = null;

  constructor(private service: VoterElectionCandidateService) {}

  ngOnInit(): void {
    this.loadVoters();
    this.loadElections();
    this.loadVotes(); // Load existing votes from the database
  }

  loadVoters(): void {
    this.service.getVoters().subscribe((data) => {
      this.votersList = data;
    });
  }

  loadElections(): void {
    this.service.getElections().subscribe((data) => {
      this.electionsList = data;
    });
  }

  loadVotes(): void {
    this.service.getVotes().subscribe((data) => {
      console.log('Votes from backend:', data); 
      this.votesList = data.map((vote: any) => ({
        voterName: vote.voter?.name || 'Unknown',
        electionName: vote.election?.electionType || 'Unknown',
        candidateName: vote.candidateElection?.candidate?.name || 'Unknown',
      }));
      console.log('Mapped votesList:', this.votesList);
    });
  }

  onElectionChange(): void {
    if (this.selectedElection) {
      // Get the list of candidates based on the selected election
      this.service.getCandidatesByElection(this.selectedElection).subscribe({
        next: (data) => {
          // Filter the candidates by the selected election's ID
          this.filteredCandidates = data
            .filter((candidate: any) => candidate.election.id == this.selectedElection) // Match by election ID
            .map((candidate: any) => ({
              candidateElectionId: candidate.id, // Get the candidate-election id
              name: candidate.candidate?.name || 'Unknown', // Get the candidate's name
            }));
        },
        error: (err) => {
          console.error('Failed to load candidates:', err);
          this.filteredCandidates = [];
        },
        complete: () => {
          console.log('Candidate data successfully loaded');
        },
      });
    } else {
      // If no election is selected, reset the candidates list
      this.filteredCandidates = [];
    }
  }

  canVote(): boolean {
    return this.selectedVoter !== null && this.selectedElection !== null && this.selectedCandidate !== null;
  }

  onVote(): void {
    if (this.selectedVoter && this.selectedElection && this.selectedCandidate) {
      // Check if the voter has already voted in the same election
      const alreadyVoted = this.votesList.some(
        (vote) =>
          vote.voterName === this.votersList.find((v) => v.id === this.selectedVoter)?.name &&
          vote.electionName === this.electionsList.find((e) => e.id === this.selectedElection)?.electionType
      );
  
      if (alreadyVoted) {
        alert("You have already voted in the selected election!");
        return;
      }
  
      // Proceed to cast the vote
      this.service
        .castVote(this.selectedVoter, this.selectedCandidate, this.selectedElection)
        .subscribe({
          next: () => {
            console.log("Vote successfully cast!");
            alert("Vote Successfully Casted !!");
            this.loadVotes(); // Reload the votes list from the database after casting a vote
            this.resetSelections(); // Clear selections after voting
          },
          error: (err) => {
            if (err.status === 409) {
              alert(err.error.message || "You have already voted in this election.");
            } else {
              console.error("Failed to cast vote:", err);
            }
          },
        });
    }
  }
  

  resetSelections(): void {
    this.selectedVoter = null;
    this.selectedElection = null;
    this.selectedCandidate = null;
    this.filteredCandidates = [];
  }
}
