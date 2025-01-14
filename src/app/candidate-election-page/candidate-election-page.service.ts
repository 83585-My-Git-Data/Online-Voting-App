import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidateElectionService {

  private candidatesUrl = 'http://localhost:8080/api/candidate'; // Replace with actual backend URL
  private electionsUrl = 'http://localhost:8080/api/elections'; // Replace with actual backend URL
  private registerUrl = 'http://localhost:8080/api/candidate-election/registerCandidateElection'; // Replace with actual backend URL

  constructor(private http: HttpClient) {}

  // Fetch all candidates
  getCandidates(): Observable<any[]> {
    console.log('Fetching candidates...');
    return this.http.get<any[]>(this.candidatesUrl);
  }

  // Fetch all elections
  getElections(): Observable<any[]> {
    console.log('Fetching elections...');
    return this.http.get<any[]>(this.electionsUrl);
  }

  getRegistrations(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/candidate-election'); // Replace with your actual backend endpoint
  }
  


  // Register a candidate to an election
  registerCandidateToElection(selectedCandidateId: number, selectedElectionId: number): Observable<any> {

    console.log('Selected Candidate ID:', selectedCandidateId);
    console.log('Selected Election ID:', selectedElectionId);
    const data = {
      candidateId: selectedCandidateId,
      electionId: selectedElectionId,
    };
    return this.http.post<any>(this.registerUrl, data,{responseType:'text' as 'json'});
  }
  
}
