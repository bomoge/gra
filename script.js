let btnSTART=document.getElementById("START");

function closeMenu() {
	let menu=document.getElementById("menu");
	menu.style.display='none'; 
}
btnSTART.onclick=closeMenu;

let resButton=document.getElementById("reset");
	function restart(){
		location.reload();	
	}resButton.onclick=restart;