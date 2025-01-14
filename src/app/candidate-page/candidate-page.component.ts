import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateService } from './candidate-page.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class CandidatePageComponent implements OnInit {
  candidates: any[] = [];
  candidateForm: any = {};
  isEditMode: boolean = false;
  isFormValid: boolean = false;
  today: string = '';

  constructor(private candidateService: CandidateService) {}

  ngOnInit(): void {
    this.loadCandidates();
    this.today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  }

  loadCandidates(): void {
    this.candidateService.getCandidates().subscribe((data) => {
      this.candidates = data;
    });
  }

  openAddCandidateModal(): void {
    this.isEditMode = false;
    this.candidateForm = {};
    this.validateForm(); // Ensure validation is checked on opening the modal
    const modal = document.getElementById('candidateModal');
    if (modal) modal.style.display = 'block';
  }

  openEditCandidateModal(candidate: any): void {
    this.isEditMode = true;
    this.candidateForm = { ...candidate };
    this.validateForm(); // Ensure validation is checked on opening the modal
    const modal = document.getElementById('candidateModal');
    if (modal) modal.style.display = 'block';
  }

  closeModal(): void {
    const modal = document.getElementById('candidateModal');
    if (modal) modal.style.display = 'none';
  }

  validateForm(): void {
    const { name, dob, gender, address, aadhar, party } = this.candidateForm;

    this.isFormValid =
      name?.trim().length >= 3 &&
      dob &&
      gender &&
      address?.trim().length >= 3 &&
      /^[0-9]{12}$/.test(aadhar) &&
      party?.trim().length >= 3;
  }

  saveCandidate(): void {
    if (this.isEditMode) {
      this.candidateService.updateCandidate(this.candidateForm.id, this.candidateForm).subscribe(() => {
        alert('Candidate updated successfully');
        this.loadCandidates();
        this.closeModal();
      });
    } else {
      this.candidateService.addCandidate(this.candidateForm).subscribe(() => {
        alert('Candidate added successfully');
        this.loadCandidates();
        this.closeModal();
      });
    }
  }

  removeCandidate(candidateId: number): void {
    if (confirm('Are you sure you want to remove this candidate?')) {
      this.candidateService.deleteCandidate(candidateId).subscribe(() => {
        alert('Candidate removed successfully');
        this.loadCandidates();
      });
    }
  }
}
