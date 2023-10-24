import { Component, OnInit, HostListener } from '@angular/core';
import { ContatoService } from '../../services/contato.service';
import { Contato } from '../../models/contato.model';
import { MatDialog } from '@angular/material/dialog';
import { ContatoModalComponent } from '../contato-modal/contato-modal.component';
import { SharedService } from 'src/app/services/shared.service';
import { ConfirmacaoDialogComponent } from '../confirmacao-dialog/confirmacao-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.css'],
  animations: [
    trigger('fadeOut', [
      state('in', style({ opacity: 1 })),
      transition(':leave', [
        animate(100, style({ opacity: 0, transform: 'scale(0.8)' }))
      ])
    ])
  ]  
})
export class ListaContatosComponent implements OnInit {

  contatos: Contato[] = [];

  constructor(
    private contatoService: ContatoService, 
    private dialog: MatDialog,
    private sharedService: SharedService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carregarContatos();

    this.sharedService.refreshContatosObservable$.subscribe(() => {
      this.resetPagination();
      this.carregarContatos();
    });
  }

  paginaAtual = 0;
  tamanhoPagina = 20;
  idsCarregados: number[] = [];
  
  resetPagination(): void {
    this.paginaAtual = 0;
    this.contatos = [];
    this.idsCarregados = [];
  }
  
  carregarContatos(): void {
    this.contatoService.listarContatos(this.paginaAtual, this.tamanhoPagina).subscribe(data => {
      const novosContatos = data.filter(contato => !this.idsCarregados.includes(contato.id));
      this.contatos = [...this.contatos, ...novosContatos];
  
      this.idsCarregados = [...this.idsCarregados, ...novosContatos.map(contato => contato.id)];
  
      if (this.idsCarregados.length >= this.tamanhoPagina) {
        this.paginaAtual++;
      }
    });
  }
  
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const threshold = 700;
    const position = window.scrollY + window.innerHeight;
    const height = document.documentElement.scrollHeight;
    if (position > height - threshold) {
      this.carregarContatos();
    }
  }

  deletarContato(id: number): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent);
  
    dialogRef.afterClosed().subscribe(confirmacao => {
      if (confirmacao) {
        this.contatoService.deletarContato(id).subscribe(() => {
          this.contatos = this.contatos.filter(contato => contato.id !== id);
          this.idsCarregados = this.idsCarregados.filter(contatoId => contatoId !== id);
          this.snackBar.open('Contato excluído com sucesso!', 'Fechar', {
            duration: 5000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
        });
      }
    });
  }  

  editarContato(id: number): void {
    this.contatoService.obterContatoPorId(id).subscribe( {
      next: (contatoParaEditar) => {

        console.log(contatoParaEditar);
        
        const dialogRef = this.dialog.open(ContatoModalComponent, {
          width: '600px',
          data: { contato: contatoParaEditar }
        });

        dialogRef.afterClosed().subscribe(contatoAtualizado => {
          if (contatoAtualizado) {
            this.contatoService.editarContato(id, contatoAtualizado).subscribe(() => {
              this.resetPagination();
              this.carregarContatos();
            });
          }
        });
      }, 
      error: error => {
        console.error("Erro ao obter o contato:", error);
      }
  });
  }
}

