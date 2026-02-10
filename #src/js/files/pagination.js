const container = document.querySelector('.portfolio-page__content');
// Забираем карточки из DOM и сразу превращаем в массив объектов
const allCards = Array.from(document.querySelectorAll('.portfolio-page__card'));
const itemsPerPage = 6;
let currentPage = 1;
let currentFilter = '*';
if ('scrollRestoration' in history) {
	history.scrollRestoration = 'manual';
}
function createBtn(text, className, disabled, onClick) {
	const btn = document.createElement('button');
	btn.type = 'button';
	btn.textContent = text;
	btn.className = className;
	btn.disabled = disabled;

	btn.addEventListener('click', onClick);

	return btn;
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
			// 1. Получаем высоту шапки (замени .header на свой класс)
			const headerHeight = document.querySelector('.header')?.offsetHeight || 0;

			// 2. Считаем позицию секции относительно верха страницы
			const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;

			// 3. Вычитаем высоту шапки и добавляем небольшой запас (например, 20px)
			window.scrollTo({
				top: sectionTop - headerHeight - 20,
				behavior: 'smooth'
			});
		}
	}

	renderPagination(filteredByCategory.length);
}


function renderPagination(totalItems) {
	totalItems = Number(totalItems) || 0; // 🔥 ВАЖНО

	let navWrapper = document.querySelector('.pagination-nav');

	const pageCount = Math.ceil(totalItems / itemsPerPage);

	if (pageCount <= 1) {
		if (navWrapper) navWrapper.remove();
		return;
	}

	if (!navWrapper) {
		navWrapper = document.createElement('nav');
		navWrapper.className = 'pagination-nav';
		navWrapper.ariaLabel = 'Page navigation items with my works';
		container.after(navWrapper);
	}

	navWrapper.innerHTML = '';

	const ul = document.createElement('ul');
	ul.className = 'pagination';
	navWrapper.appendChild(ul);

	const createItem = (btn) => {
		const li = document.createElement('li');
		li.className = 'pagination__item';
		li.appendChild(btn);
		return li;
	};

	ul.appendChild(createItem(
		createBtn('<', 'pagination__btn prev-btn', currentPage === 1, () => {
			currentPage--;
			updatePortfolio(true);
		})
	));

	for (let i = 1; i <= pageCount; i++) {
		const btn = createBtn(i, 'pagination__page page-btn', false, () => {
			currentPage = i;
			updatePortfolio(true);
		});
		if (i === currentPage) btn.classList.add('active');
		ul.appendChild(createItem(btn));
	}

	ul.appendChild(createItem(
		createBtn('>', 'pagination__btn next-btn', currentPage === pageCount, () => {
			currentPage++;
			updatePortfolio(true);
		})
	));
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
