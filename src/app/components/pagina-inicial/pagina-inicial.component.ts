import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContatoService } from 'src/app/services/contato.service';
import { ContatoModalComponent } from '../contato-modal/contato-modal.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent {

  constructor(private contatoService: ContatoService, private sharedService: SharedService, private dialog: MatDialog) { }

  criarContato(): void {
    const dialogRef = this.dialog.open(ContatoModalComponent, {
      width: '600px',
      data: { contato: "" }
    });
  
    dialogRef.afterClosed().subscribe(contato => {
      if (contato) {
        this.contatoService.criarContato(contato).subscribe(() => {
          this.sharedService.triggerRefreshContatos();
        });
      }
    });
  }
}
