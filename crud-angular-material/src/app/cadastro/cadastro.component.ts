import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Estado, Municipio } from '../brasilapi.model';
import { BrasilapiService } from '../brasilapi.service';
import { ClienteService } from '../cliente.service';
import { Cliente } from './cliente';

@Component({
  selector: 'app-cadastro',
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatFormField,
    MatInputModule,
    MatLabel,
    MatIcon,
    MatButtonModule,
    MatSelectModule,
    NgxMaskDirective,
    MatDatepickerModule,
  ],
  providers: [
    provideNgxMask(),
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CadastroComponent implements OnInit {
  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  snack: MatSnackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipios: Municipio[] = [];
  @ViewChild('clientesFrm') clientesFrm!: NgForm;

  constructor(
    private service: ClienteService,
    private brasilApiService: BrasilapiService,
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    const query = this.route.snapshot.queryParamMap;
    const id = query.get('id');

    await this.carregarUfs(); // aguarda estados

    if (id) {
      const clienteEncontrado = this.service.buscarClientePorId(id);

      if (clienteEncontrado) {
        this.atualizando = true;
        this.cliente = clienteEncontrado;

        if (this.cliente.uf) {
          await this.carregarMunicipios({ value: this.cliente.uf }); // aguarda municípios
          // município será vinculado automaticamente porque ngModel já está com o valor
          this.cdRef.detectChanges();
        }
      }
    }
  }

  carregarUfs(): Promise<void> {
    return new Promise((resolve) => {
      this.brasilApiService.listarUfs().subscribe((ufs) => {
        this.estados = ufs;
        resolve();
      });
    });
  }

  carregarMunicipios(event: { value: string }): Promise<void> {
    return new Promise((resolve) => {
      const ufSelecionada = event.value;
      this.brasilApiService
        .listarMunicipios(ufSelecionada)
        .subscribe((municipios) => {
          this.municipios = municipios;
          resolve();
        });
    });
  }

  salvar() {
    if (this.clientesFrm.invalid) {
      this.clientesFrm.control.markAllAsTouched();
      this.mostrarMensagem('Por favor preencha todos os campos!');
      return;
    }

    if (!this.atualizando) {
      this.service.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.limparForm();
      this.mostrarMensagem('Salvo com sucesso');
    } else {
      this.service.atualizar(this.cliente);
      this.router.navigate(['']);
      this.mostrarMensagem('Atualizado com sucesso');
    }
  }

  mostrarMensagem(mensagem: string) {
    return this.snack.open(mensagem, 'OK');
  }

  limparForm() {
    this.clientesFrm.resetForm();
  }
}
