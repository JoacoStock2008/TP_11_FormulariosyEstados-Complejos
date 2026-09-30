import { DatosInscripcion, ErroresFormulario } from '@/types/inscripcion';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOLO_NUMEROS_REGEX = /^\d+$/;

export const validarFormulario = (datos: DatosInscripcion): ErroresFormulario => {
  const errores: ErroresFormulario = {};
  const nombre = datos.nombreCompleto.trim();
  const email = datos.email.trim();
  const edadNumero = Number(datos.edad);
  const telefono = datos.telefono.trim();

  if (nombre.length < 3) {
    errores.nombreCompleto = 'Ingresá tu nombre completo';
  }

  if (!EMAIL_REGEX.test(email)) {
    errores.email = 'Ingresá un email válido';
  }

  if (
    datos.edad.trim() === '' ||
    Number.isNaN(edadNumero) ||
    edadNumero < 12 ||
    edadNumero > 99
  ) {
    errores.edad = 'La edad tiene que ser mayor a 12';
  }

  if (!datos.tipoEntrada) {
    errores.tipoEntrada = 'Elegí un tipo de entrada';
  }

  if (telefono !== '' && !SOLO_NUMEROS_REGEX.test(telefono)) {
    errores.telefono = 'Solo se permiten números';
  }

  return errores;
};

export const formularioEsValido = (datos: DatosInscripcion): boolean =>
  Object.keys(validarFormulario(datos)).length === 0;
