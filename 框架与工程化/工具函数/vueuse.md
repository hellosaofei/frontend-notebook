# 防抖函数 useDebounceFn

```ts
import { useDebounceFn } from "@vueuse/core";

// If no invokation after 5000ms due to repeated input,
// the function will be called anyway.
const debouncedFn = useDebounceFn(
  () => {
    // do something
  },
  1000,
  { maxWait: 5000 }
);

window.addEventListener("resize", debouncedFn);
```
