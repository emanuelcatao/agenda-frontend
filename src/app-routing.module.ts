import { RouterModule, Routes } from "@angular/router";
import { ContatoModalComponent } from "./app/components/contato-modal/contato-modal.component";
import { NgModule } from "@angular/core";
import { PaginaInicialComponent } from "./app/components/pagina-inicial/pagina-inicial.component";

const routes: Routes = [
    { path: '', component: PaginaInicialComponent },
    { path: 'criar', component: ContatoModalComponent },
    { path: 'editar/:id', component: ContatoModalComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  