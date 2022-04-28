export interface View
{
    presenter: Presenter
    updateData(data: any): void
}
export interface Model<T = any>
{
    insert(data: T): Promise<number>
    update(id: number, data: T): Promise<void>
    remove(id: number): Promise<void>
}
export interface Presenter
{
    view: View | null
    model: Model
    // addEventListener(listener: { updateData(): any }): any
    updateModelData(): any
}