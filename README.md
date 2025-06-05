# Sistema de Gestión de Laboratorios de Cómputo

## Descripción del Proyecto

Este sistema de gestión integral para laboratorios de cómputo está diseñado para instituciones educativas o empresas que necesitan monitorear y administrar sus recursos tecnológicos. La solución proporciona herramientas completas para el registro, seguimiento y análisis del uso de equipos de cómputo en múltiples laboratorios, permitiendo una toma de decisiones basada en datos concretos sobre utilización, fallas y vida útil del equipamiento.

El sistema fue desarrollado completamente en JavaScript y opera en el lado del cliente, siendo ideal para implementaciones rápidas sin necesidad de infraestructura compleja. Su arquitectura modular permite fácil expansión y adaptación a diferentes necesidades institucionales.

## Objetivos Principales

1. **Digitalización del proceso de registro y monitoreo de equipos**
2. **Optimización en la asignación de recursos tecnológicos**
3. **Prevención de fallas mediante identificación temprana de problemas**
4. **Planificación estratégica de renovación de equipos**
5. **Generación de inteligencia operativa mediante análisis de datos**

## Características Clave

### 1. Gestión Centralizada de Múltiples Laboratorios
- Registro ilimitado de laboratorios.
- Capacidad para gestionar diferentes conjuntos de equipos por laboratorio.
- Visión unificada de todos los recursos tecnológicos.

### 2. Monitoreo Detallado de Equipos
- Seguimiento por equipo individual.
- Histórico completo de uso.
- Registro de usuarios principales.
- Documentación de fallas técnicas.

---

## Requerimientos del Sistema de Gestión de Laboratorios de Cómputo

Este documento detalla los requisitos funcionales y no funcionales del sistema de gestión de laboratorios de cómputo.

### Requisitos Funcionales

#### 1. Gestión de Laboratorios
- **Registrador de Laboratorio:** Permitir registrar nuevos laboratorios, solicitando un nombre y la cantidad de equipos.
- **Definir Equipos por Laboratorio:** Permitir especificar la edad inicial (en años) de cada equipo al registrar un laboratorio.
- **Visualización de Laboratorios:** Listar los laboratorios registrados para seleccionar uno y operar sobre él.

#### 2. Ingreso y Monitoreo de Datos de Uso Diario
- **Ingreso de Datos Diarios:** Registrar datos de uso para los equipos de un laboratorio en una fecha dada.
- **Registro de Horas de Uso:** Ingresar las horas de uso diarias (0 a 24) para cada equipo.
- **Registro de Usuario Principal:** Asignar un usuario principal al equipo durante el registro diario.
- **Registro de Fallos:** Indicar si un equipo presentó un fallo y registrar el tipo de fallo si aplica.
- **Acumulación de Datos:** Acumular automáticamente las horas de uso, días de uso y conteo de fallos de cada equipo.
- **Actualización de Usuario Principal:** Actualizar el usuario principal si se ingresa uno nuevo.

#### 3. Generación de Informes Semanales
- **Reporte de Promedio de Uso:** Calcular y mostrar el promedio de horas de uso diario por laboratorio.
- **Identificación de Equipos Críticos:** Listar equipos con uso promedio superior a 8 horas o que hayan registrado al menos un fallo, indicando motivo y valor correspondiente.
- **Identificación de Equipos Subutilizados:** Listar equipos con promedio de uso diario inferior a 2 horas (si han sido usados al menos un día).
- **Identificación de Usuarios Frecuentes:** Listar los 3 usuarios que más equipos han utilizado como principales en un laboratorio.
- **Consolidación de Informes:** Presentar los informes de manera consolidada por laboratorio.

#### 4. Filtrado de Datos
- **Filtrar por Laboratorio:** Filtrar registros de uso por laboratorio específico.
- **Filtrar por Fecha:** Filtrar registros de uso por fecha específica.
- **Filtrar por Usuario:** Filtrar registros de uso por usuario específico (búsqueda parcial de nombre).
- **Filtrar Equipos con Fallos:** Mostrar solo registros de equipos que presentaron fallos.
- **Mostrar Resultados Filtrados:** Mostrar laboratorio, fecha, ID de equipo, horas de uso, usuario y tipo de fallo si aplica.

#### 5. Generación de Candidatos para Renovación
- **Identificación por Edad:** Equipos con 5 años o más como candidatos para renovación.
- **Identificación por Uso Excesivo:** Equipos con promedio de uso diario de 6 horas o más como candidatos para renovación.
- **Identificación por Fallos Frecuentes:** Equipos con 3 o más fallos como candidatos para renovación.
- **Priorización de Candidatos:** Priorizar equipos candidatos; más criterios cumplidos, mayor prioridad. En caso de empate, priorizar por mayor edad.
- **Reporte de Candidatos:** Generar un reporte detallado de los equipos candidatos para renovación, incluyendo laboratorio, ID, edad, uso promedio, número de fallos y motivos de candidatura.

---

### Requisitos No Funcionales

#### 1. Rendimiento
- **Tiempo de Respuesta:** Operaciones de registro y consulta deben ser rápidas e instantáneas para el usuario.

#### 2. Usabilidad
- **Interfaz Intuitiva:** Interacción a través de cuadros de diálogo (`prompt` y `alert`) que guían al usuario en cada paso.
- **Manejo de Entradas:** Validación de entradas y mensajes de error claros para datos no válidos.
- **Mensajes Informativos:** Mensajes claros sobre el éxito o fracaso de las operaciones.
