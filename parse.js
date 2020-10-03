function parse_contributors(data) {
	var obj = JSON.parse(data);
	var size = Object.keys(obj).length;

	if (size > 1) {
		console.log(size - 1 + " contributors");
	} else {
		console.log("No contributors");
	}
}

function parse_contents(data) {
	var obj = JSON.parse(data);
	var size = Object.keys(obj).length;
	var readme = 0;
	console.log(size + " files:")
	obj.forEach(function (value, i) {
		output(i + " " + value['name'], $("#console"));
		if (value["name"].localeCompare("README.md") == 0) {
			readme = i;
			console.log("obj[" + (readme + 1) + "] = " + obj[readme].name);
		}
		else {
			i = -1;
		}
	});
	if (readme) {
		request_readme(obj[readme].download_url);
	}
}

function parse_readme(data) {
	output("README.md: " + data, $("#console"));
}

function parse_commits(data) {
	var obj = JSON.parse(data);
	var size = Object.keys(obj).length;
	output(size - 1 + " commits", $("#console"));
}

function parse(data) {
	var obj = JSON.parse(data);

	if (obj["message"] && obj["message"].localeCompare("Not found")) {
		output("Not found", $("#console"));
	} else {
		obj.forEach(print);
		obj.forEach(function (value, i) {
			$("#table").append(function() {
				let str;
				// List
				str = '<a onclick="display_detail(\'' + value['name'] +  '\')">';
					str += '<div class="list bdr row m-0 p-0">';
						str += '<div class="col-sm-2 m-0 table-padding">';
							str += '<p class="m-0 p-0">';
								str += pad(i + 1);
							str += '</p>';
						str += '</div>';
						str += '<div class="col-sm-2 table-padding m-0 responsive">';
							str += '<p class="m-0">';
								str += value['created_at'].substr(0, 4);
							str += '</p>';
						str += '</div>';
						str += '<div class="col-sm-5 table-padding m-0">';
							str += '<p class="m-0 p-0">';
								str += value['name'];
							str += '</p>';
						str += '</div>';
					str += '</div>';
				str += '</a>';

				// Detail

				str += '<div class="bdr row m-0 p-0 display-none">';
				str += '<div class="col-sm-4 m-0 table-padding">';
				str += '<p class=m-0>Last update:</p>';
				str += '<p>';
				str += value['updated_at'].substr(0, 10);
				str += '</p>';
				str += '</div>';
				str += '<div class="col-sm-4 m-0 table-padding">';
				str += '<p>';
				str += value['description'];
				str += '</p>';
				str += '<p>';
				str += value['description'];
				str += '</p></div></div>';
				return (str);
			});
		});

		// // Raw code
		// var str = JSON.stringify(data, undefined, 4);
		// output(str, $("#raw"));
	}
}
