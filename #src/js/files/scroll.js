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

const goTop = document.querySelector(".bt-top");
const screenHeight = document.documentElement.clientHeight / 2;

window.addEventListener("scroll", () => {
	// Используем toggle для лаконичности

	goTop.classList.toggle("_active", window.scrollY > screenHeight * 0.5);
});

goTop.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});



const animItems = document.querySelectorAll('._anim');
console.log(animItems);
if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let i = 0; i < animItems.length; i++) {
			const animItem = animItems[i];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageXOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active')
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active')
				}
			}
		}
	}

	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageXOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
	setTimeout(() => {
		animOnScroll();
	}, 300);

}