import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colores } from '@/constants/colores';
import { DatosInscripcion } from '@/types/inscripcion';

interface TicketConfirmacionProps {
  datos: DatosInscripcion;
  onVolverAInscribir: () => void;
}

function FilaTicket({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <View style={styles.fila}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <Text style={styles.valor}>{valor}</Text>
    </View>
  );
}

export function TicketConfirmacion({
  datos,
  onVolverAInscribir,
}: TicketConfirmacionProps) {
  return (
    <View style={styles.contenedor}>
      <View style={styles.confirmacion}>
        <View style={styles.iconoOk}>
          <Text style={styles.check}>✓</Text>
        </View>
        <Text style={styles.eyebrow}>INSCRIPCIÓN CONFIRMADA</Text>
        <Text style={styles.titulo}>Nos vemos en Sonido Sur.</Text>
        <Text style={styles.subtitulo}>
          Guardá este ticket como referencia de tu inscripción.
        </Text>
      </View>

      <View style={styles.ticket}>
        <View style={styles.cabeceraTicket}>
          <View>
            <Text style={styles.marca}>SONIDO SUR</Text>
            <Text style={styles.fecha}>Festival 2026</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeTexto}>{datos.tipoEntrada.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.separador} />

        <FilaTicket etiqueta="Nombre" valor={datos.nombreCompleto.trim()} />
        <FilaTicket etiqueta="Email" valor={datos.email.trim()} />
        <FilaTicket etiqueta="Edad" valor={`${datos.edad} años`} />
        <FilaTicket
          etiqueta="Teléfono"
          valor={datos.telefono.trim() || 'No informado'}
        />

        <View style={styles.codigo}>
          <Text style={styles.codigoTexto}>SS · {datos.email.slice(0, 3).toUpperCase()} · 2026</Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onVolverAInscribir}
        style={({ pressed }) => [styles.boton, pressed ? styles.botonPresionado : null]}
      >
        <Text style={styles.botonTexto}>Volver a inscribir a otra persona</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  confirmacion: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconoOk: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colores.exito,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  check: {
    color: colores.negro,
    fontSize: 31,
    fontWeight: '900',
  },
  eyebrow: {
    color: colores.exito,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  titulo: {
    marginTop: 8,
    color: colores.texto,
    fontSize: 29,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitulo: {
    marginTop: 8,
    color: colores.textoSecundario,
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
  },
  ticket: {
    padding: 20,
    borderRadius: 22,
    backgroundColor: colores.blanco,
  },
  cabeceraTicket: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  marca: {
    color: colores.negro,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  fecha: {
    marginTop: 2,
    color: '#5E6675',
    fontSize: 13,
    fontWeight: '600',
  },
  badge: {
    borderRadius: 999,
    backgroundColor: colores.primario,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  badgeTexto: {
    color: colores.negro,
    fontSize: 12,
    fontWeight: '900',
  },
  separador: {
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#C8CCD4',
    marginVertical: 20,
  },
  fila: {
    marginBottom: 15,
  },
  etiqueta: {
    color: '#6A7280',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  valor: {
    marginTop: 3,
    color: colores.negro,
    fontSize: 16,
    fontWeight: '800',
  },
  codigo: {
    marginTop: 7,
    borderRadius: 11,
    backgroundColor: '#EEF0F4',
    paddingVertical: 11,
    paddingHorizontal: 12,
  },
  codigoTexto: {
    color: '#444B57',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  boton: {
    minHeight: 52,
    marginTop: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colores.primario,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  botonPresionado: {
    backgroundColor: '#272A2D',
  },
  botonTexto: {
    color: colores.primario,
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
  },
});
