<template>
    <div class="">
      <h3 class="name pt-12">Happy Birthday</h3>
      <canvas class="confetti" ref="canvasRef"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  
  //-----------Var Inits--------------
  const canvasRef = ref<HTMLCanvasElement | null>(null);
  let ctx: CanvasRenderingContext2D | null = null;
  let confetti: any[] = [];
  const confettiCount = 300;
  const gravity = 0.5;
  const terminalVelocity = 5;
  const drag = 0.075;
  let cx: number, cy: number;
  
  const colors = [
    { front: 'red', back: 'darkred' },
    { front: 'green', back: 'darkgreen' },
    { front: 'blue', back: 'darkblue' },
    { front: 'yellow', back: 'darkyellow' },
    { front: 'orange', back: 'darkorange' },
    { front: 'pink', back: 'darkpink' },
    { front: 'purple', back: 'darkpurple' },
    { front: 'turquoise', back: 'darkturquoise' }
  ];
  
  //-----------Functions--------------
  const resizeCanvas = () => {
    if (canvasRef.value && ctx) {
      canvasRef.value.width = window.innerWidth;
      canvasRef.value.height = window.innerHeight;
      cx = ctx.canvas.width / 2;
      cy = ctx.canvas.height / 2;
    }
  };
  
  const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;
  
  const initConfetti = () => {
    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        color: colors[Math.floor(randomRange(0, colors.length))],
        dimensions: {
          x: randomRange(10, 20),
          y: randomRange(10, 30)
        },
        position: {
          x: randomRange(0, canvasRef.value!.width),
          y: canvasRef.value!.height - 1
        },
        rotation: randomRange(0, 2 * Math.PI),
        scale: {
          x: 1,
          y: 1
        },
        velocity: {
          x: randomRange(-25, 25),
          y: randomRange(0, -50)
        }
      });
    }
  };
  
  const render = () => {
    if (!ctx || !canvasRef.value) return;
  
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  
    confetti.forEach((confetto, index) => {
      let width = confetto.dimensions.x * confetto.scale.x;
      let height = confetto.dimensions.y * confetto.scale.y;
  
      // Move canvas to position and rotate
      ctx!.translate(confetto.position.x, confetto.position.y);
      ctx!.rotate(confetto.rotation);
  
      // Apply forces to velocity
      confetto.velocity.x -= confetto.velocity.x * drag;
      confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
      confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
  
      // Set position
      confetto.position.x += confetto.velocity.x;
      confetto.position.y += confetto.velocity.y;
  
      // Delete confetti when out of frame
      if (confetto.position.y >= canvasRef.value.height) confetti.splice(index, 1);
  
      // Loop confetto x position
      if (confetto.position.x > canvasRef.value.width) confetto.position.x = 0;
      if (confetto.position.x < 0) confetto.position.x = canvasRef.value.width;
  
      // Spin confetto by scaling y
      confetto.scale.y = Math.cos(confetto.position.y * 0.1);
      ctx!.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;
  
      // Draw confetti
      ctx!.fillRect(-width / 2, -height / 2, width, height);
  
      // Reset transform matrix
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
    });
  
    // Fire off another round of confetti
    if (confetti.length <= 10) initConfetti();
  
    window.requestAnimationFrame(render);
  };
  
  //---------Execution--------
  onMounted(() => {
    if (canvasRef.value) {
      ctx = canvasRef.value.getContext('2d');
      resizeCanvas();
      initConfetti();
      render();
  
      //----------Resize----------
      window.addEventListener('resize', resizeCanvas);
  
      //------------Click------------
      window.addEventListener('click', initConfetti);
    }
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas);
    window.removeEventListener('click', initConfetti);
  });
  </script>
  
  <style scoped>
  .confetti {
    max-width: 100%;
    display: block;
    margin: 0 auto;
    user-select: none;
  }
  
  body {
    cursor: pointer;
  }
  
  .name {
    font-weight: 900;
    text-transform: uppercase;
    padding: 36px;
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    top: 37%;
    color: rebeccapurple;
    font-family: 'Righteous', cursive;
    font-size: 93px;
    letter-spacing: 10px;
    text-shadow: 2px 4px 11px rgb(0 0 0 / 28%);
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: white;
  }
  </style>
  