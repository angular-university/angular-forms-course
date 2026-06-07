import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem } from '@angular/material/list';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatSidenavContainer, MatSidenav, MatNavList, MatListItem, RouterLink, MatIcon, MatToolbar, MatIconButton, RouterOutlet]
})
export class AppComponent {
  title = 'app';
}
