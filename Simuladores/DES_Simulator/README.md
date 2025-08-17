# 🔐 Simulador del Efecto Avalancha - DES

## Descripción

Este simulador interactivo demuestra visualmente el **efecto avalancha** en el algoritmo DES (Data Encryption Standard). El efecto avalancha es una propiedad fundamental de los algoritmos de cifrado modernos que garantiza que un pequeño cambio en el texto plano o en la clave resulte en un cambio significativo en el texto cifrado.

## 🎯 Objetivos Educativos

- **Comprender el efecto avalancha**: Ver cómo un cambio de 1 bit se propaga
- **Visualizar el proceso DES**: Seguir el flujo de bits a través de las rondas
- **Analizar estadísticas**: Medir la diferencia entre textos cifrados
- **Experimentar interactivamente**: Cambiar entradas y observar resultados

## 🚀 Características

### ✨ Funcionalidades Principales
- **Entrada de texto**: Ingresa texto plano de 8 caracteres
- **Generación de claves**: Claves DES de 64 bits aleatorias
- **Cifrado en tiempo real**: Proceso de cifrado paso a paso
- **Análisis de diferencias**: Estadísticas detalladas del efecto avalancha
- **Visualización por rondas**: Seguimiento de la propagación de bits

### 🎨 Interfaz Visual
- **Diseño moderno**: Interfaz intuitiva y atractiva
- **Visualización binaria**: Representación clara de bits
- **Indicadores de color**: Resaltado de bits modificados
- **Responsive design**: Funciona en dispositivos móviles y de escritorio

## 📖 Cómo Usar

### 1. **Configuración Inicial**
   - Abre `index.html` en tu navegador web
   - El simulador se inicializa con texto y clave por defecto

### 2. **Entrada de Datos**
   - **Texto Plano**: Escribe hasta 8 caracteres en el campo de entrada
   - **Clave**: Usa el botón "🔄 Cambiar 1 bit" para generar nuevas claves
   - **Aleatorio**: Genera texto plano aleatorio con "🎲 Aleatorio"

### 3. **Ejecutar Cifrado**
   - Haz clic en "🔒 Cifrar" para procesar ambos textos
   - Observa los resultados en tiempo real
   - Analiza las estadísticas del efecto avalancha

### 4. **Análisis de Resultados**
   - **Bits diferentes**: Número de bits que cambiaron
   - **Porcentaje de cambio**: Proporción de bits modificados
   - **Factor avalancha**: Medida de la efectividad del efecto

### 5. **Exploración por Rondas**
   - Revisa la propagación de cambios en cada ronda del DES
   - Observa cómo se expande la diferencia a través del algoritmo

## 🔬 Conceptos Técnicos

### Efecto Avalancha
El efecto avalancha es una propiedad que garantiza que:
- Un cambio de 1 bit en el texto plano debe cambiar aproximadamente el 50% de los bits del texto cifrado
- Un cambio de 1 bit en la clave debe cambiar aproximadamente el 50% de los bits del texto cifrado

### Componentes del DES que Generan el Efecto
1. **Función de Expansión (E)**: Expande 32 bits a 48 bits
2. **Cajas S**: Transforman 6 bits en 4 bits de manera no lineal
3. **Permutaciones**: Reorganizan los bits para difundir cambios
4. **XOR con Subclaves**: Mezclan bits de la clave en cada ronda

### Implementación Educativa
Este simulador implementa una versión simplificada del DES que mantiene:
- La estructura general del algoritmo
- Los conceptos clave del efecto avalancha
- La visualización de la propagación de bits
- Las estadísticas de diferencia

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura de la interfaz
- **CSS3**: Estilos y animaciones
- **JavaScript ES6+**: Lógica del simulador
- **Algoritmo DES**: Implementación educativa simplificada

## 📱 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Dispositivos**: Escritorio, tablet, móvil
- **Sistemas**: Windows, macOS, Linux

## 🎓 Uso en el Aula

### Para Estudiantes
- Experimenta con diferentes textos y claves
- Observa cómo cambian las estadísticas
- Analiza la propagación por rondas
- Comprende la importancia del efecto avalancha

### Para Profesores
- Demuestra conceptos criptográficos de manera visual
- Ilustra la robustez del algoritmo DES
- Facilita la comprensión de propiedades de seguridad
- Proporciona ejemplos prácticos para discusión

## 🔍 Experimentos Sugeridos

1. **Cambio de Texto Plano**
   - Cambia un solo carácter y observa el resultado
   - Compara textos similares (ej: "HOLA1234" vs "HOLA1235")

2. **Cambio de Clave**
   - Usa el botón de cambio de bit en la clave
   - Observa cómo afecta al mismo texto plano

3. **Análisis Estadístico**
   - Ejecuta múltiples cifrados
   - Calcula el promedio del factor avalancha
   - Compara con el valor teórico del 50%

## 📚 Recursos Adicionales

- **Estándar DES**: FIPS PUB 46-3
- **Criptografía Moderna**: Principios y aplicaciones
- **Análisis de Seguridad**: Métodos de evaluación criptográfica

## 🤝 Contribuciones

Este simulador está diseñado para uso educativo. Las mejoras y sugerencias son bienvenidas para hacer el aprendizaje de la criptografía más accesible y efectivo.

---

**Desarrollado para la enseñanza de criptografía en ingeniería** 🎓 