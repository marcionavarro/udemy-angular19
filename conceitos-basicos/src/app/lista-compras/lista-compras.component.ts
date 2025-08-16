import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ItemLista} from './itemLista';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-lista-compras',
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-compras.component.html',
  styleUrl: './lista-compras.component.scss'
})
export class ListaComprasComponent {

  item: string = '';
  lista: ItemLista[] = [];

  adicionarItem() {
    let itemLista = new ItemLista();
    itemLista.id = this.lista.length + 1;
    itemLista.nome = this.item;

    this.lista.push(itemLista);

    this.item = '';
    console.table(this.lista);
  }

  riscaritem(itemLista: ItemLista) {
    itemLista.comprado = !itemLista.comprado;
  }

  limparLista() {
    this.lista = [];
  }
}
