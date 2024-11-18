import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmrequestdialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './confirmrequestdialog.component.html',
  styleUrl: './confirmrequestdialog.component.css'
})
export class ConfirmrequestdialogComponent {

}
