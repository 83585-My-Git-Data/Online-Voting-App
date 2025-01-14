import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElectionService {
  private baseUrl = 'http://localhost:8080/api/elections'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Get all Candidates
  getElections(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Add a new election
  addElection(election: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, election);
  }

  // Update an existing voter
  updateElection(electionId: number, election: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${electionId}`, election);
  }

  // Delete a voter
  deleteElection(electionId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${electionId}`);
  }
}
