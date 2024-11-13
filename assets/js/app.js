// Función para dibujar el ahorcado en el Canvas según los intentos restantes

function dibujarAhorcado(intento) {
    let intentos = 10;
    const canvas = document.getElementById('ahorcadoCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Estilo de línea y sombra general
    ctx.strokeStyle = '#4A4A4A';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.shadowColor = '#888';
    ctx.shadowBlur = 5;
  
    // Base de soporte, con textura
    if (intento <= intentos - 1) {
      ctx.beginPath();
      ctx.moveTo(20, 200);
      ctx.lineTo(180, 200);
      ctx.stroke();
      ctx.closePath();
    }
  
    // Poste vertical con detalles de madera
    if (intento <= intentos - 2) {
      ctx.beginPath();
      ctx.moveTo(60, 200);
      ctx.lineTo(60, 20);
      ctx.stroke();
      ctx.closePath();
  
      // Agregar textura de madera
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#8B5A2B';
      for (let i = 30; i < 200; i += 20) {
        ctx.beginPath();
        ctx.moveTo(55, i);
        ctx.lineTo(65, i - 10);
        ctx.stroke();
        ctx.closePath();
      }
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#4A4A4A';
    }
  
    // Brazo horizontal del soporte
    if (intento <= intentos - 3) {
      ctx.beginPath();
      ctx.moveTo(60, 20);
      ctx.lineTo(140, 20);
      ctx.stroke();
      ctx.closePath();
    }
  
    // Cuerda con sombra
    if (intento <= intentos - 4) {
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(140, 20);
      ctx.lineTo(140, 50);
      ctx.stroke();
      ctx.closePath();
    }
  
    // Cabeza, con rasgos faciales
    if (intento <= intentos - 5) {
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(140, 70, 15, 0, Math.PI * 2);  // Cabeza
      ctx.stroke();
      ctx.closePath();
  
      // Rasgos faciales (ojos y boca)
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(135, 65, 2, 0, Math.PI * 2); // Ojo izquierdo
      ctx.arc(145, 65, 2, 0, Math.PI * 2); // Ojo derecho
      ctx.moveTo(137, 75);
      ctx.arc(140, 75, 3, 0, Math.PI); // Boca
      ctx.stroke();
      ctx.closePath();
    }
  
    // Cuerpo con sombreado
    if (intento <= intentos - 6) {
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(140, 85);
      ctx.lineTo(140, 130);
      ctx.stroke();
      ctx.closePath();
    }
  
    // Brazo izquierdo, con articulación
    if (intento <= intentos - 7) {
      ctx.beginPath();
      ctx.moveTo(140, 95);
      ctx.lineTo(120, 115);
      ctx.stroke();
      ctx.closePath();
    }
  
    // Brazo derecho, con articulación
    if (intento <= intentos - 8) {
      ctx.beginPath();
      ctx.moveTo(140, 95);
      ctx.lineTo(160, 115);
      ctx.stroke();
      ctx.closePath();
    }
  
    // Pierna izquierda, con sombreado
    if (intento <= intentos - 9) {
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(140, 130);
      ctx.lineTo(120, 170);
      ctx.stroke();
      ctx.closePath();
    }
  
    // Pierna derecha, con sombreado
    if (intento <= intentos - 10) {
      ctx.beginPath();
      ctx.moveTo(140, 130);
      ctx.lineTo(160, 170);
      ctx.stroke();
      ctx.closePath();
    }
  }
  
  
  
  

// Clase que maneja la lógica del juego del Ahorcado

// Clase que maneja la lógica del juego del Ahorcado
class Ahorcado {
    constructor(palabra, intentos) {
        this.palabra = palabra; // La palabra a adivinar
        this.intentos = intentos; // Cantidad de intentos disponibles
        this.letrasAdivinadas = []; // Letras adivinadas correctamente
        this.letrasIncorrectas = []; // Letras incorrectas
        this.estado = 'jugando'; // Estado actual del juego
    }
  
    // Método para verificar si la letra es correcta
    verificarLetra(letra) {
        if (this.estado !== 'jugando') {
             return; // Si el juego ha terminado, no hace nada
        }
  
        // Comprobar si la letra ya ha sido adivinada
        if (this.letrasAdivinadas.includes(letra) || this.letrasIncorrectas.includes(letra)) {
            console.log(`Ya has intentado la letra "${letra}". No pierdes un intento.`);
            return; // Salir de la función si la letra ya fue adivinada
        }
  
        // Verificar si la letra está en la palabra
        if (this.palabra.includes(letra)) {
            this.letrasAdivinadas.push(letra); // Agrega a letras correctas
            console.log(`¡Correcto! La letra "${letra}" está en la palabra.`);
        } else {
            this.letrasIncorrectas.push(letra); // Agrega a letras incorrectas
            this.intentos--; // Resta un intento
            dibujarAhorcado(this.intentos); // Llama a la función para dibujar en el Canvas
            console.log(`Incorrecto. La letra "${letra}" no está en la palabra.`);
        }
  
        this.actualizarEstado(); // Actualiza el estado del juego
    }
  
    // Método para actualizar el estado (ganado o perdido)
    actualizarEstado() {
        if (this.intentos === 0) {
            iniciar.style.display = 'block';
            this.estado = 'perdido'; // Si no quedan intentos, se pierde
            document.getElementById('mensaje').textContent = '¡Perdiste! La palabra era: ' + this.palabra;
            
        } else if (this.obtenerPalabraMostrada().trim() === this.palabra) {
            iniciar.style.display = 'block';
            this.estado = 'ganado'; // Si se adivinan todas las letras, se gana
            document.getElementById('mensaje').textContent = '¡Ganaste!';
        }
  
        // Actualiza los intentos restantes y las letras incorrectas en el HTML
        document.getElementById('intentos').textContent = this.intentos;
        document.getElementById('letrasPulsadas').textContent = this.letrasIncorrectas.join(', ');
    }
  
    // Método que retorna la palabra actual con guiones y letras adivinadas
    obtenerPalabraMostrada() {
        let palabraMostrada = '';
        for (let letra of this.palabra) {
            if (this.letrasAdivinadas.includes(letra)) {
                palabraMostrada += letra; // Muestra las letras correctas
            } else {
                palabraMostrada += '_'; // Muestra guiones para letras no adivinadas
            }
        }
        return palabraMostrada.trim(); // Quita espacios adicionales
    }
  
    // Método que actualiza la palabra en el HTML
    actualizarPalabraMostrada() {
        document.getElementById('palabra').textContent = this.obtenerPalabraMostrada();
    }
  }
  
  // Inicializa el juego con la palabra "java" y 10 intentos
  const juego = new Ahorcado('java', 10);
  // Muestra los intentos iniciales y la palabra oculta en el HTML
  let iniciar = document.querySelector('#empezar');  
  
  function empezar() {
    iniciar.style.display = 'none';
    juego.intentos = 10;
    juego.letrasAdivinadas = [];
    juego.letrasIncorrectas = [];
    juego.estado = 'jugando';
    document.getElementById('intentos').textContent = juego.intentos;
    juego.actualizarPalabraMostrada();
    document.getElementById('mensaje').textContent = '';
    dibujarAhorcado(juego.intentos);
  }
  
  // Configura el botón de iniciar para empezar el juego
  document.getElementById('empezar').addEventListener('click', () => {
    empezar();
  });
  
  // Agrega un evento al botón para procesar la letra ingresada
  document.getElementById('enviarLetra').addEventListener('click', () => {
    const letra = document.getElementById('letra').value.toLowerCase(); // Captura la letra en minúscula
    juego.verificarLetra(letra); // Verifica si la letra es correcta
    juego.actualizarPalabraMostrada(); // Actualiza la palabra en pantalla
    document.getElementById('letra').value = '';  // Borra el contenido del input
    document.getElementById('letra').focus();  // Enfoca nuevamente el input
  });
  