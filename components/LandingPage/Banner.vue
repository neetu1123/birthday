<template>
    <div>
         <!-- Canvas for Fireworks -->
      <canvas id="birthday"></canvas>
  
  <!-- Happy Birthday Heading -->
  <h1 class="heading">Happy Birthday!</h1>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const PI2 = Math.PI * 2

const random = (min: number, max: number) => Math.random() * (max - min + 1) + min | 0
const timestamp = () => new Date().getTime()

class Birthday {
  fireworks: Firework[]
  counter: number
  width: number
  height: number
  spawnA: number
  spawnB: number
  spawnC: number
  spawnD: number

  constructor() {
    this.resize()
    this.fireworks = []
    this.counter = 0
  }

  resize() {
    const canvas = document.getElementById('birthday') as HTMLCanvasElement
    this.width = canvas.width = window.innerWidth
    const center = this.width / 2 | 0
    this.spawnA = center - center / 4 | 0
    this.spawnB = center + center / 4 | 0

    this.height = canvas.height = window.innerHeight
    this.spawnC = this.height * 0.1
    this.spawnD = this.height * 0.5
  }

  onClick(evt: MouseEvent | TouchEvent) {
    const x = (evt instanceof MouseEvent ? evt.clientX : evt.touches[0].pageX) || 0
    const y = (evt instanceof MouseEvent ? evt.clientY : evt.touches[0].pageY) || 0

    const count = random(3, 5)
    for (let i = 0; i < count; i++) {
      this.fireworks.push(
        new Firework(
          random(this.spawnA, this.spawnB),
          this.height,
          x,
          y,
          random(0, 260),
          random(30, 110)
        )
      )
    }

    this.counter = -1
  }

  update(delta: number) {
    const canvas = document.getElementById('birthday') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')!
    ctx.globalCompositeOperation = 'hard-light'
    ctx.fillStyle = `rgba(20,20,20,${7 * delta})`
    ctx.fillRect(0, 0, this.width, this.height)

    ctx.globalCompositeOperation = 'lighter'
    for (let firework of this.fireworks) firework.update(delta)

    this.counter += delta * 3 // create new firework every second
    if (this.counter >= 1) {
      this.fireworks.push(
        new Firework(
          random(this.spawnA, this.spawnB),
          this.height,
          random(0, this.width),
          random(this.spawnC, this.spawnD),
          random(0, 360),
          random(30, 110)
        )
      )
      this.counter = 0
    }

    // Remove dead fireworks
    if (this.fireworks.length > 1000) this.fireworks = this.fireworks.filter(firework => !firework.dead)
  }
}

class Firework {
  dead: boolean
  offsprings: number
  x: number
  y: number
  targetX: number
  targetY: number
  shade: number
  history: { x: number, y: number }[]
  madeChilds: boolean | undefined

  constructor(x: number, y: number, targetX: number, targetY: number, shade: number, offsprings: number) {
    this.dead = false
    this.offsprings = offsprings
    this.x = x
    this.y = y
    this.targetX = targetX
    this.targetY = targetY
    this.shade = shade
    this.history = []
    this.madeChilds = undefined
  }

  update(delta: number) {
    const canvas = document.getElementById('birthday') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')!

    if (this.dead) return

    const xDiff = this.targetX - this.x
    const yDiff = this.targetY - this.y

    if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
      this.x += xDiff * 2 * delta
      this.y += yDiff * 2 * delta

      this.history.push({ x: this.x, y: this.y })
      if (this.history.length > 20) this.history.shift()
    } else {
      if (this.offsprings && !this.madeChilds) {
        const babies = this.offsprings / 2
        for (let i = 0; i < babies; i++) {
          const targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0
          const targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0

          birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0))
        }
      }
      this.madeChilds = true
      this.history.shift()
    }

    if (this.history.length === 0) this.dead = true
    else if (this.offsprings) {
      for (let i = 0; i < this.history.length; i++) {
        const point = this.history[i]
        ctx.beginPath()
        ctx.fillStyle = `hsl(${this.shade},100%,${i}%)`
        ctx.arc(point.x, point.y, 1, 0, PI2, false)
        ctx.fill()
      }
    } else {
      ctx.beginPath()
      ctx.fillStyle = `hsl(${this.shade},100%,50%)`
      ctx.arc(this.x, this.y, 1, 0, PI2, false)
      ctx.fill()
    }
  }
}

let birthday: Birthday

onMounted(() => {
  const canvas = document.getElementById('birthday') as HTMLCanvasElement
  let then = timestamp()
  birthday = new Birthday()

  const loop = () => {
    requestAnimationFrame(loop)
    const now = timestamp()
    const delta = (now - then) / 1000
    then = now
    birthday.update(delta)
  }

  window.onresize = () => birthday.resize()
  document.onclick = (evt: MouseEvent) => birthday.onClick(evt)
  document.ontouchstart = (evt: TouchEvent) => birthday.onClick(evt)
  loop()
})

onUnmounted(() => {
  window.onresize = null
  document.onclick = null
  document.ontouchstart = null
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: black;
}

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px;
  z-index: 10;
  display: flex;
  justify-content: center;
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-family: 'Arial', sans-serif;
}

.heading {
  position: fixed;
  top: 50px;
  width: 100%;
  text-align: center;
  color: white;
  font-family: 'Arial', sans-serif;
  font-size: 50px;
  z-index: 10;
}
</style>
