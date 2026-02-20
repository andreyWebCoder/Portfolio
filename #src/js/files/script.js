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



// Change language
const select = document.getElementById('language-select');
const elements = document.querySelectorAll('[data-key]');

// 1. Функция перевода
function applyLanguage() {
	let lang = window.location.hash.replace('#', '').toLowerCase();

	// Проверка существования языка
	if (!translations[lang]) {
		lang = 'ru';
		window.location.hash = lang;
		return; // hashchange сработает снова и вызовет эту функцию
	}

	// Обновляем текст на странице
	document.querySelectorAll('[data-key]').forEach(el => {
		const key = el.getAttribute('data-key');
		if (translations[lang][key]) {
			el.textContent = translations[lang][key];
		}
	});

	// Синхронизируем реальный селект
	const realSelect = document.querySelector('#language-select');
	if (realSelect) {
		realSelect.value = lang;
		// ВАЖНО: перерисовываем кастомный селект, чтобы в заголовке был нужный текст
		select_item(realSelect);
	}
}

// 2. Слушаем изменения
window.addEventListener('hashchange', applyLanguage);

// Слушаем выбор в селекте (теперь сработает благодаря dispatchEvent)
document.querySelector('#language-select').addEventListener('change', function (e) {
	window.location.hash = e.target.value;
});

// 3. Запуск при загрузке
document.addEventListener('DOMContentLoaded', applyLanguage);

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