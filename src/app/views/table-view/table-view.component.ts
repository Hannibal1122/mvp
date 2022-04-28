import { Component, OnInit } from '@angular/core';
import { TablePresenter } from 'src/app/logic/table.presenter';
import { View } from 'src/app/types';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit, View
{
  viewData: any = [];
  readonly: boolean = false;
  mode: "insert" | "update" = "insert";
  currentId: number = -1;

  header = [
    { name: "id", dataField: "id" },
    { name: "Наименование", dataField: "name" },
    { name: "Первое число", dataField: "first" },
    { name: "Второе число", dataField: "second" },
    { name: "Сумма", dataField: "sum" },
  ];
  newRow: {
    name: string
    dataField: string
    value: ""
  }[] = []

  constructor(public presenter: TablePresenter) {
    this.presenter.view = this;

    this.header.forEach(item => {
      if(item.dataField != "id" && item.dataField != "sum")
        this.newRow.push({
          name: item.name,
          dataField: item.dataField,
          value: ""
        })
    });
  }
  ngOnInit(): void {
    
  }
  /** Метод будет вызываться из presenter */
  updateData(data: any)
  {
    this.viewData = data;
  }
  insertNewRow()
  {
    this.presenter.insertNewRow(this.getDataForRow());
    this.cancelNewRow();
  }
  updateNewRow()
  {
    this.presenter.updateRow(this.currentId, this.getDataForRow());
    this.cancelNewRow();
  }
  cancelNewRow()
  {
    this.currentId = -1;
    this.newRow.forEach(item => item.value = "");
    this.mode = "insert";
  }
  openRowEdit({ row }: { row: any })
  {
    this.currentId = row.id;
    this.newRow.forEach(item => {
      item.value = row[item.dataField];
    });
    this.mode = "update";
  }
  removeRow({ id }: { id: number })
  {
    this.presenter.removeRow(id);
  }
  private getDataForRow()
  {
    let newRow: any = {};
    this.newRow.forEach(item => newRow[item.dataField] = item.value);
    return newRow;
  }
}
