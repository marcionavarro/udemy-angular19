import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriaService} from '../categoria.service';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  camposForm: FormGroup;

  constructor(private service: CategoriaService) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required)
    })
  }

  salvar() {
    this.camposForm.markAllAsTouched();
    if (this.camposForm.valid) {
      this.service.salvar(this.camposForm.value)
        .subscribe({
          next: categoria => {
            this.camposForm.reset();
            console.log('Salva com sucesso', categoria)
          },
          error: erro => console.log('Erro ao salvar', erro)
        })
    }
  }

  isCampoInvalido(nomeCampo: string): boolean {
    const campo = this.camposForm.get(nomeCampo);
    return (campo?.invalid && campo?.touched) && campo?.errors?.['required'];
  }
}
