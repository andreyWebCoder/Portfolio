let scene = document.getElementById("scene");
let parallaxInstance = new Parallax(scene, {
	hoverOnly: true,
});

let goTop = document.querySelector(".page__arrow");
window.addEventListener("scroll", trackScroll);
goTop.addEventListener("click", backToTop);
function trackScroll() {
	let scroll = window.pageYOffset;
	let coord = document.documentElement.clientHeight;

	if (scroll > coord) {
		goTop.classList.add("_active");
	}
	if (scroll < coord) {
		goTop.classList.remove("_active");
	}
}
function backToTop() {
	if (window.pageYOffset > 0) {
		window.scrollBy(0, -80);
		setTimeout(backToTop, 0);
	}
}

// Change language
const select = document.querySelector(".header__select");
const allLang = ["en", "ru", "ua"];

select.addEventListener("change", changeURLLanguage);

function changeURLLanguage() {
	let lang = select.value;
	location.href = window.location.pathname + "#" + lang;
	location.reload();
}
function changeLanguage() {
	let hash = window.location.hash;
	hash = hash.substr(1);
	console.log(hash);
	if (!allLang.includes(hash)) {
		location.href = window.location.pathname + "#en";
		location.reload();
	}
	select.value = hash;
	document.querySelector("title").innerHTML = langArr["unit"][hash];
	// document.querySelector('.lng-chip').innerHTML = langArr['chip'][hash];
	for (let key in langArr) {
		let elem = document.querySelector(".lng-" + key);
		if (elem) {
			elem.innerHTML = langArr[key][hash];
		}
	}
}

changeLanguage();
