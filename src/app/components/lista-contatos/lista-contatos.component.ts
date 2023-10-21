import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../../services/contato.service';
import { Contato } from '../../models/contato.model';
import { MatDialog } from '@angular/material/dialog';
import { ContatoModalComponent } from '../contato-modal/contato-modal.component';
import { SharedService } from 'src/app/services/shared.service';
import { ConfirmacaoDialogComponent } from '../confirmacao-dialog/confirmacao-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.css'],
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
      this.carregarContatos();
    });
  }

  carregarContatos(): void {
    this.contatoService.listarContatos().subscribe(data => {
      console.log(data);
      this.contatos = data;
    });
  }

  deletarContato(id: number): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent);
  
    dialogRef.afterClosed().subscribe(confirmacao => {
      if (confirmacao) {
        this.contatoService.deletarContato(id).subscribe(() => {
          this.carregarContatos();
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

