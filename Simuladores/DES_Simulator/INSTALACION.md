# 📥 Instalación y Uso del Simulador DES

## 🚀 Instalación Rápida

### Opción 1: Uso Directo (Recomendado para Clases)
1. **Descarga** todos los archivos de la carpeta `DES_Simulator/`
2. **Mantén la estructura de carpetas** tal como está
3. **Abre** `index.html` en tu navegador web
4. **¡Listo!** El simulador funcionará inmediatamente

### Opción 2: Servidor Local (Para Desarrollo)
```bash
# Navega a la carpeta del simulador
cd DES_Simulator

# Inicia un servidor HTTP simple
python3 -m http.server 8000
# O si tienes Node.js:
npx http-server

# Abre en tu navegador: http://localhost:8000
```

## 📁 Estructura de Archivos

```
DES_Simulator/
├── index.html          # Página principal del simulador
├── styles.css          # Estilos y diseño visual
├── des.js              # Implementación del algoritmo DES
├── simulator.js        # Lógica del simulador y interfaz
├── README.md           # Documentación completa
└── INSTALACION.md      # Este archivo
```

## 🌐 Requisitos del Sistema

- **Navegador**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **JavaScript**: Habilitado (por defecto en todos los navegadores modernos)
- **Sistema**: Windows, macOS, Linux (cualquier sistema con navegador web)

## 🔧 Solución de Problemas

### El simulador no se carga
- Verifica que todos los archivos estén en la misma carpeta
- Asegúrate de que JavaScript esté habilitado
- Abre la consola del navegador (F12) para ver errores

### Botón de cifrado no funciona
- Verifica que la consola del navegador no muestre errores
- Asegúrate de que el texto tenga exactamente 8 caracteres
- Recarga la página si es necesario

### Problemas de visualización
- Verifica que tu navegador soporte CSS Grid y Flexbox
- Actualiza tu navegador a la versión más reciente

## 📚 Uso en el Aula

### Para Profesores
1. **Preparación**: Abre el simulador antes de la clase
2. **Demostración**: Usa el botón "🎬 Demo Automático"
3. **Interacción**: Permite que los estudiantes experimenten
4. **Análisis**: Discute los resultados del efecto avalancha

### Para Estudiantes
1. **Experimento**: Cambia el texto plano y observa resultados
2. **Análisis**: Revisa las estadísticas de diferencia
3. **Exploración**: Examina la propagación por rondas
4. **Documentación**: Toma notas de tus observaciones

## 🔄 Actualizaciones

Para actualizar el simulador:
1. **Reemplaza** los archivos existentes con las nuevas versiones
2. **Mantén** la estructura de carpetas
3. **Limpia** la caché del navegador si es necesario

## 📞 Soporte

Si encuentras problemas:
1. **Revisa** la consola del navegador para errores
2. **Verifica** que todos los archivos estén presentes
3. **Prueba** en un navegador diferente
4. **Contacta** al desarrollador con detalles del error

---

**¡Disfruta aprendiendo sobre criptografía con este simulador interactivo!** 🎓🔐 