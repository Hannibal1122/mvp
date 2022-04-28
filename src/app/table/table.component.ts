import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit
{
  @Output("onEdit") onClickRowEditEmitter = new EventEmitter<TableEventEdit>();
  @Output("onRemove") onClickRowRemoveEmitter = new EventEmitter<TableEventRemove>();
  @Input() set header(header: Header[])
  {
    this.drawHeader = header;
    this.drawHeader.forEach((item, i) => {
      this.headerMap[item.dataField] = i;
    })
  }
  @Input() set data(data: any[])
  {
    this.drawData = [];
    data.forEach((row, i) => {
      this.drawData[i] = [];
      for(let key in this.headerMap)
      {
        this.drawData[i][this.headerMap[key]] = row[key];
      }
    })
  }
  @Input() set readonly(readonly: boolean)
  {
    this._readonly = readonly || false;
  }

  private headerMap: { [key: string]: number } = {};
  drawHeader: Header[] = [];
  drawData: string[][] = [];
  _readonly: boolean = false;
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void
  {
  }
  onClickEdit(row: any[])
  {
    let rowOut: any = {};
    for(const key in this.headerMap)
    {
      rowOut[key] = row[this.headerMap[key]];
    }
    this.onClickRowEditEmitter.emit({ row: rowOut });
  }
  onClickRemove(row: any[])
  {
    this.onClickRowRemoveEmitter.emit({ id: Number(row[this.headerMap["id"]]) });
  }
}
interface Header
{
  name: string
  dataField: string
}
export interface TableEventEdit
{
  row: any
}
export interface TableEventRemove
{
  id: number
}