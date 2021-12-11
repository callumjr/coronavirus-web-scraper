const wrapperDiv = document.querySelector('.wrapper');
const selectDate = document.querySelector('.select-date');
const casesDiv = document.querySelector('.cases');
const deathsDiv = document.querySelector('.deaths');
const recoveredDiv = document.querySelector('.recovered');
const casesHeading = document.querySelector('.cases-heading');
const deathsHeading = document.querySelector('.deaths-heading');
const recoveredHeading = document.querySelector('.recovered-heading');
const errorDiv = document.querySelector('.error-div');

selectDate.addEventListener('change', () => {
	const searchDate = selectDate.value;

	casesDiv.innerHTML = '';
	deathsDiv.innerHTML = '';
	recoveredDiv.innerHTML = '';
	errorDiv.innerHTML = '';

	async function request() {
		try {
			const response = await axios.get(`https://api.covid19tracking.narrativa.com/api/${searchDate}`);

			const casesData = response.data.total.today_confirmed;

			const deathsData = response.data.total.today_deaths;

			const recoveredData = response.data.total.today_recovered;

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
		} catch (err) {
			console.log(err);
			const error = document.createElement('h3');
			error.innerText = err;
			error.classList.add('error');
			errorDiv.appendChild(error);
		}
	}
	request();
});
