import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'todo-about-carousel',
  standalone: true,
  imports: [],
  templateUrl: './about-carousel.component.html',
  styleUrl: './about-carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AboutCarouselComponent {
  swipperBreakPoints = {
    // when window width is >= 300px
    300: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    // when window width is >= 700px
    700: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 1200px
    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    // when window width is >= 1600px
    1600: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  };
}
