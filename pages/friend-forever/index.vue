<template>
    <div class="friend-forever-page">
      <!-- Header section with main title -->
      <header class="header">
        <h1 class="main-title">Friendship: A Bond That Lasts Forever</h1>
        <h2 class="sub-title">Celebrating the unbreakable bond we share</h2>
      </header>
  
      <!-- Section about friendship -->
      <section class="about-friendship">
        <p class="friendship-message">
          True friendship is a gift that keeps giving. It’s about being there for each other through the highs and the lows, 
          understanding without having to say a word, and celebrating each other's success as if it were your own.
          <br />
          Our friendship has grown stronger with every passing day, and I know it will last forever. Thank you for being the best friend anyone could ever ask for!
        </p>
      </section>
  
      <!-- Quotes about friendship -->
      <section class="friendship-quotes">
        <h3 class="quotes-heading">Friendship Quotes</h3>
        <ul class="quotes-list">
          <li>"Friendship is born at that moment when one person says to another: 'What! You too? I thought I was the only one.' – C.S. Lewis"</li>
          <li>"A friend is someone who knows all about you and still loves you." – Elbert Hubbard</li>
          <li>"Friendship is the only cement that will ever hold the world together." – Woodrow Wilson</li>
        </ul>
      </section>
  
      <!-- Section for memorable moments -->
      <section class="memories-section">
        <h3 class="memories-heading">Memories That Will Last Forever</h3>
        <ul class="memories-list">
          <li>🌟 The day we met and instantly became inseparable</li>
          <li>🎉 The countless road trips and adventures we've shared</li>
          <li>📸 Capturing moments of joy, laughter, and sometimes tears, but always with each other</li>
          <li>🏆 Supporting each other through every milestone and victory</li>
        </ul>
      </section>
  
      <!-- Confetti canvas for celebratory effect -->
      <canvas class="confetti" ref="canvasRef"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  
  // Confetti canvas setup (similar to the previous example)
  const canvasRef = ref<HTMLCanvasElement | null>(null);
  let ctx: CanvasRenderingContext2D | null = null;
  let confetti: any[] = [];
  const confettiCount = 200;
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
  
  // Confetti setup and rendering
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
  
  onMounted(() => {
    if (canvasRef.value) {
      ctx = canvasRef.value.getContext('2d');
      resizeCanvas();
      initConfetti();
      render();
  
      window.addEventListener('resize', resizeCanvas);
      window.addEventListener('click', initConfetti);
    }
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas);
    window.removeEventListener('click', initConfetti);
  });
  </script>
  
  <style scoped>
  .friend-forever-page {
    text-align: center;
    padding: 20px;
    position: relative;
  }
  
  .header {
    margin-bottom: 30px;
  }
  
  .main-title {
    font-size: 3rem;
    color: #ff6600;
  }
  
  .sub-title {
    font-size: 1.8rem;
    color: #333;
  }
  
  .about-friendship {
    background-color: #f4f4f4;
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    font-size: 1.2rem;
  }
  
  .friendship-message {
    color: #333;
  }
  
  .friendship-quotes {
    margin-top: 40px;
  }
  
  .quotes-list {
    list-style-type: none;
    padding: 0;
  }
  
  .quotes-list li {
    font-size: 1.1rem;
    margin: 10px 0;
  }
  
  .memories-section {
    margin-top: 40px;
  }
  
  .memories-list {
    list-style-type: none;
    padding: 0;
  }
  
  .memories-list li {
    font-size: 1.2rem;
    margin: 15px 0;
  }
  
  .confetti {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
  }
  </style>
  