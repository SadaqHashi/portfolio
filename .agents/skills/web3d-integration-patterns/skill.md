---
name: web3d-integration-patterns
description: Meta-skill for combining Three.js, React Three Fiber, and CSS animations for 3D web experiences. Use when building apps that integrate 3D rendering with scroll animations, interactive elements, and layered backgrounds.
---

# Web 3D Integration Patterns

## When to Use
- Building 3D applications combining multiple libraries
- Creating scroll-driven 3D experiences
- Physics-based interactions with 3D scenes
- Layered backgrounds with texture and depth
- Interactive 3D portfolio/landing pages

## Architecture: Layered Separation

```
├── 3D Layer (R3F / Three.js)
│   ├── Scene with floating shapes
│   ├── Camera (static or scroll-driven)
│   └── Render loop (on-demand for perf)
├── Background Layer (CSS)
│   ├── Base gradient
│   ├── Noise/grain texture
│   ├── Aurora gradient blobs
│   └── Grid overlay
└── UI Layer (React + CSS animations)
    ├── Scroll reveal animations
    ├── 3D tilt cards (CSS perspective)
    └── State-driven interactions
```

## Key Patterns

### R3F Background Scene
```tsx
<Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 1.5]}
  style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
  <FloatingShape position={[-4, 2, -2]} color="#8b5cf6" />
</Canvas>
```

### CSS Layered Background
```css
body {
  background:
    radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.08), transparent 50%),
    linear-gradient(180deg, #08051a, #0a0a1e, #06111a);
}
/* Noise texture via SVG data URI at 2-3% opacity */
/* Animated gradient blobs with filter: blur(100px+) */
```

### 3D Tilt Card (CSS only)
```tsx
onMouseMove={(e) => {
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  el.style.transform = `perspective(600px) rotateY(${x*12}deg) rotateX(${-y*12}deg) scale3d(1.02,1.02,1.02)`
}}
```

## Performance Rules
1. Use `dpr={[1, 1.5]}` to cap pixel ratio
2. Use wireframe materials for background shapes (cheapest to render)
3. Disable tilt on mobile (`transform: none !important` at 768px)
4. Use `will-change: transform` sparingly
5. Respect `prefers-reduced-motion`

## Decision Matrix
| Use Case | Stack |
|---|---|
| Portfolio with subtle 3D background | R3F (wireframe shapes) + CSS layers |
| Scroll-driven 3D animation | Three.js + GSAP ScrollTrigger |
| Interactive 3D product viewer | R3F + Drei helpers |
| Physics-based drag interactions | R3F + React Spring |

## Common Pitfalls
- Don't animate same property with both CSS and JS
- Always cleanup GSAP tweens in useEffect return
- Use refs for Three.js objects, not React state (avoids re-renders)
- `pointerEvents: 'none'` on background canvas to not block scroll
