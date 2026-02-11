
// form
const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
	e.preventDefault();

	const formData = new FormData(form);
	formData.append("access_key", "010b7410-2bb3-49ae-ada3-4a2aefbb5685");

	const originalText = submitBtn.textContent;
	submitBtn.textContent = "Sending...";
	submitBtn.disabled = true;

	try {
		const object = Object.fromEntries(formData);
		const json = JSON.stringify(object);

		const response = await fetch("https://api.web3forms.com/submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: json
		});

		const result = await response.json();

		if (response.status === 200) {
			alert("Сообщение успешно отправлено!");
			form.reset(); // Очистит поля
		} else {
			alert("Ошибка: " + result.message);
		}
	} catch (error) {
		console.log(error);
		alert("Something went wrong. Please try again.");
	} finally {
		submitBtn.textContent = originalText;
		submitBtn.disabled = false;
	}
});

//QUANTITY
let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}

//RANGE
const priceSlider = document.querySelector('.price-filter__slider');
if (priceSlider) {

	let textFrom = priceSlider.getAttribute('data-from');
	let textTo = priceSlider.getAttribute('data-to');

	noUiSlider.create(priceSlider, {
		start: [0, 200000],
		connect: true,
		tooltips: [wNumb({ decimals: 0, prefix: textFrom + ' ' }), wNumb({ decimals: 0, prefix: textTo + ' ' })],
		range: {
			'min': [0],
			'max': [200000]
		}
	});

	/*
	const priceStart = document.getElementById('price-start');
	const priceEnd = document.getElementById('price-end');
	priceStart.addEventListener('change', setPriceValues);
	priceEnd.addEventListener('change', setPriceValues);
	*/

	function setPriceValues() {
		let priceStartValue;
		let priceEndValue;
		if (priceStart.value != '') {
			priceStartValue = priceStart.value;
		}
		if (priceEnd.value != '') {
			priceEndValue = priceEnd.value;
		}
		priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
	}
}