import { App } from 'obsidian';
import { TableEditor } from './table-editor';

/**
 * TableControls displays a line widget in the editor to users.
 * Buttons allow easy access to table manipulation functions.
 */
export class TableControls {
  private readonly cm: CodeMirror.Editor;
  private readonly te: TableEditor;
  private readonly app: App;

  /**
   * Stores the CodeMirror widget object, which can be used to
   * remove it from the editor.
   */
  private widget: CodeMirror.LineWidget;

  constructor(cm: CodeMirror.Editor, te: TableEditor, app: App) {
    this.cm = cm;
    this.te = te;
    this.app = app;
  }

  /**
   * Build the line widget DOM node, and display to user.
   */
  public readonly display = (): void => {
    this.widget = this.cm.addLineWidget(
      this.cm.getCursor().line,
      this.createTableControls(),
      {
        coverGutter: true,
        handleMouseEvents: false, // Editor does not handle mouse events, browser does
        noHScroll: true, // Don't move the toolbar if editor is horiz. scrolled
      },
    );

    this.cm.on('keydown', this.handleEscapeKey);
  };

  /**
   * Close this line widget.
   */
  public readonly clear = (): void => {
    console.debug('Clearing table control widget...');
    if (this.widget) {
      this.widget.clear();
      this.widget = null;
      console.debug('Table control widget cleared');
    }

    this.cm.off('keydown', this.handleEscapeKey);
  };

  private readonly createTableControls = (): HTMLElement => {
    const node = document.createElement('div');
    node.classList.add('widget-background');

    node.appendChild(
      this.createButtonSvg(alignLeft, 'Align column left', () => {
        this.te.leftAlignColumn();
      }),
    );

    node.appendChild(
      this.createButtonSvg(alignCenter, 'Align column center', () => {
        this.te.centerAlignColumn();
      }),
    );

    node.appendChild(
      this.createButtonSvg(alignRight, 'Align column right', () => {
        this.te.rightAlignColumn();
      }),
    );

    node.appendChild(
      this.createButtonSvg(sortAsc, 'Sort rows ascending', () => {
        this.te.sortRowsAsc();
      }),
    );

    node.appendChild(
      this.createButtonSvg(sortDesc, 'Sort rows descending', () => {
        this.te.sortRowsDesc();
      }),
    );

    node.appendChild(
      this.createButtonSvg(moveColumnLeft, 'Move column left', () => {
        this.te.moveColumnLeft();
      }),
    );

    node.appendChild(
      this.createButtonSvg(moveColumnRight, 'Move column right', () => {
        this.te.moveColumnRight();
      }),
    );

    node.appendChild(
      this.createButtonSvg(moveRowUp, 'Move row up', () => {
        this.te.moveRowUp();
      }),
    );

    node.appendChild(
      this.createButtonSvg(moveRowDown, 'Move row down', () => {
        this.te.moveRowDown();
      }),
    );

    node.appendChild(
      this.createButtonSvg(insertColumn, 'Insert column', () => {
        this.te.insertColumn();
      }),
    );

    node.appendChild(
      this.createButtonSvg(insertRow, 'Insert row', () => {
        this.te.insertRow();
      }),
    );

    node.appendChild(
      this.createButtonSvg(deleteColumn, 'Delete column', () => {
        this.te.deleteColumn();
      }),
    );

    node.appendChild(
      this.createButtonSvg(deleteRow, 'Delete row', () => {
        this.te.deleteRow();
      }),
    );

    node.appendChild(
      this.createButtonSvg(formula, 'Evaluate formulas', () => {
        this.te.evaluateFormulas();
      }),
    );

    node.appendChild(
      this.createButtonSvg(help, 'Help', () => {
        window.open(
          'https://github.com/tgrosinger/advanced-tables-obsidian/blob/main/docs/help.md',
        );
      }),
    );

    node.appendChild(
      this.createButtonSvg(close, 'Close toolbar', () => {
        this.clear();
      }),
    );

    return node;
  };

  private readonly createButtonSvg = (
    icon: HTMLElement,
    title: string,
    action: () => void,
  ): HTMLElement => {
    const button = document.createElement('button');
    button.addClass('widget-button');
    if (title === 'Close toolbar') {
      button.addClass('widget-button-close');
    }
    button.setAttribute('title', title);
    button.appendChild(icon);
    button.onClickEvent((event: MouseEvent): void => {
      action();
      this.clear();
    });
    return button;
  };

  private readonly handleEscapeKey = (
    cm: CodeMirror.Editor,
    event: KeyboardEvent,
  ): void => {
    if (event.key === 'Escape') {
      this.clear();
    }
  };
}

/**
 * Convert an svg string into an HTML element.
 *
 * @param svgText svg image as a string
 */
const Element = (svgText: string): HTMLElement => {
  const parser = new DOMParser();
  return parser.parseFromString(svgText, 'text/xml').documentElement;
};

const alignLeft = Element(`
<svg class="widget-icon" enable-background="new 0 0 512 512" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <g transform="matrix(-1 0 0 1 512 0)">
    <path d="m501.33 170.67h-320c-5.896 0-10.667 4.771-10.667 10.667v21.333c0 5.896 4.771 10.667 10.667 10.667h320c5.896 0 10.667-4.771 10.667-10.667v-21.333c0-5.896-4.771-10.667-10.667-10.667z"/>
    <path d="m501.33 298.67h-490.67c-5.896 0-10.667 4.771-10.667 10.666v21.333c0 5.896 4.771 10.667 10.667 10.667h490.67c5.896 0 10.667-4.771 10.667-10.667v-21.333c-1e-3 -5.895-4.772-10.666-10.668-10.666z"/>
    <path d="m501.33 426.67h-320c-5.896 0-10.667 4.771-10.667 10.667v21.333c0 5.896 4.771 10.667 10.667 10.667h320c5.896 0 10.667-4.771 10.667-10.667v-21.333c0-5.896-4.771-10.667-10.667-10.667z"/>
    <path d="m501.33 42.667h-490.67c-5.896 0-10.667 4.771-10.667 10.666v21.333c0 5.896 4.771 10.667 10.667 10.667h490.67c5.896 0 10.667-4.771 10.667-10.667v-21.333c-1e-3 -5.895-4.772-10.666-10.668-10.666z"/>
  </g>
</svg>
`);

const alignCenter = Element(`
<svg class="widget-icon" enable-background="new 0 0 512 512" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <g transform="matrix(-1 0 0 1 512 0)">
    <path d="m416 170.67h-320c-5.896 0-10.667 4.771-10.667 10.667v21.333c0 5.896 4.771 10.667 10.667 10.667h320c5.896 0 10.667-4.771 10.667-10.667v-21.333c0-5.896-4.771-10.667-10.667-10.667z"/>
    <path d="m501.33 298.67h-490.67c-5.896 0-10.667 4.771-10.667 10.666v21.333c0 5.896 4.771 10.667 10.667 10.667h490.67c5.896 0 10.667-4.771 10.667-10.667v-21.333c-1e-3 -5.895-4.772-10.666-10.668-10.666z"/>
    <path d="m416 426.67h-320c-5.896 0-10.667 4.771-10.667 10.667v21.333c0 5.896 4.771 10.667 10.667 10.667h320c5.896 0 10.667-4.771 10.667-10.667v-21.333c0-5.896-4.771-10.667-10.667-10.667z"/>
    <path d="m501.33 42.667h-490.67c-5.896 0-10.667 4.771-10.667 10.666v21.333c0 5.896 4.771 10.667 10.667 10.667h490.67c5.896 0 10.667-4.771 10.667-10.667v-21.333c-1e-3 -5.895-4.772-10.666-10.668-10.666z"/>
  </g>
</svg>
`);

const alignRight = Element(`
<svg class="widget-icon" enable-background="new 0 0 512 512" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <path d="m501.33 170.67h-320c-5.896 0-10.667 4.771-10.667 10.667v21.333c0 5.896 4.771 10.667 10.667 10.667h320c5.896 0 10.667-4.771 10.667-10.667v-21.333c0-5.896-4.771-10.667-10.667-10.667z"/>
  <path d="m501.33 298.67h-490.67c-5.896 0-10.667 4.771-10.667 10.666v21.333c0 5.896 4.771 10.667 10.667 10.667h490.67c5.896 0 10.667-4.771 10.667-10.667v-21.333c-1e-3 -5.895-4.772-10.666-10.668-10.666z"/>
  <path d="m501.33 426.67h-320c-5.896 0-10.667 4.771-10.667 10.667v21.333c0 5.896 4.771 10.667 10.667 10.667h320c5.896 0 10.667-4.771 10.667-10.667v-21.333c0-5.896-4.771-10.667-10.667-10.667z"/>
  <path d="m501.33 42.667h-490.67c-5.896 0-10.667 4.771-10.667 10.666v21.333c0 5.896 4.771 10.667 10.667 10.667h490.67c5.896 0 10.667-4.771 10.667-10.667v-21.333c-1e-3 -5.895-4.772-10.666-10.668-10.666z"/>
</svg>
`);

const deleteColumn = Element(`
<svg class="widget-icon" enable-background="new 0 0 26 26" version="1.1" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
  <path d="m13.594 20.85v3.15h-10v-22h10v3.15c0.633-0.323 1.304-0.565 2-0.727v-3.423c0-0.551-0.448-1-1-1h-12c-0.55 0-1 0.449-1 1v24c0 0.551 0.449 1 1 1h12c0.552 0 1-0.449 1-1v-3.424c-0.696-0.161-1.367-0.403-2-0.726z"/>
  <path d="m17.594 6.188c-3.762 0-6.813 3.051-6.812 6.813-1e-3 3.761 3.05 6.812 6.812 6.812s6.813-3.051 6.813-6.813-3.052-6.812-6.813-6.812zm3.632 7.802-7.267 1e-3v-1.982h7.268l-1e-3 1.981z"/>
</svg>
`);

const deleteRow = Element(`
<svg class="widget-icon" enable-background="new 0 0 15.381 15.381" version="1.1" viewBox="0 0 15.381 15.381" xmlns="http://www.w3.org/2000/svg">
  <path d="M0,1.732v7.732h6.053c0-0.035-0.004-0.07-0.004-0.104c0-0.434,0.061-0.854,0.165-1.255H1.36V3.092    h12.662v2.192c0.546,0.396,1.01,0.897,1.359,1.477V1.732H0z"/>
  <path d="m11.196 5.28c-2.307 0-4.183 1.877-4.183 4.184 0 2.308 1.876 4.185 4.183 4.185 2.309 0 4.185-1.877 4.185-4.185 0-2.307-1.876-4.184-4.185-4.184zm0 7.233c-1.679 0-3.047-1.367-3.047-3.049 0-1.68 1.368-3.049 3.047-3.049 1.684 0 3.05 1.369 3.05 3.049 0 1.682-1.366 3.049-3.05 3.049z"/>
  <rect x="9.312" y="8.759" width="3.844" height="1.104"/>
</svg>
`);

const insertColumn = Element(`
<svg class="widget-icon" width="512pt" height="512pt" version="1.1" viewBox="-21 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <path d="m288 106.67c-3.9258 0-7.8516-1.4297-10.922-4.3125l-80-74.664c-4.8008-4.4805-6.3789-11.457-3.9688-17.559 2.4102-6.1016 8.3203-10.133 14.891-10.133h160c6.5703 0 12.48 4.0117 14.891 10.133 2.4102 6.125 0.83203 13.078-3.9688 17.559l-80 74.664c-3.0703 2.8828-6.9961 4.3125-10.922 4.3125zm-39.402-74.668 39.402 36.777 39.402-36.777z"/>
  <path d="m432 512h-53.332c-20.59 0-37.336-16.746-37.336-37.332v-330.67c0-20.586 16.746-37.332 37.336-37.332h53.332c20.586 0 37.332 16.746 37.332 37.332v330.67c0 20.586-16.746 37.332-37.332 37.332zm-53.332-373.33c-2.9453 0-5.3359 2.3867-5.3359 5.332v330.67c0 2.9414 2.3906 5.332 5.3359 5.332h53.332c2.9453 0 5.332-2.3906 5.332-5.332v-330.67c0-2.9453-2.3867-5.332-5.332-5.332z"/>
  <path d="m197.33 512h-160c-20.586 0-37.332-16.746-37.332-37.332v-330.67c0-20.586 16.746-37.332 37.332-37.332h160c20.59 0 37.336 16.746 37.336 37.332v330.67c0 20.586-16.746 37.332-37.336 37.332zm-160-373.33c-2.9414 0-5.332 2.3867-5.332 5.332v330.67c0 2.9414 2.3906 5.332 5.332 5.332h160c2.9453 0 5.3359-2.3906 5.3359-5.332v-330.67c0-2.9453-2.3906-5.332-5.3359-5.332z"/>
  <path d="m453.33 325.33h-96c-8.832 0-16-7.168-16-16s7.168-16 16-16h96c8.832 0 16 7.168 16 16s-7.168 16-16 16z"/>
  <path d="m218.67 325.33h-202.67c-8.832 0-16-7.168-16-16s7.168-16 16-16h202.67c8.832 0 16 7.168 16 16s-7.168 16-16 16z"/>
  <path d="m117.33 512c-8.832 0-16-7.168-16-16v-373.33c0-8.832 7.168-16 16-16s16 7.168 16 16v373.33c0 8.832-7.168 16-16 16z"/>
</svg>
`);

const insertRow = Element(`
<svg class="widget-icon" width="512pt" height="512pt" version="1.1" viewBox="0 -21 512 512" xmlns="http://www.w3.org/2000/svg">
  <path d="m16 277.33c-1.9844 0-3.9688-0.36328-5.8672-1.1094-6.1211-2.4102-10.133-8.3203-10.133-14.891v-160c0-6.5703 4.0117-12.48 10.133-14.891 6.1445-2.4102 13.078-0.85156 17.559 3.9688l74.664 80c5.7617 6.1445 5.7617 15.68 0 21.824l-74.664 80c-3.0938 3.3281-7.3398 5.0977-11.691 5.0977zm16-135.4v78.805l36.777-39.402z"/>
  <path d="m474.67 128h-330.67c-20.586 0-37.332-16.746-37.332-37.332v-53.336c0-20.586 16.746-37.332 37.332-37.332h330.67c20.586 0 37.332 16.746 37.332 37.332v53.336c0 20.586-16.746 37.332-37.332 37.332zm-330.67-96c-2.9453 0-5.332 2.3906-5.332 5.332v53.336c0 2.9414 2.3867 5.332 5.332 5.332h330.67c2.9414 0 5.332-2.3906 5.332-5.332v-53.336c0-2.9414-2.3906-5.332-5.332-5.332z"/>
  <path d="m474.67 469.33h-330.67c-20.586 0-37.332-16.746-37.332-37.332v-160c0-20.586 16.746-37.332 37.332-37.332h330.67c20.586 0 37.332 16.746 37.332 37.332v160c0 20.586-16.746 37.332-37.332 37.332zm-330.67-202.66c-2.9453 0-5.332 2.3867-5.332 5.332v160c0 2.9453 2.3867 5.332 5.332 5.332h330.67c2.9414 0 5.332-2.3867 5.332-5.332v-160c0-2.9453-2.3906-5.332-5.332-5.332z"/>
  <path d="m309.33 128c-8.832 0-16-7.168-16-16v-96c0-8.832 7.168-16 16-16s16 7.168 16 16v96c0 8.832-7.168 16-16 16z"/>
  <path d="m309.33 469.33c-8.832 0-16-7.168-16-16v-202.66c0-8.832 7.168-16 16-16s16 7.168 16 16v202.66c0 8.832-7.168 16-16 16z"/>
  <path d="m496 368h-373.33c-8.832 0-16-7.168-16-16s7.168-16 16-16h373.33c8.832 0 16 7.168 16 16s-7.168 16-16 16z"/>
</svg>
`);

const moveColumnLeft = Element(`
<svg class="widget-icon" width="512pt" height="512pt" version="1.1" viewBox="0 0 512.02 512" xmlns="http://www.w3.org/2000/svg">
  <path d="m357.35 512.01h96c32.363 0 58.668-26.305 58.668-58.668v-394.66c0-32.363-26.305-58.668-58.668-58.668h-96c-32.363 0-58.664 26.305-58.664 58.668v394.66c0 32.363 26.301 58.668 58.664 58.668zm96-480c14.699 0 26.668 11.969 26.668 26.668v394.66c0 14.699-11.969 26.668-26.668 26.668h-96c-14.699 0-26.664-11.969-26.664-26.668v-394.66c0-14.699 11.965-26.668 26.664-26.668z"/>
  <path d="m16.016 272.01h224c8.832 0 16-7.168 16-16s-7.168-16-16-16h-224c-8.832 0-16 7.168-16 16s7.168 16 16 16z"/>
  <path d="m101.35 357.34c4.0976 0 8.1914-1.5547 11.309-4.6914 6.25-6.25 6.25-16.383 0-22.637l-74.027-74.023 74.027-74.027c6.25-6.25 6.25-16.387 0-22.637s-16.383-6.25-22.637 0l-85.332 85.336c-6.25 6.25-6.25 16.383 0 22.633l85.332 85.332c3.1367 3.1602 7.2344 4.7148 11.328 4.7148z"/>
</svg>
`);

const moveColumnRight = Element(`
<svg class="widget-icon" width="512pt" height="512pt" version="1.1" viewBox="0 0 512.02 512" xmlns="http://www.w3.org/2000/svg">
  <path d="m154.67 512.01h-96c-32.363 0-58.668-26.305-58.668-58.668v-394.66c0-32.363 26.305-58.668 58.668-58.668h96c32.363 0 58.664 26.305 58.664 58.668v394.66c0 32.363-26.301 58.668-58.664 58.668zm-96-480c-14.699 0-26.668 11.969-26.668 26.668v394.66c0 14.699 11.969 26.668 26.668 26.668h96c14.699 0 26.664-11.969 26.664-26.668v-394.66c0-14.699-11.965-26.668-26.664-26.668z"/>
  <path d="m496 272.01h-224c-8.832 0-16-7.168-16-16 0-8.832 7.168-16 16-16h224c8.832 0 16 7.168 16 16 0 8.832-7.168 16-16 16z"/>
  <path d="m410.67 357.34c-4.0977 0-8.1914-1.5547-11.309-4.6914-6.25-6.25-6.25-16.383 0-22.637l74.027-74.023-74.027-74.027c-6.25-6.25-6.25-16.387 0-22.637s16.383-6.25 22.637 0l85.332 85.336c6.25 6.25 6.25 16.383 0 22.633l-85.332 85.332c-3.1367 3.1602-7.2344 4.7148-11.328 4.7148z"/>
</svg>
`);

const moveRowDown = Element(`
<svg class="widget-icon" width="512pt" height="512pt" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <path d="m453.33 213.33h-394.66c-32.363 0-58.668-26.301-58.668-58.664v-96c0-32.363 26.305-58.668 58.668-58.668h394.66c32.363 0 58.668 26.305 58.668 58.668v96c0 32.363-26.305 58.664-58.668 58.664zm-394.66-181.33c-14.699 0-26.668 11.969-26.668 26.668v96c0 14.699 11.969 26.664 26.668 26.664h394.66c14.699 0 26.668-11.965 26.668-26.664v-96c0-14.699-11.969-26.668-26.668-26.668z"/>
  <path d="m256 512c-8.832 0-16-7.168-16-16v-224c0-8.832 7.168-16 16-16s16 7.168 16 16v224c0 8.832-7.168 16-16 16z"/>
  <path d="m256 512c-4.0977 0-8.1914-1.5586-11.309-4.6914l-85.332-85.336c-6.25-6.25-6.25-16.383 0-22.633s16.383-6.25 22.637 0l74.023 74.027 74.027-74.027c6.25-6.25 16.387-6.25 22.637 0s6.25 16.383 0 22.633l-85.336 85.336c-3.1562 3.1328-7.25 4.6914-11.348 4.6914z"/>
</svg>
`);

const moveRowUp = Element(`
<svg class="widget-icon" width="512pt" height="512pt" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <path d="m453.33 298.67h-394.66c-32.363 0-58.668 26.301-58.668 58.664v96c0 32.363 26.305 58.668 58.668 58.668h394.66c32.363 0 58.668-26.305 58.668-58.668v-96c0-32.363-26.305-58.664-58.668-58.664zm-394.66 181.33c-14.699 0-26.668-11.969-26.668-26.668v-96c0-14.699 11.969-26.664 26.668-26.664h394.66c14.699 0 26.668 11.965 26.668 26.664v96c0 14.699-11.969 26.668-26.668 26.668z"/>
  <path d="m256 0c-8.832 0-16 7.168-16 16v224c0 8.832 7.168 16 16 16s16-7.168 16-16v-224c0-8.832-7.168-16-16-16z"/>
  <path d="m256 0c-4.0977 0-8.1914 1.5586-11.309 4.6914l-85.332 85.336c-6.25 6.25-6.25 16.383 0 22.633s16.383 6.25 22.637 0l74.023-74.027 74.027 74.027c6.25 6.25 16.387 6.25 22.637 0s6.25-16.383 0-22.633l-85.336-85.336c-3.1562-3.1328-7.25-4.6914-11.348-4.6914z"/>
</svg>
`);

const sortAsc = Element(`
<svg class="widget-icon" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <g transform="matrix(1 0 0 -1 0 501.15)" stroke-width="1.3333">
    <path d="m353.6 74.486c-11.776 0-21.333 9.5573-21.333 21.333v298.67c0 11.776 9.5573 21.333 21.333 21.333s21.333-9.5573 21.333-21.333v-298.67c0-11.776-9.5573-21.333-21.333-21.333z"/>
    <path d="m353.6 74.486c-5.4636 0-10.922 2.0781-15.079 6.2552l-113.78 113.78c-8.3333 8.3333-8.3333 21.844 0 30.177 8.3333 8.3333 21.844 8.3333 30.183 0l98.697-98.703 98.703 98.703c8.3333 8.3333 21.849 8.3333 30.183 0 8.3333-8.3333 8.3333-21.844 0-30.177l-113.78-113.78c-4.2083-4.1771-9.6667-6.2552-15.131-6.2552z"/>
  </g>
  <path d="m166.04 210.11q-5.0971-13.492-9.5945-26.385-4.4974-13.192-9.2947-26.685h-94.146l-18.889 53.07h-30.283q11.993-32.981 22.487-60.865 10.494-28.184 20.388-53.369 10.194-25.186 20.089-47.973 9.8943-23.087 20.688-45.574h26.685q10.794 22.487 20.688 45.574 9.8943 22.787 19.789 47.973 10.194 25.186 20.688 53.369 10.494 27.884 22.487 60.865zm-27.284-77.056q-9.5945-26.085-19.189-50.371-9.2947-24.586-19.489-47.073-10.494 22.487-20.089 47.073-9.2947 24.286-18.589 50.371z"/>
  <path d="m173.24 325.25q-6.896 7.7955-16.191 18.889-8.9948 10.794-19.189 24.286-10.194 13.192-20.988 28.184-10.794 14.692-21.288 29.983-10.194 14.991-19.489 29.983-9.2947 14.991-16.79 28.484h116.93v24.886h-150.81v-19.489q6.2964-11.993 14.692-26.385 8.695-14.392 18.29-29.383 9.8943-14.991 20.388-30.283t20.688-29.383q10.494-14.092 20.088-26.385 9.8943-12.293 17.99-21.588h-106.74v-24.886h142.42z"/>
</svg>
`);

const sortDesc = Element(`
<svg class="widget-icon" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <g transform="matrix(1 0 0 -1 0 501.15)" stroke-width="1.3333">
    <path d="m353.6 74.486c-11.776 0-21.333 9.5573-21.333 21.333v298.67c0 11.776 9.5573 21.333 21.333 21.333s21.333-9.5573 21.333-21.333v-298.67c0-11.776-9.5573-21.333-21.333-21.333z"/>
    <path d="m353.6 74.486c-5.4636 0-10.922 2.0781-15.079 6.2552l-113.78 113.78c-8.3333 8.3333-8.3333 21.844 0 30.177 8.3333 8.3333 21.844 8.3333 30.183 0l98.697-98.703 98.703 98.703c8.3333 8.3333 21.849 8.3333 30.183 0 8.3333-8.3333 8.3333-21.844 0-30.177l-113.78-113.78c-4.2083-4.1771-9.6667-6.2552-15.131-6.2552z"/>
  </g>
  <path d="m169.11 507.72q-5.0971-13.492-9.5945-26.385-4.4974-13.192-9.2947-26.685h-94.146l-18.889 53.07h-30.283q11.993-32.981 22.487-60.865 10.494-28.184 20.388-53.369 10.194-25.186 20.088-47.973 9.8943-23.087 20.688-45.574h26.685q10.794 22.487 20.688 45.574 9.8943 22.787 19.789 47.973 10.194 25.186 20.688 53.369 10.494 27.884 22.487 60.865zm-27.284-77.056q-9.5945-26.085-19.189-50.371-9.2947-24.586-19.489-47.073-10.494 22.487-20.089 47.073-9.2947 24.286-18.589 50.371z"/>
  <path d="m176.31 27.639q-6.896 7.7955-16.191 18.889-8.9948 10.794-19.189 24.286-10.194 13.192-20.988 28.184-10.794 14.692-21.288 29.983-10.194 14.991-19.489 29.983-9.2947 14.991-16.79 28.484h116.93v24.886h-150.81v-19.489q6.2964-11.993 14.692-26.385 8.695-14.392 18.29-29.383 9.8943-14.991 20.388-30.283 10.494-15.291 20.688-29.383 10.494-14.092 20.088-26.385 9.8943-12.293 17.99-21.588h-106.74v-24.886h142.42z"/>
</svg>
`);

const formula = Element(`
<svg class="widget-icon" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <path d="m263.51 62.967c1.672-11.134 9.326-22.967 20.222-22.967 11.028 0 20 8.972 20 20h40c0-33.084-26.916-60-60-60-33.629 0-55.527 28.691-59.784 57.073l-12.862 86.927h-61.354v40h55.436l-39.22 265.07-0.116 0.937c-1.063 10.62-9.393 21.99-20.1 21.99-11.028 0-20-8.972-20-20h-40c0 33.084 26.916 60 60 60 33.661 0 56.771-29.141 59.848-57.496l40.023-270.5h60.129v-40h-54.211l11.989-81.033z"/>
  <polygon points="426.27 248 378.24 248 352.25 287.08 334.92 248 291.17 248 326 326.57 270.52 410 318.56 410 345.21 369.92 362.98 410 406.73 410 371.46 330.43"/>
</svg>
`);

const help = Element(`
<svg class="widget-icon" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <path d="m248.16 343.22c-14.639 0-26.491 12.2-26.491 26.84 0 14.291 11.503 26.84 26.491 26.84s26.84-12.548 26.84-26.84c0-14.64-12.199-26.84-26.84-26.84z"/>
  <path d="m252.69 140c-47.057 0-68.668 27.885-68.668 46.708 0 13.595 11.502 19.869 20.914 19.869 18.822 0 11.154-26.84 46.708-26.84 17.429 0 31.372 7.669 31.372 23.703 0 18.824-19.52 29.629-31.023 39.389-10.108 8.714-23.354 23.006-23.354 52.983 0 18.125 4.879 23.354 19.171 23.354 17.08 0 20.565-7.668 20.565-14.291 0-18.126 0.35-28.583 19.521-43.571 9.411-7.32 39.04-31.023 39.04-63.789s-29.629-57.515-74.246-57.515z"/>
  <path d="m256 0c-141.48 0-256 114.5-256 256v236c0 11.046 8.954 20 20 20h236c141.48 0 256-114.5 256-256 0-141.48-114.5-256-256-256zm0 472h-216v-216c0-119.38 96.607-216 216-216 119.38 0 216 96.607 216 216 0 119.38-96.607 216-216 216z"/>
</svg>
`);

const close = Element(`
<svg class="widget-icon widget-icon-close" width="26" height="26" version="1.1" viewBox="0 0 6.8792 6.8792" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -290.12)">
    <path d="m1.4978 296.98c-0.21996-0.0285-0.46241-0.11301-0.65317-0.22765-0.15238-0.0916-0.23271-0.15608-0.36374-0.292-0.23127-0.23989-0.38272-0.52887-0.44978-0.85815-0.022385-0.10993-0.023997-0.24738-0.023997-2.045 0-2.1397-0.0050021-2.0127 0.089332-2.28 0.091584-0.25961 0.20988-0.44561 0.413-0.64938 0.25969-0.26051 0.55304-0.41425 0.92493-0.48477 0.070513-0.0134 0.51083-0.0171 2.0107-0.0171 1.7912 0 1.9284 2e-3 2.0383 0.024 0.68991 0.14049 1.2218 0.67236 1.3623 1.3623 0.022385 0.1099 0.023997 0.24708 0.023997 2.0383 0 1.4999-0.00373 1.9402-0.017119 2.0107-0.070504 0.37189-0.22425 0.66525-0.48477 0.92493-0.20731 0.20666-0.40278 0.32966-0.66175 0.41642-0.26804 0.0898-0.12118 0.0841-2.2139 0.087-1.0767 2e-3 -1.941-3e-3 -1.9943-9e-3zm4.0087-0.61331c0.18869-0.0655 0.30981-0.13961 0.44353-0.27129 0.13463-0.13258 0.21174-0.24574 0.26982-0.39595 0.083551-0.21609 0.079875-0.1102 0.075905-2.1863l-0.0036-1.8965-0.038102-0.11416c-0.12238-0.3666-0.38575-0.63286-0.74753-0.75572l-0.12759-0.04329h-3.8812l-0.11415 0.0381c-0.3666 0.12237-0.63287 0.38575-0.75573 0.74753l-0.043327 0.12758v3.8812l0.038102 0.11415c0.13664 0.40937 0.44645 0.69185 0.86168 0.7857 0.066058 0.0149 0.4242 0.0178 1.9876 0.0158l1.907-3e-3zm-3.1679-1.5265c-0.1635-0.0524-0.2433-0.24627-0.16605-0.40335 0.010899-0.0222 0.20788-0.22916 0.43774-0.45997l0.41793-0.41967-0.41793-0.41968c-0.22986-0.23083-0.42748-0.43868-0.43915-0.46191-0.058379-0.11618-0.038033-0.2343 0.056664-0.329 0.0947-0.0947 0.21282-0.11505 0.329-0.0567 0.023229 0.0117 0.23109 0.20929 0.46191 0.43915l0.41968 0.41791 0.41967-0.41791c0.23082-0.22986 0.43781-0.42694 0.45996-0.43796 0.15971-0.0793 0.35498 4e-3 0.40421 0.17411 0.021866 0.0752 0.016042 0.14327-0.018173 0.2123-0.010987 0.0222-0.20792 0.22918-0.43764 0.46006l-0.41767 0.41978 0.41783 0.41957c0.22981 0.23077 0.42684 0.43772 0.43785 0.45987 0.079363 0.15971-0.00477 0.35498-0.17411 0.40422-0.075095 0.0218-0.14299 0.0161-0.2123-0.018-0.022158-0.0109-0.2291-0.20784-0.45987-0.43765l-0.41958-0.41782-0.41977 0.41766c-0.23087 0.22973-0.43798 0.42688-0.46024 0.43813-0.061854 0.0313-0.15309 0.0383-0.21998 0.0168z" stroke-width=".01343"/>
  </g>
</svg>
`);
