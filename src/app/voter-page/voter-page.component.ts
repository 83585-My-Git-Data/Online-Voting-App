import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoterService } from './voter-page.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-voter',
  templateUrl: './voter-page.component.html',
  styleUrls: ['./voter-page.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class VoterComponent implements OnInit {
  voters: any[] = [];
  voterForm: any = {};
  isEditMode: boolean = false;
  isFormValid: boolean = false; // To track form validation status
  maxDate: string = ''; // Max date for DOB input

  constructor(private voterService: VoterService) {}

  ngOnInit(): void {
    this.loadVoters();
    this.maxDate = new Date().toISOString().split('T')[0]; // Set today's date as max
  }

  loadVoters(): void {
    this.voterService.getVoters().subscribe((data) => {
      this.voters = data;
    });
  }

  openAddVoterModal(): void {
    this.isEditMode = false;
    this.voterForm = {};
    this.isFormValid = false; // Reset form validation
    const modal = document.getElementById('voterModal') as HTMLDivElement;
    if (modal) {
      modal.style.display = 'block';
    }
  }

  openEditVoterModal(voter: any): void {
    this.isEditMode = true;
    this.voterForm = { ...voter };
    this.validateForm(); // Validate form on opening modal
    const modal = document.getElementById('voterModal') as HTMLDivElement;
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal(): void {
    const modal = document.getElementById('voterModal') as HTMLDivElement;
    if (modal) {
      modal.style.display = 'none';
    }
  }

  saveVoter(): void {
    if (this.isEditMode) {
      const voterId = this.voterForm.id;
      this.voterService.updateVoter(voterId, this.voterForm).subscribe(
        () => {
          alert('Voter updated successfully');
          this.loadVoters();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating voter:', error);
        }
      );
    } else {
      this.voterService.addVoter(this.voterForm).subscribe(
        () => {
          alert('Voter added successfully');
          this.loadVoters();
          this.closeModal();
        },
        (error) => {
          console.error('Error adding voter:', error);
        }
      );
    }
  }

  removeVoter(voterId: number): void {
    if (confirm('Are you sure you want to remove this voter?')) {
      this.voterService.deleteVoter(voterId).subscribe(() => {
        alert('Voter removed successfully');
        this.loadVoters();
      });
    }
  }

  validateForm(): void {
    const { name, dob, gender, address, aadhar } = this.voterForm;
    this.isFormValid =
      name?.length >= 3 &&
      dob &&
      !this.isFutureDate(dob) &&
      gender &&
      address?.length >= 3 &&
      /^[0-9]{12}$/.test(aadhar);
  }

  isFutureDate(date: string): boolean {
    return new Date(date) > new Date();
  }
}
