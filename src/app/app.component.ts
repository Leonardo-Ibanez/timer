import { Component, NgZone, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  timers: { [key: string]: Timer } = {
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

  intervalIds: { [key: string]: number } = {};
  currentDateTime: string = '';
  showClock: boolean = false;

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  toggleTimer(timerName: string): void {
    const timer = this.timers[timerName];
  
    if (!timer.timerRunning) {
      const currentDate = new Date();
      timer.fechainicio = currentDate.toLocaleString();
      timer.fechafin = ''; // Reiniciar el valor de "hora en que reactiva"
      timer.timerRunning = true;
  
      if (!this.showClock) {
        this.showClock = true;
        this.updateClock();
      }
  
      this.intervalIds[timerName] = window.requestAnimationFrame(() => {
        this.updateClock();
      });
  
      this.cdr.detectChanges();
    } else {
      this.stopTimer(timerName);
    }
  }
  

  stopTimer(timerName: string): void {
    const timer = this.timers[timerName];

    if (timer.timerRunning) {
      timer.timerRunning = false;
      const currentDate = new Date();
      timer.fechafin = currentDate.toLocaleString();
      window.cancelAnimationFrame(this.intervalIds[timerName]);
      this.currentDateTime = '';
    }
  }

  updateClock(): void {
    const currentDate = new Date();
    this.ngZone.run(() => {
      this.currentDateTime = currentDate.toLocaleTimeString();
      this.intervalIds['clock'] = window.requestAnimationFrame(() => {
        this.updateClock();
      });
    });
  }

  getButtonLabel(timer: Timer): string {
    return timer.timerRunning ? 'Reactivar Línea' : 'Línea Detenida';
  }

  getElapsedTimeDifference(timer: Timer): string {
    const start = timer.fechainicio;
    const stop = timer.fechafin;

    if (start && stop) {
      let elapsedMilliseconds = Math.abs(Date.parse(stop) - Date.parse(start));

      if (timer.timerRunning) {
        elapsedMilliseconds += Date.now() - Date.parse(start);
      }

      const hours = Math.floor(elapsedMilliseconds / 3600000);
      const minutes = Math.floor((elapsedMilliseconds % 3600000) / 60000);
      const seconds = Math.floor((elapsedMilliseconds % 60000) / 1000);

      const formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
      return formattedTime;
    }

    return '';
  }

  padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }

  ngOnInit(): void {
    this.updateClock();
  }

  ngOnDestroy(): void {
    Object.values(this.intervalIds).forEach((intervalId) => {
      window.cancelAnimationFrame(intervalId);
    });
  }
}

interface Timer {
  timerRunning: boolean;
  fechainicio: string | null;
  fechafin: string | null;
}


/* 
import { Component, NgZone, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';




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

 

  tiempoTotalDetenido: number = 0;

  tiempoTotalSinMadera: number = 0;




  currentDateTime: string = '';




  showClock: boolean = false;




  value: string = ''; // Agregar un valor inicial aquí

  cdr: ChangeDetectorRef;




  constructor(private ngZone: NgZone, cdr: ChangeDetectorRef) {

    this.cdr = cdr;

  }




  startTimer1(): void {

    if (!this.timersRunning[0]) {

      const currentDate = new Date();

      this.fechainicio1 = currentDate.toLocaleString();

      this.buttonStartTimes[0] = currentDate.getTime();

 

      if (this.fechafin1) {

        this.fechafin1 = '';

      }

 

      this.timersRunning[0] = true;

 

      console.log("fechainicio1:", this.fechainicio1);

 

      if (!this.showClock) {

        this.showClock = true;

        this.updateClock();

      }

 

      this.intervalIds[0] = setInterval(() => {

        this.updateClock();

      }, 1000);

 

      this.value = 'Nuevo valor';

      setTimeout(() => {

        this.cdr.detectChanges();

      });

    } else {

      this.stopTimer1();

    }

    this.buttonStopTimes[0] = Date.now();

  }

 

  stopTimer1(): void {

    if (this.timersRunning[0]) {

      this.timersRunning[0] = false;

      const currentDate = new Date();

      this.fechafin1 = currentDate.toLocaleString();

      this.buttonStopTimes[0] = currentDate.getTime();

 

      console.log("fechafin1:", this.fechafin1);

 

      this.elapsedTime[0] = 0;

      clearInterval(this.intervalIds[0]);

 

      this.currentDateTime = '';

    }

  }

 




  updateClock(): void {

    const currentDate = new Date();

    this.ngZone.run(() => {

      this.currentDateTime = currentDate.toLocaleTimeString();

    });




    // Actualizar la hora cada segundo

    setInterval(() => {

      this.updateClock();

    }, 1000);

  }




  hora1now(): string {

    if (!this.timersRunning[0] && this.showClock) {

      const currentDate = new Date(this.buttonStartTimes[0]);

      return currentDate.toLocaleTimeString();

    } else {

      return '';

    }

  }




  startTimer2(): void {

    if (!this.timersRunning[1]) {

      const currentDate = new Date();

      this.fechainicio2 = currentDate.toLocaleString(); // Guardar la fecha y hora actual

      this.buttonStartTimes[1] = currentDate.getTime(); // Guardar el tiempo actual en milisegundos

     

      // Reiniciar el valor de fechafin2 si existe

      if (this.fechafin2) {

        this.fechafin2 = '';

      }




      this.timersRunning[1] = true;




      console.log("fechainicio2:", this.fechainicio2);




      // Mostrar el reloj 1 al hacer el primer clic

      if (!this.showClock) {

        this.showClock = true;

        this.updateClock();

      }




      // Actualizar la hora actual en tiempo real

      this.intervalIds[1] = setInterval(() => {

        this.updateClock();

      }, 1000); // Actualizar cada segundo

    } else {

      this.stopTimer2();

    }

    this.buttonStopTimes[1] = Date.now();

  }




  stopTimer2(): void {

    if (this.timersRunning[1]) {

      this.timersRunning[1] = false;

      const currentDate = new Date();

      this.fechafin2 = currentDate.toLocaleString(); // Guardar la fecha y hora actual

      this.buttonStopTimes[1] = currentDate.getTime(); // Guardar el tiempo actual en milisegundos




      console.log("fechafin2:", this.fechafin2);




      // Reiniciar el tiempo transcurrido

      this.elapsedTime[1] = 0;

      clearInterval(this.intervalIds[1]);




      // Restablecer la hora actual a un valor vacío

      this.currentDateTime = '';

    }

  }




  getElapsedTime2(): string {

    const elapsedSeconds = Math.floor(this.elapsedTime[1] / 1000);

    const seconds = elapsedSeconds % 60;

    const minutes = Math.floor(elapsedSeconds / 60) % 60;

    const hours = Math.floor(elapsedSeconds / 3600);

    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;

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




  ngOnInit() {

    // Iniciar el reloj al iniciar la app

    this.updateClock();

  }




  ngOnDestroy() {

    this.clearIntervals();

  }
}
*/