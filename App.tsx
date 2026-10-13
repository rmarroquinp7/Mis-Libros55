import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { supabase } from './src/services/supabase';
import { AuthService } from './src/services/AuthService';
import { LibroService } from './src/services/LibroService';
import { Libro } from './src/models/Libro';

const libroService = new LibroService();

export default function App() {
  
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensajePantalla, setMensajePantalla] = useState('');

  const [libros, setLibros] = useState<Libro[]>([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anio, setAnio] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  useEffect(() => {
    if (session) {
      cargarDatos();
    }
  }, [session]);

  const cargarDatos = async () => {
    try {
      const datos = await libroService.obtenerLibros();
      setLibros(datos || []); 
    } catch (error) {
      console.log("Error al cargar datos", error);
    }
  };

  const handleRegistro = async () => {
    try {
      setMensajePantalla('Cargando...');
      await AuthService.registrar(email, password);
      setMensajePantalla('¡Usuario registrado con éxito!');
    } catch (error: any) {
      setMensajePantalla('Error al registrar: ' + error.message);
    }
  };

  const handleLogin = async () => {
    try {
      setMensajePantalla('Conectando...');
      await AuthService.login(email, password);
      setMensajePantalla(''); 
    } catch (error: any) {
      setMensajePantalla('Error: Credenciales incorrectas');
    }
  };

  const handleGuardarLibro = async () => {
    if (!titulo || !autor || !anio) {
      alert("Por favor, llena todos los campos");
      return;
    }
    
    try {
      await libroService.agregarNuevoLibro(titulo, autor, anio);
      setTitulo(''); setAutor(''); setAnio('');
      await cargarDatos(); 
    } catch (error: any) {
      alert("Error al guardar en Supabase: " + error.message);
    }
  };

  const handleBorrarLibro = async (id: string) => {
    try {
      await libroService.eliminarLibroPorId(id);
      await cargarDatos(); 
    } catch (error) {
      console.log("Error al borrar", error);
    }
  };

  if (!session) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.tituloApp}>Mis Libros</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.btnAzul} onPress={handleLogin}>
          <Text style={styles.txtBlanco}>Iniciar Sesión</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.btnGris} onPress={handleRegistro}>
          <Text style={styles.txtGris}>Registrarse</Text>
        </TouchableOpacity>

        {mensajePantalla !== '' && (
          <Text style={styles.mensajeTexto}>{mensajePantalla}</Text>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filaHeader}>
        <Text style={styles.tituloApp}>Mis Libros</Text>
        <TouchableOpacity style={styles.btnRojo} onPress={() => AuthService.logout()}>
          <Text style={styles.txtBlanco}>Salir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formulario}>
        <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
        <TextInput style={styles.input} placeholder="Autor" value={autor} onChangeText={setAutor} />
        <TextInput style={styles.input} placeholder="Año" value={anio} onChangeText={setAnio} keyboardType="numeric" />
        
        <TouchableOpacity style={styles.btnAzul} onPress={handleGuardarLibro}>
          <Text style={styles.txtBlanco}>Guardar en Supabase</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.listaTitulo}>Lista de mis Libros:</Text>

      <FlatList
        data={libros}
        keyExtractor={(item: any, index) => item?.getId ? item.getId() : (item?.id ? String(item.id) : String(index))}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitulo}>
                {item?.getTitulo ? item.getTitulo() : item?.titulo}
              </Text>
              <Text style={styles.cardSub}>
                {item?.getAutor ? item.getAutor() : item?.autor} - {item?.getAnio ? item.getAnio() : item?.anio}
              </Text>
            </View>
            <TouchableOpacity style={styles.btnBorrar} onPress={() => handleBorrarLibro(item?.getId ? item.getId() : item?.id)}>
              <Text style={styles.txtBorrar}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E6F0FA', paddingTop: 50 },
  centerContainer: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#E6F0FA' },
  tituloApp: { fontSize: 24, fontWeight: 'bold', color: '#003366', textAlign: 'center', marginBottom: 15 },
  filaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  formulario: { backgroundColor: '#D0E4F5', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#B0C4DE' },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#A4C6E4', borderRadius: 8, padding: 12, marginBottom: 12, color: '#333' },
  btnAzul: { backgroundColor: '#0F69C4', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  btnGris: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#0F69C4', padding: 14, borderRadius: 8, alignItems: 'center' },
  btnRojo: { backgroundColor: '#FF4C4C', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 6 },
  txtBlanco: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  txtGris: { color: '#0F69C4', fontWeight: 'bold', fontSize: 16 },
  listaTitulo: { fontSize: 18, fontWeight: 'bold', color: '#002244', marginBottom: 10 },
  card: { flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#C6D6E5', alignItems: 'center' },
  cardTitulo: { fontSize: 16, fontWeight: 'bold', color: '#003366' },
  cardSub: { color: '#4A7A96', fontSize: 14, marginTop: 2 },
  btnBorrar: { backgroundColor: '#FF4D4D', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 6 },
  txtBorrar: { color: '#FFFFFF', fontWeight: 'bold' },
  mensajeTexto: { marginTop: 20, fontSize: 16, fontWeight: 'bold', color: '#0F69C4', textAlign: 'center' }
});