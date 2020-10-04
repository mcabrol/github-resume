function getRemote(remote_url) {
    return $.ajax({
        type: "GET",
        url: remote_url,
        async: true
    }).responseText;
}

// function

function request(username) {
	display_loading(0);

	var api = "https:/api.github.com/";
	var url_usr = api + "users/" + username;
	var url_repos = url_usr + "/repos";

	var data_profile = getRemote(url_usr);
	var obj_profile = JSON.parse(data_profile);
	parse_profile(obj_profile);

	var data_repos = getRemote(url_repos);

	var obj_repos = JSON.parse(data_repos);

	parse(data_repos);


	obj_repos.forEach((value, i) => {

		var url_project = api + "repos/" + username + "/" + value.name;
		var url_contents = url_project + "/contents/";
		var url_commits = url_project + "/commits/";
		var url_contributors = url_project + "/contributors";

		output("[" + i + "] = " + value.name, $("#console"));

		var data_contents = getRemote(url_contents);
		var obj_contents = JSON.parse(data_contents);
		obj_contents.forEach((value, i) => {
			output("- " + value.name, $("#console"));
		});

		// var data_contributors = getRemote(url_contributors);
		// var obj_contributors = JSON.parse(data_contributors);
		// if (Object.keys(obj_contributors).length > 1) {
		// 	console.log(obj_contributors);
		// 	obj_contributors.forEach((value, i) => {
		// 		output("Contributors " + i + " : " + value.login, $("#console"));
		// 	});
		// }


		// obj_contributors.forEach((value, i) => {
		// 	output("Contributors: " + value.name, $("#console"));
		// });

	});


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
