function enableGuideControls() {
	var details = document.getElementsByTagName('details');
	for (var i = 0; i < details.length; i++) {
		if (details[i].id != 'open-all') {
			var button = document.createElement('button');
			button.innerHTML = 'Close';
			button.onclick = function() {
				this.parentNode.removeAttribute('open');
				this.parentNode.scrollIntoView({
					behavior : "smooth",
					block : "center",
					inline : "nearest"
				});
			};
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

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function() {
		console.log('User signed out.');
	});
}

function onSignIn(googleUser) {
	var idToken = googleUser.getAuthResponse().id_token;
	var newCookie = "token=" + idToken + "; path=/; secure; samesite=strict; ";

	document.cookie = newCookie;

	console.log("https://penguin.truett.info:8443/fellowship/user/valid?token="
			+ idToken);
	window.idToken = idToken;

	var profile = googleUser.getBasicProfile();
	console.log('ID: ' + profile.getId());
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail());
}

function initPostForm() {
	var postForm = document.getElementById("post-form");

	if (postForm) {
		postForm.addEventListener("submit", function post(event) {
			event.preventDefault();

			var postForm = document.getElementById("post-form");

			var request = new XMLHttpRequest();
			request.open('POST',
					'https://penguin.truett.info:8443/fellowship/post', true);
			request.setRequestHeader("Content-Type", "application/json");

			var requestBody = {
				"token" : window.idToken,
				"post" : {
					"text" : postForm.textArea.value,
					"date" : (new Date()).getTime()
				}
			};

			request.onreadystatechange = function() {
				getPosts();
			};

			request.send(JSON.stringify(requestBody));

			return false;
		});

		getPosts();
	}
}

initPostForm();

function getPosts() {
	var request = new XMLHttpRequest();
	request.open('GET', 'https://penguin.truett.info:8443/fellowship/post',
			true);
	request.setRequestHeader("Accepts", "application/json");

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			var feed = document.getElementById("feed");

			while (feed.lastChild) { feed.removeChild(feed.lastChild); }

			var posts = JSON.parse(request.responseText);

			for (var i = 0; i < posts.length; i++) {
				var post = posts[i];

				var userImage = document.createElement('img');
				userImage.src = post.user.imageUrl;
				userImage.className = "userImage";

				var contentDiv = document.createElement('div');
				var date = new Date(post.date);

				contentDiv.className = "userPostContent";
				contentDiv.innerHTML = formatDate(date) + " (" + post.user.name + "): " + post.text;

				var postDiv = document.createElement('div');
				postDiv.className = "userPost";
				postDiv.appendChild(userImage);
				postDiv.appendChild(contentDiv);

				feed.appendChild(postDiv);
			}
		}
	};

	request.send();
}

function formatDate(date) {
	var year = date.getFullYear();
	var month = new String(date.getMonth() + 1).padStart(2, '0');
	var dayOfMonth = new String(date.getDate()).padStart(2, '0');
	var hourOfDay = new String(date.getHours() + 1).padStart(2, '0');
	var minuteOfHour = new String(date.getMinutes()).padStart(2, '0');

	return year + "-" + month + "-" + dayOfMonth + " " + hourOfDay + ":" + minuteOfHour;F}
