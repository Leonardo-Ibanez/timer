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

  aumentarContador(contador: string): void {
    switch (contador) {
      case 'biTrenGlobulus':
        this.contadorBiTrenGlobulus++;
        break;
      case 'camionGlobulus':
        this.contadorCamionGlobulus++;
        break;
      case 'biTrenNitens':
        this.contadorBiTrenNitens++;
        break;
      case 'camionNitens':
        this.contadorCamionNitens++;
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
