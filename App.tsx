import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, 
  Alert, SafeAreaView, } from 'react-native';
import { LibroService } from './src/services/LibroService';
import { Libro } from './src/models/Libro';

const libroService = new LibroService();

export default function App() {
  const [libros, setLibros] = useState<Libro[]>(libroService.obtenerLibros());
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anio, setAnio] = useState('');

  const agregarLibro = () => {
    if (titulo === '' || autor === '' || anio === '') {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    const anioNumero = Number(anio);

    libroService.agregarLibro(titulo, autor, anioNumero);

    setLibros(libroService.obtenerLibros());
    setTitulo('');
    setAutor('');
    setAnio('');
  };

  const eliminarLibro = (id: string) => {
    libroService.eliminarLibro(id);
    setLibros(libroService.obtenerLibros());
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.tituloApp}>Mis Libros</Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.cajaTexto}
          placeholder="Título:"
          placeholderTextColor="#688b9a"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={styles.cajaTexto}
          placeholder="Autor:"
          placeholderTextColor="#688b9a"
          value={autor}
          onChangeText={setAutor}
        />
        <TextInput
          style={styles.cajaTexto}
          placeholder="Año:"
          placeholderTextColor="#688b9a"
          value={anio}
          onChangeText={setAnio}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.botonAgregar} onPress={agregarLibro}>
          <Text style={styles.textoBoton}>Agregar Libro</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitulo}>Lista de mis Libros:</Text>

      <FlatList
        data={libros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tarjeta}>
            <View style={styles.infoLibro}>
              <Text style={styles.textoTitulo}>{item.titulo}</Text>
              <Text style={styles.textoDetalle}>{item.getDescripcion()}</Text>
            </View>
            <TouchableOpacity
              style={styles.botonEliminar}
              onPress={() => eliminarLibro(item.id)}
            >
              <Text style={styles.textoBotonEliminar}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e6f2ff',
  },
  tituloApp: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#003366',
  },
  formulario: {
    backgroundColor: '#cce6ff', 
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#99ccff',
  },
  cajaTexto: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#80b3ff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    color: '#00264d',
  },
  botonAgregar: {
    backgroundColor: '#0066cc',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#003366',
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    borderLeftWidth: 5,
    borderLeftColor: '#3399ff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLibro: {
    flex: 1,
    paddingRight: 10,
  },
  textoTitulo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#004080',
  },
  textoDetalle: {
    fontSize: 13,
    color: '#4d79ff',
    marginTop: 2,
  },
  botonEliminar: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  textoBotonEliminar: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});