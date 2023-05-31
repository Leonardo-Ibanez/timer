import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  timersRunning: boolean[] = [false, false];
  startTime: number[] = [0, 0];
  elapsedTime: number[] = [0, 0];
  intervalIds: number[] = [];
  button1Active: boolean = false;
  button2Active: boolean = false;
  buttonStartTimes: number[] = [];
  buttonStopTimes: number[] = [];

  fechainicio1: string | null = null;
  fechafin1: string | null = null;
  fechainicio2: string | null = null;
  fechafin2: string | null = null;
  fechainicio1number: number | null = null;
  fechafin1number: number | null = null;
  fechainicio2number: number | null = null;
  fechafin2number: number | null = null;

  tiempoTotalDetenido: number = 0;
  tiempoTotalSinMadera: number = 0;

  currentDateTime: string = '';

  showClock: boolean = false; 


/*
  startTimer1(): void {
    if (!this.timersRunning[0]) {
      this.buttonStartTimes[0] = Date.now();
      this.timersRunning[0] = true;
      
  
      this.intervalIds[0] = setInterval(() => {
        this.elapsedTime[0] = Date.now() - this.buttonStartTimes[0];
      }, 1000); // Actualizar cada segundo
  
    } else {
      this.stopTimer1();
    }
  
    this.buttonStopTimes[0] = Date.now();
    this.fechafin1 = new Date().toLocaleString();
    this.fechafin1number = Date.now();

    // Reiniciar el tiempo transcurrido
    this.elapsedTime[0] = 0;
 
  }  
  
    stopTimer1(): void {
    if (this.timersRunning[0]) {
      this.timersRunning[0] = false;
      

      // Guardar el valor de tiempo de detención
      this.buttonStopTimes[0] = Date.now();
      this.fechafin1 = new Date().toLocaleString();
      this.fechafin1number = Date.now();

      console.log("fechafin1:", this.fechafin1);
      console.log("fechafin1number:", this.fechafin1number);

      // Reiniciar el tiempo transcurrido
      this.elapsedTime[0] = 0;
      clearInterval(this.intervalIds[0]);
    }
  }
    getElapsedTime1(): string {
    const elapsedSeconds = Math.floor(this.elapsedTime[0] / 1000);
    const seconds = elapsedSeconds % 60;
    const minutes = Math.floor(elapsedSeconds / 60) % 60;
    const hours = Math.floor(elapsedSeconds / 3600);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
*/
startTimer1(): void {
  if (!this.timersRunning[0]) {
    const currentDate = new Date();
    this.fechainicio1 = currentDate.toLocaleString(); // Guardar la fecha y hora actual
    this.buttonStartTimes[0] = currentDate.getTime(); // Guardar el tiempo actual en milisegundos
    this.timersRunning[0] = true;

    // Mostrar el reloj 1 al hacer el primer click
    if (!this.showClock) {
      this.showClock = true;
      this.updateClock();
    }

    // Actualizar la hora actual en tiempo real
    this.intervalIds[0] = setInterval(() => {
      this.updateClock();
    }, 1000); // Actualizar cada segundo
  } else {
    this.stopTimer1();
  }
}


updateClock(): void {
  const currentDate = new Date();
  this.currentDateTime = currentDate.toLocaleTimeString();
}

hora1now(): string {
  if (!this.timersRunning[0] && this.showClock) {
    const currentDate = new Date(this.buttonStartTimes[0]);
    return currentDate.toLocaleTimeString();
  } else {
    return '';
  }
}


stopTimer1(): void {
  if (this.timersRunning[0]) {
    this.timersRunning[0] = false;

    // Guardar el valor de tiempo de detención
    this.buttonStopTimes[0] = Date.now();
    this.fechafin1 = new Date().toLocaleString();
    this.fechafin1number = Date.now();

    console.log("fechafin1:", this.fechafin1);
    console.log("fechafin1number:", this.fechafin1number);

    // Reiniciar el tiempo transcurrido
    this.elapsedTime[0] = 0;
    clearInterval(this.intervalIds[0]);

    // Restablecer la hora actual a un valor vacío
    this.currentDateTime = '';
  }
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  startTimer2(): void {
    if (!this.timersRunning[1]) {
      this.buttonStartTimes[1] = Date.now();
      this.timersRunning[1] = true;
  
      this.intervalIds[1] = setInterval(() => {
        this.elapsedTime[1] = Date.now() - this.buttonStartTimes[1];
      }, 1000); // Actualizar cada segundo
    } else {
      this.stopTimer2();
    }
    this.buttonStopTimes[1] = Date.now();
    this.fechafin1 = new Date().toLocaleString();
    this.fechafin1number = Date.now();

    // Reiniciar el tiempo transcurrido
    this.elapsedTime[1] = 0;
  
  }

  stopTimer2(): void {
    if (this.timersRunning[1]) {
      this.timersRunning[1] = false;
      clearInterval(this.intervalIds[1]);

      // Guardar el valor de tiempo de detención
      this.buttonStopTimes[1] = Date.now();
      this.fechafin2 = new Date().toLocaleString();
      this.fechafin2number = Date.now();

      console.log("fechafin2:", this.fechafin2);
      console.log("fechafin2number:", this.fechafin2number);

      // Reiniciar el tiempo transcurrido
      this.elapsedTime[1] = 0;
    }
  }
  

  getElapsedTime1(): string {
    const elapsedSeconds = Math.floor(this.elapsedTime[0] / 1000);
    const seconds = elapsedSeconds % 60;
    const minutes = Math.floor(elapsedSeconds / 60) % 60;
    const hours = Math.floor(elapsedSeconds / 3600);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }



  getElapsedTime2(): string {
    const elapsedSeconds = Math.floor(this.elapsedTime[1] / 1000);
    const seconds = elapsedSeconds % 60;
    const minutes = Math.floor(elapsedSeconds / 60) % 60;
    const hours = Math.floor(elapsedSeconds / 3600);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

getElapsedTimeDifference(timerIndex: number): string {
  const start = this.buttonStartTimes[timerIndex];
  const stop = this.buttonStopTimes[timerIndex];

  if (start && stop) {
    let elapsedMilliseconds = Math.abs(stop - start);

    // Si el temporizador aún está en ejecución, agrega el tiempo transcurrido desde el inicio hasta el momento actual
    if (this.timersRunning[timerIndex]) {
      elapsedMilliseconds += Date.now() - start;
    }

    // Convierte los milisegundos a una cadena de tiempo en formato HH:MM:SS
    const hours = Math.floor(elapsedMilliseconds / 3600000);
    const minutes = Math.floor((elapsedMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((elapsedMilliseconds % 60000) / 1000);

    const formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
    return formattedTime;
  }

  return '';
}

  
  
  padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }
  
  

  clearIntervals(): void {
    this.intervalIds.forEach(intervalId => clearInterval(intervalId));
  }

  getButton1Label(): string {
    return this.timersRunning[0] ? 'Reactivar Línea' : 'Línea Detenida';
  }

  getButton2Label(): string {
    return this.timersRunning[1] ? 'Recarga de Madera' : 'Línea sin Madera';
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.clearIntervals();
  }
}
