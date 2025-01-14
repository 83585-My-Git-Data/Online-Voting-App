import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoterElectionCandidateService {
  private baseUrl = 'http://localhost:8080/api/voter-election-candidate'; // Base URL for voter-election-candidate
  private voterUrl = 'http://localhost:8080/api/voters'; // URL for fetching voters
  private electionUrl = 'http://localhost:8080/api/elections'; // URL for fetching elections
  private candidateElectionUrl = 'http://localhost:8080/api/candidate-election'; // URL for fetching candidate-election data

  

  constructor(private http: HttpClient) {}

  getVoters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.voterUrl}/getVoters`);
  }

  getElections(): Observable<any[]> {
    return this.http.get<any[]>(this.electionUrl);
  }

  getCandidatesByElection(electionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.candidateElectionUrl}?electionId=${electionId}`);
  }

  getVotes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getVotes`);
  }

  castVote(voterId: number, candidateElectionId: number, electionId: number): Observable<any> {
    const data = {
      electionId: electionId,
      voterId: voterId,
      candidateElectionId: candidateElectionId,
    };
    return this.http.post<any>(`${this.baseUrl}/castVote`, data);
  }
}
