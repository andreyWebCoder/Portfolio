
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
}

function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});

function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

window.addEventListener("load", function () {
	if (document.querySelector('.wrapper')) {
		setTimeout(function () {
			document.querySelector('.wrapper').classList.add('_loaded');
		}, 0);
	}
});

let unlock = true;

//=================
//ActionsOnHash
if (location.hash) {
	const hsh = location.hash.replace('#', '');
	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
}
//=================
//Menu
let iconMenu = document.querySelector(".bt-menu");
let menu = document.querySelector(".menu");
if (iconMenu != null) {
	let delay = 500;
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menu.classList.toggle("_active");
		}
	});
};


// =================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}

//=================
//Tabs
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
	let tab = tabs[index];
	let tabs_items = tab.querySelectorAll("._tabs-item");
	let tabs_blocks = tab.querySelectorAll("._tabs-block");
	for (let index = 0; index < tabs_items.length; index++) {
		let tabs_item = tabs_items[index];
		tabs_item.addEventListener("click", function (e) {
			for (let index = 0; index < tabs_items.length; index++) {
				let tabs_item = tabs_items[index];
				tabs_item.classList.remove('_active');
				tabs_blocks[index].classList.remove('_active');
			}
			tabs_item.classList.add('_active');
			tabs_blocks[index].classList.add('_active');
			e.preventDefault();
		});
	}
}
//=================
//DigiFormat
function digi(str) {
	var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
	return r;
}
//=================
//DiGiAnimate
function digi_animate(digi_animate) {
	if (digi_animate.length > 0) {
		for (let index = 0; index < digi_animate.length; index++) {
			const el = digi_animate[index];
			const el_to = parseInt(el.innerHTML.replace(' ', ''));
			if (!el.classList.contains('_done')) {
				digi_animate_value(el, 0, el_to, 1500);
			}
		}
	}
}
function digi_animate_value(el, start, end, duration) {
	var obj = el;
	var range = end - start;
	// no timer shorter than 50ms (not really visible any way)
	var minTimer = 50;
	// calc step time to show all interediate values
	var stepTime = Math.abs(Math.floor(duration / range));

	// never go below minTimer
	stepTime = Math.max(stepTime, minTimer);

	// get current time and calculate desired end time
	var startTime = new Date().getTime();
	var endTime = startTime + duration;
	var timer;

	function run() {
		var now = new Date().getTime();
		var remaining = Math.max((endTime - now) / duration, 0);
		var value = Math.round(end - (remaining * range));
		obj.innerHTML = digi(value);
		if (value == end) {
			clearInterval(timer);
		}
	}

	timer = setInterval(run, stepTime);
	run();

	el.classList.add('_done');
}
//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================
//Wrap
function _wrap(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
}
//========================================
//RemoveClasses
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
//========================================
//IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}
const translations = {
	titleHead: { ru: "Портфолио", en: "Portfolio", ua: "Портфоліо" },
	// titles
	titleHero: { ru: "Привет, я <br/> Шупик Андрей", en: "Hi, I am <br/> Shupyk Andrii", ua: "Привіт, я <br/> Шупик Андрій" },
	titleWork: { ru: "Мои проекты", en: "My projects", ua: "Мої проекти" },
	titleAbout: { ru: "Обо мне", en: "About me", ua: "Про мене" },
	titleContacts: { ru: "Контакты", en: "Contacts ", ua: "Контакти" },
	titleForm: { ru: "Написать письмо", en: "Send mail", ua: "Написати листа" },

	// text, labels
	labelHero: { ru: "UI-розработчик (HTML, CSS, JavaScript, верстка)", en: "UI Developer (HTML, CSS, JavaScript)", ua: "UI-розробник (HTML, CSS, JavaScript, верстка)" },
	textAbout: { ru: "Здравствуйте меня зовут Андрей, я UI-розработчик / верстальщик сайтов. Приветствую Вас на моем сайте.", en: "Hello, my name is Andrey, I am a UI developer (HTML, CSS, JavaScript). Welcome to my site.", ua: "Здравствуйте мене звати Андрій я UI-розробник / верстальник сайтів. Вітаю вас на моєму сайті" },
	labelContacts: {
		ru: "Свяжитесь со мной или подпишитесь на мои страницы в социальных сетях.", en: "Contact me or follow me on social media.", ua: "Зв'яжіться зі мною або підпишіться на мої сторінки в соціальних мережах."
	},

	// card title portfolio
	aveCardTitleHome: { ru: "Главная", en: "Homepage", ua: "Головна" },
	aveCardTitleBrand: { ru: "Бренд", en: "Brand", ua: "Бренд" },
	aveCardTitleProduct: { ru: "Просмотр товара", en: "View product", ua: "Перегляд товару" },
	aveCardTitleLookbook: { ru: "Обзоры товаров", en: "Product reviews", ua: "Огляди товарів" },
	aveCardTitleLokal: { ru: "Местные магазины", en: "Local stores", ua: "Місцеві магазини" },
	aveCardTitleForm: { ru: "Форма регистрации", en: "Registration form", ua: "Форма реєстрації" },
	// --------
	uzbCardTitleHome: { ru: "Главная", en: "Homepage", ua: "Головна" },
	uzbCardTitleMuvi: { ru: "Фильм", en: "Muvi", ua: "Кіно" },
	uzbCardTitleReg: { ru: "Регистрация", en: "Registration", ua: "Регістрація" },
	// card about text
	aboutHtml: {
		ru: "Html код валидный, структурированный . Применяю: блочную верстку, семантику, методологию BEM. Использую шаблонизатор для Html Nunjucks.", en: "Valid, structured HTML code. I apply block layout, semantics, and BEM methodology. I use Nunjucks as an HTML templating engine.", ua: "HTML - код валідний, структурований.Застосовую: блочну верстку, семантику, методологію BEM.Використовую шаблонізатор для HTML Nunjucks."
	},
	aboutCss: { ru: "Применяю: валидные кроссбраузерные свойства CSS3, flexbox, grid layout, анимации, responsive верстка. Так же работаю на препроцесоре SCSS.", en: "I apply valid cross-browser CSS3 properties, flexbox, grid layout, animations, and responsive design. I also work with the SCSS preprocessor.", ua: "Застосовую: валідні кросбраузерні властивості CSS3, flexbox, grid layout, анімації, responsive верстку. Також працюю на препроцесорі SCSS." },
	aboutJs: { ru: "Применяю: различные плагины javascript, а так же написание чистого кода. Использую библиотеку jquery, а также различные плагины на ее базе. Добавление анимаций c помощью js.", en: "pply various JavaScript plugins and write clean code. I use the jQuery library as well as various plugins based on it. Adding animations using JS.", ua: "Застосовую: різноманітні плагіни JavaScript, а також написання чистого коду. Використовую бібліотеку jQuery та різні плагіни на її базі. Додавання анімацій за допомогою JS." },
	aboutUi: { ru: "Работаю c макетами figma. А также: Adobe Photoshop с расширением psd. Работаю с различными другими графическими редакторами.", en: " I work with Figma layouts, as well as Adobe Photoshop (psd files). I am experienced with various other graphic editors.", ua: "Працюю з макетами Figma. А також: Adobe Photoshop з розширенням psd. Працюю з різними іншими графічними редакторами." },
	aboutAther: { ru: "Работаю в редакторе кода VS Code. Работаю с Git, GitHub Сборщик проектов использую gulp", en: "I work in the VS Code editor. I use Git and GitHub. For project bundling, I use Gulp.", ua: "Працюю в редакторі коду VS Code. Працюю з Git, GitHub. Як збірник проєктів використовую Gulp." },
	aboutUiTitle: { ru: "Дизайн макеты", en: "Design layouts", ua: "Дизайн-макети" },
	aboutAtherTitle: { ru: "Другое", en: "Other", ua: "Інше" },


	// header nav 
	headerNav1: { ru: "Проекты", en: "Projects", ua: "Проекти" },
	headerNav2: { ru: "Обо мне", en: "About me", ua: "Про мене" },
	headerNav3: { ru: "Контакты", en: "Contacts", ua: "Контакти" },
	headerNav4: { ru: "Написать", en: "Message", ua: "Написати" },

	// filters nav links
	filtersNav1: { ru: "Все", en: "All", ua: "Все" },
	filtersNav2: { ru: "Лендинги", en: "Landing pages", ua: "Лендінги" },
	filtersNav3: { ru: "Многостраничные сайты", en: "Multi page sites", ua: "Багатосторінкові сайти" },
	filtersNav4: { ru: "Анимации Css, Js", en: "Animations CSS, JS ", ua: "Анімації CSS, JS " },
	filtersNav5: { ru: "Блоки", en: "Blocks", ua: "Блоки" },

	// pagination
	paginPrev: { ru: "Предыдущая", en: "Previous", ua: "Попередня" },
	paginNext: { ru: "Следующая", en: "Next", ua: "Наступна" },

	// form labels
	labelName: { ru: "Имя", en: "Name", ua: "Імя" },
	labelLastName: { ru: "Фамилия", en: "Last name", ua: "Призвіще" },
	labelEmail: { ru: "Электронная почта", en: "Email", ua: "Електронна пошта" },
	labelTitle: { ru: "Заглавие", en: "Title", ua: "Заголовок" },
	labelMess: { ru: "Сообщение", en: "Мessage", ua: "Повідомлення" },

	// form placeholders
	placeholderName: { ru: "Введите имя", en: "Enter name", ua: "Введіть імя" },
	placeholderLastName: { ru: "Введите фамилию", en: "Enter last name", ua: "Введіть прізвище" },
	placeholderEmail: { ru: "Введите электронную почту", en: "Enter email address", ua: "Введіть електронну пошту" },
	placeholderTitle: { ru: "Введите заглавие", en: "Enter title address", ua: "Введіть заголовок" },
	placeholderMessage: { ru: "Введите сообщение", en: "Enter message", ua: "Введіть повідомлення" },

	// form errors & buttons
	errorRequired: { ru: "Заполните поле", en: "Field is required", ua: "Заповніть поле" },
	errorEmail: { ru: "Введите корректный email", en: "Enter a valid email", ua: "Введіть коректний email" },
	errorMinLength: { ru: "Минимум 10 символов", en: "Minimum 10 characters", ua: "Мінімум 10 символів" },
	sending: { ru: "Отправка...", en: "Sending...", ua: "Надсилання..." },
	send: { ru: "Отправить", en: "Send", ua: "Надіслати" },

	// form success
	successTitle: { ru: "Спасибо!", en: "Thank you!", ua: "Дякуємо!" },
	successText: { ru: "Ваше сообщение успешно отправлено. Я с вами свяжусь в течении 24 часов.", en: "Your message has been sent successfully. I will contact you within 24 hours.", ua: "Ваше повідомлення успішно надіслано. Я з вами звяжусь на протязі 24 годин." },

	// buttons
	downloadHero: { ru: "Загрузить CV", en: "Download CV", ua: "Завантажити CV" },
	buttonSee: { ru: "Посмотреть", en: "To watch", ua: "Подивитися" },
};


// Change language
const select = document.getElementById('language-select');
const elements = document.querySelectorAll('[data-key]');

function applyLanguage() {

	let lang = window.location.hash.replace('#', '').toLowerCase() || 'en';

	if (!translations.send[lang]) {
		lang = 'en';
		window.location.hash = lang;
		return;
	}
	document.documentElement.lang = lang;

	elements.forEach(el => {
		const key = el.getAttribute('data-key');

		if (translations[key] && translations[key][lang]) {
			const translatedText = translations[key][lang];

			//  placeholder
			if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
				el.placeholder = translatedText;
			} else {
				// Other elems
				el.innerHTML = translatedText;
			}
		}
	});

	const realSelect = document.querySelector('#language-select');
	if (realSelect) {
		realSelect.value = lang;
		if (typeof select_item === 'function') {
			select_item(realSelect);
		}
	}
	initValidation(lang);
}


window.addEventListener('hashchange', applyLanguage);

document.addEventListener('DOMContentLoaded', () => {
	applyLanguage();

	const langSelect = document.querySelector('#language-select');
	if (langSelect) {
		langSelect.addEventListener('change', (e) => {
			window.location.hash = e.target.value;
		});
	}
});
document.getElementById("year").textContent = new Date().getFullYear();

// =========================== progress ======================
const progress = document.querySelector('.progress');
window.addEventListener('scroll', progressBar);
function progressBar(e) {
	let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
	let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	let persent = windowScroll / windowHeight * 100;
	progress.style.width = persent + '%';
	progress.classList.add('_scroll');
}
// =========================== progress ======================

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
//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.code === 'Escape') {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select') && !e.target.classList.contains('_option')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select-' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value bt-ic"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value bt-ic"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const selectTitle = select.querySelector('.select__title');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	selectTitle.addEventListener('click', function (e) {
		selectItemActions();
	});

	function selectMultiItems() {
		let selectedOptions = select.querySelectorAll('.select__option');
		let originalOptions = original.querySelectorAll('option');
		let selectedOptionsText = [];
		for (let index = 0; index < selectedOptions.length; index++) {
			const selectedOption = selectedOptions[index];
			originalOptions[index].removeAttribute('selected');
			if (selectedOption.classList.contains('_selected')) {
				const selectOptionText = selectedOption.innerHTML;
				selectedOptionsText.push(selectOptionText);
				originalOptions[index].setAttribute('selected', 'selected');
			}
		}
		select.querySelector('.select__value').innerHTML = '<span>' + selectedOptionsText + '</span>';
	}
	function selectItemActions(type) {
		if (!type) {
			let selects = document.querySelectorAll('.select');
			for (let index = 0; index < selects.length; index++) {
				const select = selects[index];
				const select_body_options = select.querySelector('.select__options');
				if (select != select_item.closest('.select')) {
					select.classList.remove('_active');
					_slideUp(select_body_options, 100);
				}
			}
			_slideToggle(select_body_options, 100);
			select.classList.toggle('_active');
		}
	}
	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value && !original.hasAttribute('multiple')) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
				original.dispatchEvent(new Event('change'));
			} else {
				if (original.hasAttribute('multiple')) {
					select_option.classList.toggle('_selected');
					selectMultiItems();
					original.dispatchEvent(new Event('change'));
				} else {
					select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
					original.value = select_option_value;
					original.dispatchEvent(new Event('change'));
					select_option.style.display = 'none';
				}
			}
			let type;
			if (original.hasAttribute('multiple')) {
				type = 'multiple';
			}
			selectItemActions(type);
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.innerHTML;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}
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

let validationReg = null;

function initValidation(lang) {
	const form = document.getElementById('form');
	const submitBtn = form?.querySelector('button[type="submit"]');
	const success = document.querySelector('.callback__success');

	if (validationReg) {
		validationReg.destroy();
	}

	if (form) {
		validationReg = new JustValidate(form, {
			errorFieldCssClass: '_error',
			errorLabelCssClass: 'form-error-message',
			errorLabelStyle: {},
		});

		validationReg
			.addField('#inputFirstName', [
				{ rule: 'required', errorMessage: translations.errorRequired[lang] }
			])
			.addField('#inputEmail', [
				{ rule: 'required', errorMessage: translations.errorRequired[lang] },
				{ rule: 'email', errorMessage: translations.errorEmail[lang] }
			])
			.addField('#textarea', [
				{ rule: 'required', errorMessage: translations.errorRequired[lang] },
				{ rule: 'minLength', value: 10, errorMessage: translations.errorMinLength[lang] }
			])
			.onSuccess(async (event) => {

				const formElement = document.getElementById('form');
				const formData = new FormData(formElement);


				formData.append("access_key", "010b7410-2bb3-49ae-ada3-4a2aefbb5685");

				const submitBtn = formElement.querySelector('button[type="submit"]');
				const originalText = translations.send[lang];
				submitBtn.textContent = translations.sending[lang];
				submitBtn.disabled = true;

				try {

					const response = await fetch("https://api.web3forms.com/submit", {
						method: "POST",
						body: formData,
					});

					const result = await response.json();


					if (result.success) {
						formElement.reset();


						popup_open('success');


						setTimeout(() => {
							const successPopup = document.querySelector('.popup_success._active');
							if (successPopup) {
								popup_close(successPopup);
							}
						}, 3000);
					} else {
						alert("Ошибка сервера: " + result.message);
					}
				} catch (error) {
					console.error("Детальная ошибка:", error);
					alert("Something went wrong. Проверьте соединение.");
				} finally {
					submitBtn.textContent = originalText;
					submitBtn.disabled = false;
				}
			});

	}
}
//=================
//Popups
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});

