import { Component, OnInit } from '@angular/core';
import { CommonModule,NgFor } from '@angular/common';
import { ElectionService } from './election-page.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-election',
  templateUrl: './election-page.component.html',
  styleUrls: ['./election-page.component.css'],
  imports: [CommonModule, FormsModule, NgFor],
  standalone: true,
})
export class ElectionPageComponent implements OnInit {
  elections: any[] = [];
  electionForm: any = {};
  isEditMode: boolean = false;

  constructor(private electionService: ElectionService) {}

  ngOnInit(): void {
    this.loadElections();
  }

  loadElections(): void {
    this.electionService.getElections().subscribe((data) => {
      this.elections = data;
    });
  }

  openAddElectionModal(): void {
    this.isEditMode = false;
    this.electionForm = {};
    const modal = document.getElementById('electionModal');
    if (modal) modal.style.display = 'block';
  }

  openEditElectionModal(election: any): void {
    this.isEditMode = true;
    this.electionForm = { ...election };
    const modal = document.getElementById('electionModal');
    if (modal) modal.style.display = 'block';
  }

  closeModal(): void {
    const modal = document.getElementById('electionModal');
    if (modal) modal.style.display = 'none';
  }

  saveElection(): void {
    if (this.isEditMode) {
      this.electionService.updateElection(this.electionForm.id, this.electionForm).subscribe(() => {
        alert('Election updated successfully');
        this.loadElections();
        this.closeModal();
      });
    } else {
      this.electionService.addElection(this.electionForm).subscribe(() => {
        alert('Election added successfully');
        this.loadElections();
        this.closeModal();
      });
    }
  }

  removeElection(electionId: number): void {
    if (confirm('Are you sure you want to remove this election?')) {
      this.electionService.deleteElection(electionId).subscribe(() => {
        alert('Election removed successfully');
        this.loadElections();
      });
    }
  }
}
