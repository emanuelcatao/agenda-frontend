import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { AppRoutingModule } from 'src/app-routing.module';
import { ListaContatosComponent } from './components/lista-contatos/lista-contatos.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { ContatoModalComponent } from './components/contato-modal/contato-modal.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmacaoDialogComponent } from './components/confirmacao-dialog/confirmacao-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaContatosComponent, 
    PaginaInicialComponent, 
    ContatoModalComponent, 
    ConfirmacaoDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatInputModule,
    MatIconModule,
    ScrollingModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
