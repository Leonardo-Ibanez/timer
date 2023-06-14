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
      fechafin: null,
      starttimernumber: null,
      stoptimernumber: null,
      tiempodetenidonumber: null
    },
    timer2: {
      timerRunning: false,
      fechainicio: null,
      fechafin: null,
      starttimernumber: null,
      stoptimernumber: null,
      tiempodetenidonumber: null
    }
  };

  consoleLogs: string[] = [];
  timers2: Timer[] = [];

  intervalIds: { [key: string]: number } = {};
  currentDateTime: string = '';
  showClock: boolean = false;
  contadorBiTrenGlobulus: number = 0;
  contadorBiTrenNitens: number = 0;
  contadorCamionGlobulus: number = 0;
  contadorCamionNitens: number = 0;
  lastClickButtons: { [key: string]: number } = {};

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  toggleTimer(timerName: string): void {
    const timer = this.timers[timerName];

    if (!timer.timerRunning) {
      const currentDate = new Date();
      timer.fechainicio = currentDate.toLocaleString();
      timer.starttimernumber = this.convertFechaToNumber(currentDate);
      timer.fechafin = ''; // Reiniciar el valor de "hora en que reactiva"
      timer.stoptimernumber = null;
      timer.timerRunning = true;

      if (!this.showClock) {
        this.showClock = true;
        this.updateClock();
      }

      this.intervalIds[timerName] = window.requestAnimationFrame(() => {
        this.updateClock();
      });

      this.cdr.detectChanges();

      console.log('Inicio Timer', timerName, timer.fechainicio);
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
      timer.stoptimernumber = this.convertFechaToNumber(currentDate);
      window.cancelAnimationFrame(this.intervalIds[timerName]);
      this.currentDateTime = '';

      console.log('Fin Timer', timerName, timer.fechafin);

      const elapsedTime = this.getElapsedTimeDifference(timer);
      console.log('Tiempo transcurrido:', elapsedTime);

      // Agregar el timer a timers2
      this.timers2.push(timer);
    }
  }

  getElapsedTimeDifference(timer: Timer): string {
    const start = timer.starttimernumber ? new Date(timer.starttimernumber) : null;
    const stop = timer.stoptimernumber ? new Date(timer.stoptimernumber) : null;

    if (start && stop) {
      let elapsedMilliseconds = Math.abs(stop.getTime() - start.getTime());

      const hours = Math.floor(elapsedMilliseconds / 3600000);
      const minutes = Math.floor((elapsedMilliseconds % 3600000) / 60000);
      const seconds = Math.floor((elapsedMilliseconds % 60000) / 1000);

      const formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
      return formattedTime;
    }

    return '';
  }

  convertFechaToNumber(date: Date): number {
    return date.getTime();
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
    return timer.timerRunning ? 'Reactivar Línea' : 'Detener Línea';
  }

  padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }

  logClickDate(contador: string): void {
    const currentTime = Date.now();
    console.log(`Fecha de clic en ${contador}:`, new Date(currentTime).toLocaleString());
  }

  aumentarContador(contador: string): void {
    const currentTime = Date.now();
    const lastClickTime = this.lastClickButtons[contador];

    if (!lastClickTime || (currentTime - lastClickTime) >= 180000) {
      // Permitir incrementar el contador
      switch (contador) {
        case 'biTrenGlobulus':
          this.contadorBiTrenGlobulus++;
          console.log('Contador BiTren Globulus:', this.contadorBiTrenGlobulus);
          this.logClickDate(contador);
          break;
        case 'camionGlobulus':
          this.contadorCamionGlobulus++;
          console.log('Contador Camión Externo Globulus:', this.contadorCamionGlobulus);
          this.logClickDate(contador);
          break;
        case 'biTrenNitens':
          this.contadorBiTrenNitens++;
          console.log('Contador BiTren Nitens:', this.contadorBiTrenNitens);
          this.logClickDate(contador);
          break;
        case 'camionNitens':
          this.contadorCamionNitens++;
          console.log('Contador Camión Externo Nitens:', this.contadorCamionNitens);
          this.logClickDate(contador);
          break;
        default:
          break;
      }

      // Actualizar el último tiempo de clic
      this.lastClickButtons[contador] = currentTime;
    } else {
      // Mostrar el pop-up indicando que el botón está bloqueado
      const buttonName = this.getButtonName(contador);
      alert(`Debes esperar 3 minutos antes de poder cargar de nuevo un ${buttonName}.`);
    }
  }

  disminuirContador(contador: string): void {
    // No se realiza ninguna acción al disminuir el contador
  }

  getButtonName(contador: string): string {
    switch (contador) {
      case 'biTrenGlobulus':
        return 'BiTren Glóbulus';
      case 'camionGlobulus':
        return 'Camión Externo Glóbulus';
      case 'biTrenNitens':
        return 'BiTren Nitens';
      case 'camionNitens':
        return 'Camión Externo Nitens';
      default:
        return '';
    }
  }

  mostrarDatosGuardados(): void {
    console.log('Datos guardados en timers2:');
    for (const timer of this.timers2) {
      console.log('Timer:', timer);
    }
  }

  ngOnInit(): void {
    this.updateClock();
    this.mostrarDatosGuardados();
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
  starttimernumber: number | null;
  stoptimernumber: number | null;
  tiempodetenidonumber: number | null;
}





/*

intervalIds: { [key: string]: number } = {};
currentDateTime: string = '';
showClock: boolean = false;
contadorFechaBiTrenGlobulus: Counter = {
  value: 0,
  lastClick: null
};
contadorFechaBiTrenNitens: Counter = {
  value: 0,
  lastClick: null
};
contadorFechaCamionGlobulus: Counter = {
  value: 0,
  lastClick: null
};
contadorFechaCamionNitens: Counter = {
  value: 0,
  lastClick: null
};


private getCounterByName(counterName: string): Counter | undefined {
  switch (counterName) {
    case 'biTrenGlobulus':
      return this.contadorFechaBiTrenGlobulus;
    case 'camionGlobulus':
      return this.contadorFechaCamionGlobulus;
    case 'biTrenNitens':
      return this.contadorFechaBiTrenNitens;
    case 'camionNitens':
      return this.contadorFechaCamionNitens;
    default:
      return undefined;
  }
}

aumentarFecha(contadorFecha: string): void {
  const counter = this.getCounterByName(contadorFecha);
  if (counter) {
    counter.value++;
    counter.lastClick = this.getCurrentDateTime();
    console.log(`Se aumentó el contador ${contadorFecha}. Valor: ${counter.value}. Hora del último click: ${counter.lastClick}`);
    this.saveCounterData(contadorFecha);
    this.cdr.detectChanges();
  }
} 


*/






/*
VERSION UNO
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
  contadorBiTrenGlobulus: number = 0;
  contadorBiTrenNitens: number = 0;
  contadorCamionGlobulus: number = 0;
  contadorCamionNitens: number = 0;

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

      console.log('Inicio Timer', timerName, timer.fechainicio);
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

      console.log('Fin Timer', timerName, timer.fechafin);
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
    return timer.timerRunning ? 'Reactivar Línea' : 'Detener Línea';
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

  aumentarContador(contador: string): void {
    switch (contador) {
      case 'biTrenGlobulus':
        this.contadorBiTrenGlobulus++;
        console.log('Contador BiTren Globulus:', this.contadorBiTrenGlobulus);
        break;
      case 'camionGlobulus':
        this.contadorCamionGlobulus++;
        console.log('Contador Camión Externo Globulus:', this.contadorCamionGlobulus);
        break;
      case 'biTrenNitens':
        this.contadorBiTrenNitens++;
        console.log('Contador BiTren Nitens:', this.contadorBiTrenNitens);
        break;
      case 'camionNitens':
        this.contadorCamionNitens++;
        console.log('Contador Camión Externo Nitens:', this.contadorCamionNitens);
        break;
      default:
        break;
    }
  }

  disminuirContador(contador: string): void {
    // No se realiza ninguna acción al disminuir el contador
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
*/
/*-----------------------------------------------------------------------------------*/
/*
VERSION DOS
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
  contadorBiTrenGlobulus: Counter = {
    value: 0,
    lastClick: null
  };
  contadorBiTrenNitens: Counter = {
    value: 0,
    lastClick: null
  };
  contadorCamionGlobulus: Counter = {
    value: 0,
    lastClick: null
  };
  contadorCamionNitens: Counter = {
    value: 0,
    lastClick: null
  };

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

      console.log('Inicio Timer', timerName, timer.fechainicio);
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

      console.log('Fin Timer', timerName, timer.fechafin);
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
    return timer.timerRunning ? 'Reactivar Línea' : 'Detener Línea';
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

  aumentarContador(contador: string): void {
    const counter = this.getCounterByName(contador);
    if (counter) {
      counter.value++;
      counter.lastClick = this.getCurrentDateTime();
      console.log(`Se aumentó el contador ${contador}. Valor: ${counter.value}. Hora del último click: ${counter.lastClick}`);
      this.saveCounterData(contador);
      this.cdr.detectChanges();
    }
  } 

  ngOnInit(): void {
    this.updateClock();
  }

  ngOnDestroy(): void {
    Object.values(this.intervalIds).forEach((intervalId) => {
      window.cancelAnimationFrame(intervalId);
    });
  }

  private getCounterByName(counterName: string): Counter | undefined {
    switch (counterName) {
      case 'biTrenGlobulus':
        return this.contadorBiTrenGlobulus;
      case 'camionGlobulus':
        return this.contadorCamionGlobulus;
      case 'biTrenNitens':
        return this.contadorBiTrenNitens;
      case 'camionNitens':
        return this.contadorCamionNitens;
      default:
        return undefined;
    }
  }

  private saveCounterData(counterName: string): void {
    // Implementa aquí la lógica para guardar los datos del contador en tu aplicación
  }

  private getCurrentDateTime(): string {
    const currentDate = new Date();
    return currentDate.toLocaleString();
  }
}

interface Timer {
  timerRunning: boolean;
  fechainicio: string | null;
  fechafin: string | null;
}

interface Counter {
  value: number;
  lastClick: string | null;
}
*/