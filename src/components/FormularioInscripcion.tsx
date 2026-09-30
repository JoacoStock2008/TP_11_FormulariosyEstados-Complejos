import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { CampoFormulario } from '@/components/CampoFormulario';
import { SelectorEntrada } from '@/components/SelectorEntrada';
import { colores } from '@/constants/colores';
import { DatosInscripcion } from '@/types/inscripcion';
import { validarFormulario } from '@/utils/validaciones';

interface FormularioInscripcionProps {
  datos: DatosInscripcion;
  onHandleChange: <K extends keyof DatosInscripcion>(
    campo: K,
    valor: DatosInscripcion[K],
  ) => void;
  onSubmit: () => Promise<void>;
}

type CamposTocados = Partial<Record<keyof DatosInscripcion, boolean>>;

export function FormularioInscripcion({
  datos,
  onHandleChange,
  onSubmit,
}: FormularioInscripcionProps) {
  const [camposTocados, setCamposTocados] = useState<CamposTocados>({});
  const [enviando, setEnviando] = useState(false);

  const errores = useMemo(() => validarFormulario(datos), [datos]);
  const formularioInvalido = Object.keys(errores).length > 0;

  const marcarTocado = (campo: keyof DatosInscripcion) => {
    setCamposTocados((actuales) => ({ ...actuales, [campo]: true }));
  };

  const errorVisible = (campo: keyof DatosInscripcion) =>
    camposTocados[campo] ? errores[campo] : undefined;

  const handleConfirmar = async () => {
    if (formularioInvalido || enviando) return;

    setEnviando(true);
    await onSubmit();
    setEnviando(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 12 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContenido}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.encabezado}>
          <Text style={styles.eyebrow}>SONIDO SUR · 2026</Text>
          <Text style={styles.titulo}>Tu lugar empieza acá.</Text>
          <Text style={styles.subtitulo}>
            Completá tus datos y elegí cómo querés vivir el festival.
          </Text>
        </View>

        <View style={styles.tarjetaFormulario}>
          <CampoFormulario
            label="Nombre completo"
            requerido
            value={datos.nombreCompleto}
            onChangeText={(valor) => onHandleChange('nombreCompleto', valor)}
            onBlur={() => marcarTocado('nombreCompleto')}
            placeholder="Ej. Martina López"
            autoCapitalize="words"
            returnKeyType="next"
            error={errorVisible('nombreCompleto')}
          />

          <CampoFormulario
            label="Email"
            requerido
            value={datos.email}
            onChangeText={(valor) => onHandleChange('email', valor)}
            onBlur={() => marcarTocado('email')}
            placeholder="nombre@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            error={errorVisible('email')}
          />

          <CampoFormulario
            label="Edad"
            requerido
            value={datos.edad}
            onChangeText={(valor) => onHandleChange('edad', valor.replace(/[^0-9]/g, ''))}
            onBlur={() => marcarTocado('edad')}
            placeholder="Ej. 17"
            keyboardType="numeric"
            maxLength={2}
            returnKeyType="next"
            error={errorVisible('edad')}
          />

          <SelectorEntrada
            valor={datos.tipoEntrada}
            onChange={(tipo) => onHandleChange('tipoEntrada', tipo)}
            onBlur={() => marcarTocado('tipoEntrada')}
            error={errorVisible('tipoEntrada')}
          />

          <CampoFormulario
            label="Teléfono"
            value={datos.telefono}
            onChangeText={(valor) => onHandleChange('telefono', valor)}
            onBlur={() => marcarTocado('telefono')}
            placeholder="Opcional · solo números"
            keyboardType="phone-pad"
            returnKeyType="done"
            error={errorVisible('telefono')}
          />

          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: formularioInvalido || enviando }}
            disabled={formularioInvalido || enviando}
            onPress={handleConfirmar}
            style={({ pressed }) => [
              styles.boton,
              formularioInvalido || enviando ? styles.botonDeshabilitado : null,
              pressed && !formularioInvalido ? styles.botonPresionado : null,
            ]}
          >
            {enviando ? (
              <>
                <ActivityIndicator size="small" color={colores.negro} />
                <Text style={styles.textoBoton}>Confirmando...</Text>
              </>
            ) : (
              <Text style={styles.textoBoton}>Confirmar inscripción</Text>
            )}
          </Pressable>

          <Text style={styles.ayuda}>
            * Campos obligatorios · El botón se habilita cuando todos los datos son válidos.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContenido: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 36,
  },
  encabezado: {
    marginBottom: 22,
  },
  eyebrow: {
    color: colores.primario,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.7,
  },
  titulo: {
    marginTop: 8,
    color: colores.texto,
    fontSize: 34,
    lineHeight: 39,
    fontWeight: '900',
  },
  subtitulo: {
    marginTop: 8,
    maxWidth: 480,
    color: colores.textoSecundario,
    fontSize: 16,
    lineHeight: 23,
  },
  tarjetaFormulario: {
    gap: 18,
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.superficie,
  },
  boton: {
    minHeight: 54,
    marginTop: 2,
    borderRadius: 14,
    backgroundColor: colores.primario,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 18,
  },
  botonDeshabilitado: {
    opacity: 0.38,
  },
  botonPresionado: {
    transform: [{ scale: 0.99 }],
    backgroundColor: colores.primarioOscuro,
  },
  textoBoton: {
    color: colores.negro,
    fontSize: 16,
    fontWeight: '900',
  },
  ayuda: {
    color: colores.textoSecundario,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
  },
});
