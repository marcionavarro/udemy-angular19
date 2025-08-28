import {Component, OnInit} from '@angular/core';
import {Categoria} from '../../categorias/categoria';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriaService} from '../../categorias/categoria.service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})
export class LugarComponent implements OnInit {
  camposForm: FormGroup;
  categorias: Categoria[] = []

  constructor(private categoriaService: CategoriaService) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.categoriaService.obterTodas().subscribe({
      next: categorias => this.categorias = categorias
    })
  }

  salvar() {
    console.log(this.camposForm.value);
  }
}
