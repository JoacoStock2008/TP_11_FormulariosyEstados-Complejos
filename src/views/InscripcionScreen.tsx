import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { FormularioInscripcion } from '@/components/FormularioInscripcion';
import { TicketConfirmacion } from '@/components/TicketConfirmacion';
import { colores } from '@/constants/colores';
import { DatosInscripcion, datosIniciales } from '@/types/inscripcion';

const CLAVE_ULTIMO_EMAIL = '@sonido-sur/ultimo-email';
const DEMORA_ENVIO_MS = 1000;

const esperar = (milisegundos: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, milisegundos));

export function InscripcionScreen() {
  const [datos, setDatos] = useState<DatosInscripcion>(datosIniciales);
  const [datosConfirmados, setDatosConfirmados] = useState<DatosInscripcion | null>(null);

  useEffect(() => {
    const cargarUltimoEmail = async () => {
      try {
        const emailGuardado = await AsyncStorage.getItem(CLAVE_ULTIMO_EMAIL);

        if (emailGuardado) {
          setDatos((actuales) => ({ ...actuales, email: emailGuardado }));
        }
      } catch (error) {
        console.warn('No se pudo recuperar el último email guardado.', error);
      }
    };

    void cargarUltimoEmail();
  }, []);

  const handleChange = <K extends keyof DatosInscripcion>(
    campo: K,
    valor: DatosInscripcion[K],
  ) => {
    setDatos((actuales) => ({ ...actuales, [campo]: valor }));
  };

  const handleSubmit = async () => {
    await esperar(DEMORA_ENVIO_MS);

    const datosNormalizados: DatosInscripcion = {
      ...datos,
      nombreCompleto: datos.nombreCompleto.trim(),
      email: datos.email.trim(),
      telefono: datos.telefono.trim(),
    };

    setDatosConfirmados(datosNormalizados);

    try {
      await AsyncStorage.setItem(CLAVE_ULTIMO_EMAIL, datosNormalizados.email);
    } catch (error) {
      console.warn('No se pudo guardar el email de la inscripción.', error);
    }
  };

  const handleVolverAInscribir = () => {
    setDatos(datosIniciales);
    setDatosConfirmados(null);
  };

  return (
    <View style={styles.contenedor}>
      {datosConfirmados ? (
        <TicketConfirmacion
          datos={datosConfirmados}
          onVolverAInscribir={handleVolverAInscribir}
        />
      ) : (
        <FormularioInscripcion
          datos={datos}
          onHandleChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
});
