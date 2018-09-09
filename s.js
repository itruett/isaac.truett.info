function enableGuideControls() {
	var details = document.getElementsByTagName('details');
	for (var i = 0; i < details.length; i++) {
		if (details[i].id != 'open-all') {
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

	var openAll = document.getElementById('open-all');
	if (openAll) {
		openAll.onclick = function(element) {
			var details = document.getElementsByTagName('details');

			for (var i = 0; i < details.length; i++) {
				if (details[i].id != 'open-all') {
					if (openAll.open) {
						details[i].removeAttribute('open');
					} else {
						details[i].setAttribute('open', true);
					}
				}
			}

			if (openAll.open) {
				openAll.childNodes[0].innerHTML = 'Open all sections';
			} else {
				openAll.childNodes[0].innerHTML = 'Close all sections';
			}

			return true;
		}
	}
}

enableGuideControls();
