import {Component, OnInit} from '@angular/core';
import {Categoria} from '../../categorias/categoria';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriaService} from '../../categorias/categoria.service';
import {LugarService} from '../lugar.service';
import {Lugar} from '../lugar';
import {campoValidator} from '../../util/campoValidator';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})
export class LugarComponent implements OnInit {
  camposForm: FormGroup;
  categorias: Categoria[] = [];
  lugares: Lugar[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private lugarService: LugarService
  ) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('-1', [Validators.required, campoValidator]),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl('-1', [Validators.required, campoValidator])
    })
  }

  ngOnInit(): void {
    this.categoriaService.obterTodas().subscribe({
      next: categorias => this.categorias = categorias
    })
  }

  salvar(): void {
    this.camposForm.markAllAsTouched();

    if (this.camposForm.valid) {
      this.lugarService.salvar(this.camposForm.value).subscribe({
        next: lugar => {
          console.log('Cadastrado com sucesso!', lugar);
          this.camposForm.reset();
        },
        error: erro => console.log(erro)
      })
    }
  }

  isCampoInvalido(nomeCampo: string): boolean {
    const campo = this.camposForm.get(nomeCampo);
    return (campo?.invalid && campo?.touched) && campo?.errors?.['required'];
  }
}
