import { CurrencyPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

interface Produto {
  nome: string;
  valor: number;
  imagem: string;
}

@Component({
  imports: [CurrencyPipe],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  produtos: Produto[] = [
    { nome: 'Camiseta Angular', valor: 79.9, imagem: 'https://picsum.photos/id/1/200/150' },
    { nome: 'Caneca Programador', valor: 49.9, imagem: 'https://picsum.photos/id/10/200/150' },
    { nome: 'Mouser Gamer RGB', valor: 129.9, imagem: 'https://picsum.photos/id/25/200/150' },
    { nome: 'Teclado Mecânico', valor: 299.0, imagem: 'https://picsum.photos/id/30/200/150' },
    { nome: 'Headset Bluetooth', valor: 199.9, imagem: 'https://picsum.photos/id/40/200/150' },
  ];
}
