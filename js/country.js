const wrapperDiv = document.querySelector('.wrapper');
const casesDiv = document.querySelector('.cases');
const deathsDiv = document.querySelector('.deaths');
const recoveredDiv = document.querySelector('.recovered');
const errorDiv = document.querySelector('.error-div');

const countrySearch = (keyword, arr) => {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].country === keyword) {
			const item = arr[i];
			return item;
		}
	}
};

async function request() {
	try {
		const response = await axios.get('https://coronavirus-19-api.herokuapp.com/countries');

		const countryArr = response.data;

		const select = document.querySelector('.select');

		for (let i = 0; i < countryArr.length; i++) {
			const opt = document.createElement('option');
			opt.textContent = countryArr[i].country;
			select.appendChild(opt);
		}

		select.addEventListener('change', () => {
			casesDiv.innerHTML = '';
			deathsDiv.innerHTML = '';
			recoveredDiv.innerHTML = '';
			errorDiv.innerHTML = '';

			let countryObj = countrySearch(select.value, countryArr);

			const casesData = countryObj.cases;

			const deathsData = countryObj.deaths;

			const recoveredData = countryObj.recovered;

			const cases = document.createElement('p');
			cases.innerText = casesData.toLocaleString();
			casesDiv.appendChild(cases);

			const deaths = document.createElement('p');
			deaths.innerText = deathsData.toLocaleString();
			deathsDiv.appendChild(deaths);

			const recovered = document.createElement('p');
			recovered.innerText = recoveredData.toLocaleString();
			recoveredDiv.appendChild(recovered);

			wrapperDiv.classList.remove('hidden');
		});
	} catch (err) {
		console.log(err);
		const error = document.createElement('h3');
		error.innerText = err;
		error.classList.add('error');
		errorDiv.appendChild(error);
	}
}
request();
