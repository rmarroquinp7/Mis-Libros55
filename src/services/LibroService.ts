import { Libro } from '../models/Libro';
import { LibroRepository } from '../repositories/LibroRepository';

export class LibroService {
  private repository: LibroRepository;

  constructor() {
    this.repository = LibroRepository.getInstance();

    const repo1 = LibroRepository.getInstance();
    const repo2 = LibroRepository.getInstance();
    console.log('¿repo1 y repo2 son la misma instancia?:', repo1 === repo2);
  }

  public obtenerLibros(): Libro[] {
    return this.repository.obtenerLibros();
  }

  public agregarNuevoLibro(titulo: string, autor: string, anio: string): Libro {
    const nuevoId = Date.now().toString();
    const nuevoLibro = new Libro(nuevoId, titulo, autor, anio);
    this.repository.agregarLibro(nuevoLibro);
    return nuevoLibro;
  }

  public eliminarLibroPorId(id: string): void {
    this.repository.eliminarLibro(id);
  }
}