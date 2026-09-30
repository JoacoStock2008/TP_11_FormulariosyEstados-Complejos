import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colores } from '@/constants/colores';
import { TipoEntrada } from '@/types/inscripcion';

interface SelectorEntradaProps {
  valor: TipoEntrada;
  error?: string;
  onChange: (tipo: Exclude<TipoEntrada, ''>) => void;
  onBlur: () => void;
}

const opciones: Array<{
  value: Exclude<TipoEntrada, ''>;
  titulo: string;
  detalle: string;
}> = [
  { value: 'general', titulo: 'General', detalle: 'Acceso al festival' },
  { value: 'vip', titulo: 'VIP', detalle: 'Sector preferencial' },
];

export function SelectorEntrada({ valor, error, onChange, onBlur }: SelectorEntradaProps) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>
        Tipo de entrada <Text style={styles.requerido}>*</Text>
      </Text>

      <View style={styles.opciones}>
        {opciones.map((opcion) => {
          const seleccionada = valor === opcion.value;

          return (
            <Pressable
              key={opcion.value}
              accessibilityRole="button"
              accessibilityState={{ selected: seleccionada }}
              onPress={() => {
                onChange(opcion.value);
                onBlur();
              }}
              style={({ pressed }) => [
                styles.opcion,
                seleccionada ? styles.opcionSeleccionada : null,
                pressed ? styles.opcionPresionada : null,
              ]}
            >
              <View style={[styles.radio, seleccionada ? styles.radioSeleccionado : null]}>
                {seleccionada ? <View style={styles.radioCentro} /> : null}
              </View>
              <View style={styles.textos}>
                <Text style={[styles.titulo, seleccionada ? styles.tituloSeleccionado : null]}>
                  {opcion.titulo}
                </Text>
                <Text style={styles.detalle}>{opcion.detalle}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    gap: 8,
  },
  label: {
    color: colores.texto,
    fontSize: 14,
    fontWeight: '700',
  },
  requerido: {
    color: colores.primario,
  },
  opciones: {
    flexDirection: 'row',
    gap: 10,
  },
  opcion: {
    flex: 1,
    minHeight: 74,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 13,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.superficieClara,
  },
  opcionSeleccionada: {
    borderColor: colores.primario,
    backgroundColor: '#2B2B34',
  },
  opcionPresionada: {
    opacity: 0.85,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colores.textoSecundario,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSeleccionado: {
    borderColor: colores.primario,
  },
  radioCentro: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colores.primario,
  },
  textos: {
    flexShrink: 1,
  },
  titulo: {
    color: colores.texto,
    fontWeight: '800',
    fontSize: 15,
  },
  tituloSeleccionado: {
    color: colores.primario,
  },
  detalle: {
    marginTop: 2,
    color: colores.textoSecundario,
    fontSize: 11,
  },
  error: {
    color: colores.error,
    fontSize: 13,
    fontWeight: '600',
  },
});
