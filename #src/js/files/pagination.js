const container = document.querySelector('.portfolio-page__content');
// Забираем карточки из DOM и сразу превращаем в массив объектов
const allCards = Array.from(document.querySelectorAll('.portfolio-page__card'));
const itemsPerPage = 6;
let currentPage = 1;
let currentFilter = '*';
if ('scrollRestoration' in history) {
	history.scrollRestoration = 'manual';
}
function updatePortfolio(isClick = false) {
	const filteredByCategory = allCards.filter(card => {
		return currentFilter === '*' || card.matches(currentFilter);
	});

	const start = (currentPage - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	const cardsToShow = filteredByCategory.slice(start, end);

	container.innerHTML = '';

	cardsToShow.forEach((card, index) => {
		// Сбрасываем старые анимации перед вставкой
		card.classList.remove('animate');
		card.style.animationDelay = '';

		container.appendChild(card);

		// Запускаем новую анимацию
		setTimeout(() => {
			// Эффект появления по очереди (лесенкой)
			card.style.animationDelay = `${index * 0.05}s`; // 0.05s — более быстрый и динамичный темп
			card.classList.add('animate');
		}, 10);
	});

	if (isClick) {
		const section = document.querySelector('.page__portfolio');
		if (section) {
			section.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	renderPagination(filteredByCategory.length);
}

// Функция отрисовки кнопок
function renderPagination(totalItems) {
	const nav = document.getElementById('pagination');
	if (!nav) return;
	nav.innerHTML = '';

	const pageCount = Math.ceil(totalItems / itemsPerPage);
	if (pageCount <= 1) return;

	// --- Кнопка НАЗАД ---
	const prevBtn = document.createElement('button');
	prevBtn.textContent = 'Назад';
	prevBtn.className = 'prev-btn';
	prevBtn.disabled = currentPage === 1; // Блокируем на первой странице
	prevBtn.onclick = () => {
		if (currentPage > 1) {
			currentPage--;
			updatePortfolio(true);
		}
	};
	nav.appendChild(prevBtn);

	// --- Цифры (ваш текущий цикл) ---
	for (let i = 1; i <= pageCount; i++) {
		const btn = document.createElement('button');
		btn.textContent = i;
		if (i === currentPage) btn.className = 'active';
		btn.onclick = () => {
			currentPage = i;
			updatePortfolio(true);
		};
		nav.appendChild(btn);
	}

	// --- Кнопка ВПЕРЕД ---
	const nextBtn = document.createElement('button');
	nextBtn.textContent = 'Вперед';
	nextBtn.className = 'next-btn';
	nextBtn.disabled = currentPage === pageCount; // Блокируем на последней странице
	nextBtn.onclick = () => {
		if (currentPage < pageCount) {
			currentPage++;
			updatePortfolio(true);
		}
	};
	nav.appendChild(nextBtn);
}


// Обработка клика по фильтрам категорий
document.querySelectorAll('.nav-portfolio__link').forEach(link => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		document.querySelector('.nav-portfolio__link.active')?.classList.remove('active');
		link.classList.add('active');

		currentFilter = link.dataset.filter;
		currentPage = 1; // Сброс на первую страницу
		updatePortfolio(true);
	});
});

// Первый запуск
updatePortfolio();
