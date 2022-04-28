import { Injectable } from "@angular/core";
import { TableModel } from "../models/table.model";
import { View, Presenter } from "../types";

@Injectable({
    providedIn: "root"
})
export class TablePresenter implements Presenter
{
    public model: TableModel;
    public view: View | null = null;
    constructor()
    {
        this.model = new TableModel();
        this.model
            .load()
            .then(() => {
                this.model.data.forEach(item => this.calculated(item.id));
                this.updateModelData();
            });
    }
    async insertNewRow(data: any)
    {
        let id = await this.model.insert(data);
        this.calculated(id);
        this.updateModelData();
    }
    async updateRow(id: number, data: any)
    {
        await this.model.update(id, data);
        this.calculated(id);
        this.updateModelData();
    }
    async removeRow(id: number)
    {
        await this.model.remove(id);
        this.updateModelData();
    }
    calculated(id: number = -1)
    {
        let newRow = this.model.get(id);
        newRow.sum = +(newRow.first + newRow.second).toFixed(2);
    }
    updateModelData()
    {
        this.model.data = [ ...this.model.data ];
        this.view?.updateData(this.model.data);
    }
}