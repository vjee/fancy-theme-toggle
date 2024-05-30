export class FancyThemeToggle extends HTMLElement {
  inputElement;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = String.raw`
      <style>
        :host {
          --ftt-height: 32px;
          --ftt-duration: 300ms;
          --ftt-duration-one-tenth: calc(var(--ftt-duration) / 10);

          display: inline-grid;
          width: calc(var(--ftt-height) * 2.5);
          height: var(--ftt-height);
        }

        .input { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
        .svg { pointer-events: none; width: 100%; height: 100%; }
        .shadow { display: block; box-shadow: inset calc(var(--ftt-height) / 16) calc(var(--ftt-height) / 16) calc(var(--ftt-height) / 8) 0px #4D566F; }
        .svg,
        .shadow { grid-area: 1 / 1 / 2 / 2; border-radius: calc(var(--ftt-height) / 2); }

        /* define transitions */
        .svg-background { transition: fill var(--ftt-duration) ease-out; }
        .svg-cloud,
        .svg-sun,
        .svg-ray,
        .svg-moon { transition: transform var(--ftt-duration) ease-out; }
        .svg-cloud:nth-child(1) { transition-delay: var(--ftt-duration-one-tenth); }
        .svg-cloud:nth-child(2) { transition-delay: 0s; }
        .input:not(:checked) ~ .svg .svg-cloud:nth-child(1) { transition-delay: 0s; }
        .input:not(:checked) ~ .svg .svg-cloud:nth-child(2) { transition-delay: var(--ftt-duration-one-tenth); }
        .svg-stars { transition: opacity var(--ftt-duration) ease-out, transform var(--ftt-duration) ease-out; transform-origin: 64px 16px; }
        .input:not(:checked) ~ .svg .svg-stars { opacity: 0.01; transform: translateY(-32px) rotate(15deg); }
        .shadow { transition: box-shadow var(--ftt-duration) ease-out; }

        /* checked state */
        .input:checked ~ .svg .svg-background { fill: #171E31; }
        .input:checked ~ .svg .svg-cloud { transform: translate(8px, 32px); }
        .input:checked ~ .svg .svg-sun,
        .input:checked ~ .svg .svg-ray { transform: translateX(48px); }
        .input:checked ~ .svg .svg-moon { transform: translateX(-24px); }
        .input:checked ~ .svg .svg-stars { opacity: 0.99; transform: translateY(0px) rotate(0deg); }
        .input:checked ~ .shadow { box-shadow: inset calc(var(--ftt-height) / 16) calc(var(--ftt-height) / 16) calc(var(--ftt-height) / 8) 0px #171E31; }
      </style>

      <input class="input" type="checkbox" />

      <svg class="svg" width="80" height="32" viewBox="0 0 80 32" fill="none">
        <mask id="toggle-mask" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="32">
          <rect width="80" height="32" rx="16" fill="white" />
        </mask>
        <rect class="svg-background" width="80" height="32" rx="16" fill="#3072B6" />
        <g mask="url(#toggle-mask)">
          <circle class="svg-ray" cx="16" cy="16" r="44" fill="white" opacity="0.1" />
          <circle class="svg-ray" cx="16" cy="16" r="34" fill="white" opacity="0.1" />
          <circle class="svg-ray" cx="16" cy="16" r="24" fill="white" opacity="0.1" />
        </g>
        <g mask="url(#toggle-mask)">
          <path class="svg-cloud" d="M86 11V40H26V39.9855C25.8346 39.9951 25.6678 40 25.5 40C20.8056 40 17 36.1944 17 31.5C17 26.8056 20.8056 23 25.5 23C26.2374 23 26.9528 23.0939 27.635 23.2704C28.9064 20.1776 31.9489 18 35.5 18C37.545 18 39.4214 18.7222 40.888 19.9255C41.9007 19.3679 43.0562 19.0375 44.2857 19.003C45.7873 16.5992 48.4569 15 51.5 15C52.2281 15 52.9348 15.0915 53.6092 15.2637C55.438 13.2583 58.0721 12 61 12C61.3531 12 61.702 12.0183 62.0457 12.054C62.0154 11.7067 62 11.3552 62 11C62 4.37258 67.3726 -1 74 -1C80.6274 -1 86 4.37258 86 11Z" fill="white" opacity="0.75" />
          <path class="svg-cloud" d="M88 43H6V32H6.01446C6.27327 27.5383 9.97343 24 14.5 24C17.0157 24 19.2761 25.0929 20.8324 26.8298C21.9428 26.2979 23.1866 26 24.5 26C26.0918 26 27.5814 26.4376 28.8551 27.199C30.4126 25.2492 32.8104 24 35.5 24C38.2468 24 40.6892 25.3029 42.2431 27.3243C43.4524 26.4891 44.9191 26 46.5 26C47.2816 26 48.0353 26.1196 48.7438 26.3414C50.297 24.3102 52.7455 23 55.5 23C56.8379 23 58.1036 23.3091 59.2296 23.8598C59.8383 21.0678 61.6133 18.7116 64.0185 17.3271C64.3676 11.0127 69.5984 6 76 6C82.6274 6 88 11.3726 88 18V43Z" fill="white" />
        </g>
        <g class="svg-sun">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" x="4" y="4">
            <mask id="sun-mask" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
              <circle cx="12" cy="12" r="12" fill="white" />
            </mask>
            <g>
              <circle cx="12" cy="12" r="12" fill="#FFBB1A" />
              <path d="M20.9706 4.02937C18.8511 2.1448 16.0593 1 13 1C6.37258 1 1 6.37258 1 13C1 16.0593 2.1448 18.8511 4.02937 20.9706C1.55733 18.7726 0 15.5682 0 12C0 5.37258 5.37258 0 12 0C15.5682 0 18.7726 1.55733 20.9706 4.02937Z" fill="white" opacity="0.75" />
              <path d="M23.7021 14.669C21.596 19.0084 17.1474 22 12 22C6.85261 22 2.40396 19.0084 0.297882 14.669C1.51136 20.0118 6.28993 24 12 24C17.7101 24 22.4886 20.0118 23.7021 14.669Z" fill="black" opacity="0.1" />
            </g>
            <g mask="url(#sun-mask)">
              <circle class="svg-moon" cx="36" cy="12" r="12" fill="#C1C8DA" />
              <path class="svg-moon" d="M44.9706 4.02937C42.8511 2.1448 40.0593 1 37 1C30.3726 1 25 6.37258 25 13C25 16.0593 26.1448 18.8511 28.0294 20.9706C25.5573 18.7726 24 15.5682 24 12C24 5.37258 29.3726 0 36 0C39.5682 0 42.7726 1.55733 44.9706 4.02937Z" fill="white" opacity="0.75" />
              <path class="svg-moon" d="M47.7021 14.669C45.596 19.0084 41.1474 22 36 22C30.8526 22 26.404 19.0084 24.2979 14.669C25.5114 20.0118 30.2899 24 36 24C41.7101 24 46.4886 20.0118 47.7021 14.669Z" fill="black" opacity="0.1" />
              <circle class="svg-moon" cx="33" cy="13" r="4" fill="black" opacity="0.25" />
              <circle class="svg-moon" cx="35" cy="6" r="2" fill="black" opacity="0.25" />
              <circle class="svg-moon" cx="41.5" cy="16.5" r="2.5" fill="black" opacity="0.25" />
            </g>
          </svg>
        </g>
        <g class="svg-stars">
          <path d="M46 13C46.2473 12.0193 47.0193 11.2473 48 11C47.0193 10.7527 46.2473 9.9807 46 9C45.7527 9.9807 44.9807 10.7527 44 11C44.9807 11.2473 45.7527 12.0193 46 13Z" fillRule="evenodd" clipRule="evenodd" fill="white" />
          <path d="M18.5 7.99992C18.6855 7.26442 19.2644 6.68543 20 6.49996C19.2644 6.31449 18.6855 5.7355 18.5 5C18.3145 5.7355 17.7355 6.31449 17 6.49996C17.7355 6.68543 18.3145 7.26442 18.5 7.99992Z" fillRule="evenodd" clipRule="evenodd" fill="white" />
          <path d="M23 14C23.1236 14.4904 23.5096 14.8764 24 15C23.5096 15.1237 23.1236 15.5097 23 16C22.8764 15.5097 22.4904 15.1237 22 15C22.4904 14.8764 22.8764 14.4904 23 14Z" fillRule="evenodd" clipRule="evenodd" fill="white" />
          <path d="M10 9C10.1236 9.49035 10.5096 9.87636 11 10C10.5096 10.1237 10.1236 10.5097 10 11C9.87636 10.5097 9.49035 10.1237 9 10C9.49035 9.87636 9.87636 9.49035 10 9Z" fillRule="evenodd" clipRule="evenodd" fill="white" />
          <path d="M37 24C37.1236 24.4904 37.5096 24.8764 38 25C37.5096 25.1237 37.1236 25.5097 37 26C36.8764 25.5097 36.4904 25.1237 36 25C36.4904 24.8764 36.8764 24.4904 37 24Z" fillRule="evenodd" clipRule="evenodd" fill="white" />
          <path d="M37.5 8C37.5618 8.2452 37.7548 8.43822 38 8.50005C37.7548 8.56188 37.5618 8.7549 37.5 9.0001C37.4382 8.7549 37.2452 8.56188 37 8.50005C37.2452 8.43822 37.4382 8.2452 37.5 8Z" fillRule="evenodd" clipRule="evenodd" fill="white" />
          <path d="M32.5 15C32.5618 15.2452 32.7548 15.4382 33 15.5C32.7548 15.5619 32.5618 15.7549 32.5 16.0001C32.4382 15.7549 32.2452 15.5619 32 15.5C32.2452 15.4382 32.4382 15.2452 32.5 15Z" fillRule="evenodd" clipRule="evenodd" fill="white" />
          <path d="M44.5 18C44.5618 18.2452 44.7548 18.4382 45 18.5C44.7548 18.5619 44.5618 18.7549 44.5 19.0001C44.4382 18.7549 44.2452 18.5619 44 18.5C44.2452 18.4382 44.4382 18.2452 44.5 18Z" fillRule="evenodd" clipRule="evenodd" fill="white" />
          <path d="M19.5 26C19.5618 26.2452 19.7548 26.4382 20 26.5C19.7548 26.5619 19.5618 26.7549 19.5 27.0001C19.4382 26.7549 19.2452 26.5619 19 26.5C19.2452 26.4382 19.4382 26.2452 19.5 26Z" fillRule="evenodd" clipRule="evenodd" fill="white" />
          <path d="M11.5 21C11.5618 21.2452 11.7548 21.4382 12 21.5C11.7548 21.5619 11.5618 21.7549 11.5 22.0001C11.4382 21.7549 11.2452 21.5619 11 21.5C11.2452 21.4382 11.4382 21.2452 11.5 21Z" fillRule="evenodd" clipRule="evenodd" fill="white" />
          <path d="M9.50001 24C9.56183 24.2452 9.75484 24.4382 10 24.5C9.75484 24.5619 9.56183 24.7549 9.50001 25.0001C9.4382 24.7549 9.24519 24.5619 9 24.5C9.24519 24.4382 9.4382 24.2452 9.50001 24Z" fillRule="evenodd" clipRule="evenodd" fill="white" />
        </g>
      </svg>

      <div class="shadow"></div>
    `;

    this.inputElement = this.shadowRoot.querySelector("input");
    this.inputElement.checked = this.hasAttribute("checked");
    this.addEventListener("click", () => this.toggleChecked());
  }

  get checked() {
    return this.inputElement.checked;
  }

  set checked(value) {
    const isChecked = Boolean(value);
    this.inputElement.checked = isChecked;
    if (isChecked) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }

  toggleChecked() {
    this.checked = !this.checked;
  }

  static get observedAttributes() {
    return ["checked"];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "checked") {
      const isChecked = newValue !== null;
      if (this.checked !== isChecked) {
        this.checked = isChecked;
      }
    }
  }
}
