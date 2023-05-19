<script lang="ts">
    import type { Bird } from "./game";
    export let bird: Bird;
  </script>
  
  <style>
    .bird {
      position: absolute;
      background-color: green;
    }
  </style>

<img class="bird" style="transform: rotate({bird.rotate}deg); width: {bird.size}vh; height: {bird.size}vh; top: {bird.top}vh; left: {bird.left}vw" src="/images/Navbar/flappyBird.webp" alt="" >
