/*!
 * 2020.05.18
 * ngx-navona 2.0.0 (http://philipi.bovo.me/navona/ngx)
 * By Philipi Bovo
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ngx-navona',
  template: ``,
  styleUrls: ['./navona-2.0.0.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NgxNavonaComponent implements OnInit {
  private _speedNavona: number;
  private _FX: any;
  private _resizeObservable: Observable<Event>;
  private _resizeSubscription: Subscription;

  constructor() {
    this.verifyIDs().then((result) => {
      this.configureFade();

      // configure options
      let galleries;
      galleries = document.querySelectorAll('.navona');

      for (let i = 0; i < galleries.length; i++) {
        // Set hover or click
        const items = galleries[i].children;

        if (galleries[i].getAttribute('data-navona-click')) {
          for (let i2 = 0; i2 < items.length; i2++) {
            items[i2].addEventListener('click', (event) => {
              event.preventDefault();

              const gallery = galleries[i].children;

              for (let i3 = 0; i3 < gallery.length; i3++) {
                gallery[i3].classList.remove('active');
              }

              if (
                event.target['tagName'].toLowerCase() === 'img' ||
                event.target['tagName'].toLowerCase() === 'p'
              ) {
                (event.target as Element).parentElement.classList.add('active');

                this.navonaSetSizes(
                  (event.target as Element).parentElement.parentElement.getAttribute(
                    'id'
                  )
                );
              }

              if (event.target['tagName'].toLowerCase() === 'div') {
                (event.target as Element).classList.add('active');

                this.navonaSetSizes(
                  (event.target as Element).parentElement.getAttribute('id')
                );
              }
            });
            // end items[i2].addEventListener('click', (event)
          }
          // end for (let i2 = 0; i2 < items.length; i2++)
        } else {
          for (let i2 = 0; i2 < items.length; i2++) {
            items[i2].addEventListener('mouseover', (event) => {
              const gallery = galleries[i].children;

              for (let i3 = 0; i3 < gallery.length; i3++) {
                gallery[i3].classList.remove('active');
              }

              if (
                event.target['tagName'].toLowerCase() === 'img' ||
                event.target['tagName'].toLowerCase() === 'p'
              ) {
                (event.target as Element).parentElement.classList.add('active');

                this.navonaSetSizes(
                  (event.target as Element).parentElement.parentElement.getAttribute(
                    'id'
                  )
                );
              }

              if (event.target['tagName'].toLowerCase() === 'div') {
                (event.target as Element).classList.add('active');

                this.navonaSetSizes(
                  (event.target as Element).parentElement.getAttribute('id')
                );
              }
            });
            // end items[i2].addEventListener('mouseover', (event)
          }
          // end for (let i2 = 0; i2 < items.length; i2++)
        }
        // end else -> if (galleries[i].getAttribute("data-navona-click"))

        // Set theme color
        if (galleries[i].getAttribute('data-navona-theme')) {
          if (galleries[i].getAttribute('data-navona-theme').length === 7) {
            const bg = `background: ${galleries[i].getAttribute(
              'data-navona-theme'
            )}b3`;
            // set color theme
            galleries[i].style.cssText = bg;
          } else {
            // set color default, black
            galleries[i].style.cssText = 'background: #000000b3';

            console.error(
              `The "${galleries[i].getAttribute(
                'data-navona-theme'
              )}" value is not valid for "data-navona-theme". Only  hexadecimal colors accepted, example: "#FFFFFF. Set default value, #000000`
            );
          }
        } else {
          // set color default, black
          galleries[i].style.cssText = 'background: #000000b3';
        }
        // end else -> if (galleries[i].getAttribute("data-navona-theme"))
      }
      // end for (let i = 0; i < galleries.length; i++)
      // end configure options

      // autostart
      const autoStart = document.querySelectorAll('.navona-auto-start');
      // Verify if auto start
      if (autoStart.length) {
        if (autoStart.length > 1) {
          console.error(
            'navonajs error: You have the class "navona-auto-start" in one more element. Place the class "navona-auto-start" only in the <body> tag'
          );

          return;
        }
        // end if (autoStart.length > 1)

        this.navonaSetSizes(autoStart[0].getAttribute('id'));
      }
      // end if (autoStart.length)
      // end autostart
    });
    // end verifyIDs().then()

    // Set click navona-go
    const navonaGO = document.getElementsByClassName('navona-go');
    if (navonaGO.length) {
      for (let i = 0; i < navonaGO.length; i++) {
        navonaGO[i].addEventListener('click', (event) => {
          this.navonaSetSizes(
            (event.target as Element).getAttribute('data-navona-target')
          );
        });
      }
      // end for (let i = 0; i < navonaGO.length; i++)
    }
    // end if (navonaGO.length)

    // Set  esc event
    document.onkeydown = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        if (document.querySelector('.navona.show')) {
          this.closeNavonaGallery(
            document.querySelector('.navona.show').getAttribute('id')
          );
        }
      }
    };
    // end document.onkeydown = function (event)

    // create navona Close button
    let closeButton = document.createElement('DIV');
    closeButton.setAttribute('id', 'navona-close-button');
    closeButton.innerHTML = 'x';
    document.querySelector('body').appendChild(closeButton);
    // end Close buttomn

    const navonaClose = document.getElementById('navona-close-button');
    navonaClose.addEventListener('click', (event) => {
      if (document.querySelector('.navona.show')) {
        this.closeNavonaGallery(
          document.querySelector('.navona.show').getAttribute('id')
        );
      }
    });
    // end document.getElementById('navona-close').click = ()
  }
  // end constructor()

  ngOnInit(): void {
    this._resizeObservable = fromEvent(window, 'resize');
    this._resizeSubscription = this._resizeObservable.subscribe((event) => {
      if (document.querySelector('.navona.show').getAttribute('id')) {
        this.navonaSetSizes(
          document.querySelector('.navona.show').getAttribute('id')
        );
      }
    });
  }

  verifyIDs = () => {
    const galleries = document.querySelectorAll('.navona');

    for (let i = 0; i < galleries.length; i++) {
      if (!galleries[i].getAttribute('id')) {
        galleries[i].setAttribute('id', `navona-auto-id-${i}`);
      }
    }

    return Promise.resolve(true);
  };
  // end  verifyIDs()

  closeNavonaGallery = (id) => {
    this._FX.fadeOut(document.getElementById(id), {
      duration: this._speedNavona,
      complete: function () {
        document.querySelector('body').classList.remove('navona-hidden-scroll');
        document.getElementById(id).classList.remove('show');
      },
    });

    this._FX.fadeOut(document.getElementById('navona-close-button'), {
      duration: this._speedNavona / 2,
      complete: function () {
        document.getElementById('navona-close-button').classList.remove('show');
      },
    });
  };
  // end closeNavonaGallery = (id)

  navonaCreatePortraitMessage = (id) => {
    const items = document.getElementById(id).children;
    let existPortraitMessage = false;

    for (let i = 0; i < items.length; i++) {
      if (items[i].classList.contains('message-portrait')) {
        items[i].classList.remove('hide');
        existPortraitMessage = true;
      } else {
        items[i].classList.add('hide');
      }
    }

    if (!existPortraitMessage) {
      let element = document.createElement('DIV');
      element.classList.add('message-portrait');

      let divImg = document.createElement('DIV');

      let imgElement = document.createElement('IMG');

      imgElement.setAttribute(
        'src',
        'https://live.staticflickr.com/65535/49910809526_01769ae660_n.jpg'
      );

      divImg.appendChild(imgElement);
      element.appendChild(divImg);
      document.getElementById(id).appendChild(element);
    }
  };
  // end navonaCreatePortraitMessage = (id)

  navonaCalculateItemsSize = (id) => {
    let children;
    children = document.getElementById(id).children;
    let childrenNvl2;
    let multiplierBig;
    let multiplierSmall;
    let minusChildrenCalc;

    for (let i = 0; i < children.length; i++) {
      if (children[i].classList.contains('message-portrait')) {
        children[i].classList.add('hide');
      } else {
        children[i].classList.remove('hide');

        if (document.getElementsByClassName('message-portrait').length) {
          minusChildrenCalc = 2;
        } else {
          minusChildrenCalc = 1;
        }

        switch (children.length) {
          case 1:
            multiplierBig = 1;
            multiplierSmall = 1;
            break;
          case 2:
            multiplierBig = 0.9;
            multiplierSmall = 0.1;
            break;
          case 3:
            multiplierBig = 0.8;
            multiplierSmall = 0.2;
            break;
          default:
            multiplierBig = 0.7;
            multiplierSmall = 0.3;
            break;
        }

        const openedSize = (window.innerWidth - 61) * multiplierBig;
        const closedSize =
          ((window.innerWidth - 61) * multiplierSmall) /
          (children.length - minusChildrenCalc);

        if (children[i].classList.contains('active')) {
          children[i].style.width = openedSize + 'px';
          children[i].style.textAlign = 'center';
        } else {
          children[i].style.width = closedSize + 'px';
          children[i].style.textAlign = 'left';
        }

        if (children[i].hasChildNodes('p')) {
          childrenNvl2 = children[i].children;

          for (let i2 = 0; i2 < childrenNvl2.length; i2++) {
            if (childrenNvl2[i2].tagName.toLowerCase() === 'img') {
              childrenNvl2[i2].style.height = '100%';
              childrenNvl2[i2].style.widht = '100%';
            }

            if (childrenNvl2[i2].tagName.toLowerCase() == 'p') {
              if (children[i].classList.contains('active')) {
                childrenNvl2[i2].style.width = openedSize + 'px';
              } else {
                childrenNvl2[i2].style.width = closedSize + 'px';
              }
            }
            // end if (childrenNvl2[i2].tagName.toLowerCase() == "p")
          }
          // end for (let i2 = 0; i2 < childrenNvl2.length; i2++)
        }
        // end if (children[i].hasChildNodes("p"))
      }
      // end else -> if (items[i].classList.contains("message-portrait"))
    }
    // end for (let i = 0; i < children.length; i++)
  };
  // end navonaCalculateItemsSize = (id)

  navonaSetSizes = (id) => {
    const gallery = document.getElementById(id);
    let notActiveItem = true;

    for (let i = 0; i < gallery.children.length; i++) {
      if (gallery.children[i].classList.contains('active')) {
        notActiveItem = false;
      }
    }

    if (notActiveItem) {
      gallery.children[0].classList.add('active');
    }

    if (gallery.getAttribute('data-navona-speed')) {
      this._speedNavona = parseInt(gallery.getAttribute('data-navona-speed'));
    } else {
      // set speed default, 700
      this._speedNavona = 700;
    }

    if (window.innerHeight > window.innerWidth) {
      if (gallery.getAttribute('data-navona-portrait') === 'true') {
        this.navonaCalculateItemsSize(id);
      } else {
        this.navonaCreatePortraitMessage(id);
      }
      // end else -> if (gallery.getAttribute("data-navona-portrait"))
    } else {
      this.navonaCalculateItemsSize(id);
    }
    // end else -> if (window.innerHeight > window.innerWidth)

    if (!document.getElementById(id).classList.contains('show')) {
      document.getElementById(id).classList.add('show');
      document.getElementById('navona-close-button').classList.add('show');

      document.querySelector('body').classList.add('navona-hidden-scroll');

      this._FX.fadeIn(document.getElementById(id), {
        duration: this._speedNavona,
        complete: function () {},
      });

      this._FX.fadeIn(document.getElementById('navona-close-button'), {
        duration: this._speedNavona * 1.5,
        complete: function () {},
      });
    }
    // end if (!document.getElementById(id).classList.contains("show"))
  };
  // end navonaSetSizes = (id)

  configureFade = () => {
    let FX = {
      easing: {
        linear: function (progress) {
          return progress;
        },
        quadratic: function (progress) {
          return Math.pow(progress, 2);
        },
        swing: function (progress) {
          return 0.5 - Math.cos(progress * Math.PI) / 2;
        },
        circ: function (progress) {
          return 1 - Math.sin(Math.acos(progress));
        },
        back: function (progress, x) {
          return Math.pow(progress, 2) * ((x + 1) * progress - x);
        },
        bounce: function (progress) {
          for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (progress >= (7 - 4 * a) / 11) {
              return (
                -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2)
              );
            }
          }
        },
        elastic: function (progress, x) {
          return (
            Math.pow(2, 10 * (progress - 1)) *
            Math.cos(((20 * Math.PI * x) / 3) * progress)
          );
        },
      },
      animate: function (options) {
        let start = new Date().getTime();
        let id = setInterval(function () {
          let timePassed = new Date().getTime() - start;
          let progress = timePassed / options.duration;
          if (progress > 1) {
            progress = 1;
          }
          options.progress = progress;
          let delta = options.delta(progress);
          options.step(delta);
          if (progress == 1) {
            clearInterval(id);
            options.complete();
          }
        }, options.delay || 10);
      },
      fadeOut: function (element, options) {
        let to = 1;
        this.animate({
          duration: options.duration,
          delta: function (progress) {
            progress = this.progress;
            return FX.easing.swing(progress);
          },
          complete: options.complete,
          step: function (delta) {
            element.style.opacity = to - delta;
          },
        });
      },
      fadeIn: function (element, options) {
        let to = 0;
        this.animate({
          duration: options.duration,
          delta: function (progress) {
            progress = this.progress;
            return FX.easing.swing(progress);
          },
          complete: options.complete,
          step: function (delta) {
            element.style.opacity = to + delta;
          },
        });
      },
    };
    this._FX = FX;
  };
}
