let btnSTART=document.getElementById("START");
function closeMenu() {
	let menu=document.getElementById("menu");
	menu.style.display='none'; 
}
btnSTART.addEventListener('click', closeMenu);

let resButton=document.getElementById("reset");
function restart(){
	location.reload();	
}resButton.onclick=restart;

function random(min,max) {
	var num = Math.floor(Math.random()*(max-min)) + min;	
	return num;
}
const szer = 550
const wys = 450
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
      Blok.szer,
      Blok.wys,
    )
    ctx.strokeStyle = '#ffffff'
    ctx.strokeRect(
      this.x,
      this.y,
      Blok.szer,
      Blok.wys,
    )
  }
}

Blok.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
Blok.szer = szer / bloczki - 2 * przerwa
Blok.wys = 33


const tworzBloki = () => {
  const bloki = []
  for (let i = 0; i < wiersze; i++) {
    bloki[i] = []
    for (let j = 0; j < bloczki; j++) {
      const x = (2 * j + 1) * przerwa + j * Blok.szer
      const y = (2 * i + 1) * przerwa + i * Blok.wys
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

class Pilka {
  constructor() {
    this.x = szer / 2
    this.y = wys - Pilka.radius - Platforma.wys
    this.angle = -(Math.random() * (Math.PI / 2) + Math.PI / 4)
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(
      this.x,
      this.y,
      Pilka.radius, 0, 2 * Math.PI,
      false
    )
    ctx.fillStyle = Pilka.color
    ctx.fill()
  }
}

Pilka.color = '#ffff00'
Pilka.radius = 10
Pilka.predk = 2.5


const core = (arkanoid) => {
  const {
    platforma,
    bloki,
	pilka,	
  } = arkanoid

  if (pilka.y <= Pilka.radius) {
    Pilka.predk = -Pilka.predk
    return
  }

  if (pilka.y >= wys - Platforma.wys - Pilka.radius) {
    if (
      (pilka.x + (Pilka.radius * 2) >= platforma.x) &&
      (pilka.x - (Pilka.radius * 2) <= platforma.x + Platforma.szer)
    ) {
      const przesun = (platforma.x + (Platforma.szer / 2) - pilka.x) / (Platforma.szer / 2)
      const wspPrzesun = (przesun / 2) + 0.5
      pilka.angle = -(wspPrzesun * (Math.PI / 2) + Math.PI / 4)
      return
    } else if (pilka.y >= szer - Pilka.radius) {
      arkanoid.status = 'finish'
      arkanoid.finish()
      return
    }
  }

  if (
    (pilka.x <= Pilka.radius) ||
    (pilka.x >= szer - Pilka.radius)
  ) {
    pilka.angle = Math.PI - pilka.angle
    return
  }

  for (let bloczkiRzad of bloki) {
    for (let bloczek of bloczkiRzad) {
      if (!bloczek.isAlive) continue
      if (
        pilka.x - Pilka.radius <= bloczek.x + Blok.szer &&
        pilka.x + Pilka.radius >= bloczek.x &&
        pilka.y - Pilka.radius <= bloczek.y + Blok.wys &&
        pilka.y + Pilka.radius >= bloczek.y
      ) {
        bloczek.isAlive = false
        pilka.angle *= -1
        return
      }
    }
  }
}

const render = (ctx, arkanoid) => {
  const {
    platforma,
    bloki,
	pilka,	
  } = arkanoid

  pilka.y += (Pilka.predk * Math.sin(pilka.angle))
  pilka.x += (Pilka.predk * Math.cos(pilka.angle))

  ctx.clearRect(0, 0, szer, wys)
  rysujBloki(bloki, ctx)
  platforma.draw(ctx)
  pilka.draw(ctx)

  core(arkanoid)

  if (arkanoid.status === 'play') {
    requestAnimationFrame(() => render(ctx, arkanoid))
  }
}

btnSTART.onclick = () => {
  const canvas = document.getElementById('game')
  const ctx = canvas.getContext('2d')

  const arkanoid = {
    platforma: new Platforma(),
	bloki: tworzBloki(),
	pilka: new Pilka(),
    status: 'play',
    finish: () => {
      ctx.font = 'bold 40px Arial'
      ctx.fillStyle = 'red'
      ctx.textAlign = 'center'
      ctx.fillText('G A M E    O V E R !', szer / 2, wys / 2)
    },
  }

  addEventListener('keydown', arkanoid.platforma.ruszPlatforma.bind(arkanoid.platforma))
  render(ctx, arkanoid)
}