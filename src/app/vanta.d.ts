// vanta.d.ts
declare module "vanta/dist/vanta.birds.min" {
  import * as THREE from "three";
  
  interface VantaBirdsSettings {
    el: HTMLElement | null;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number;
    color1?: number;
    color2?: number;
    birdSize?: number;
    wingSpan?: number;
    speedLimit?: number;
    separation?: number;
    alignment?: number;
    cohesion?: number;
    quantity?: number;
  }

  interface VantaEffect {
    destroy: () => void;
  }

  export default function BIRDS(settings: VantaBirdsSettings): VantaEffect;
}
