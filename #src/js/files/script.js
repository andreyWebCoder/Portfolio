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
// // Pagination
// // 1. Сохраняем все карточки в массив и УДАЛЯЕМ их из DOM сразу
// const cardContainer = document.querySelector('.portfolio-page__content'); // контейнер для карточек
// const allCards = Array.from(document.querySelectorAll('.portfolio-page__row'));
// const limit = 10;
// const nav = document.getElementById('pagination');

// let currentPage = 1;
// const totalPages = Math.ceil(allCards.length / limit);

// function render() {
// 	// Очищаем контейнер полностью (убираем элементы из DOM)
// 	cardContainer.innerHTML = '';

// 	// Вырезаем нужную часть массива
// 	const start = (currentPage - 1) * limit;
// 	const end = start + limit;
// 	const cardsToDisplay = allCards.slice(start, end);

// 	// Добавляем в DOM только эти 10 (или меньше) карточек
// 	cardsToDisplay.forEach(card => cardContainer.appendChild(card));

// 	// Обновляем состояние кнопок
// 	document.getElementById('prevBtn').disabled = (currentPage === 1);
// 	document.getElementById('nextBtn').disabled = (currentPage === totalPages);
// }

// // Создание навигации (только если карточек > 10)
// if (allCards.length > limit) {
// 	const prevBtn = document.createElement('button');
// 	prevBtn.id = 'prevBtn';
// 	prevBtn.textContent = 'Назад';
// 	prevBtn.onclick = () => { if (currentPage > 1) { currentPage--; render(); } };
// 	nav.appendChild(prevBtn);

// 	for (let i = 1; i <= totalPages; i++) {
// 		const btn = document.createElement('button');
// 		btn.textContent = i;
// 		btn.onclick = () => { currentPage = i; render(); };
// 		nav.appendChild(btn);
// 	}

// 	const nextBtn = document.createElement('button');
// 	nextBtn.id = 'nextBtn';
// 	nextBtn.textContent = 'Вперед';
// 	nextBtn.onclick = () => { if (currentPage < totalPages) { currentPage++; render(); } };
// 	nav.appendChild(nextBtn);

// 	render(); // Первый запуск
// }
