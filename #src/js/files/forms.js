let validationReg = null; // Глобальная переменная для экземпляра

function initValidation(lang) {
	const form = document.getElementById('form');
	const submitBtn = form?.querySelector('button[type="submit"]');
	const success = document.querySelector('.callback__success');

	// Если валидатор уже существует, уничтожаем его перед созданием нового
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
				// 1. Берем форму напрямую по ID
				const formElement = document.getElementById('form');
				const formData = new FormData(formElement);

				// 2. Добавляем ключ в FormData
				formData.append("access_key", "010b7410-2bb3-49ae-ada3-4a2aefbb5685");

				const submitBtn = formElement.querySelector('button[type="submit"]');
				const originalText = translations.send[lang];
				submitBtn.textContent = translations.sending[lang];
				submitBtn.disabled = true;

				try {
					// 3. ОТПРАВЛЯЕМ БЕЗ JSON И БЕЗ HEADERS
					const response = await fetch("https://api.web3forms.com/submit", {
						method: "POST",
						body: formData,
					});

					const result = await response.json();

					// Внутри initValidation -> onSuccess:
					if (result.success) {
						formElement.reset(); // Очищаем форму

						// 1. Открываем попап через твою систему
						// 'success' превратится в поиск класса .popup_success
						popup_open('success');

						// 2. Автозакрытие через 5 секунд (используем твою функцию закрытия)
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