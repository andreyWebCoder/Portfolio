const getId = (link) => link.getAttribute('href').replace('#', '');
const headerHeight = document.querySelector('.header').offsetHeight;
const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			document.querySelectorAll('.menu__link').forEach((link) => {
				link.classList.toggle('_active', getId(link) === entry.target.id);
			});
		}
	});
}, {
	threshold: 0.5
});

document.querySelectorAll('section').forEach(section => { observer.observe(section) });

document.querySelector('.menu__list').addEventListener('click', (e) => {
	if (e.target.classList.contains('menu__link')) {
		e.preventDefault();
		window.scrollTo({
			top: document.getElementById(getId(e.target)).offsetTop - headerHeight,
			behavior: "smooth",
		});
	}
});

const goTop = document.querySelector(".page__arrow");
const screenHeight = document.documentElement.clientHeight;

window.addEventListener("scroll", () => {
	// Используем toggle для лаконичности
	goTop.classList.toggle("_active", window.scrollY > screenHeight);
});

goTop.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});