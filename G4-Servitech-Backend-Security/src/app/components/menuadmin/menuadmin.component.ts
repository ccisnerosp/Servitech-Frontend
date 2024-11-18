import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {LogoutDialogComponent} from './logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-menuadmin',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './menuadmin.component.html',
  styleUrl: './menuadmin.component.css'
})
export class MenuadminComponent {
  route: Router = inject(Router);
  dialog = inject(MatDialog);
  openDialog(){
    const dialogRef = this.dialog.open(LogoutDialogComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.route.navigate(['/home']);
      }else{
        console.log("Diálogo respondió no cerrar sesión");
      }
    });
  }
}
