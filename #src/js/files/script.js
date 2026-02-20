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

