import {Component, inject} from '@angular/core';
import {Valoracion} from '../../model/valoracion';
import {ActivatedRoute, Router} from '@angular/router';
import {ValoracionService} from '../../services/valoracion.service';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-tecvaluation',
  standalone: true,
  imports: [
    MatInput,
    MatIconButton,
    MatIcon,
    FormsModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    NgForOf,
    MatButton,
    DatePipe
  ],
  templateUrl: './tecvaluation.component.html',
  styleUrl: './tecvaluation.component.css'
})
export class TecvaluationComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private valoracionService: ValoracionService = inject(ValoracionService);
  router: Router = inject(Router);
  evaluations: Valoracion[] = [];
  filteredEvaluations: Valoracion[] = [];
  searchQuery: string = '';
  private idTecnico: number = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadTecDetails(id);
        this.idTecnico = id;
      }
    });
  }

  loadTecDetails(id: number): void {
    this.valoracionService.getValoracionesTecnico(id).subscribe({
      next: (data: Valoracion[]) => {
        this.evaluations = data;
        this.filteredEvaluations = [...this.evaluations];
      },
      error: (err) => console.error('Error al obtener valoraciones:', err)
    });
  }

  filterEvaluations(): void {
    this.filteredEvaluations = this.evaluations.filter(valoracion =>
      valoracion.comentario.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  goBack(): void {
    this.router.navigate(['/menutecnico', this.idTecnico]);
  }

  recentFirst(): void {
    this.filteredEvaluations.sort((a, b) => {
      const dateA = new Date(a.fecha);
      const dateB = new Date(b.fecha);

      // Ordena de forma descendente (más reciente primero)
      return dateB.getTime() - dateA.getTime();
    });
  }

}
