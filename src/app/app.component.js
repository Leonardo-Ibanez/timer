class AppComponent {
  constructor() {
    this.timers = {
      timer1: {
        timerRunning: false,
        fechainicio: null,
        fechafin: null
      },
      timer2: {
        timerRunning: false,
        fechainicio: null,
        fechafin: null
      }
    };
    this.contadorBiotrenGlobulus = 0;
    this.contadorBiotrenNitens = 0;
    this.contadorCamionGlobulus = 0;
    this.contadorCamionNitens = 0;
  }

  toggleTimer(timerId) {
    if (timerId === 'timer1') {
      this.timers.timer1.timerRunning = !this.timers.timer1.timerRunning;
      if (this.timers.timer1.timerRunning) {
        this.timers.timer1.fechainicio = new Date();
        console.log('Inicio Timer 1:', this.timers.timer1.fechainicio);
        this.timers.timer1.fechafin = null;
      } else {
        this.timers.timer1.fechafin = new Date();
        console.log('Fin Timer 1:', this.timers.timer1.fechafin);
      }
    } else if (timerId === 'timer2') {
      this.timers.timer2.timerRunning = !this.timers.timer2.timerRunning;
      if (this.timers.timer2.timerRunning) {
        this.timers.timer2.fechainicio = new Date();
        console.log('Inicio Timer 2:', this.timers.timer2.fechainicio);
        this.timers.timer2.fechafin = null;
      } else {
        this.timers.timer2.fechafin = new Date();
        console.log('Fin Timer 2:', this.timers.timer2.fechafin);
      }
    }
  }

  getButtonLabel(timer) {
    return timer.timerRunning ? 'Detener' : 'Iniciar';
  }

  getElapsedTimeDifference(timer) {
    if (timer.timerRunning) {
      const currentTime = new Date();
      const elapsedMilliseconds = currentTime - timer.fechainicio;
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
      return this.formatTime(elapsedSeconds);
    } else if (timer.fechainicio && timer.fechafin) {
      const elapsedMilliseconds = timer.fechafin - timer.fechainicio;
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
      return this.formatTime(elapsedSeconds);
    } else {
      return '00:00';
    }
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  aumentarContador(buttonType) {
    switch (buttonType) {
      case 'biTrenGlobulus':
        this.contadorBiotrenGlobulus++;
        console.log('Contador BiTren Glóbulus:', this.contadorBiotrenGlobulus);
        break;
      case 'camionGlobulus':
        this.contadorCamionGlobulus++;
        console.log('Contador Camión Externo Glóbulus:', this.contadorCamionGlobulus);
        break;
      case 'biTrenNitens':
        this.contadorBiotrenNitens++;
        console.log('Contador BiTren Nitens:', this.contadorBiotrenNitens);
        break;
      case 'camionNitens':
        this.contadorCamionNitens++;
        console.log('Contador Camión Externo Nitens:', this.contadorCamionNitens);
        break;
      default:
        break;
    }
  }
}

const app = new AppComponent();

document.getElementById('timer1Button').addEventListener('click', function() {
  app.toggleTimer('timer1');
});

document.getElementById('timer2Button').addEventListener('click', function() {
  app.toggleTimer('timer2');
});

document.getElementById('biTrenGlobulusButton').addEventListener('click', function() {
  app.aumentarContador('biTrenGlobulus');
});

document.getElementById('camionGlobulusButton').addEventListener('click', function() {
  app.aumentarContador('camionGlobulus');
});

document.getElementById('biTrenNitensButton').addEventListener('click', function() {
  app.aumentarContador('biTrenNitens');
});

document.getElementById('camionNitensButton').addEventListener('click', function() {
  app.aumentarContador('camionNitens');
});
