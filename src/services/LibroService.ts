import { Libro } from '../models/Libro';

export class LibroService {
  private libros: Libro[] = [];

  constructor() {
    this.libros = [
      new Libro('1', 'How to Build a Car', 'Adrian Newey', 2017),
      new Libro('2', 'The Official History', 'Maurice Hamilton', 2020),
    ];
  }

  public obtenerLibros(): Libro[] {
    return [...this.libros];
  }

  public agregarLibro(titulo: string, autor: string, anio: number): Libro {
    const nuevoId = Date.now().toString();
    const nuevoLibro = new Libro(nuevoId, titulo, autor, anio);
    this.libros.push(nuevoLibro);
    return nuevoLibro;
  }

  public eliminarLibro(id: string): void {
    this.libros = this.libros.filter(libro => libro.id !== id);
  }
}