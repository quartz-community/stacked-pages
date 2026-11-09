# @quartz-community/stacked-pages

Binder-style stacked pages for Quartz: every page you open is added as a tab, and the tabs are shown as strips beside the page content, like the tabs of a ring binder. Pages you came from sit on the left of the current page, pages you went back from on the right, so you can retrace your path through your notes.

## Installation

```bash
npx quartz plugin add @quartz-community/stacked-pages
```

Quartz's default configuration has a disabled entry for this plugin; set `enabled: true` to use it.

## Usage

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/stacked-pages"
    enabled: true
    options:
      maxTabs: 8
      mobileBreakpoint: 800
      showSpines: true
    layout:
      position: afterBody
      priority: 50
      display: all
```

Navigation works as usual: links are not intercepted and the URL is not changed, so heading anchors, popover previews and SPA routing keep working. After each navigation the page is added as a tab right after the current one (or, if it already has a tab, that tab becomes current). The binder appears once there are at least two tabs.

- **Click a tab** to navigate to that page.
- **Close a tab** with its × button. Closing the current tab navigates to the nearest remaining one.
- With more than `maxTabs` tabs, the oldest tab furthest from the current one is dropped.

The tabs are kept in the browser's `sessionStorage`: they survive reloads and navigation within the browser tab, but are not part of the URL and are not shared between browser tabs. Below `mobileBreakpoint` the binder is hidden.

## Configuration

| Option               | Type      | Default | Description                                                  |
| -------------------- | --------- | ------- | ------------------------------------------------------------ |
| `maxTabs`            | `number`  | `8`     | Maximum number of tabs kept (including the current page).    |
| `mobileBreakpoint`   | `number`  | `800`   | Viewport width (in pixels) below which the binder is hidden. |
| `showSpines`         | `boolean` | `true`  | Whether to draw the coloured spine accent on each tab.       |
| `animateTransitions` | `boolean` | `true`  | Accepted, but currently has no effect.                       |

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/plugins/StackedPages) for more information.

## License

MIT
