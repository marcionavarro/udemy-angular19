import {CommonModule} from '@angular/common';
import {Component, OnInit, inject} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from "@angular/material/icon";
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar'
import {Cliente} from '../cadastro/cliente';
import {ClienteService} from '../cliente.service';
import {Router} from '@angular/router';

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

  nomeBusca: string = '';
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ["id", "nome", "email", "cpf", "dataNascimento", "acoes"];
  snack: MatSnackBar = inject(MatSnackBar);

  constructor(private service: ClienteService, private router: Router) {
  }

  ngOnInit() {
    this.listaClientes = this.service.pesquisarClientes('');
  }

  pesquisar() {
    if (this.nomeBusca === '') {
      this.snack.open('Digite um nome para pesquisar', 'ok');
    }
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
  }

  preparaEditar(id: string) {
    this.router.navigate(['/cadastro'], {queryParams: {"id": id}})
  }

  preparaDeletar(cliente: Cliente) {
    cliente.deletando = true;
  }

  deletar(cliente: Cliente) {
    this.service.deletar(cliente);
    this.listaClientes = this.service.pesquisarClientes('');
    this.snack.open('Item deletado com sucesso!', 'ok');
  }

}
