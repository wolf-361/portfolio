import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  NgZone,
  signal,
  viewChild,
} from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LangService } from '../../../../core/lang/lang';
import { ProjectsService } from '../../services/projects';
import { TagChipSetComponent } from '../../../../shared/components/tag-chip-set/tag-chip-set';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card';
import { ScrollSpyDirective } from '../../../../shared/directives/scroll-spy/scroll-spy';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal/scroll-reveal';
import { PhoneMockupComponent } from '../../../../shared/components/phone-mockup/phone-mockup';
import { WaystoneMockupComponent } from '../../../../shared/components/waystone-mockup/waystone-mockup';

@Component({
  selector: 'app-project-detail-page',
  imports: [
    RouterLink,
    UpperCasePipe,
    TagChipSetComponent,
    StatCardComponent,
    ScrollSpyDirective,
    ScrollRevealDirective,
    PhoneMockupComponent,
    WaystoneMockupComponent,
  ],
  templateUrl: './project-detail-page.html',
  styleUrl: './project-detail-page.scss',
})
export class ProjectDetailPageComponent implements AfterViewInit {
  private readonly projects = inject(ProjectsService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);

  readonly lang = inject(LangService);
  readonly slug = input.required<string>();

  readonly project = computed(() => this.projects.getDetail(this.slug()));
  readonly sectionIds = computed(() => this.project()?.sections.map((s) => s.id) ?? []);

  readonly activeSection = signal<string>('');
  readonly zoomedDiagram = signal<string | null>(null);
  readonly entering = signal(false);

  readonly heroRef = viewChild<ElementRef<HTMLElement>>('heroRef');
  readonly visualRef = viewChild<ElementRef<HTMLElement>>('visualRef');

  private heroVisible = false;
  private heroObserver?: IntersectionObserver;
  private readonly onScroll = (): void => {
    if (!this.heroVisible) return;
    const el = this.visualRef()?.nativeElement;
    if (el) el.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  };

  constructor() {
    effect(() => {
      this.slug(); // re-run on every slug change
      this.entering.set(false);
      requestAnimationFrame(() => this.entering.set(true));
    });

    this.destroyRef.onDestroy(() => {
      if (this.zoomedDiagram()) document.body.style.overflow = '';
      this.heroObserver?.disconnect();
      window.removeEventListener('scroll', this.onScroll);
    });
  }

  ngAfterViewInit(): void {
    this.setupParallax();
  }

  private setupParallax(): void {
    const heroEl = this.heroRef()?.nativeElement;
    if (!heroEl || !this.visualRef()?.nativeElement) return;

    this.heroObserver = new IntersectionObserver(([entry]) => {
      this.heroVisible = entry.isIntersecting;
    });
    this.heroObserver.observe(heroEl);

    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
    });
  }

  onActiveSection(id: string): void {
    this.activeSection.set(id);
  }

  openDiagram(svg: string): void {
    this.zoomedDiagram.set(svg);
    document.body.style.overflow = 'hidden';
  }

  closeDiagram(): void {
    this.zoomedDiagram.set(null);
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.zoomedDiagram()) this.closeDiagram();
  }

  /** Body content is trusted static data from ProjectsService — never user input.
   *  Split on double-newline and bypass sanitization to support <strong> and <mark>. */
  bodyParagraphs(text: string): SafeHtml[] {
    return text.split('\n\n').map((p) => this.sanitizer.bypassSecurityTrustHtml(p));
  }

  /** Sanitize raw SVG/HTML for use with [innerHTML] */
  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 112; // account for sticky top-nav (~96px) + breathing room
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
