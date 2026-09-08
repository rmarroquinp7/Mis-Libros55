export class Libro {
 
  private _id: string;
  private _titulo: string;
  private _autor: string;
  private _anio: number;

  constructor(id: string, titulo: string, autor: string, anio: number) {
    this._id = id;
    this._titulo = titulo;
    this._autor = autor;
    this._anio = anio;
  }

  public get id(): string {
    return this._id;
  }

  public get titulo(): string {
    return this._titulo;
  }

  public get autor(): string {
    return this._autor;
  }

  public get anio(): number {
    return this._anio;
  }

  public getDescripcion(): string {
    return `"${this._titulo}" por ${this._autor} (${this._anio})`;
  }
}