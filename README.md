# Sonido Sur — Inscripción al festival

Aplicación mobile desarrollada con **React Native + Expo + TypeScript** para registrar asistentes al festival ficticio **Sonido Sur**.

## Cómo correr el proyecto

Requisitos: Node.js compatible con Expo SDK 57 (Expo indica Node.js 22.13.x o superior dentro de las ramas soportadas).

```bash
npm install
npx expo start
```

Después se puede abrir el proyecto en Expo Go o usar las opciones que muestra Expo para Android, iOS o web.

## Forma de validación elegida

Elegí **validación manual** con una función central `validarFormulario()` y mensajes de error por campo. La elegí porque permite mostrar con claridad el uso de un único objeto de estado, `useState`, handlers y lifting state up sin ocultar la lógica detrás de otra librería.

Validaciones implementadas:

- `nombreCompleto`: obligatorio y mínimo 3 caracteres.
- `email`: obligatorio y con formato `usuario@dominio.ext`.
- `edad`: obligatoria, numérica y entre 12 y 99.
- `tipoEntrada`: obligatorio y limitado a `general` o `vip`.
- `telefono`: opcional; si se completa, solo admite números.
- El botón de confirmación queda deshabilitado mientras exista al menos un error.
- Los errores se muestran debajo del campo correspondiente.

## Arquitectura

```text
src/
├── app/                  # Rutas de Expo Router
│   ├── _layout.tsx
│   ├── index.tsx
│   └── inscripcion.tsx
├── components/
│   ├── CampoFormulario.tsx
│   ├── FormularioInscripcion.tsx
│   ├── SelectorEntrada.tsx
│   └── TicketConfirmacion.tsx
├── constants/
│   └── colores.ts
├── types/
│   └── inscripcion.ts
├── utils/
│   └── validaciones.ts
└── views/
    ├── HomeView.tsx
    └── InscripcionScreen.tsx
```

`InscripcionScreen` mantiene el estado real de los datos. `FormularioInscripcion` y `TicketConfirmacion` son componentes hermanos y reciben la información mediante props. Al confirmar correctamente se reemplaza el formulario por el ticket usando renderizado condicional, sin recargar la pantalla.

## Hooks e interacción

- `useState`: datos del formulario, datos confirmados, campos tocados y estado de envío.
- `useEffect`: recuperación del último email guardado.
- `onChangeText`: actualización de los inputs.
- `onPress`: equivalente mobile de `onClick`; se usa en botones y selección de entrada.
- Handlers separados: `handleChange`, `handleSubmit`, `handleConfirmar`, `handleVolverAInscribir`.
- `KeyboardAvoidingView`: `padding` en iOS y `height` en Android para evitar que el teclado tape los campos.

## Navegación

Se utiliza **Expo Router**, que está construido sobre React Navigation y permite navegación basada en archivos. Hay dos pantallas:

1. Inicio (`/`)
2. Inscripción (`/inscripcion`)

El ticket no es una ruta aparte porque la consigna pide que formulario y ticket sean hermanos dentro de la misma `InscripcionScreen`.

## Bonus resueltos

### AsyncStorage

Se guarda el email de la última persona inscripta con `@react-native-async-storage/async-storage`. Cuando la app se abre nuevamente, ese email se precarga.

Al pulsar **“Volver a inscribir a otra persona”**, el formulario se limpia completamente durante esa sesión, tal como pide la consigna.

### Loading de envío

Al confirmar una inscripción válida se muestra un `ActivityIndicator` durante **1 segundo**, simulando el envío a un servidor. Durante ese tiempo el botón queda bloqueado para evitar envíos duplicados.

## Capturas sugeridas para la entrega

1. Formulario con errores visibles debajo de los campos.
2. Formulario completo y válido con el botón habilitado.
3. Ticket de confirmación con los datos ingresados.
