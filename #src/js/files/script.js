// ===========================Прогресс бар при сколле======================
const progress = document.querySelector('.progress');
window.addEventListener('scroll', progressBar);
function progressBar(e) {
	let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
	let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	let persent = windowScroll / windowHeight * 100;
	progress.style.width = persent + '%';
	progress.classList.add('_scroll');
}
// ===========================Прогресс бар при сколле======================

let scene = document.getElementById("scene");
let parallaxInstance = new Parallax(scene, {
	hoverOnly: true,
});





// Theme dark/light
let togButton = document.querySelector("#toggle-bg");
togButton.addEventListener("click", (event) => {
	event.preventDefault();
	if (localStorage.getItem("theme") === "night-theme") {
		localStorage.removeItem("theme");
	} else {
		localStorage.setItem("theme", "night-theme");
	}
	addDarkClass();
});
addDarkClass();

//=================
//Menu
// let btnMenu = document.querySelector(".bt-menu");
// if (btnMenu != null) {
// 	let delay = 500;
// 	let menuBody = document.querySelector(".menu");
// 	let menuLinks = document.querySelectorAll(".menu__link");
// 	if (menuLinks.length > 0) {
// 		menuLinks.forEach(menuLink => {
// 			menuLink.addEventListener("click", menuClose);
// 		});
// 		function menuClose(e) {
// 			if (btnMenu.classList.contains("_active")) {
// 				body_lock(delay);
// 				btnMenu.classList.remove("_active");
// 				menuBody.classList.remove("_active");
// 			}
// 		}
// 	}
// 	btnMenu.addEventListener("click", function (e) {
// 		if (unlock) {
// 			body_lock(delay);
// 			btnMenu.classList.toggle("_active");
// 			menuBody.classList.toggle("_active");
// 		}
// 	});
// };

// function menu_close() {
// 	let btnMenu = document.querySelector(".bt-menu");
// 	let menuBody = document.querySelector(".menu");
// 	btnMenu.classList.remove("_active");
// 	menuBody.classList.remove("_active");
// }