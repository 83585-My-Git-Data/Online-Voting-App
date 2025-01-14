import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private baseUrl = 'http://localhost:8080/api/candidate'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Get all Candidates
  getCandidates(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Add a new voter
  addCandidate(candidate: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, candidate);
  }

  // Update an existing voter
  updateCandidate(candidateId: number, candidate: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${candidateId}`, candidate);
  }

  // Delete a voter
  deleteCandidate(candidateId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${candidateId}`);
  }
}
