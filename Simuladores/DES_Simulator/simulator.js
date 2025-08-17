/**
 * Simulador del Efecto Avalancha para DES
 * Controla la interfaz de usuario y demuestra visualmente el efecto
 */

class AvalancheSimulator {
    constructor() {
        this.des = new DES();
        this.originalPlaintext = '';
        this.modifiedPlaintext = '';
        this.originalCiphertext = '';
        this.modifiedCiphertext = '';
        this.originalBinary = '';
        this.modifiedBinary = '';
        this.key = '';
        this.flippedBitPosition = -1;
        
        this.initializeEventListeners();
        this.initializeSimulator();
    }

    initializeEventListeners() {
        // Botones principales
        document.getElementById('encrypt').addEventListener('click', () => this.performEncryption());
        document.getElementById('reset').addEventListener('click', () => this.resetSimulator());
        document.getElementById('demo').addEventListener('click', () => this.runDemo());
        
        // Controles de entrada
        document.getElementById('randomize').addEventListener('click', () => this.randomizePlaintext());
        document.getElementById('flip-bit').addEventListener('click', () => this.flipRandomBit());
        
        // Entrada de texto plano
        document.getElementById('plaintext').addEventListener('input', (e) => {
            this.originalPlaintext = e.target.value;
            this.updateBinaryDisplay();
        });
    }

    initializeSimulator() {
        // Generar clave aleatoria inicial
        this.key = this.des.generateRandomKey64();
        document.getElementById('key-binary').textContent = this.key;
        
        // Establecer texto plano inicial
        this.originalPlaintext = 'HOLA1234';
        document.getElementById('plaintext').value = this.originalPlaintext;
        
        // Actualizar visualizaciones
        this.updateBinaryDisplay();
        this.updateKeyDisplay();
    }

    updateBinaryDisplay() {
        if (this.originalPlaintext.length === 0) return;
        
        // Asegurar que el texto tenga exactamente 8 caracteres
        if (this.originalPlaintext.length < 8) {
            this.originalPlaintext = this.originalPlaintext.padEnd(8, ' ');
        } else if (this.originalPlaintext.length > 8) {
            this.originalPlaintext = this.originalPlaintext.substring(0, 8);
        }
        
        console.log('Texto plano procesado:', this.originalPlaintext);
        
        // Mostrar el texto plano
        document.getElementById('original-text').textContent = this.originalPlaintext;
        
        // Generar y mostrar el binario
        this.originalBinary = this.des.textToBinary(this.originalPlaintext);
        console.log('Binario generado:', this.originalBinary);
        document.getElementById('original-binary').textContent = this.formatBinary(this.originalBinary);
        
        // Crear texto modificado cambiando un bit
        this.createModifiedText();
    }

    createModifiedText() {
        if (this.originalBinary.length === 0) return;
        
        // Cambiar un bit aleatorio
        const flipResult = this.des.flipRandomBit(this.originalBinary);
        this.modifiedBinary = flipResult.newBinary;
        this.flippedBitPosition = flipResult.position;
        
        // Convertir de vuelta a texto
        this.modifiedPlaintext = this.des.binaryToText(this.modifiedBinary);
        
        // Mostrar el texto modificado
        document.getElementById('modified-text').textContent = this.modifiedPlaintext;
        
        // Actualizar visualización del binario
        document.getElementById('modified-binary').textContent = this.formatBinary(this.modifiedBinary);
        
        // Resaltar el bit cambiado
        this.highlightChangedBit();
    }

    highlightChangedBit() {
        const originalDisplay = document.getElementById('original-binary');
        const modifiedDisplay = document.getElementById('modified-binary');
        
        // Limpiar resaltados anteriores
        originalDisplay.innerHTML = this.formatBinaryWithHighlight(this.originalBinary, this.flippedBitPosition, false);
        modifiedDisplay.innerHTML = this.formatBinaryWithHighlight(this.modifiedBinary, this.flippedBitPosition, true);
    }

    formatBinary(binary) {
        let formatted = '';
        for (let i = 0; i < binary.length; i++) {
            if (i > 0 && i % 8 === 0) formatted += ' ';
            formatted += binary[i];
        }
        return formatted;
    }

    formatBinaryWithHighlight(binary, highlightPos, isModified) {
        let formatted = '';
        for (let i = 0; i < binary.length; i++) {
            if (i > 0 && i % 8 === 0) formatted += ' ';
            
            if (i === highlightPos) {
                const className = isModified ? 'bit-changed' : 'bit-unchanged';
                formatted += `<span class="${className}">${binary[i]}</span>`;
            } else {
                formatted += binary[i];
            }
        }
        return formatted;
    }

    updateKeyDisplay() {
        document.getElementById('key-binary').textContent = this.key;
    }

    flipRandomBit() {
        this.key = this.des.generateRandomKey64();
        this.updateKeyDisplay();
        
        // Si ya hay texto cifrado, recalcular
        if (this.originalCiphertext) {
            this.performEncryption();
        }
    }

    randomizePlaintext() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomText = '';
        for (let i = 0; i < 8; i++) {
            randomText += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        this.originalPlaintext = randomText;
        document.getElementById('plaintext').value = randomText;
        this.updateBinaryDisplay();
        
        // Limpiar resultados anteriores
        this.clearResults();
    }

    async performEncryption() {
        if (this.originalPlaintext.length === 0) {
            alert('Por favor ingresa un texto plano');
            return;
        }

        // Mostrar indicador de carga
        this.showLoading();

        try {
            // Simular procesamiento
            await this.delay(1000);

            console.log('Cifrando texto original:', this.originalPlaintext);
            // Cifrar texto original
            const originalResult = this.des.encrypt(this.originalPlaintext, true);
            this.originalCiphertext = originalResult.ciphertext;
            console.log('Resultado original:', originalResult);
            
            console.log('Cifrando texto modificado:', this.modifiedPlaintext);
            // Cifrar texto modificado
            const modifiedResult = this.des.encrypt(this.modifiedPlaintext, true);
            this.modifiedCiphertext = modifiedResult.ciphertext;
            console.log('Resultado modificado:', modifiedResult);

            // Actualizar visualizaciones
            this.updateResults();
            this.updateAvalancheStats();
            this.updateRoundsDisplay(originalResult.rounds, modifiedResult.rounds);
            this.updatePermutationsDisplay(originalResult, modifiedResult);

        } catch (error) {
            console.error('Error durante el cifrado:', error);
            alert('Error durante el cifrado: ' + error.message);
        } finally {
            // Ocultar indicador de carga
            this.hideLoading();
        }
    }

    updateResults() {
        document.getElementById('original-cipher').textContent = this.des.binaryToHex(this.originalCiphertext);
        document.getElementById('modified-cipher').textContent = this.des.binaryToHex(this.modifiedCiphertext);
    }

    updateAvalancheStats() {
        const difference = this.des.calculateDifference(this.originalCiphertext, this.modifiedCiphertext);
        
        document.getElementById('bit-difference').textContent = difference.count;
        document.getElementById('change-percentage').textContent = difference.percentage.toFixed(1) + '%';
        document.getElementById('avalanche-factor').textContent = difference.factor.toFixed(3);
        
        // Aplicar clases de diferencia
        this.applyDifferenceClasses(difference.percentage);
    }

    applyDifferenceClasses(percentage) {
        const elements = [
            document.getElementById('bit-difference'),
            document.getElementById('change-percentage'),
            document.getElementById('avalanche-factor')
        ];
        
        elements.forEach(el => {
            el.className = 'stat-value';
            if (percentage >= 50) {
                el.classList.add('difference-high');
            } else if (percentage >= 25) {
                el.classList.add('difference-medium');
            } else {
                el.classList.add('difference-low');
            }
        });
    }

    updateRoundsDisplay(originalRounds, modifiedRounds) {
        const container = document.getElementById('rounds-container');
        container.innerHTML = '';
        
        for (let i = 0; i < originalRounds.length; i++) {
            const roundDiv = document.createElement('div');
            roundDiv.className = 'round-item';
            
            const originalRound = originalRounds[i];
            const modifiedRound = modifiedRounds[i];
            
            // Calcular diferencia para esta ronda
            const roundDiff = this.des.calculateDifference(originalRound.combined, modifiedRound.combined);
            
            roundDiv.innerHTML = `
                <div class="round-header">Ronda ${originalRound.round}</div>
                <div class="round-bits">
                    <strong>Original:</strong> ${this.formatBinary(originalRound.combined)}<br>
                    <strong>Modificado:</strong> ${this.formatBinary(modifiedRound.combined)}<br>
                    <strong>Diferencia:</strong> ${roundDiff.count} bits (${roundDiff.percentage.toFixed(1)}%)
                </div>
            `;
            
            container.appendChild(roundDiv);
        }
    }

    updatePermutationsDisplay(originalResult, modifiedResult) {
        console.log('Actualizando visualización de permutaciones...');
        
        // Mostrar permutación inicial (IP)
        console.log('Binario original:', this.originalBinary);
        console.log('Binario modificado:', this.modifiedBinary);
        
        document.getElementById('ip-input-original').textContent = this.formatBinary(this.originalBinary);
        document.getElementById('ip-input-modified').textContent = this.formatBinary(this.modifiedBinary);
        
        // Para la permutación inicial, necesitamos aplicar IP manualmente
        const ipOriginal = this.des.permute(this.originalBinary, this.des.IP);
        const ipModified = this.des.permute(this.modifiedBinary, this.des.IP);
        
        console.log('Después de IP - Original:', ipOriginal);
        console.log('Después de IP - Modificado:', ipModified);
        
        document.getElementById('ip-output-original').textContent = this.formatBinary(ipOriginal);
        document.getElementById('ip-output-modified').textContent = this.formatBinary(ipModified);
        
        // Mostrar entrada para permutación final (después de las rondas)
        // Tomamos el estado de la última ronda
        if (originalResult.rounds && originalResult.rounds.length > 0) {
            const lastOriginalRound = originalResult.rounds[originalResult.rounds.length - 1];
            const lastModifiedRound = modifiedResult.rounds[modifiedResult.rounds.length - 1];
            
            // Intercambiamos left y right para la permutación final
            const beforeIPInvOriginal = lastOriginalRound.right + lastOriginalRound.left;
            const beforeIPInvModified = lastModifiedRound.right + lastModifiedRound.left;
            
            console.log('Antes de IP⁻¹ - Original:', beforeIPInvOriginal);
            console.log('Antes de IP⁻¹ - Modificado:', beforeIPInvModified);
            
            document.getElementById('ip-inv-input-original').textContent = this.formatBinary(beforeIPInvOriginal);
            document.getElementById('ip-inv-input-modified').textContent = this.formatBinary(beforeIPInvModified);
        }
        
        // Mostrar salida de permutación final (texto cifrado)
        console.log('Texto cifrado original:', this.originalCiphertext);
        console.log('Texto cifrado modificado:', this.modifiedCiphertext);
        
        document.getElementById('ip-inv-output-original').textContent = this.formatBinary(this.originalCiphertext);
        document.getElementById('ip-inv-output-modified').textContent = this.formatBinary(this.modifiedCiphertext);
        
        console.log('Visualización de permutaciones actualizada');
    }

    showLoading() {
        const encryptBtn = document.getElementById('encrypt');
        encryptBtn.textContent = '🔒 Cifrando...';
        encryptBtn.disabled = true;
    }

    hideLoading() {
        const encryptBtn = document.getElementById('encrypt');
        encryptBtn.textContent = '🔒 Cifrar';
        encryptBtn.disabled = false;
    }

    clearResults() {
        document.getElementById('original-cipher').textContent = '';
        document.getElementById('modified-cipher').textContent = '';
        document.getElementById('bit-difference').textContent = '0';
        document.getElementById('change-percentage').textContent = '0%';
        document.getElementById('avalanche-factor').textContent = '0.0';
        document.getElementById('rounds-container').innerHTML = '';
        
        // Limpiar permutaciones
        document.getElementById('ip-input-original').textContent = '';
        document.getElementById('ip-output-original').textContent = '';
        document.getElementById('ip-input-modified').textContent = '';
        document.getElementById('ip-output-modified').textContent = '';
        document.getElementById('ip-inv-input-original').textContent = '';
        document.getElementById('ip-inv-output-original').textContent = '';
        document.getElementById('ip-inv-input-modified').textContent = '';
        document.getElementById('ip-inv-output-modified').textContent = '';
        
        // Limpiar clases de diferencia
        ['bit-difference', 'change-percentage', 'avalanche-factor'].forEach(id => {
            document.getElementById(id).className = 'stat-value';
        });
    }

    resetSimulator() {
        this.initializeSimulator();
        this.clearResults();
    }

    async runDemo() {
        // Secuencia de demostración automática
        const demos = [
            { text: 'HOLA1234', delay: 2000 },
            { text: 'TEST5678', delay: 2000 },
            { text: 'DEMO9999', delay: 2000 },
            { text: 'HOLA1234', delay: 2000 }
        ];
        
        for (const demo of demos) {
            this.originalPlaintext = demo.text;
            document.getElementById('plaintext').value = demo.text;
            this.updateBinaryDisplay();
            
            await this.delay(500);
            await this.performEncryption();
            await this.delay(demo.delay);
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Inicializar el simulador cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new AvalancheSimulator();
});

// Función auxiliar para formatear números
function formatNumber(num, decimals = 2) {
    return Number(num).toFixed(decimals);
}

// Función para generar colores basados en valores
function getColorForValue(value, min = 0, max = 100) {
    const normalized = (value - min) / (max - min);
    const hue = (1 - normalized) * 120; // Verde (120) a Rojo (0)
    return `hsl(${hue}, 70%, 50%)`;
}

// Función para animar cambios de valores
function animateValue(element, start, end, duration = 1000) {
    const startTime = performance.now();
    const difference = end - start;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (difference * progress);
        element.textContent = formatNumber(current);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
} 