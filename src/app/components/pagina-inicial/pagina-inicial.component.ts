import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContatoService } from 'src/app/services/contato.service';
import { ContatoModalComponent } from '../contato-modal/contato-modal.component';
import { SharedService } from 'src/app/services/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListaContatosComponent } from '../lista-contatos/lista-contatos.component';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent {

  constructor(
    private contatoService: ContatoService, 
    private sharedService: SharedService, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  //@ViewChild(ListaContatosComponent, { static: false }) listaContatos!: ListaContatosComponent;

  criarContato(): void {
    const dialogRef = this.dialog.open(ContatoModalComponent, {
      width: '600px',
      data: { contato: "" }
    });
  
    dialogRef.afterClosed().subscribe(contato => {
      if (contato) {
        this.contatoService.criarContato(contato).subscribe(() => {
          this.sharedService.triggerRefreshContatos(contato);
          this.snackBar.open('Contato criado com sucesso!', 'Fechar', {
            duration: 5000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'top',
            horizontalPosition: 'end',
          })
        });
      }
    });
  }

}
