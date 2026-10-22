import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnInit {
  ngOnInit(): void {
    const dados = [
      { categoria: 'Eletronicos', valor: 10 },
      { categoria: 'Roupas', valor: 15 },
      { categoria: 'Decoração', valor: 5 },
      { categoria: 'Ferramentas', valor: 20 },
      { categoria: 'Acessórios', valor: 17 },
    ];

    const labels = dados.map((v) => v.categoria);
    const valores = dados.map((v) => v.valor);

    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Categoria Mais Vendidas',
            data: valores,
            backgroundColor: 'rgba(31,82,146, 0.6)',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
