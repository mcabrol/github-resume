function request_profile(username)
{
	const xhr = new XMLHttpRequest();
	const url = `https://api.github.com/users/${username}/repos`;
	xhr.open('GET', url, true);
	xhr.onload = function() {
		display_loading(0);
		parse(this.response);
		display_loading(1);
	}
	xhr.send();
}

function request_readme(raw_url)
{
	const xhr = new XMLHttpRequest();
	const url = `${raw_url}`;
	xhr.open('GET', url, true);
	xhr.onload = function() {
		display_loading(0);
		parse_readme(this.response);
		display_loading(1);
	}
	xhr.send();
}

function request_contributors(project)
{
	const xhr = new XMLHttpRequest();
	const url = `https://api.github.com/repos/mcabrol/${project}/contributors`;
	xhr.open('GET', url, true);
	xhr.onload = function() {
		display_loading(0);
		parse_contributors(this.response);
		display_loading(1);
	}
	xhr.send();
}

function request_commits(project)
{
	const xhr = new XMLHttpRequest();
	const url = `https://api.github.com/repos/mcabrol/${project}/commits`;
	xhr.open('GET', url, true);
	xhr.onload = function() {
		display_loading(0);
		parse_commits(this.response);
		display_loading(1);
	}
	xhr.send();
}

function request_contents(project)
{
	const xhr = new XMLHttpRequest();
	const url = `https://api.github.com/repos/mcabrol/${project}/contents`;
	xhr.open('GET', url, true);
	xhr.onload = function() {
		display_loading(0);
		parse_contents(this.response);
		display_loading(1);
	}
	xhr.send();
}

function request(username) {
	display_loading(0);
	var api = "https:/api.github.com/";
	var usr = api + "users/" + username;
	var repo = usr + "/repos";
	var index = [usr, repo];
	var xhr = new XMLHttpRequest();
	for (var i = 0; i < 2; i++) {
		var url = index[i];
		console.log("url: " + url);
		xhr.open("GET", url);
		xhr.onload = function () {
			console.log(this.response);
		}
		xhr.send();
	}
	display_loading(1);
}



// Profile [var username]
// https://api.github.com/users/${username}

// Project [var project]
// https://api.github.com/users/${username}/repos
	// Content
	// https://api.github.com/users/${username}/${project}/contents
	// Commit
	// https://api.github.com/users/${username}/${project}/commits
	// Contributors
	// https://api.github.com/users/${username}/${project}/contributors
