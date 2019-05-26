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

}
Platforma.szer = 150
Platforma.wys = 10
Platforma.color = '#002df7'
Platforma.predk = 30