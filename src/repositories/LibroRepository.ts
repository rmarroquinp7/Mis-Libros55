import { Libro } from '../models/Libro';
import { supabase } from '../services/supabase';

export class LibroRepository {
  private static instancia: LibroRepository;

  private constructor() {}

  public static getInstance(): LibroRepository {
    if (!LibroRepository.instancia) {
      LibroRepository.instancia = new LibroRepository();
    }
    return LibroRepository.instancia;
  }

  public async obtenerLibros(): Promise<Libro[]> {
    const { data, error } = await supabase.from('libros').select('*');
    if (error || !data) return [];
    
    return data.map((item: any) => new Libro(String(item.id), item.titulo, item.autor, String(item.anio)));
  }

  public async agregarLibro(titulo: string, autor: string, anio: string): Promise<void> {
    await supabase.from('libros').insert([{ titulo, autor, anio }]);
  }

  public async eliminarLibro(id: string): Promise<void> {
    await supabase.from('libros').delete().eq('id', id);
  }
}