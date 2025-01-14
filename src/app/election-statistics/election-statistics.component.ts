import { Component, OnInit } from '@angular/core';
import { ElectionStatisticsService } from './election-statistics.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-election-statistics',
  imports: [FormsModule, CommonModule, NgFor],
  templateUrl: './election-statistics.component.html',
  styleUrl: './election-statistics.component.css'
})
export class ElectionStatisticsComponent implements OnInit {
  candidates: any[] = [];
  elections: any[] = [];
  selectedCandidateId!: number | null;
  selectedElectionId!: number | null;
  selectedEnrollmentId!: number | null;
  

  modalData: { headers: string[]; rows: any[][] } | null = null;
  isModalOpen = false;

  constructor(private statisticsService: ElectionStatisticsService) {}

  ngOnInit(): void {
    this.fetchInitialData();
  }

  fetchInitialData() {
    this.statisticsService.getCandidates().subscribe(
      (data: any[]) => (this.candidates = data)
    );
    this.statisticsService.getElections().subscribe(
      (data: any[]) => (this.elections = data)
    );
  }

  fetchCandidateVotes() {
    this.statisticsService.getCandidateVotes(this.selectedCandidateId!).subscribe((data: any) => {
      this.openModal(data);
      this.selectedCandidateId = null;
      
    });
  }

  fetchTotalVotes() {
    this.statisticsService.getTotalVotes(this.selectedElectionId!).subscribe((data: any) => {
      this.openModal(data);
      this.selectedElectionId = null;
    });
  }

  fetchCandidateEnrollment() {
    this.statisticsService.getCandidateEnrollment(this.selectedEnrollmentId!).subscribe((data: any) => {
      this.openModal(data);
      this.selectedEnrollmentId = null;
    });
  }

 
  

  openModal(data: any) {
    console.log("Raw Data:", data);
    const headers = Object.keys(data);
    const rows = [Object.values(data)];
    this.modalData = { headers, rows };
    this.isModalOpen = true;
  }
  

  closeModal() {
    this.modalData = null;
    this.isModalOpen = false;
  }
}
