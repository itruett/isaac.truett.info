function addCloseButtonsToDetails() {
	var details = document.getElementsByTagName('details');
	for (var i = 0; i < details.length; i++) {
		var button = document.createElement('button');
		button.innerHTML = 'Close';
		button.onclick = function() {
				this.parentNode.removeAttribute('open');
				this.parentNode.scrollIntoView({
						behavior: "smooth",
						block: "center",
						inline: "nearest"});};
		details[i].appendChild(button);
	}
}

addCloseButtonsToDetails();