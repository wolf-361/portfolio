import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  inject,
  input,
  viewChild,
} from '@angular/core';

export const CANVAS_KEYWORDS: string[] = [
  'kotlin',
  'go',
  'swift',
  '.kts',
  'docker',
  'compose',
  'ktor',
  'coroutines',
  'suspend',
  'Modifier',
  'StateFlow',
  'ansible',
  'nginx',
  'fun <T>',
  'flow {',
  '0xff3a86',
  'expect',
  'actual',
  'SharedFlow',
  'Result<T>',
];

export interface CanvasParticle {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  depth: number;
}

export function createParticle(width: number, height: number): CanvasParticle {
  const depth = Math.random();
  return {
    text: CANVAS_KEYWORDS[Math.floor(Math.random() * CANVAS_KEYWORDS.length)],
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.15 * (0.4 + depth * 0.6),
    vy: (Math.random() - 0.5) * 0.1 * (0.4 + depth * 0.6),
    opacity: 0.03 + depth * 0.05,
    size: 9 + depth * 5,
    depth,
  };
}

const PARTICLE_COUNT_DESKTOP = 40;
const PARTICLE_COUNT_MOBILE = 20;

function isMobile(): boolean {
  return window.innerWidth < 768;
}

@Component({
  selector: 'ui-floating-text-canvas',
  templateUrl: './floating-text-canvas.html',
  styleUrl: './floating-text-canvas.scss',
})
export class FloatingTextCanvasComponent implements AfterViewInit, OnDestroy {
  private readonly zone = inject(NgZone);

  // Canvas fillStyle and font cannot use CSS variables — resolve once at init time.
  private primaryColor = '#22d3ee';
  private monoFont = 'monospace';
  private particles: CanvasParticle[] = [];
  private rafId = 0;
  private mouseX = 0;
  private mouseY = 0;
  private gyroX = 0;
  private gyroY = 0;
  private visibilityObserver!: IntersectionObserver;
  private resizeObserver!: ResizeObserver;
  private paused = false;

  readonly opacity = input<number>(1);
  readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    this.visibilityObserver?.disconnect();
    this.resizeObserver?.disconnect();
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('deviceorientation', this.onDeviceOrientation);
  }

  private init(): void {
    const canvas = this.canvasRef().nativeElement;
    this.resize(canvas);

    const styles = getComputedStyle(document.documentElement);
    this.primaryColor = styles.getPropertyValue('--mat-sys-primary').trim() || '#22d3ee';
    this.monoFont = styles.getPropertyValue('--font-mono').trim() || 'monospace';

    const count = isMobile() ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
    this.particles = Array.from({ length: count }, () =>
      createParticle(canvas.width, canvas.height),
    );

    this.visibilityObserver = new IntersectionObserver(([entry]) => {
      this.paused = !entry.isIntersecting;
      if (!this.paused) this.scheduleFrame();
    });
    this.visibilityObserver.observe(canvas);

    this.resizeObserver = new ResizeObserver(() => this.resize(canvas));
    this.resizeObserver.observe(canvas.parentElement ?? canvas);

    this.zone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.onMouseMove, { passive: true });
      this.scheduleFrame();
    });

    this.setupGyroscope();
  }

  private resize(canvas: HTMLCanvasElement): void {
    const parent = canvas.parentElement;
    if (!parent) return;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  }

  private readonly onMouseMove = (e: MouseEvent): void => {
    this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  };

  private readonly onDeviceOrientation = (e: DeviceOrientationEvent): void => {
    this.gyroX = ((e.gamma ?? 0) / 45) * 2;
    this.gyroY = ((e.beta ?? 0) / 45) * 2;
  };

  private setupGyroscope(): void {
    if (!isMobile()) return;
    if (typeof DeviceOrientationEvent === 'undefined') return;

    const startListening = (): void => {
      window.addEventListener('deviceorientation', this.onDeviceOrientation, { passive: true });
    };

    const doeWithPerm = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (typeof doeWithPerm.requestPermission === 'function') {
      window.addEventListener(
        'touchstart',
        () => {
          doeWithPerm.requestPermission!()
            .then((state) => {
              if (state === 'granted') startListening();
            })
            .catch(() => {});
        },
        { once: true },
      );
    } else {
      startListening();
    }
  }

  private scheduleFrame(): void {
    if (this.paused) return;
    if (this.rafId !== 0) return;
    this.rafId = requestAnimationFrame(() => this.draw());
  }

  private draw(): void {
    this.rafId = 0;
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const parallaxX = isMobile() ? this.gyroX : this.mouseX;
    const parallaxY = isMobile() ? this.gyroY : this.mouseY;

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      const px = p.x + parallaxX * 20 * (1 - p.depth * 0.7);
      const py = p.y + parallaxY * 12 * (1 - p.depth * 0.7);

      if (px < -100) p.x = canvas.width + 50;
      else if (px > canvas.width + 100) p.x = -50;
      if (py < -40) p.y = canvas.height + 20;
      else if (py > canvas.height + 40) p.y = -20;

      ctx.font = `400 ${p.size}px ${this.monoFont}`;
      ctx.globalAlpha = p.opacity * this.opacity();
      ctx.fillStyle = this.primaryColor;
      ctx.fillText(p.text, px, py);
    }

    ctx.globalAlpha = 1;
    this.scheduleFrame();
  }
}
