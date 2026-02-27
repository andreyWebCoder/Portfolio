const container = document.querySelector('.portfolio__content');

const allCards = Array.from(document.querySelectorAll('.portfolio__card'));
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

		card.classList.remove('animate');
		card.style.animationDelay = '';

		container.appendChild(card);

		setTimeout(() => {

			card.style.animationDelay = `${index * 0.05}s`;
			card.classList.add('animate');
		}, 10);
	});

	if (isClick) {
		const section = document.querySelector('.page__portfolio');
		if (section) {

			const headerHeight = document.querySelector('.header')?.offsetHeight || 0;

			const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;

			window.scrollTo({
				top: sectionTop - headerHeight - 20,
				behavior: 'smooth'
			});
		}
	}

	renderPagination(filteredByCategory.length);
}


function renderPagination(totalItems) {
	totalItems = Number(totalItems) || 0;

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
		createBtn('', 'pagination__bt prev-bt _ic-chevron-left', currentPage === 1, () => {
			currentPage--;
			updatePortfolio(true);
		})
	));

	for (let i = 1; i <= pageCount; i++) {
		const btn = createBtn(i, 'pagination__bt page-bt', false, () => {
			currentPage = i;
			updatePortfolio(true);
		});
		if (i === currentPage) btn.classList.add('active');
		ul.appendChild(createItem(btn));
	}

	ul.appendChild(createItem(
		createBtn('', 'pagination__bt next-bt _ic-chevron-right', currentPage === pageCount, () => {
			currentPage++;
			updatePortfolio(true);
		})
	));
}

document.querySelectorAll('.nav-portfolio__link').forEach(link => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		document.querySelector('.nav-portfolio__link.active')?.classList.remove('active');
		link.classList.add('active');

		currentFilter = link.dataset.filter;
		currentPage = 1;
		updatePortfolio(true);
	});
});

updatePortfolio();
