import { Component, inject } from "@angular/core";
import { materialImports } from "../../material-imports";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MatDialog } from "@angular/material/dialog";

import { CardEquipamentoComponent } from "../../components/cards/card-equipamento/card-equipamento.component";
import { DadosEquipamentoComponent } from "../../components/dados-equipamento/dados-equipamento.component";

@Component({
  selector: "app-crud-equipamentos",
  imports: [...materialImports, NavbarComponent, CardEquipamentoComponent],
  templateUrl: "./crud-equipamentos.component.html",
  styleUrl: "./crud-equipamentos.component.css",
})
export class CrudEquipamentosComponent {
  private dialog = inject(MatDialog);
  abrirDialog() {
    this.dialog.open(DadosEquipamentoComponent, {
      width: "600px",
    });
  }
}
