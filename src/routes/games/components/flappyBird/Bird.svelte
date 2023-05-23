<script lang="ts">
    import type { Bird } from "./game";
    export let bird: Bird;
  </script>
  
  <style>
    .bird {
      position: absolute;
    }
  </style>

<img class="bird" style="transform: rotate({bird.rotate}deg); width: {bird.size}vw; height: {bird.size}vh; top: {bird.top}vh; left: {bird.left}vw" src="/images/Navbar/FlappyBirdAnimated.gif" alt="" >
