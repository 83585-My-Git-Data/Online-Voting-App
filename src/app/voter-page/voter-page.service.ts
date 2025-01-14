import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoterService {
  private baseUrl = 'http://localhost:8080/api/voters'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Get all voters
  getVoters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getVoters`);
  }

  // Add a new voter
  addVoter(voter: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addVoter`, voter);
  }

  // Update an existing voter
  updateVoter(voterId: number, voter: any): Observable<any> {
    // Ensure voterId is included in the API endpoint
    return this.http.put<any>(`${this.baseUrl}/${voterId}`, voter); // No changes needed here.
  }

  // Delete a voter
  deleteVoter(voterId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${voterId}`);
  }
}
