import { Component, AfterViewInit, Input, OnInit, OnDestroy, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem, ScrollPanel } from 'primeng/primeng';
import { AppComponent } from './app.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() reset: boolean;

    model: any[];

    @ViewChild('layoutMenuScroller', { static: true }) layoutMenuScrollerViewChild: ScrollPanel;

    constructor(public app: AppComponent) { }

    ngOnInit() {
        this.model = [
            { label: 'Home', icon: 'fa fa-fw fa-home', routerLink: ['/'] },
            {
                label: 'Movimentação', icon: 'fa fa-car',
                items: [
                    { label: 'Pátio', icon: 'fa fa-users', routerLink:['/movimentacao']},
                    { label: 'Cadastro de Movimento', icon: 'fa fa-address-card', routerLink: ['/movimentacao/novo']}
                ]
            }/*,
            {
                label: 'Template Pages', icon: 'fa fa-fw fa-life-saver',
                items: [
                    { label: 'Empty Page', icon: 'fa fa-fw fa-square-o', routerLink: ['/empty'] },
                    { label: 'Login Page', icon: 'fa fa-fw fa-sign-in', url: 'assets/pages/login.html', target: '_blank' },
                    { label: 'Error Page', icon: 'fa fa-fw fa-exclamation-circle', url: 'assets/pages/error.html', target: '_blank' },
                    { label: '404 Page', icon: 'fa fa-fw fa-times', url: 'assets/pages/404.html', target: '_blank' },
                    {
                        label: 'Access Denied Page', icon: 'fa fa-fw fa-exclamation-triangle',
                        url: 'assets/pages/access.html', target: '_blank'
                    }
                ]
            }*/
        ];
    }

    changeTheme(theme) {
        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        themeLink.href = 'assets/theme/theme-' + theme + '.css';
    }

    changeLayout(layout) {
        this.app.layout = layout;
        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        layoutLink.href = 'assets/layout/css/layout-' + layout + '.css';
    }

    ngAfterViewInit() {
        setTimeout(() => { this.layoutMenuScrollerViewChild.moveBar(); }, 100);
    }

    onWrapperClick(event: Event) {
        this.app.onMenuClick(event);
        setTimeout(() => {
            this.layoutMenuScrollerViewChild.moveBar();
        }, 450);
    }

    ngOnDestroy() {
    }
}

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-submenu]',
    /* tslint:enable:component-selector */
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" *ngIf="!child.routerLink"
                   [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target"
                   (mouseenter)="onMouseEnter(i)">
                    <i [ngClass]="child.icon"></i>
                    <span>{{child.label}}</span>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                    <i class="fa fa-fw fa-angle-down" *ngIf="child.items"></i>
                </a>

                <a (click)="itemClick($event,child,i)" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                   [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target"
                    (mouseenter)="onMouseEnter(i)">
                    <i [ngClass]="child.icon"></i>
                    <span>{{child.label}}</span>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                    <i class="fa fa-fw fa-angle-down" *ngIf="child.items"></i>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">{{child.label}}</div>
                </div>
                <ul app-submenu [item]="child" *ngIf="child.items" [visible]="isActive(i)" [reset]="reset" [parentActive]="isActive(i)"
                    [@children]="app.slimMenu&&root ? isActive(i) ? 'visible' : 'hidden' : isActive(i) ?
                    'visibleAnimated' : 'hiddenAnimated'"></ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                height: '*'
            })),
            state('hidden', style({
                height: '0px'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    _parentActive: boolean;

    _reset: boolean;

    activeIndex: number;

    constructor(public app: AppComponent, public router: Router, public location: Location, public appMenu: AppMenuComponent) { }

    itemClick(event: Event, item: MenuItem, index: number) {
        if (this.root) {
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }

        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        if (item.routerLink || item.items) {
            this.activeIndex = (this.activeIndex === index) ? null : index;
        }

        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item });
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            setTimeout(() => {
                this.appMenu.layoutMenuScrollerViewChild.moveBar();
            }, 450);
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            if (this.app.overlayMenu || this.app.isMobile()) {
                this.app.overlayMenuActive = false;
                this.app.mobileMenuActive = false;
            }

            if (!this.root && this.app.slimMenu) {
                this.app.resetSlim = true;
            }

            this.app.menuHoverActive = !this.app.menuHoverActive;
        }
    }

    onMouseEnter(index: number) {
        if (this.root && this.app.menuHoverActive && this.app.slimMenu) {
            this.activeIndex = index;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    unsubscribe(item: any) {
        if (item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }

        if (item.items) {
            for (const childItem of item.items) {
                this.unsubscribe(childItem);
            }
        }
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;

        if (this._reset && this.app.slimMenu) {
            this.activeIndex = null;
        }
    }

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }

    set parentActive(val: boolean) {
        this._parentActive = val;

        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }
}
