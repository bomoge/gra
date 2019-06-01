let btnSTART=document.getElementById("START");
function closeMenu() {
	let menu=document.getElementById("menu");
	menu.style.display='none'; 
}btnSTART.onclick=closeMenu;

let resButton=document.getElementById("reset");
function restart(){
	location.reload();	
}resButton.onclick=restart;

function random(min,max) {
	var num = Math.floor(Math.random()*(max-min)) + min;	
	return num;
}

const szer = 700
const wys = 600
const wiersze = 5
const bloczki = 9
const przerwa = 2
const requestAnimationFrame = window.requestAnimationFrame

class Platforma {
  constructor() {
    this.x = (szer - Platforma.szer) / 2
    this.y = wys - Platforma.wys
  }

  draw(ctx) {
    ctx.fillStyle = Platforma.color
    ctx.fillRect(
      this.x,
      this.y,
      Platforma.szer,
      Platforma.wys,
    )
  }

  ruszPlatforma(e) {
    const modifier = 1
    switch(e.keyCode) {
      case 37: {
        if (this.x > 0) {
          this.x -= Platforma.predk * modifier
        }
        break
      }
      case 39: {
        if (this.x < szer - Platforma.szer) {
          this.x += Platforma.predk * modifier
        }
        break
      }
    }
  }
}
Platforma.szer = 150
Platforma.wys = 10
Platforma.color = '#002df7'
Platforma.predk = 30

class Blok {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.isAlive = true
  }

  draw(ctx) {
    if (!this.isAlive) return
    ctx.fillStyle = Blok.color
    ctx.fillRect(
      this.x,
      this.y,
      Blok.width,
      Blok.height,
    )
    ctx.strokeStyle = '#ffffff'
    ctx.strokeRect(
      this.x,
      this.y,
      Blok.width,
      Blok.height,
    )
  }
}
Blok.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
Blok.width = szer / bloczki - 2 * przerwa
Blok.height = 33

const tworzBloki = () => {
  const bloki = []
  for (let i = 0; i < wiersze; i++) {
    bloki[i] = []
    for (let j = 0; j < bloczki; j++) {
      const x = (2 * j + 1) * przerwa + j * Blok.width
      const y = (2 * i + 1) * przerwa + i * Blok.height
      bloki[i][j] = new Blok(x, y)
    }
  }
  return bloki
}


const rysujBloki = (bloki, ctx) => {
  for (let i = 0; i < wiersze; i++) {
    for (let j = 0; j < bloczki; j++) {
      bloki[i][j].draw(ctx)
    }
  }
}


const render = (ctx, arkanoid) => {
  const {
    platforma,
	bloki,
  } = arkanoid
  
  ctx.clearRect(0, 0, szer, wys)
  platforma.draw(ctx)
  rysujBloki(bloki, ctx)

  core(arkanoid)

  if (arkanoid.status === 'play') {
    requestAnimationFrame(() => render(ctx, arkanoid))
  }
}


window.onload = () => {
  const canvas = document.getElementById('game')
  const ctx = canvas.getContext('2d')

  const arkanoid = {
    platforma: new Platforma(),
	bloki: tworzBloki(),
    status: 'play',
    finish: () => {
      ctx.font = '50px Arial'
      ctx.fillStyle = 'red'
      ctx.textAlign = 'center'
      ctx.fillText('GAME OVER', szer / 2, wys / 2)
    },
  }

  addEventListener('keydown', arkanoid.platforma.ruszPlatforma.bind(arkanoid.platforma))
  render(ctx, arkanoid)
}