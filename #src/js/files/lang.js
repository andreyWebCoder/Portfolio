const translations = {
	// titles
	titleWork: { ru: "Мои проекты", en: "My projects", ua: "Мої проекти" },
	titleAbout: { ru: "Обо мне", en: "About me", ua: "Про мене" },
	titleForm: { ru: "Написать письмо", en: "Send mail", ua: "Написати листа" },

	// header nav links
	headerNav1: { ru: "Проекты", en: "Projects", ua: "Проекти" },
	headerNav2: { ru: "Обо мне", en: "About me", ua: "Про мене" },
	headerNav3: { ru: "Контакты", en: "Contacts", ua: "Контакти" },
	headerNav4: { ru: "Написать", en: "Feedback", ua: "Написати" },

	// filters nav links
	filtersNav1: { ru: "Все", en: "All", ua: "Все" },
	filtersNav2: { ru: "Лендинги", en: "Landing pages", ua: "Лендінги" },
	filtersNav3: { ru: "Многостраничные сайты", en: "Multi page sites", ua: "Багатосторінкові сайти" },
	filtersNav4: { ru: "Анимации Css, Js", en: "Animations CSS, JS ", ua: "Анімації CSS, JS " },
	filtersNav5: { ru: "jQuery", en: "jQuery", ua: "jQuery" },

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
	successText: { ru: "Ваше сообщение успешно отправлено. Я с вами свяжусь в течении 24 часов.", en: "Your message has been sent successfully. I will contact you within 24 hours.", ua: "Ваше повідомлення успішно надіслано. Я з вами звяжусь на протязі 24 годин." }
};


// Change language
const select = document.getElementById('language-select');
const elements = document.querySelectorAll('[data-key]');

function applyLanguage() {
	// Получаем язык из хеша, по умолчанию 'ru'
	let lang = window.location.hash.replace('#', '').toLowerCase() || 'en';

	// Проверка: существует ли выбранный язык в нашей базе (проверяем по любому ключу, например 'send')
	if (!translations.send[lang]) {
		lang = 'en';
		window.location.hash = lang;
		return;
	}

	// Переводим все элементы с атрибутом data-key
	document.querySelectorAll('[data-key]').forEach(el => {
		const key = el.getAttribute('data-key');

		if (translations[key] && translations[key][lang]) {
			const translatedText = translations[key][lang];

			// Если это поле ввода, меняем placeholder
			if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
				el.placeholder = translatedText;
			} else {
				// Для остальных элементов меняем текстовый контент
				el.textContent = translatedText;
			}
		}
	});

	// Синхронизируем селект и кастомные элементы управления (если есть)
	const realSelect = document.querySelector('#language-select');
	if (realSelect) {
		realSelect.value = lang;
		// Если используется кастомный селект (из вашего кода)
		if (typeof select_item === 'function') {
			select_item(realSelect);
		}
	}

	// ВАЖНО: Пересоздаем валидацию с текстами на новом языке
	initValidation(lang);
}

// 3. Слушатели событий
window.addEventListener('hashchange', applyLanguage);

document.addEventListener('DOMContentLoaded', () => {
	applyLanguage(); // Запуск при загрузке страницы

	const langSelect = document.querySelector('#language-select');
	if (langSelect) {
		langSelect.addEventListener('change', (e) => {
			window.location.hash = e.target.value;
		});
	}
});