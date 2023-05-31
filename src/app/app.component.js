class AppComponent {
  constructor() {
    this.timer1Running = false;
    this.timer2Running = false;
    this.secondsElapsed1 = 0;
    this.secondsElapsed2 = 0;
    this.timer1Color = 'green';
    this.timer2Color = 'green';
  }

  startTimer(timerId) {
    if (timerId === 1) {
      this.timer1Running = !this.timer1Running;
      this.timer1Color = this.timer1Running ? 'green' : 'red';
      if (this.timer1Running) {
        this.runTimer1();
      }
    } else if (timerId === 2) {
      this.timer2Running = !this.timer2Running;
      this.timer2Color = this.timer2Running ? 'green' : 'red';
      if (this.timer2Running) {
        this.runTimer2();
      }
    }
  }

  runTimer1() {
    setInterval(() => {
      if (this.timer1Running) {
        this.secondsElapsed1++;
      }
    }, 1000);
  }

  runTimer2() {
    setInterval(() => {
      if (this.timer2Running) {
        this.secondsElapsed2++;
      }
    }, 1000);
  }

  formatTime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor(((seconds % 86400) % 3600) / 60);
    const remainingSeconds = ((seconds % 86400) % 3600) % 60;

    const daysDisplay = days > 0 ? days + 'd ' : '';
    const hoursDisplay = hours > 0 ? hours + 'h ' : '';
    const minutesDisplay = minutes > 0 ? minutes + 'm ' : '';
    const secondsDisplay = remainingSeconds + 's';

    return daysDisplay + hoursDisplay + minutesDisplay + secondsDisplay;
  }

  getButtonLabel(timerId) {
    if (timerId === 1) {
      return this.timer1Running ? 'Detener' : 'Iniciar';
    } else if (timerId === 2) {
      return this.timer2Running ? 'Detener' : 'Iniciar';
    }
    return '';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, { passive: false });
});


// Obtener el elemento del span por su id
const currentDateTimeElement = document.getElementById('currentDateTime');

// Función para obtener la hora actual y actualizar el contenido del span
function updateCurrentDateTime() {
  const currentDate = new Date();
  const currentDateTime = currentDate.toLocaleTimeString();
  currentDateTimeElement.textContent = currentDateTime;
}

// Llamar a la función inicialmente para mostrar la hora actual
updateCurrentDateTime();

// Actualizar la hora actual cada segundo
setInterval(updateCurrentDateTime, 1000);