const totalCasesDiv = document.querySelector('.total-cases');
const totalDeathsDiv = document.querySelector('.total-deaths');
const totalRecoveredDiv = document.querySelector('.total-recovered');
const errorDiv = document.querySelector('.error-div');

async function request() {
	try {
		const response = await axios.get('https://coronavirus-19-api.herokuapp.com/all');
		const totalCasesData = response.data.cases;
		const totalDeathsData = response.data.deaths;
		const totalRecoveredData = response.data.recovered;

		const totalCases = document.createElement('p');
		totalCases.innerText = totalCasesData.toLocaleString();
		totalCasesDiv.appendChild(totalCases);

		const totalDeaths = document.createElement('p');
		totalDeaths.innerText = totalDeathsData.toLocaleString();
		totalDeathsDiv.appendChild(totalDeaths);

		const totalRecovered = document.createElement('p');
		totalRecovered.innerText = totalRecoveredData.toLocaleString();
		totalRecoveredDiv.appendChild(totalRecovered);
	} catch (err) {
		console.log(err);
		const error = document.createElement('h3');
		error.innerText = err;
		error.classList.add('error');
		errorDiv.appendChild(error);
	}
}
request();
