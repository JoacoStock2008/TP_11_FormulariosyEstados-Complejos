import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colores } from '@/constants/colores';

export function HomeView() {
  const handleIrAInscripcion = () => {
    router.push('/inscripcion');
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.acentoUno} />
      <View style={styles.acentoDos} />

      <View style={styles.contenido}>
        <Text style={styles.edicion}>EDICIÓN 2026 · BUENOS AIRES</Text>
        <Text style={styles.titulo}>SONIDO{`\n`}SUR</Text>
        <Text style={styles.bajada}>
          Una noche. Dos escenarios. Toda la energía de la música en vivo.
        </Text>

        <View style={styles.info}>
          <View style={styles.infoItem}>
            <Text style={styles.infoNumero}>02</Text>
            <Text style={styles.infoLabel}>TIPOS DE ENTRADA</Text>
          </View>
          <View style={styles.divisor} />
          <View style={styles.infoItem}>
            <Text style={styles.infoNumero}>1</Text>
            <Text style={styles.infoLabel}>INSCRIPCIÓN DIGITAL</Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={handleIrAInscripcion}
          style={({ pressed }) => [styles.boton, pressed ? styles.botonPresionado : null]}
        >
          <Text style={styles.botonTexto}>Quiero inscribirme</Text>
          <Text style={styles.flecha}>→</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
    overflow: 'hidden',
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  acentoUno: {
    position: 'absolute',
    top: -90,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 35,
    borderColor: colores.primario,
    opacity: 0.18,
  },
  acentoDos: {
    position: 'absolute',
    bottom: 90,
    left: -90,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#6D59D9',
    opacity: 0.13,
  },
  edicion: {
    color: colores.primario,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.6,
  },
  titulo: {
    marginTop: 12,
    color: colores.texto,
    fontSize: 68,
    lineHeight: 62,
    fontWeight: '900',
    letterSpacing: -2.8,
  },
  bajada: {
    marginTop: 22,
    maxWidth: 440,
    color: colores.textoSecundario,
    fontSize: 18,
    lineHeight: 27,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 34,
    marginBottom: 34,
  },
  infoItem: {
    flex: 1,
  },
  infoNumero: {
    color: colores.texto,
    fontSize: 30,
    fontWeight: '900',
  },
  infoLabel: {
    marginTop: 3,
    color: colores.textoSecundario,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  divisor: {
    width: 1,
    marginHorizontal: 18,
    backgroundColor: colores.borde,
  },
  boton: {
    minHeight: 56,
    borderRadius: 15,
    backgroundColor: colores.primario,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 19,
  },
  botonPresionado: {
    backgroundColor: colores.primarioOscuro,
    transform: [{ scale: 0.99 }],
  },
  botonTexto: {
    color: colores.negro,
    fontSize: 16,
    fontWeight: '900',
  },
  flecha: {
    color: colores.negro,
    fontSize: 24,
    fontWeight: '800',
  },
});
