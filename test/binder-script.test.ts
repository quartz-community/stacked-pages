import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { bundleInline, runInline } from "./inlineScript";

const SCRIPT = new URL("../src/components/scripts/stacked.inline.ts", import.meta.url).pathname;

/** Just enough of an element for the binder's DOM building. */
class FakeElement extends EventTarget {
  className = "";
  textContent = "";
  children: FakeElement[] = [];
  dataset: Record<string, string> = {};
  attributes: Record<string, string> = {};
  style: Record<string, string> = {};
  classList = {
    add: (...names: string[]) => this.setClasses([...this.classes(), ...names]),
    remove: (...names: string[]) =>
      this.setClasses(this.classes().filter((c) => !names.includes(c))),
    toggle: (name: string, force: boolean) =>
      force ? this.classList.add(name) : this.classList.remove(name),
    contains: (name: string) => this.classes().includes(name),
  };
  private classes = () => this.className.split(" ").filter(Boolean);
  private setClasses = (names: string[]) => {
    this.className = [...new Set(names)].join(" ");
  };
  set innerHTML(value: string) {
    if (value === "") this.children = [];
  }
  appendChild(child: FakeElement) {
    this.children.push(child);
    return child;
  }
  setAttribute(name: string, value: string) {
    this.attributes[name] = value;
  }
  /** all descendants with this class */
  find(className: string): FakeElement[] {
    return this.children.flatMap((c) => [
      ...(c.classList.contains(className) ? [c] : []),
      ...c.find(className),
    ]);
  }
}

function browser(opts: { basePath?: string; width?: number; dataset?: Record<string, string> }) {
  const container = new FakeElement();
  container.dataset = {
    maxTabs: "8",
    mobileBreakpoint: "800",
    showSpines: "true",
    ...opts.dataset,
  };
  const body = new FakeElement();
  if (opts.basePath) body.dataset.basepath = opts.basePath;
  const store = new Map<string, string>();
  const navigated: string[] = [];
  let title = "";
  const location = { pathname: "/", origin: "https://example.com", href: "" };
  const document = Object.assign(new EventTarget(), {
    body,
    title: "",
    getElementById: (id: string) => (id === "stacked-pages-container" ? container : null),
    querySelector: (selector: string) => (selector === "h1" ? { textContent: title } : null),
    createElement: () => new FakeElement(),
  });
  vi.stubGlobal("document", document);
  vi.stubGlobal("sessionStorage", {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => store.set(k, v),
  });
  vi.stubGlobal(
    "window",
    Object.assign(new EventTarget(), {
      location,
      innerWidth: opts.width ?? 1200,
      addCleanup: () => {},
      spaNavigate: (url: URL) => navigated.push(url.pathname),
    }),
  );
  return {
    container,
    body,
    navigated,
    /** Quartz has loaded the page at `pathname`, whose h1 is `heading` */
    visit: (pathname: string, heading: string) => {
      location.pathname = pathname;
      title = heading;
      document.dispatchEvent(new CustomEvent("nav"));
    },
    tabs: () =>
      container.find("binder-tab").map((t) => ({
        title: t.find("binder-label")[0]!.textContent,
        active: t.classList.contains("binder-tab-active"),
      })),
  };
}

describe("stacked pages binder script", () => {
  let script: string;
  beforeAll(async () => {
    script = await bundleInline(SCRIPT);
  });
  afterEach(() => vi.unstubAllGlobals());

  it("shows no binder for the first page, then a tab per visited page", () => {
    const b = browser({});
    runInline(script);
    b.visit("/", "Home");
    expect(b.container.children).toEqual([]);
    b.visit("/notes/a", "A");
    b.visit("/notes/b", "B");
    expect(b.tabs()).toEqual([
      { title: "Home", active: false },
      { title: "A", active: false },
      { title: "B", active: true },
    ]);
    expect(b.container.classList.contains("binder-active")).toBe(true);
    expect(b.body.classList.contains("has-binder-left")).toBe(true);
  });

  it("switches to an open tab instead of adding it twice", () => {
    const b = browser({});
    runInline(script);
    b.visit("/", "Home");
    b.visit("/notes/a", "A");
    b.visit("/", "Home");
    expect(b.tabs()).toEqual([
      { title: "Home", active: true },
      { title: "A", active: false },
    ]);
    expect(b.body.classList.contains("has-binder-right")).toBe(true);
  });

  it("keeps at most maxTabs tabs, dropping the oldest", () => {
    const b = browser({ dataset: { maxTabs: "3" } });
    runInline(script);
    for (const n of [1, 2, 3, 4]) b.visit(`/p${n}`, `P${n}`);
    expect(b.tabs().map((t) => t.title)).toEqual(["P2", "P3", "P4"]);
  });

  it("draws spines unless showSpines is false", () => {
    const on = browser({});
    runInline(script);
    on.visit("/", "Home");
    on.visit("/a", "A");
    expect(on.container.find("binder-spine")).toHaveLength(2);
    vi.unstubAllGlobals();

    const off = browser({ dataset: { showSpines: "false" } });
    runInline(script);
    off.visit("/", "Home");
    off.visit("/a", "A");
    expect(off.container.find("binder-spine")).toHaveLength(0);
  });

  it("hides the binder below mobileBreakpoint", () => {
    const b = browser({ width: 600, dataset: { mobileBreakpoint: "700" } });
    runInline(script);
    b.visit("/", "Home");
    b.visit("/a", "A");
    expect(b.container.style.display).toBe("none");
    expect(b.tabs()).toEqual([]);
  });

  it("navigates to a tab's page through Quartz's SPA router when it is clicked", () => {
    const b = browser({});
    runInline(script);
    b.visit("/", "Home");
    b.visit("/notes/a", "A");
    b.container.find("binder-tab")[0]!.dispatchEvent(new Event("click"));
    expect(b.navigated).toEqual(["/index"]);
  });

  // bug: the tab's slug is taken from location.pathname, which includes the site's base path
  // ("/sub/notes/a" → "sub/notes/a"), and resolveBasePath() adds the base path again when a tab
  // is clicked: on a site served under a sub-path every tab leads to /sub/sub/… (a 404).
  it.fails("navigates to the right URL on a site with a base path", () => {
    const b = browser({ basePath: "/sub" });
    runInline(script);
    b.visit("/sub/", "Home");
    b.visit("/sub/notes/a", "A");
    b.container.find("binder-tab")[0]!.dispatchEvent(new Event("click"));
    expect(b.navigated[0]).toMatch(/^\/sub\/(index)?$/);
  });
});
