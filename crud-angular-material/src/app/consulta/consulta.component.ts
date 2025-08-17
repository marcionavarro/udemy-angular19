import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Cliente } from '../cadastro/cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-consulta',
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatIcon,
    MatButtonModule
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {

  listaClientes: Cliente[] = [];
  colunasTable: string[] = ["id", "nome", "email", "cpf", "dataNascimento"]

  constructor(private service: ClienteService) { }

  ngOnInit() {
    this.listaClientes = this.service.pesquisarClientes('');
  }

}
