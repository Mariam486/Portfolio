---
name: WebGL background fallback
description: Environment-safe guidance for animated Three.js backgrounds in this static portfolio.
---

Animated WebGL backgrounds should probe for a usable WebGL context before creating a renderer and provide a CSS fallback that matches the active theme.

**Why:** The hosted preview environment may not expose WebGL. Attempting to construct a renderer there produces browser errors and leaves the background missing even though supported browsers can render it.

**How to apply:** Keep the effect optional, dynamically load the rendering dependency, switch to a theme-aware CSS gradient when WebGL is unavailable, and verify both the supported path and fallback path when changing the background.