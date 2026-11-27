export type {
  BuildCtx,
  ChangeEvent,
  CSSResource,
  JSResource,
  ProcessedContent,
  QuartzEmitterPlugin,
  QuartzEmitterPluginInstance,
  QuartzFilterPlugin,
  QuartzFilterPluginInstance,
  QuartzPluginData,
  QuartzTransformerPlugin,
  QuartzTransformerPluginInstance,
  StaticResources,
  PageMatcher,
  PageGenerator,
  VirtualPage,
  QuartzPageTypePlugin,
  QuartzPageTypePluginInstance,
} from "@quartz-community/types";

export interface StackedPagesOptions {
  /** Maximum number of tabs in the binder (including the active page). Oldest tabs are evicted. Default: 8 */
  maxTabs: number;
  /** Hide the binder UI on viewports narrower than this (px). Default: 800 */
  mobileBreakpoint: number;
  /** Show the accent-colored spine on each tab. Default: true */
  showSpines: boolean;
  /** Enable slide animations when switching tabs. Default: true */
  animateTransitions: boolean;
}
