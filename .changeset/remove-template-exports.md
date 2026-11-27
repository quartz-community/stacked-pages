---
"@quartz-community/stacked-pages": patch
---

Removes leftovers from the plugin template that were exported but never used by Quartz: `ExampleTransformer`, `ExampleFilter`, `ExampleEmitter`, `ExampleComponent` and their option types. The package is smaller and no longer ships an example script that logged to the console.
