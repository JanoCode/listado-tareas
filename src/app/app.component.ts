import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TareasService } from './services/tareas.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  listaTareas: string[] = [];
  nuevaTarea: string = '';
  indiceEdicion: number | null = null;
  textoEditado: string = '';

  private _tareasService = inject(TareasService);
  
  ngOnInit(): void {
    this.listaTareas = this._tareasService.getTareas();
  }

  agregarTarea() {
    this._tareasService.agregarTarea(this.nuevaTarea);
    this.nuevaTarea = '';
    this.listaTareas = this._tareasService.getTareas();
  }

  eliminarTarea(index: number) {
    this._tareasService.eliminarTarea(index);
    this.listaTareas = this._tareasService.getTareas();
  }

  editarTarea(index: number) {
    this.indiceEdicion = index;
    this.textoEditado = this.listaTareas[index];
  }

  guardarTarea(index: number) {
    this._tareasService.actualizarTarea(index, this.textoEditado);
    this.listaTareas = this._tareasService.getTareas();
    this.indiceEdicion = null;
    this.textoEditado = '';
  }
}
