/**************** Global Variables ****************/

const employeesUL = document.querySelector('.employee-list');
const cardBgDIV = document.querySelector('.detail-card-bg');
const paginationUL = document.querySelector('.pagination ul');
const searchForm = document.createElement('form');
const searchInput = document.createElement('input');

let employees;
const employeesPerPage = 12;
const data = new Data('https://randomuser.me/api/?results=100');

/**************** End Global Variables ****************/

// Fetch Employees data: 
data.fetchData().then(res => {

	// filter non English language employees:
	employees = res.results.filter(employee => isEnglish(employee.nat));
	const totalPage = getPageTotal(employees); // total number of pages

	// initialize page:
	showEmployees(employees, 1);
	showLinks(totalPage);
	setActiveLink(1);
	addSearch();
	searchInput.focus();

	/**************** Event Listeners ****************/

	// show Info Card:
	employeesUL.addEventListener('click', (event) => infoCard.getCard(event));

	// moving between Info Cards:
	cardBgDIV.addEventListener('click', (event) => infoCard.handleClick(event));

	// click Page Number link:
	paginationUL.addEventListener('click', (event) => {
		if (event.target.tagName === "A") {
			let pageNum = event.target.text;
			showEmployees(employees, pageNum);
			setActiveLink(pageNum);		
		}
	});

	// perform Search:
	searchInput.addEventListener('keyup', search.bind(this, employees));

	/**************** End Event Listeners ****************/

});

/**************** Functions ****************/

// render employees to current page.
function showEmployees(list, currentPage) {
	let employees = getEmployeesForPage(currentPage, list);
	print('.employee-list', getEmployeeHTML(employees));
}

// render pagination links.
// note: due to Event Delegation, only dynamically generate li items, ul is not dynamically generated. 
function showLinks(num) {
	let htmlString = '';
	for (let i = 1; i <= num; i++) htmlString += `<li><a href="#">${i}</a></li>`;
	show(paginationUL); 
	print('.pagination ul', htmlString);
}

// note: slice() works even when the endIndex is out of bound. 
function getEmployeesForPage(page, list) {
	let endIndex = page * employeesPerPage;
	let startIndex = endIndex - employeesPerPage;
	return list.slice(startIndex, endIndex);
}

// get total page number needed, counting from 1.
function getPageTotal(list) {
	return (Math.ceil(list.length/employeesPerPage));
}

// convert employee object array to htmlString.
function getEmployeeHTML(list) {
	var htmlString = '';
	for (let i = 0; i < list.length; i++) {
			htmlString += `<li class="employee-item" id=${list[i].login.username}>`;
			htmlString += `<img class="avatar" src="${list[i].picture.large}">`;
			htmlString += `<div class='employee-details'>`;
			htmlString += `<h3>${list[i].name.first} ${list[i].name.last}</h3>`;
			htmlString += `<p class="email">${list[i].email}</p>`;
			htmlString += `<p class="location">${list[i].location.city}</p></div>`;
			htmlString += `</li>`;
	}
	return htmlString;
}

// take current page number, give "active" class to correct link.
function setActiveLink(page) {
	let links = document.querySelectorAll('.pagination a');
	for (let i = 0; i < links.length; i++) links[i].className = '';
	links[page - 1].className = "active";
}

// handle search query:
function search(list) {
	let query = searchInput.value;
	let result;
	let match = [];

	// get search result
	if (query === "") result = list;
	else {
		list.forEach(item => {
			if (item.name.first.toLowerCase().includes(query.toLowerCase()) || item.name.last.toLowerCase().includes(query.toLowerCase())) match.push(item);
		});
		result = (match.length < 1) ? '<h2>No employee match the search term.</h2>' : match;	
	}

	// display search result
	if (Array.isArray(result)) {
		showEmployees(result, 1);
		showLinks(getPageTotal(result));
		setActiveLink(1);
	} else {
		print('.employee-list', result);
		hide(paginationUL);
	}
}

function addSearch() {
	searchForm.className = 'employee-search';
	searchInput.setAttribute('placeholder', 'Search for employee...');
	document.querySelector('.page-header').appendChild(searchForm);
	searchForm.appendChild(searchInput);
}

// helper functions:
function print(selector, content) { document.querySelector(selector).innerHTML = content; }
function show(node) { node.style.display = 'block'; }
function hide(node) { node.style.display = 'none'; }
function isEnglish(str) { return ['AU', 'GB', 'IE', 'NZ', 'US'].includes(str); }

/**************** End Functions ****************/