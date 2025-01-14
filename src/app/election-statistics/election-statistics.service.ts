import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElectionStatisticsService {
  private baseUrl = 'http://localhost:8080/api/statistics';
  private candidateUrl = 'http://localhost:8080/api/candidate';
  private electionUrl = 'http://localhost:8080/api/elections';

  constructor(private http: HttpClient) {}

  getCandidates(): Observable<any[]> {
    return this.http.get<any[]>(this.candidateUrl);
  }

  getElections(): Observable<any[]> {
    return this.http.get<any[]>(this.electionUrl);
  }

  getCandidateVotes(candidateId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/candidate-votes/${candidateId}`);
  }

  getTotalVotes(electionId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/election-votes/${electionId}`);
  }

  getCandidateEnrollment(electionId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/election-candidates/${electionId}`);
  }
}
