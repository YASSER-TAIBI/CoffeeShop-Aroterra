import {Component, OnInit, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./header/header.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {FooterComponent} from "./footer/footer.component";
import {Auth} from "@angular/fire/auth";
import {AuthService} from "../auth/auth.service";


declare const $: any;

@Component({
  selector: 'app-components-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  templateUrl: './components-admin.component.html',
  styleUrls: ['./components-admin.component.css'],
})
export class ComponentsAdminComponent implements OnInit {
  authService = inject(AuthService)

  constructor() { }

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.authService.setCurrentUser(user?.email);
      console.log(this.authService.getCurrentUser());
    });
//------------------------------------++ JQUERY CODE ++------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    "use strict"; // Start of use strict

    if (typeof $ === 'undefined') {
      throw new Error('jQuery not loaded');
    }

    // Toggle the side navigation
    $("#sidebarToggle, #sidebarToggleTop").on('click', (e: MouseEvent) => {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $('.sidebar .collapse').collapse('hide');
      };
    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(() => {
      if ($(window).width() < 768) {
        $('.sidebar .collapse').collapse('hide');
      };

      // Toggle the side navigation when window is resized below 480px
      if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
        $("body").addClass("sidebar-toggled");
        $(".sidebar").addClass("toggled");
        $('.sidebar .collapse').collapse('hide');
      };
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel',(e: any) => {
      if ($(window).width() > 768) {
        const e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        const target = e.currentTarget as HTMLElement;
        target.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    });

    // Scroll to top button appear
    $(document).on('scroll', () => {
      const scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });

    // Smooth scrolling using jQuery easing
    $(document).on('click', 'a.scroll-to-top', (e: MouseEvent) => {
      const $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top)
      }, 1000, 'easeInOutExpo');
      e.preventDefault();
    });
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  }
}
