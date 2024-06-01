# Fancy Theme Toggle

As seen on https://www.instagram.com/reel/C4bA-9cC0kZ/

<img src="https://github.com/vjee/fancy-theme-toggle/raw/main/.github/sequence.jpg" alt="sequence" />
<p align="center"><img src="https://github.com/vjee/fancy-theme-toggle/raw/main/.github/toggle.gif" alt="toggle" /></p>

## Import

```js
import { FancyThemeToggle } "fancy-theme-toggle";
customElements.define("my-theme-toggle", FancyThemeToggle);
```

## Initial value

```html
<!-- Unchecked (light mode) -->
<fancy-theme-toggle></fancy-theme-toggle>

<!-- Checked (dark mode) -->
<fancy-theme-toggle checked></fancy-theme-toggle>
```

## Listening to changes

```html
<fancy-theme-toggle></fancy-theme-toggle>

<script>
  const toggle = document.querySelector("fancy-theme-toggle");

  toggle.addEventListener("change", (event) => {
    const isDark = event.target.checked;
  });
</script>
```

## Updating toggle programmatically

```html
<fancy-theme-toggle></fancy-theme-toggle>

<script>
  const toggle = document.querySelector("fancy-theme-toggle");

  toggle.setAttribute("checked", ""); // dark
  toggle.removeAttribute("checked"); // light
  toggle.click(); // toggle between light and dark
</script>
```

## Styling

### Animations

The animation duration can be customised by overwriting the `--ftt-duration` custom property.

```css
fancy-theme-toggle {
  --ftt-duration: 600ms;
}
```

### Size

The toggle is 32x80 pixels by default.\
You can customize this by overwriting the `--ftt-height` custom property. The width of the toggle will update accordingly.

```css
fancy-theme-toggle {
  --ftt-height: 64px;
}
```

### Display

The `fancy-theme-toggle` element uses `display: inline-grid`.\
If you want it to be block level, you can use `display: grid` instead.

```css
fancy-theme-toggle {
  display: grid;
}
```
