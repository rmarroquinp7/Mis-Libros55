import { Libro } from '../models/Libro';
import { LibroRepository } from '../repositories/LibroRepository';

export class LibroService {
  private repository: LibroRepository;

  constructor() {
    this.repository = LibroRepository.getInstance();
  }

  public async obtenerLibros(): Promise<Libro[]> {
    return await this.repository.obtenerLibros();
  }

  public async agregarNuevoLibro(titulo: string, autor: string, anio: string): Promise<void> {
    await this.repository.agregarLibro(titulo, autor, anio);
  }

  public async eliminarLibroPorId(id: string): Promise<void> {
    await this.repository.eliminarLibro(id);
  }
}