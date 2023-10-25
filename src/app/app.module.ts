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
import { MAT_DATE_LOCALE, MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ConfirmacaoDialogComponent } from './components/confirmacao-dialog/confirmacao-dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';

registerLocaleData(pt);


@NgModule({
  declarations: [
    AppComponent,
    ListaContatosComponent, 
    PaginaInicialComponent, 
    ContatoModalComponent, 
    ConfirmacaoDialogComponent, 
    NavbarComponent, 
    FooterComponent
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
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        parse: {
          dateInput: 'DD/MM/YYYY',
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
