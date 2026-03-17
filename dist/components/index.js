import { jsx } from 'preact/jsx-runtime';

// src/util/lang.ts
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/styles/example.scss
var example_default = ".example-component {\n  padding: 8px 16px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border-radius: 4px;\n  font-weight: 600;\n  display: inline-block;\n}";

// src/components/scripts/example.inline.ts
var example_inline_default = 'function l(){let e=window.location.pathname;return e.startsWith("/")&&(e=e.slice(1)),e.endsWith("/")&&(e=e.slice(0,-1)),e||"index"}function r(){let e=document.querySelectorAll(".example-component");if(e.length===0)return;let t=[];function o(n){(n.ctrlKey||n.metaKey)&&n.shiftKey&&n.key.toLowerCase()==="e"&&(n.preventDefault(),console.log("[ExampleComponent] Keyboard shortcut triggered!"))}document.addEventListener("keydown",o),t.push(()=>document.removeEventListener("keydown",o));for(let n of e){let i=()=>{console.log("[ExampleComponent] Clicked!")};n.addEventListener("click",i),t.push(()=>n.removeEventListener("click",i))}typeof window<"u"&&window.addCleanup&&window.addCleanup(()=>{t.forEach(n=>n())}),console.log("[ExampleComponent] Initialized with",e.length,"component(s)")}document.addEventListener("nav",e=>{let t=e.detail?.url||l();console.log("[ExampleComponent] Navigation to:",t),r()});document.addEventListener("render",()=>{console.log("[ExampleComponent] Render event - re-initializing"),r()});document.addEventListener("prenav",()=>{let e=document.querySelector(".example-component");e&&sessionStorage.setItem("exampleScrollTop",e.scrollTop?.toString()||"0")});\n';
var ExampleComponent_default = ((opts) => {
  const { prefix = "", suffix = "", className = "example-component" } = opts ?? {};
  const Component = (props) => {
    const frontmatter = props.fileData?.frontmatter;
    const title = frontmatter?.title ?? "Untitled";
    const fullText = `${prefix}${title}${suffix}`;
    return /* @__PURE__ */ jsx("div", { class: classNames(className), children: fullText });
  };
  Component.css = example_default;
  Component.afterDOMLoaded = example_inline_default;
  return Component;
});

// src/components/styles/stacked.scss
var stacked_default = "#stacked-pages-container:not(.binder-active) {\n  display: none;\n}\n#stacked-pages-container.binder-active {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n  z-index: 99;\n  display: flex;\n  justify-content: space-between;\n  align-items: stretch;\n}\n\nbody.has-binder-left .page {\n  padding-left: 40px;\n}\n\nbody.has-binder-right .page {\n  padding-right: 40px;\n}\n\n.binder-strip {\n  pointer-events: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  padding: 0;\n  justify-content: stretch;\n  align-items: stretch;\n  z-index: 100;\n  width: 40px;\n  height: 100%;\n}\n\n.binder-strip-left {\n  align-self: flex-start;\n}\n\n.binder-strip-right {\n  align-self: flex-end;\n  margin-left: auto;\n}\n\n.binder-tab {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  padding: 8px 0;\n  cursor: pointer;\n  background: var(--lightgray);\n  border: 1px solid var(--lightgray);\n  transition: background 0.15s ease, transform 0.15s ease, border-color 0.15s ease;\n  width: 100%;\n  flex: 1;\n  position: relative;\n  writing-mode: vertical-lr;\n  overflow: hidden;\n}\n.binder-tab:hover {\n  background: var(--light);\n}\n\n.binder-tab.binder-tab-active {\n  background: var(--light);\n  z-index: 101;\n  cursor: default;\n}\n.binder-tab.binder-tab-active.binder-tab-left {\n  border-right: none;\n  border-left: 3px solid var(--secondary);\n  border-radius: 6px 0 0 6px;\n}\n.binder-tab.binder-tab-active.binder-tab-right {\n  border-left: none;\n  border-right: 3px solid var(--secondary);\n  border-radius: 0 6px 6px 0;\n}\n\n.binder-tab:not(.binder-tab-active) {\n  color: var(--gray);\n}\n.binder-tab:not(.binder-tab-active).binder-tab-left {\n  border-radius: 6px 0 0 6px;\n  border-right: 2px solid var(--secondary);\n  border-left: 1px solid var(--lightgray);\n}\n.binder-tab:not(.binder-tab-active).binder-tab-left:hover {\n  transform: translateX(4px);\n}\n.binder-tab:not(.binder-tab-active).binder-tab-right {\n  border-radius: 0 6px 6px 0;\n  border-left: 2px solid var(--secondary);\n  border-right: 1px solid var(--lightgray);\n}\n.binder-tab:not(.binder-tab-active).binder-tab-right:hover {\n  transform: translateX(-4px);\n}\n\n.binder-spine {\n  display: none;\n}\n\n.binder-label {\n  font-size: 1rem;\n  line-height: 1.2;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: var(--darkgray);\n  user-select: none;\n  transform: rotate(180deg);\n  text-align: left;\n}\n\n.binder-tab-active .binder-label {\n  font-weight: bold;\n  color: var(--dark);\n}\n\n.binder-close {\n  appearance: none;\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: 1rem;\n  line-height: 1;\n  color: var(--gray);\n  padding: 2px;\n  flex-shrink: 0;\n  opacity: 0;\n  transition: opacity 0.15s ease, color 0.15s ease;\n  transform: rotate(180deg);\n}\n.binder-close:hover {\n  color: var(--dark);\n  background: rgba(0, 0, 0, 0.05);\n  border-radius: 4px;\n}\n\n.binder-tab:hover .binder-close {\n  opacity: 1;\n}";

// src/components/scripts/stacked.inline.ts
var stacked_inline_default = 'var m="stacked-pages-state";function p(){let e=window.location.pathname;return e.startsWith("/")&&(e=e.slice(1)),e.endsWith("/")&&(e=e.slice(0,-1)),e||"index"}function w(){return document.querySelector("h1")?.textContent?.trim()||document.title||p()}function c(){try{let e=sessionStorage.getItem(m);if(e){let t=JSON.parse(e);if(Array.isArray(t.tabs)&&typeof t.activeIndex=="number")return t}}catch{}return{tabs:[],activeIndex:-1}}function l(e){try{sessionStorage.setItem(m,JSON.stringify(e))}catch{}}function h(e){return{maxTabs:parseInt(e.dataset.maxTabs||"8",10),mobileBreakpoint:parseInt(e.dataset.mobileBreakpoint||"800",10),showSpines:e.dataset.showSpines!=="false",animate:e.dataset.animate!=="false"}}function b(e,t){let r=h(e);if(window.innerWidth<r.mobileBreakpoint){e.style.display="none",document.body.classList.remove("has-binder-left","has-binder-right");return}if(e.style.display="",t.tabs.length<=1){e.innerHTML="",e.classList.remove("binder-active"),document.body.classList.remove("has-binder-left","has-binder-right");return}e.classList.add("binder-active");let n=t.tabs.slice(0,t.activeIndex+1),d=t.tabs.slice(t.activeIndex+1);if(e.innerHTML="",n.length>0){let i=document.createElement("div");i.className="binder-strip binder-strip-left";for(let a=0;a<n.length;a++){let s=n[a];i.appendChild(f(s,a,"left",t,r))}e.appendChild(i)}if(d.length>0){let i=document.createElement("div");i.className="binder-strip binder-strip-right";for(let a=0;a<d.length;a++){let s=t.activeIndex+1+a,o=d[a];i.appendChild(f(o,s,"right",t,r))}e.appendChild(i)}document.body.classList.toggle("has-binder-left",n.length>0),document.body.classList.toggle("has-binder-right",d.length>0)}function f(e,t,r,n,d){let i=document.createElement("div");if(i.className=`binder-tab binder-tab-${r}`,i.dataset.index=String(t),t===n.activeIndex&&i.classList.add("binder-tab-active"),d.showSpines){let s=document.createElement("div");s.className="binder-spine",i.appendChild(s)}let a=document.createElement("span");if(a.className="binder-label",a.textContent=e.title,i.appendChild(a),n.tabs.length>=2){let s=document.createElement("button");s.className="binder-close",s.textContent="\\xD7",s.setAttribute("aria-label",`Close ${e.title}`),s.addEventListener("click",o=>{o.stopPropagation(),I(t)}),i.appendChild(s)}return i.addEventListener("click",()=>{v(t)}),i}function v(e){let t=c();if(e<0||e>=t.tabs.length)return;let r=t.tabs[e];if(!r)return;t.activeIndex=e,l(t);let n=new URL(`/${r.slug}`,window.location.origin);window.spaNavigate?window.spaNavigate(n,!1):window.location.href=n.toString()}function I(e){let t=c();if(t.tabs.length<2)return;let r=e===t.activeIndex;t.tabs.splice(e,1),r?(t.activeIndex=Math.min(e,t.tabs.length-1),l(t),v(t.activeIndex)):(e<t.activeIndex&&t.activeIndex--,l(t),u())}var g=null;function S(){let e=document.getElementById("stacked-pages-container");if(!e)return;let t=p(),r=w();if(t===g){b(e,c());return}g=t;let n=c(),d=h(e),i=n.tabs.findIndex(a=>a.slug===t);if(i>=0)n.tabs[i].title=r,n.activeIndex=i;else{let a={slug:t,title:r},s=n.activeIndex+1;for(n.tabs.splice(s,0,a),n.activeIndex=s;n.tabs.length>d.maxTabs;)n.activeIndex>0?(n.tabs.shift(),n.activeIndex--):n.tabs.pop()}l(n),b(e,n)}function u(){let e=document.getElementById("stacked-pages-container");e&&b(e,c())}function x(){S();let e=()=>u();window.addEventListener("resize",e),window.addCleanup&&window.addCleanup(()=>window.removeEventListener("resize",e))}typeof document<"u"&&(document.addEventListener("nav",()=>{x()}),document.addEventListener("render",()=>{u()}));\n';
var StackedPages_default = ((opts) => {
  const {
    maxTabs = 8,
    mobileBreakpoint = 800,
    showSpines = true,
    animateTransitions = true
  } = opts ?? {};
  const Component = (_props) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        id: "stacked-pages-container",
        "data-max-tabs": maxTabs,
        "data-mobile-breakpoint": mobileBreakpoint,
        "data-show-spines": showSpines,
        "data-animate": animateTransitions
      }
    );
  };
  Component.css = stacked_default;
  Component.afterDOMLoaded = stacked_inline_default;
  return Component;
});

export { ExampleComponent_default as ExampleComponent, StackedPages_default as StackedPages };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map