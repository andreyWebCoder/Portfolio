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