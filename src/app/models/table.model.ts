import { Model } from "../types";

export class TableModel implements Model<TableData>
{
    private lastIndex = 0;
    private map: { [key: string]: TableData } = {};

    data: TableData[] = [];
    constructor()
    {
    }
    async insert(data: TableData): Promise<number> {
        this.map[this.lastIndex] = {
            name: data.name,
            first: Number(data.first),
            second: Number(data.second),
            id: this.lastIndex
        }
        this.data.push(this.map[this.lastIndex]);
        return this.lastIndex++;
    }
    async update(id: number, data: TableData)
    {
        this.map[id].name = data.name;
        this.map[id].first = Number(data.first);
        this.map[id].second = Number(data.second);
    }
    async remove(id: number)
    {
        let i, l;
        for(i = 0, l = this.data.length; i < l; i++)
            if(this.data[i].id === id)
            {
                this.data.splice(i, 1);
                break;
            }
        delete this.map[id];
    }
    get(id: number): TableData
    {
        return this.map[id];
    }
    async load()
    {
        await new Promise((resolve => setTimeout(resolve, 2000)));
        for(let i = 0; i < 30; i++)
        {
            await this.insert({
                name: "name" + i,
                first: +Math.random().toFixed(2),
                second: +Math.random().toFixed(2)
            });
        }
    }
}
interface TableData
{
    id?: number
    name: string
    first: number
    second: number
    sum?: number
}