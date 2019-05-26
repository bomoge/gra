let btnSTART=document.getElementById("START");
function closeMenu() {
	let menu=document.getElementById("menu");
	menu.style.display='none'; 
}btnSTART.onclick=closeMenu;

let resButton=document.getElementById("reset");
function restart(){
	location.reload();	
}resButton.onclick=restart;

const szer = 700
const wys = 600
const wiersze = 3
const bloczki = 8
const przerwa = 3
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

const render = (ctx, arkanoid) => {
  const {
    platforma,
  } = arkanoid
  
  ctx.clearRect(0, 0, szer, wys)
  platforma.draw(ctx)

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