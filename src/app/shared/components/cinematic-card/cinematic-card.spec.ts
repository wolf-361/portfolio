import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CinematicCardComponent } from './cinematic-card';

@Component({
  template: `
    <ui-cinematic-card>
      <span slot-header>Header</span>
      <span slot-body>Body</span>
    </ui-cinematic-card>
  `,
  imports: [CinematicCardComponent],
})
class TestHostComponent {}

@Component({
  template: `<ui-cinematic-card [featured]="true">Content</ui-cinematic-card>`,
  imports: [CinematicCardComponent],
})
class FeaturedHostComponent {}

describe('CinematicCardComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('renders projected content', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Header');
    expect(text).toContain('Body');
  });

  it('contains a .cinematic-card element', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('.cinematic-card') as HTMLElement;
    expect(card).toBeTruthy();
  });

  it('adds --featured modifier when featured input is true', () => {
    const fixture = TestBed.createComponent(FeaturedHostComponent);
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('.cinematic-card--featured') as HTMLElement;
    expect(card).toBeTruthy();
  });
});
