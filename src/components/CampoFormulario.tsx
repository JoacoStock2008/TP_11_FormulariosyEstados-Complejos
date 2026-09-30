import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { colores } from '@/constants/colores';

interface CampoFormularioProps extends TextInputProps {
  label: string;
  error?: string;
  requerido?: boolean;
}

export function CampoFormulario({
  label,
  error,
  requerido = false,
  style,
  ...inputProps
}: CampoFormularioProps) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>
        {label}
        {requerido ? <Text style={styles.requerido}> *</Text> : null}
      </Text>

      <TextInput
        {...inputProps}
        placeholderTextColor={colores.textoSecundario}
        style={[styles.input, error ? styles.inputError : null, style]}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    gap: 7,
  },
  label: {
    color: colores.texto,
    fontSize: 14,
    fontWeight: '700',
  },
  requerido: {
    color: colores.primario,
  },
  input: {
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.superficieClara,
    color: colores.texto,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputError: {
    borderColor: colores.error,
  },
  error: {
    color: colores.error,
    fontSize: 13,
    fontWeight: '600',
  },
});
