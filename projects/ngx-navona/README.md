# ngx-navona

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.6.

## Add ngx library in your project

In your terminal, run:

```
npm install @philipibovo/ngx-navona
```

## Using the library

At the end of app.component.html, add:

```
<ngx-navona></ngx-navona>
```

On the page where you will have the ngx-navona gallery, add the gallery:

```
<div id="id-my-gallery" class="navona">
  <div>
    <img src="photo1.jpg" />
    <p>Photo 1 description</p>
  </div>
  <div>
    <img src="photo2.jpg" />
    <p>Photo 2 description</p>
  </div>
  <div>
    <img src="photo3.jpg" />
    <p>Photo 3 description</p>
  </div>
  <div>
    <img src="photo4.jpg" />
    <p>Photo 4 description</p>
  </div>
</div>
```

Showing the gallery, add the following attributes to any element:

```
class="navona-go"
data-navona-target="id-my-gallery"
```

That's it, now just click on the element from the step above, and the gallery will appear.

For more, visit: [https://philipi.bovo.me/navona/ngx](https://philipi.bovo.me/navona/ngx)
