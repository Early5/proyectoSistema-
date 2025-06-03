// Definición de variables globales con estructura unificada
let laboratorios = []; // Array de objetos {nombre, equipos[], registros[]}

// Estructura de objetos:
// Laboratorio: {nombre, equipos: [equipo1, equipo2...], registros: [registro1, registro2...]}
// Equipo: {id, horasUso, fallos, usuarioPrincipal, diasUso, edadEquipo}
// RegistroDiario: {fecha, equipos: [ {id, horas, usuario, fallo, tipoFallo} ] }

// Función principal mejorada con la nueva opción
function main() {
    let opcion;
    do {
        opcion = prompt(`Sistema de Gestión de Laboratorios de Cómputo
1. Registrar nuevo laboratorio
2. Ingresar datos de uso diario
3. Generar reportes semanales
4. Filtrar datos
5. Generar lista de candidatos para renovación
6. Salir
Seleccione una opción:`);

        switch (opcion) {
            case '1': registrarLaboratorio(); break;
            case '2': ingresarDatosUso(); break;
            case '3': generarReportes(); break;
            case '4': filtrarDatos(); break;
            case '5': generarCandidatosRenovacion(); break;
            case '6': alert('Saliendo del sistema...'); break;
            default: alert('Opción no válida. Intente nuevamente.');
        }
    } while (opcion !== '6');
}

// Función para registrar laboratorio
function registrarLaboratorio() {
    const nombreLab = prompt('Ingrese el nombre del laboratorio:');
    if (!nombreLab) {
        alert('Nombre de laboratorio no puede estar vacío.');
        return;
    }

    const cantidadEquipos = parseInt(prompt('Ingrese la cantidad de equipos en el laboratorio:'));
    if (isNaN(cantidadEquipos) || cantidadEquipos <= 0) {
        alert('Cantidad de equipos no válida.');
        return;
    }

    const equipos = Array.from({length: cantidadEquipos}, (_, i) => ({
        id: i + 1,
        horasUso: 0,
        fallos: 0,
        usuarioPrincipal: '',
        diasUso: 0,
        edadEquipo: parseInt(prompt(`Ingrese la edad (en años) del equipo ${i + 1}:`)) || 0
    }));

    laboratorios.push({
        nombre: nombreLab,
        equipos: equipos,
        registros: []
    });

    alert(`Laboratorio "${nombreLab}" registrado con ${cantidadEquipos} equipos.`);
}

// Función para ingresar datos de uso
function ingresarDatosUso() {
    if (laboratorios.length === 0) {
        alert('No hay laboratorios registrados.');
        return;
    }

    const labIndex = seleccionarLaboratorio();
    if (labIndex === null) return;

    const laboratorio = laboratorios[labIndex];
    const fecha = prompt('Ingrese la fecha (DD/MM/AAAA):');
    if (!fecha) return;

    const registroDiario = {
        fecha: fecha,
        equipos: []
    };

    laboratorio.equipos.forEach(equipo => {
        const horas = parseFloat(prompt(`Ingrese horas de uso para el equipo ${equipo.id} (0-24):`));
        if (isNaN(horas) || horas < 0 || horas > 24) {
            alert(`Horas no válidas para equipo ${equipo.id}. Se usará 0.`);
            return;
        }

        const usuario = prompt(`Ingrese nombre del usuario principal del equipo ${equipo.id}:`) || '';
        const fallo = prompt(`¿El equipo ${equipo.id} presentó fallo? (s/n):`).toLowerCase() === 's';
        let tipoFallo = '';
        
        if (fallo) {
            tipoFallo = prompt(`Ingrese tipo de fallo para equipo ${equipo.id}:`) || 'Desconocido';
            equipo.fallos++;
        }

        // Actualizar datos acumulativos del equipo
        equipo.horasUso += horas;
        equipo.diasUso++;
        if (usuario) equipo.usuarioPrincipal = usuario;

        // Añadir al registro diario
        registroDiario.equipos.push({
            id: equipo.id,
            horas: horas,
            usuario: usuario,
            fallo: fallo,
            tipoFallo: tipoFallo
        });
    });

    laboratorio.registros.push(registroDiario);
    alert('Datos diarios registrados correctamente.');
}

// Función auxiliar para seleccionar laboratorio
function seleccionarLaboratorio() {
    let labOptions = 'Seleccione un laboratorio:\n';
    laboratorios.forEach((lab, index) => {
        labOptions += `${index + 1}. ${lab.nombre}\n`;
    });

    const labIndex = parseInt(prompt(labOptions)) - 1;
    if (isNaN(labIndex) || labIndex < 0 || labIndex >= laboratorios.length) {
        alert('Selección no válida.');
        return null;
    }
    return labIndex;
}

// Función para generar reportes
function generarReportes() {
    if (laboratorios.length === 0) {
        alert('No hay laboratorios registrados.');
        return;
    }

    let reporte = '=== REPORTE SEMANAL ===\n\n';
    
    laboratorios.forEach(lab => {
        reporte += `Laboratorio: ${lab.nombre}\n`;
        
        // Estadísticas
        let equiposCriticos = [];
        let equiposSubutilizados = [];
        let usuariosFrecuentes = {};
        let totalHoras = 0;
        
        lab.equipos.forEach(equipo => {
            const promedioDiario = equipo.diasUso > 0 ? equipo.horasUso / equipo.diasUso : 0;
            totalHoras += promedioDiario;
            
            // Identificar equipos críticos
            if (promedioDiario > 8 || equipo.fallos >= 1) {
                equiposCriticos.push({
                    id: equipo.id,
                    motivo: promedioDiario > 8 ? 'Sobreuso' : 'Fallas',
                    valor: promedioDiario > 8 ? `${promedioDiario.toFixed(2)} hrs/día` : `${equipo.fallos} fallos`
                });
            }
            
            // Identificar equipos subutilizados
            if (promedioDiario < 2 && equipo.diasUso > 0) {
                equiposSubutilizados.push({
                    id: equipo.id,
                    horas: promedioDiario.toFixed(2)
                });
            }
            
            // Contar usuarios frecuentes
            if (equipo.usuarioPrincipal) {
                usuariosFrecuentes[equipo.usuarioPrincipal] = 
                    (usuariosFrecuentes[equipo.usuarioPrincipal] || 0) + 1;
            }
        });

        // Generar contenido del reporte
        const promedioGeneral = lab.equipos.length > 0 ? totalHoras / lab.equipos.length : 0;
        reporte += `- Promedio de uso diario: ${promedioGeneral.toFixed(2)} horas\n`;
        
        // Sección equipos críticos
        if (equiposCriticos.length > 0) {
            reporte += '- Equipos críticos:\n';
            equiposCriticos.forEach(eq => {
                reporte += `  * Equipo ${eq.id}: ${eq.motivo} (${eq.valor})\n`;
            });
        }
        
        // Sección equipos subutilizados
        if (equiposSubutilizados.length > 0) {
            reporte += '- Equipos subutilizados (<2 hrs/día):\n';
            equiposSubutilizados.forEach(eq => {
                reporte += `  * Equipo ${eq.id}: ${eq.horas} hrs/día\n`;
            });
        }
        
        // Sección usuarios frecuentes
        const topUsuarios = Object.entries(usuariosFrecuentes)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);
            
        if (topUsuarios.length > 0) {
            reporte += '- Usuarios más frecuentes:\n';
            topUsuarios.forEach(([usuario, count]) => {
                reporte += `  * ${usuario}: ${count} equipos\n`;
            });
        }
        
        reporte += '\n';
    });
    
    alert(reporte);
}

// Función para filtrar datos
function filtrarDatos() {
    if (laboratorios.length === 0) {
        alert('No hay laboratorios registrados.');
        return;
    }

    const criterio = prompt(`Filtrar datos por:
1. Laboratorio
2. Fecha
3. Usuario
4. Equipos con fallos
Seleccione opción:`);

    let resultados = [];

    switch(criterio) {
        case '1': // Por laboratorio
            const labIndex = seleccionarLaboratorio();
            if (labIndex !== null) {
                resultados = laboratorios[labIndex].registros.flatMap(reg => 
                    reg.equipos.map(eq => ({
                        laboratorio: laboratorios[labIndex].nombre,
                        fecha: reg.fecha,
                        equipoId: eq.id,
                        horas: eq.horas,
                        usuario: eq.usuario,
                        fallo: eq.fallo,
                        tipoFallo: eq.tipoFallo
                    }))
                );
            }
            break;
            
        case '2': // Por fecha
            const fecha = prompt('Ingrese fecha (DD/MM/AAAA):');
            laboratorios.forEach(lab => {
                lab.registros
                    .filter(reg => reg.fecha === fecha)
                    .forEach(reg => {
                        reg.equipos.forEach(eq => {
                            resultados.push({
                                laboratorio: lab.nombre,
                                fecha: reg.fecha,
                                equipoId: eq.id,
                                horas: eq.horas,
                                usuario: eq.usuario,
                                fallo: eq.fallo,
                                tipoFallo: eq.tipoFallo
                            });
                        });
                    });
            });
            break;
            
        case '3': // Por usuario
            const usuario = prompt('Ingrese nombre de usuario:');
            laboratorios.forEach(lab => {
                lab.registros.forEach(reg => {
                    reg.equipos
                        .filter(eq => eq.usuario.toLowerCase().includes(usuario.toLowerCase()))
                        .forEach(eq => {
                            resultados.push({
                                laboratorio: lab.nombre,
                                fecha: reg.fecha,
                                equipoId: eq.id,
                                horas: eq.horas,
                                usuario: eq.usuario,
                                fallo: eq.fallo,
                                tipoFallo: eq.tipoFallo
                            });
                        });
                });
            });
            break;
            
        case '4': // Equipos con fallos
            laboratorios.forEach(lab => {
                lab.registros.forEach(reg => {
                    reg.equipos
                        .filter(eq => eq.fallo)
                        .forEach(eq => {
                            resultados.push({
                                laboratorio: lab.nombre,
                                fecha: reg.fecha,
                                equipoId: eq.id,
                                horas: eq.horas,
                                usuario: eq.usuario,
                                fallo: true,
                                tipoFallo: eq.tipoFallo
                            });
                        });
                });
            });
            break;
            
        default:
            alert('Opción no válida.');
            return;
    }

    mostrarResultadosFiltrados(resultados);
}

// Función auxiliar para mostrar resultados filtrados
function mostrarResultadosFiltrados(resultados) {
    if (resultados.length === 0) {
        alert('No se encontraron registros con ese filtro.');
        return;
    }

    let mensaje = `Resultados (${resultados.length} registros):\n\n`;
    resultados.forEach(reg => {
        mensaje += `Lab: ${reg.laboratorio}, Fecha: ${reg.fecha}, Equipo: ${reg.equipoId}\n`;
        mensaje += `Horas: ${reg.horas}, Usuario: ${reg.usuario || 'N/A'}`;
        if (reg.fallo) {
            mensaje += `, FALLO: ${reg.tipoFallo}`;
        }
        mensaje += '\n\n';
    });

    alert(mensaje);
}

// FUNCIÓN: Generar lista de candidatos para renovación
function generarCandidatosRenovacion() {
    if (laboratorios.length === 0) {
        alert('No hay laboratorios registrados.');
        return;
    }

    // Configuración de umbrales (pueden modificarse)
    const UMBRAL_EDAD = 5; // Equipos con 5+ años son candidatos
    const UMBRAL_USO_EXCESIVO = 6; // 6+ horas diarias promedio
    const UMBRAL_FALLOS = 3; // 3+ fallos registrados

    let candidatos = [];

    laboratorios.forEach(laboratorio => {
        laboratorio.equipos.forEach(equipo => {
            const promedioUsoDiario = equipo.diasUso > 0 ? equipo.horasUso / equipo.diasUso : 0;
            let motivos = [];
            
            // Verificar criterios de renovación
            if (equipo.edadEquipo >= UMBRAL_EDAD) {
                motivos.push(`Edad (${equipo.edadEquipo} años)`);
            }
            
            if (promedioUsoDiario >= UMBRAL_USO_EXCESIVO) {
                motivos.push(`Uso excesivo (${promedioUsoDiario.toFixed(2)} hrs/día)`);
            }
            
            if (equipo.fallos >= UMBRAL_FALLOS) {
                motivos.push(`Fallos frecuentes (${equipo.fallos})`);
            }
            
            // Si cumple al menos un criterio, agregar a la lista
            if (motivos.length > 0) {
                candidatos.push({
                    laboratorio: laboratorio.nombre,
                    equipoId: equipo.id,
                    edad: equipo.edadEquipo,
                    usoPromedio: promedioUsoDiario,
                    fallos: equipo.fallos,
                    motivos: motivos.join(', '),
                    prioridad: motivos.length // Más motivos = mayor prioridad
                });
            }
        });
    });

    // Ordenar por prioridad (descendente) y luego por edad (descendente)
    candidatos.sort((a, b) => {
        if (b.prioridad !== a.prioridad) {
            return b.prioridad - a.prioridad;
        }
        return b.edad - a.edad;
    });

    // Mostrar resultados
    if (candidatos.length === 0) {
        alert(`No se encontraron equipos candidatos para renovación según los criterios:
- Edad ≥ ${UMBRAL_EDAD} años
- Uso promedio ≥ ${UMBRAL_USO_EXCESIVO} hrs/día
- Fallos ≥ ${UMBRAL_FALLOS}`);
        return;
    }

    let reporte = `=== EQUIPOS CANDIDATOS PARA RENOVACIÓN ===\n`;
    reporte += `Criterios aplicados:\n`;
    reporte += `- Edad del equipo:  ${UMBRAL_EDAD} años\n`;
    reporte += `- Uso excesivo:  ${UMBRAL_USO_EXCESIVO} horas diarias promedio\n`;
    reporte += `- Fallos frecuentes:  ${UMBRAL_FALLOS} fallos registrados\n\n`;
    reporte += `Total de equipos candidatos: ${candidatos.length}\n\n`;
    
    candidatos.forEach((c, index) => {
        reporte += `${index + 1}. [Prioridad ${c.prioridad}] ${c.laboratorio} - Equipo ${c.equipoId}\n`;
        reporte += `   Motivos: ${c.motivos}\n`;
        reporte += `   Detalles: ${c.edad} años, ${c.usoPromedio.toFixed(2)} hrs/día, ${c.fallos} fallos\n\n`;
    });

    // Usamos console.log para mejor visualización si se ejecuta en navegador
    console.log(reporte);
    alert(reporte);
}

// Iniciar la aplicación
main();


