// 'employees' is not encapsulated.
const infoCard  = {

	currentEmployee: null,

	renderIn: function(employee) {
		document.querySelector('.detail-card-bg').innerHTML = this.getHTML(employee);
		document.querySelector('#arrow-left').className = ((this.isFirst()) ? 'disable' : 'enable');
		document.querySelector('#arrow-right').className = ((this.isLast()) ? 'disable' : 'enable');
	},

	getHTML: function(employee) {
		return `
			<button class="enable" id="arrow-left">&lt;</button>
			<div class="detail-card">
				<img src="${employee.picture.large}">
				<h3>${employee.name.first} ${employee.name.last}</h3>
				<p>${employee.email}</p>
				<p class="location">${employee.location.city}</p>
				<hr>
				<p>${employee.phone}</p>
				<p class="address">${employee.location.street} ${employee.location.state} ${employee.location.postcode}</p>
				<p>Birthday: ${this.reformatDoB(employee.dob)}</p>
			</div>
			<button class="enable" id="arrow-right">&gt;</button>`;
	},

	handleClick: function(e) {
		const arrowL = document.querySelector('#arrow-left');
		const arrowR = document.querySelector('#arrow-right');
		if (e.target === arrowL) {
			currentEmployee = this.getPreEmployee();
			this.renderIn(currentEmployee);
			arrowL.className = (this.isFirst() || this.isLast()) ? 'disable' : 'enable';
			arrowR.className = 'enable';
		}
		else if (e.target === arrowR) {
			currentEmployee = this.getNextEmployee();
			this.renderIn(currentEmployee);
			arrowR.className = (this.isFirst() || this.isLast()) ? 'disable' : 'enable';
			arrowL.className = 'enable';
		}
		// hide Details Card:
		else if (e.target === e.currentTarget) {
			e.currentTarget.className = 'detail-card-bg';
		}
	},

	getCard: function(e) {
		if (e.target !== e.currentTarget) {
			document.querySelector('.detail-card-bg').className = 'detail-card-bg active';
			const id = this.getLi(e.target).id;
			currentEmployee = employees.filter(employee => employee.login.username === id).reduce((obj, accu) => accu = obj);
			this.renderIn(currentEmployee);
		}
	},

	getLi: function(node) {
		if (node.parentElement.tagName === 'LI') return node.parentElement;
		else if (node.parentElement.parentElement.tagName === 'LI') return node.parentElement.parentElement;
		return node;
	},

	reformatDoB: str => str.substr(0, str.indexOf(' ')).replace(/[-]/g, '/'),

	getPreEmployee: () => {
		const index = (employees.indexOf(currentEmployee));
		return (index === 0) ? employees[index] : employees[index - 1];
	},

	getNextEmployee: () => {
		const index = (employees.indexOf(currentEmployee));
		return (index === employees.length - 1) ? employees[index] : employees[index + 1];
	},

	isFirst: () => { return (employees.indexOf(currentEmployee) === 0) ? true : false; },

	isLast: () => { return (employees.indexOf(currentEmployee) === employees.length - 1) ? true : false; }
}



