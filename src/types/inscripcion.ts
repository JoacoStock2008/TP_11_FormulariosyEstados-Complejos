export type TipoEntrada = 'general' | 'vip' | '';

export interface DatosInscripcion {
  nombreCompleto: string;
  email: string;
  edad: string;
  tipoEntrada: TipoEntrada;
  telefono: string;
}

export type ErroresFormulario = Partial<Record<keyof DatosInscripcion, string>>;

export const datosIniciales: DatosInscripcion = {
  nombreCompleto: '',
  email: '',
  edad: '',
  tipoEntrada: '',
  telefono: '',
};
