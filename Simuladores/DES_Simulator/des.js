/**
 * Implementación simplificada del algoritmo DES para demostrar el efecto avalancha
 * Esta es una versión educativa que mantiene los conceptos clave del DES real
 */

class DES {
    constructor() {
        // Permutación inicial (IP)
        this.IP = [
            58, 50, 42, 34, 26, 18, 10, 2,
            60, 52, 44, 36, 28, 20, 12, 4,
            62, 54, 46, 38, 30, 22, 14, 6,
            64, 56, 48, 40, 32, 24, 16, 8,
            57, 49, 41, 33, 25, 17, 9, 1,
            59, 51, 43, 35, 27, 19, 11, 3,
            61, 53, 45, 37, 29, 21, 13, 5,
            63, 55, 47, 39, 31, 23, 15, 7
        ];

        // Permutación final (IP^-1)
        this.IP_INV = [
            40, 8, 48, 16, 56, 24, 64, 32,
            39, 7, 47, 15, 55, 23, 63, 31,
            38, 6, 46, 14, 54, 22, 62, 30,
            37, 5, 45, 13, 53, 21, 61, 29,
            36, 4, 44, 12, 52, 20, 60, 28,
            35, 3, 43, 11, 51, 19, 59, 27,
            34, 2, 42, 10, 50, 18, 58, 26,
            33, 1, 41, 9, 49, 17, 57, 25
        ];

        // Función de expansión E
        this.E = [
            32, 1, 2, 3, 4, 5,
            4, 5, 6, 7, 8, 9,
            8, 9, 10, 11, 12, 13,
            12, 13, 14, 15, 16, 17,
            16, 17, 18, 19, 20, 21,
            20, 21, 22, 23, 24, 25,
            24, 25, 26, 27, 28, 29,
            28, 29, 30, 31, 32, 1
        ];

        // Permutación P
        this.P = [
            16, 7, 20, 21, 29, 12, 28, 17,
            1, 15, 23, 26, 5, 18, 31, 10,
            2, 8, 24, 14, 32, 27, 3, 9,
            19, 13, 30, 6, 22, 11, 4, 25
        ];

        // Cajas S simplificadas (4x4 en lugar de 4x16 para simplificar)
        this.S_BOXES = [
            // S1
            [
                [14, 4, 13, 1], [2, 15, 11, 8], [3, 10, 6, 12], [5, 9, 0, 7]
            ],
            // S2
            [
                [0, 15, 7, 4], [14, 2, 13, 1], [10, 6, 12, 11], [9, 5, 3, 8]
            ],
            // S3
            [
                [4, 1, 14, 8], [13, 6, 2, 11], [15, 12, 9, 7], [3, 10, 5, 0]
            ],
            // S4
            [
                [15, 12, 8, 2], [4, 9, 1, 7], [5, 11, 3, 14], [10, 0, 6, 13]
            ],
            // S5
            [
                [3, 13, 4, 7], [15, 2, 8, 14], [9, 12, 5, 6], [1, 10, 11, 0]
            ],
            // S6
            [
                [14, 11, 2, 12], [4, 7, 13, 1], [5, 0, 15, 10], [3, 9, 8, 6]
            ],
            // S7
            [
                [4, 2, 1, 11], [10, 13, 7, 8], [15, 9, 12, 5], [6, 3, 0, 14]
            ],
            // S8
            [
                [11, 8, 12, 7], [1, 14, 2, 13], [6, 15, 0, 9], [10, 4, 5, 3]
            ]
        ];

        // Subclaves para las 16 rondas (simplificado)
        this.subkeys = this.generateSubkeys();
    }

    // Generar subclaves simplificadas
    generateSubkeys() {
        const keys = [];
        for (let i = 0; i < 16; i++) {
            // Generar clave de 48 bits para cada ronda
            let key = '';
            for (let j = 0; j < 48; j++) {
                key += Math.random() > 0.5 ? '1' : '0';
            }
            keys.push(key);
        }
        return keys;
    }

    // Generar clave aleatoria de 64 bits
    generateRandomKey() {
        let key = '';
        for (let i = 0; i < 64; i++) {
            key += Math.random() > 0.5 ? '1' : '0';
        }
        return key;
    }

    // Rotación circular a la izquierda
    rotateLeft(binary, positions) {
        const len = binary.length;
        positions = positions % len;
        return binary.slice(positions) + binary.slice(0, positions);
    }

    // Convertir texto a binario
    textToBinary(text) {
        let binary = '';
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            const charBinary = charCode.toString(2).padStart(8, '0');
            binary += charBinary;
        }
        // Asegurar que sea exactamente 64 bits
        return binary.padEnd(64, '0').substring(0, 64);
    }

    // Convertir binario a texto
    binaryToText(binary) {
        let text = '';
        for (let i = 0; i < binary.length; i += 8) {
            const byte = binary.substr(i, 8);
            const charCode = parseInt(byte, 2);
            text += String.fromCharCode(charCode);
        }
        return text;
    }

    // Aplicar permutación
    permute(binary, permutation) {
        let result = '';
        for (let i = 0; i < permutation.length; i++) {
            result += binary[permutation[i] - 1];
        }
        return result;
    }

    // Función XOR
    xor(a, b) {
        let result = '';
        for (let i = 0; i < a.length; i++) {
            result += a[i] === b[i] ? '0' : '1';
        }
        return result;
    }

    // Función F (función principal de cada ronda)
    functionF(right, subkey) {
        // Expansión
        const expanded = this.permute(right, this.E);
        
        // XOR con subclave
        const xored = this.xor(expanded, subkey);
        
        // Aplicar cajas S
        let sboxOutput = '';
        for (let i = 0; i < 8; i++) {
            const block = xored.substr(i * 6, 6);
            const row = parseInt(block[0] + block[5], 2);
            const col = parseInt(block.substr(1, 4), 2);
            
            // Asegurar que row y col estén dentro de los límites válidos
            const safeRow = row % 4;
            const safeCol = col % 4;
            
            // Debug: verificar valores
            if (i === 0) {
                console.log(`S-Box ${i}: block=${block}, row=${row}->${safeRow}, col=${col}->${safeCol}`);
            }
            
            const sboxValue = this.S_BOXES[i][safeRow][safeCol];
            sboxOutput += sboxValue.toString(2).padStart(4, '0');
        }
        
        // Permutación P
        return this.permute(sboxOutput, this.P);
    }

    // Función principal de cifrado
    encrypt(plaintext, trackRounds = false) {
        const binary = this.textToBinary(plaintext);
        let permuted = this.permute(binary, this.IP);
        
        let left = permuted.substring(0, 32);
        let right = permuted.substring(32);
        
        const rounds = [];
        
        // Verificar que tengamos suficientes subclaves
        if (this.subkeys.length < 16) {
            throw new Error(`Se requieren 16 subclaves, pero solo hay ${this.subkeys.length}`);
        }
        
        // 16 rondas
        for (let i = 0; i < 16; i++) {
            // Verificar que la subclave existe y tiene la longitud correcta
            if (!this.subkeys[i] || this.subkeys[i].length !== 48) {
                throw new Error(`Subclave ${i} inválida: ${this.subkeys[i]}`);
            }
            
            const newRight = this.xor(left, this.functionF(right, this.subkeys[i]));
            const newLeft = right;
            
            if (trackRounds) {
                rounds.push({
                    round: i + 1,
                    left: newLeft,
                    right: newRight,
                    combined: newLeft + newRight
                });
            }
            
            // Actualizar para la siguiente ronda
            left = newLeft;
            right = newRight;
        }
        
        // Intercambio final
        const finalPermutation = this.permute(right + left, this.IP_INV);
        
        if (trackRounds) {
            return {
                ciphertext: finalPermutation,
                rounds: rounds
            };
        }
        
        return finalPermutation;
    }

    // Función para cambiar un bit específico
    flipBit(binary, position) {
        if (position < 0 || position >= binary.length) {
            throw new Error('Posición de bit inválida');
        }
        
        const newBinary = binary.split('');
        newBinary[position] = newBinary[position] === '0' ? '1' : '0';
        return newBinary.join('');
    }

    // Función para cambiar un bit aleatorio
    flipRandomBit(binary) {
        const position = Math.floor(Math.random() * binary.length);
        return {
            newBinary: this.flipBit(binary, position),
            position: position
        };
    }

    // Calcular diferencia entre dos cadenas binarias
    calculateDifference(binary1, binary2) {
        if (binary1.length !== binary2.length) {
            throw new Error('Las cadenas binarias deben tener la misma longitud');
        }
        
        let differences = 0;
        for (let i = 0; i < binary1.length; i++) {
            if (binary1[i] !== binary2[i]) {
                differences++;
            }
        }
        
        return {
            count: differences,
            percentage: (differences / binary1.length) * 100,
            factor: differences / binary1.length
        };
    }

    // Generar clave aleatoria completa
    generateRandomKey64() {
        return this.generateRandomKey();
    }

    // Convertir binario a hexadecimal para mejor visualización
    binaryToHex(binary) {
        let hex = '';
        for (let i = 0; i < binary.length; i += 4) {
            const nibble = binary.substr(i, 4);
            hex += parseInt(nibble, 2).toString(16).toUpperCase();
        }
        return hex;
    }

    // Convertir hexadecimal a binario
    hexToBinary(hex) {
        let binary = '';
        for (let i = 0; i < hex.length; i++) {
            const char = hex[i];
            const nibble = parseInt(char, 16).toString(2).padStart(4, '0');
            binary += nibble;
        }
        return binary;
    }
}

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DES;
} 