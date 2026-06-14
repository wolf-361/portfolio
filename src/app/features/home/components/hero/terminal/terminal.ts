import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { LangService, Lang } from '../../../../../core/lang/lang';
import { BootService } from '../../../../../core/boot-overlay/boot.service';
import { P10kPromptComponent } from '../p10k-prompt';

export type LineKind = 'cmd' | 'output' | 'neofetch' | 'error' | 'blank';

export interface TermLine {
  kind: LineKind;
  text: string;
  dim?: boolean;
  // neofetch only
  logoChunk?: string;
  infoChunk?: string;
  infoStyle?: string;
  infoUrl?: string;
}

const ARCH_LOGO_LINES = [
  '                   -`                  ',
  '                  .o+`                 ',
  '                 `ooo/                 ',
  '                `+oooo:                ',
  '               `+oooooo:               ',
  '               -+oooooo+:              ',
  '             `/:-:++oooo+:             ',
  '            `/++++/+++++++:            ',
  '           `/++++++++++++++:           ',
  '          `/+++ooooooooooooo/`         ',
  '         ./ooosssso++osssssso+`        ',
  '        .oossssso-`  `/ossssss+`       ',
  '       -osssssso.      :ssssssso.      ',
  '      :osssssss/        osssso+++.     ',
  '     /ossssssss/        +ssssooo/-     ',
  '   `/ossssso+/:-        -:/+osssso+-   ',
  '  `+sso+:-`                 `.-/+oso:  ',
  ' `++:.                           `-/+/ ',
  ' .`                                 `/ ',
];

const S_HEADER = 'color:#7dd3fc;font-weight:700';
const S_SEP = 'color:#4b5563';
const S_VALUE = 'color:#cdd6f4';
const S_DIM = 'color:#8b9db0';

function buildNeofetchLines(lang: Lang): TermLine[] {
  const en = lang === 'en';
  const info: { text: string; style: string }[] = [
    { text: 'luc@arch', style: S_HEADER },
    { text: '──────────────────────────────', style: S_SEP },
    { text: en ? 'Name:   Luc Allaire' : 'Nom:    Luc Allaire', style: S_VALUE },
    {
      text: en ? 'Role:   Mobile Developer · KMP' : 'Rôle:   Développeur mobile · KMP',
      style: S_VALUE,
    },
    { text: en ? 'Bio:    Shared layer,' : 'Bio:    Couche partagée,', style: S_VALUE },
    { text: '        Android & iOS.', style: S_DIM },
    { text: '', style: '' },
    { text: en ? 'OS:     Arch Linux x86_64' : 'OS :    Arch Linux x86_64', style: S_VALUE },
    { text: en ? 'Host:   me.wolf-361.ca' : 'Hôte:   me.wolf-361.ca', style: S_VALUE },
    { text: 'Shell:  zsh + powerlevel10k', style: S_VALUE },
    { text: '', style: '' },
    { text: 'Mobile: KMP · Compose', style: S_VALUE },
    { text: 'API:    Ktor · Spring Boot', style: S_VALUE },
    { text: 'Infra:  Docker · Ansible · CI/CD', style: S_VALUE },
    { text: 'Web:    Angular · TypeScript', style: S_VALUE },
    { text: '', style: '' },
    { text: '■ ■ ■ ■ ■ ■ ■ ■', style: S_VALUE },
  ];

  return ARCH_LOGO_LINES.map((logo, i) => ({
    kind: 'neofetch' as LineKind,
    text: '',
    logoChunk: logo,
    infoChunk: info[i]?.text ?? '',
    infoStyle: info[i]?.style ?? '',
  }));
}

interface ScriptEntry {
  isPrompt: boolean;
  text: string;
  isNeofetch?: boolean;
}

function buildScript(): ScriptEntry[] {
  return [{ isPrompt: true, text: 'neofetch', isNeofetch: true }];
}

const LS_FILES = ['role.txt', 'bio.txt', 'cv.pdf', 'projects/', '.secrets'];

const KNOWN_COMMANDS = [
  'cat bio.txt',
  'cat cv.pdf',
  'cat role.txt',
  'cat .secrets',
  'cd projects',
  'clear',
  'date',
  'echo ',
  'help',
  'ls',
  'neofetch',
  'pwd',
  'whoami',
];

type CommandResult = TermLine[] | 'clear' | { navigate: string };

function runCommand(raw: string, lang: Lang): CommandResult {
  const trimmed = raw.trim();
  const [cmd, ...args] = trimmed.split(/\s+/);

  switch (cmd.toLowerCase()) {
    case 'help':
      return [
        { kind: 'output', text: lang === 'en' ? 'Available commands:' : 'Commandes disponibles :' },
        { kind: 'output', text: '  help — show this message' },
        { kind: 'output', text: '  whoami — print current user' },
        { kind: 'output', text: '  neofetch — system info + logo' },
        { kind: 'output', text: '  ls — list files' },
        { kind: 'output', text: '  cat <file> — print file contents' },
        { kind: 'output', text: '  cd projects — go to projects page' },
        { kind: 'output', text: '  date — current date' },
        {
          kind: 'output',
          text: lang === 'en' ? '  echo <text> — repeat text' : '  echo <texte> — répéter le texte',
        },
        { kind: 'output', text: '  clear — clear terminal' },
      ];

    case 'whoami':
      return [{ kind: 'output', text: 'luc' }];

    case 'neofetch':
      return buildNeofetchLines(lang);

    case 'ls':
      return LS_FILES.map((f) => ({ kind: 'output' as LineKind, text: f }));

    case 'cat': {
      const file = args[0];
      if (!file) return [{ kind: 'error', text: 'cat: missing operand' }];
      if (file === 'role.txt')
        return [
          {
            kind: 'output',
            text:
              lang === 'en'
                ? 'Mobile Developer · KMP Specialist · Self-Hosted Infrastructure'
                : 'Développeur mobile · Spécialiste KMP · Infrastructure auto-hébergée',
          },
        ];
      if (file === 'bio.txt')
        return lang === 'en'
          ? [
              { kind: 'output', text: 'I build software the same way I build infrastructure:' },
              { kind: 'output', text: 'explicit contracts, enforced boundaries,' },
              { kind: 'output', text: 'zero tolerance for ambiguity.' },
            ]
          : [
              { kind: 'output', text: 'Je construis des logiciels comme mon infrastructure :' },
              { kind: 'output', text: 'contrats explicites, frontières enforced,' },
              { kind: 'output', text: "zéro tolérance pour l'ambiguïté." },
            ];
      if (file === 'cv.pdf')
        return [
          {
            kind: 'output',
            text:
              lang === 'en'
                ? '(binary file — open in browser)'
                : '(fichier binaire — ouvrir dans le navigateur)',
          },
        ];
      if (file === '.secrets') return [{ kind: 'error', text: 'cat: .secrets: Permission denied' }];
      return [{ kind: 'error', text: `cat: ${file}: No such file or directory` }];
    }

    case 'pwd':
      return [{ kind: 'output', text: '/home/luc/portfolio' }];

    case 'date':
      return [{ kind: 'output', text: new Date().toString() }];

    case 'echo':
      return [{ kind: 'output', text: args.join(' ') || '' }];

    case 'clear':
      return 'clear';

    case 'cd': {
      const target = args[0]?.replace(/\/$/, '');
      if (!target || target === '~') return [];
      if (target === 'projects') return { navigate: '/projects' };
      return [{ kind: 'error', text: `cd: no such directory: ${target}` }];
    }

    case 'sudo':
      return [
        { kind: 'error', text: 'luc is not in the sudoers file. This incident will be reported.' },
      ];

    case 'vim':
    case 'nano':
    case 'emacs':
      return [{ kind: 'error', text: `${cmd}: no escape — this is a portfolio terminal` }];

    case '':
      return [];

    default:
      return [
        {
          kind: 'error',
          text:
            lang === 'en' ? `zsh: command not found: ${cmd}` : `zsh: commande introuvable: ${cmd}`,
        },
      ];
  }
}

@Component({
  selector: 'app-hero-terminal',
  imports: [P10kPromptComponent],
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss',
})
export class HeroTerminalComponent implements OnDestroy {
  private script: ScriptEntry[] = [];
  private lineIdx = 0;
  private charIdx = 0;
  private pauseFrames = 0;
  private animInterval: ReturnType<typeof setInterval> | null = null;
  private isFirstLoad = inject(BootService).isFirstLoad();
  private historyIdx = -1;
  private tabCycling = false;
  private tabMatches: string[] = [];
  private tabIndex = -1;
  private hintTimeout: ReturnType<typeof setTimeout> | null = null;
  private demoTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly isMobile = typeof window !== 'undefined' && window.innerWidth <= 599;
  private readonly DEMO_COMMANDS = ['help', 'whoami', 'cat bio.txt', 'ls', 'neofetch'];
  private readonly hintVisible = signal(false);
  private readonly router = inject(Router);

  readonly lang = inject(LangService);
  readonly lines = signal<TermLine[]>([]);
  readonly partialText = signal('');
  readonly partialIsCmd = signal(true);
  readonly isDone = signal(false);
  readonly inputValue = signal('');
  readonly history: string[] = [];
  readonly isAutoDemo = signal(false);
  readonly showHint = computed(() => this.hintVisible());

  readonly suggestion = computed(() => {
    const input = this.inputValue();
    if (!input) return '';
    for (let i = this.history.length - 1; i >= 0; i--) {
      if (this.history[i].startsWith(input) && this.history[i] !== input) return this.history[i];
    }
    return KNOWN_COMMANDS.find((c) => c.startsWith(input) && c !== input) ?? '';
  });

  readonly ghostSuffix = computed(() => {
    const s = this.suggestion();
    return s ? s.slice(this.inputValue().length) : '';
  });

  readonly inputEl = viewChild<ElementRef<HTMLInputElement>>('inputRef');
  readonly bodyEl = viewChild<ElementRef<HTMLDivElement>>('bodyRef');

  constructor() {
    effect(() => {
      this.lang.lang();
      this.reset();
    });
    effect(() => {
      if (this.isDone()) {
        if (this.hintTimeout) clearTimeout(this.hintTimeout);
        this.hintVisible.set(true);
        this.hintTimeout = setTimeout(() => this.hintVisible.set(false), 5000);
      }
    });
    effect(() => {
      if (this.isDone() && this.isMobile && !this.isAutoDemo()) {
        if (this.demoTimeout) clearTimeout(this.demoTimeout);
        this.isAutoDemo.set(true);
        this.demoTimeout = setTimeout(() => this.startDemo(), 2000);
      }
    });
  }

  ngOnDestroy(): void {
    this.clearInterval();
    if (this.hintTimeout) {
      clearTimeout(this.hintTimeout);
      this.hintTimeout = null;
    }
    if (this.demoTimeout) clearTimeout(this.demoTimeout);
  }

  focusInput(): void {
    if (this.isDone()) this.inputEl()?.nativeElement.focus({ preventScroll: true });
  }

  onKeydown(e: KeyboardEvent): void {
    this.hintVisible.set(false);
    switch (e.key) {
      case 'Tab':
        e.preventDefault();
        if (!this.acceptSuggestion()) this.cycleCompletion();
        break;

      case 'ArrowRight':
      case 'End': {
        const el = this.inputEl()?.nativeElement;
        if (el && el.selectionStart === el.value.length && this.ghostSuffix()) {
          e.preventDefault();
          this.acceptSuggestion();
        }
        this.resetTabState();
        break;
      }

      case 'ArrowUp':
        e.preventDefault();
        this.resetTabState();
        if (this.historyIdx < this.history.length - 1) {
          this.historyIdx++;
          this.setInput(this.history[this.history.length - 1 - this.historyIdx]);
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        this.resetTabState();
        if (this.historyIdx > 0) {
          this.historyIdx--;
          this.setInput(this.history[this.history.length - 1 - this.historyIdx]);
        } else {
          this.historyIdx = -1;
          this.setInput('');
        }
        break;

      case 'Enter':
        this.submit();
        break;

      default:
        this.resetTabState();
    }
  }

  onInput(e: Event): void {
    this.hintVisible.set(false);
    this.inputValue.set((e.target as HTMLInputElement).value);
  }

  private submit(): void {
    const raw = this.inputValue();
    const trimmed = raw.trim();

    this.lines.update((l) => [...l, { kind: 'cmd', text: trimmed }]);

    if (trimmed) {
      this.history.push(trimmed);
      this.historyIdx = -1;
    }

    const result = runCommand(raw, this.lang.lang());
    if (result === 'clear') {
      this.lines.set([]);
    } else if (Array.isArray(result)) {
      this.lines.update((l) => [...l, ...result]);
    } else {
      this.router.navigate([result.navigate]);
    }

    this.setInput('');
    this.resetTabState();
    this.scrollBottom();
  }

  private acceptSuggestion(): boolean {
    const s = this.suggestion();
    if (!s) return false;
    this.setInput(s);
    return true;
  }

  private cycleCompletion(): void {
    const input = this.inputValue();
    if (!this.tabCycling) {
      const catMatch = /^cat\s+(.*)$/.exec(input);
      if (catMatch) {
        const prefix = catMatch[1];
        this.tabMatches = LS_FILES.filter((f) => f.startsWith(prefix)).map((f) => `cat ${f}`);
      } else {
        const cdMatch = /^cd\s+(.*)$/.exec(input);
        if (cdMatch) {
          const prefix = cdMatch[1];
          this.tabMatches = LS_FILES.filter(
            (f) => f.endsWith('/') && f.slice(0, -1).startsWith(prefix),
          ).map((f) => `cd ${f.slice(0, -1)}`);
        } else if (!input.includes(' ')) {
          this.tabMatches = KNOWN_COMMANDS.filter((c) => c.startsWith(input) && c !== input);
        } else {
          this.tabMatches = [];
        }
      }
      this.tabCycling = true;
      this.tabIndex = -1;
    }
    if (!this.tabMatches.length) {
      this.tabCycling = false;
      return;
    }
    if (this.tabMatches.length === 1) {
      this.setInput(this.tabMatches[0]);
      this.tabCycling = false;
      return;
    }
    this.tabIndex = (this.tabIndex + 1) % this.tabMatches.length;
    this.setInput(this.tabMatches[this.tabIndex]);
  }

  private setInput(value: string): void {
    this.inputValue.set(value);
    const el = this.inputEl()?.nativeElement;
    if (el) {
      el.value = value;
      el.setSelectionRange(value.length, value.length);
    }
  }

  private resetTabState(): void {
    this.tabCycling = false;
    this.tabMatches = [];
    this.tabIndex = -1;
  }

  private reset(): void {
    this.clearInterval();
    this.script = buildScript();
    this.lineIdx = 0;
    this.charIdx = 0;
    this.pauseFrames = 0;
    this.lines.set([]);
    this.partialText.set('');
    this.partialIsCmd.set(true);
    this.isDone.set(false);
    this.inputValue.set('');

    // On first load, wait for the scroll-reveal fade-in to complete before
    // starting the animation (scroll-reveal delay 150ms + transition 600ms).
    const startDelay = this.isFirstLoad ? 1200 : 0;
    this.isFirstLoad = false;
    setTimeout(() => {
      this.animInterval = setInterval(() => this.tick(), 35);
    }, startDelay);
  }

  private tick(): void {
    if (this.pauseFrames > 0) {
      this.pauseFrames--;
      return;
    }

    if (this.lineIdx >= this.script.length) {
      this.partialText.set('');
      this.isDone.set(true);
      this.clearInterval();
      setTimeout(() => this.inputEl()?.nativeElement.focus({ preventScroll: true }), 50);
      return;
    }

    const entry = this.script[this.lineIdx];

    if (entry.isPrompt) {
      if (this.charIdx <= entry.text.length) {
        this.partialText.set(entry.text.slice(0, this.charIdx));
        this.partialIsCmd.set(true);
        this.charIdx++;
      } else {
        this.lines.update((l) => [...l, { kind: 'cmd', text: entry.text }]);
        if (entry.isNeofetch) {
          this.lines.update((l) => [
            ...l,
            ...buildNeofetchLines(this.lang.lang()),
            { kind: 'blank', text: '' },
          ]);
        }
        this.partialText.set('');
        this.lineIdx++;
        this.charIdx = 0;
        this.pauseFrames = entry.isNeofetch ? 4 : 9;
        // Neofetch dumps many lines at once — scroll to top so the logo is
        // visible from the beginning rather than snapping to the last line.
        if (entry.isNeofetch) {
          this.scrollTop();
          return;
        }
      }
    } else {
      this.partialIsCmd.set(false);
      this.lines.update((l) => [...l, { kind: 'output', text: entry.text }]);
      this.lineIdx++;
      this.charIdx = 0;
      this.pauseFrames = 3;
    }

    this.scrollBottom();
  }

  private startDemo(): void {
    this.runDemoStep(0);
  }

  private runDemoStep(cmdIdx: number): void {
    const cmd = this.DEMO_COMMANDS[cmdIdx % this.DEMO_COMMANDS.length];
    this.typeDemo(cmd, 0, () => {
      // cmd typed — pause, then execute
      this.demoTimeout = setTimeout(() => {
        this.lines.update((l) => [...l, { kind: 'cmd', text: cmd }]);
        const result = runCommand(cmd, this.lang.lang());
        if (result === 'clear') {
          this.lines.set([]);
        } else if (Array.isArray(result)) {
          this.lines.update((l) => [...l, ...result]);
        }
        this.partialText.set('');
        this.scrollBottom();
        // pause after output, then next command or restart
        const isLast = cmdIdx === this.DEMO_COMMANDS.length - 1;
        const delay = isLast ? 4000 : 1500;
        this.demoTimeout = setTimeout(() => {
          if (isLast) {
            this.lines.set([]);
            this.runDemoStep(0);
          } else {
            this.runDemoStep(cmdIdx + 1);
          }
        }, delay);
      }, 800);
    });
  }

  private typeDemo(text: string, charIdx: number, onDone: () => void): void {
    this.partialText.set(text.slice(0, charIdx));
    this.partialIsCmd.set(true);
    if (charIdx >= text.length) {
      onDone();
      return;
    }
    this.demoTimeout = setTimeout(() => this.typeDemo(text, charIdx + 1, onDone), 60);
  }

  private scrollBottom(): void {
    setTimeout(() => {
      const el = this.bodyEl()?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  private scrollTop(): void {
    setTimeout(() => {
      const el = this.bodyEl()?.nativeElement;
      if (el) el.scrollTop = 0;
    });
  }

  private clearInterval(): void {
    if (this.animInterval) {
      clearInterval(this.animInterval);
      this.animInterval = null;
    }
  }
}
