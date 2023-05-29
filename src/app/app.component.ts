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

  startTimer1(): void {
    if (!this.timersRunning[0]) {
      const currentTime = Date.now();
      this.startTime[0] = currentTime;
      this.timersRunning[0] = true;

      if (this.fechainicio1number === null || this.tiempoTotalDetenido === 0) {
        this.fechainicio1 = new Date(currentTime).toLocaleString();
        this.fechainicio1number = currentTime;
      }

      this.elapsedTime[0] = 0; // Reiniciar el tiempo transcurrido

      // Guardar el valor de tiempo de inicio
      this.buttonStartTimes[0] = currentTime;

      // Iniciar el intervalo para actualizar el tiempo transcurrido
      this.intervalIds[0] = setInterval(() => {
        this.elapsedTime[0] = Date.now() - this.startTime[0];
      }, 1000); // Actualizar cada segundo

      console.log("fechainicio1:", this.fechainicio1);
      console.log("fechainicio1number:", this.fechainicio1number);
    } else {
      this.stopTimer1();
    }
  }

  startTimer2(): void {
    if (!this.timersRunning[1]) {
      const currentTime = Date.now();
      this.startTime[1] = currentTime;
      this.timersRunning[1] = true;
  
      if (this.fechainicio2number === null || this.tiempoTotalSinMadera === 0) {
        this.fechainicio2 = new Date(currentTime).toLocaleString();
        this.fechainicio2number = currentTime;
      }
  
      this.elapsedTime[1] = 0; // Reiniciar el tiempo transcurrido
  
      // Guardar el valor de tiempo de inicio
      this.buttonStartTimes[1] = currentTime;
  
      // Iniciar el intervalo para actualizar el tiempo transcurrido
      this.intervalIds[1] = setInterval(() => {
        this.elapsedTime[1] = Date.now() - this.startTime[1];
      }, 1000); // Actualizar cada segundo
  
      console.log("fechainicio2:", this.fechainicio2);
      console.log("fechainicio2number:", this.fechainicio2number);
    } else {
      this.stopTimer2();
    }
  }

  stopTimer1(): void {
    if (this.timersRunning[0]) {
      this.timersRunning[0] = false;
      clearInterval(this.intervalIds[0]);
  
      // Guardar el valor de tiempo de detención
      this.buttonStopTimes[0] = Date.now();
      this.fechafin1 = new Date().toLocaleString();
      this.fechafin1number = Date.now();
  
      console.log("fechafin1:", this.fechafin1);
      console.log("fechafin1number:", this.fechafin1number);
  
      // Calcular y mostrar el tiempo total detenido
      const elapsedTime = this.fechafin1number - this.fechainicio1number!;
      this.tiempoTotalDetenido = elapsedTime; // Set the counter to the elapsed time
      console.log('Tiempo Total Detenido:', this.formatTime(this.tiempoTotalDetenido));
    }
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
  
      // Calcular y mostrar el tiempo total sin madera
      const elapsedTime = this.fechafin2number - this.fechainicio2number!;
      this.tiempoTotalSinMadera = elapsedTime; // Set the counter to the elapsed time
      console.log('Tiempo Total Sin Madera:', this.formatTime(this.tiempoTotalSinMadera));
    }
  }
  

  getElapsedTimeTotalAccumulated1(): string {
    if (this.fechainicio1number && this.fechafin1number) {
      const elapsedMilliseconds = this.fechafin1number - this.fechainicio1number;
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
      const elapsedMinutes = Math.floor(elapsedSeconds / 60);
      const elapsedSecondsRemaining = elapsedSeconds % 60;

      const elapsedTime = `${elapsedMinutes.toString().padStart(2, '0')}:${elapsedSecondsRemaining.toString().padStart(2, '0')}`;
      console.log(`Elapsed Time Accumulated 1: ${elapsedTime}`);


      console.log('Tiempo Total Detenido:', this.formatTime(this.tiempoTotalDetenido));

      return elapsedTime;
    }

    return '00:00';
  }

  getElapsedTimeTotalAccumulated2(): string {
    if (this.fechainicio2number && this.fechafin2number) {
      const elapsedMilliseconds = this.fechafin2number - this.fechainicio2number;
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
      const elapsedMinutes = Math.floor(elapsedSeconds / 60);
      const elapsedSecondsRemaining = elapsedSeconds % 60;

      const elapsedTime = `${elapsedMinutes.toString().padStart(2, '0')}:${elapsedSecondsRemaining.toString().padStart(2, '0')}`;
      console.log(`Elapsed Time Accumulated 2: ${elapsedTime}`);


      console.log('Tiempo Total Sin Madera:', this.formatTime(this.tiempoTotalSinMadera));

      return elapsedTime;
    }

    return '00:00';
  }

  getButton1Label(): string {
    return this.timersRunning[0] ? 'Reactivar Línea' : 'Línea Detenida';
  }

  getButton2Label(): string {
    return this.timersRunning[1] ? 'Recarga de Madera' : 'Línea sin Madera';
  }

  clearIntervals(): void {
    this.intervalIds.forEach(intervalId => clearInterval(intervalId));
  }

  getElapsedTimeTotalFormatted(timerIndex: number): string {
    const totalSeconds = Math.floor(this.elapsedTime[timerIndex] / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  formatTime(time: number): string {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  }

  padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.clearIntervals();
  }


}
