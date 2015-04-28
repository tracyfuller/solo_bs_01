var apikey = 'c4c609bf889a7da2a21401f8ea6df37105c21d0e'; 
var textInput;

function searchCallback(results) {
    console.log("results: ", results);
    for (var i = 0; i < 9 ; i++){

		var button = "<br><button class='btn-sm btn-success' id='removeButton'>Remove</button>"
		var thumbnail = results[i].image.small_url;
		if (thumbnail == null || thumbnail == undefined){
			thumbnail = "http://placehold.it/320x243&text=No+image";
		};
		var blurb = results[i].deck;
		if (blurb == null || blurb == undefined){
			blurb = "No description available";
		};
		var newResult = "<div id='gameResult' class='col-xs-12 col-sm-6 col-md-4 col-lg-4 well'>" + 
	 	"<p class='lead'>" + results[i].name + "</p><img class='hidden-sm hidden-xs' src='" + thumbnail + "'/>" +
	 	"<div class='inner'><p class='text-center smallBlurb'>" + blurb + "</p>" + button + "</div></div>";
	 	if (i % 3 == 0){
	 		$("#resultsBox").append("<div class='row'></div>");
	 	}
	 	$(".row").last().append(newResult).hide().slideDown(i * 250);
	};

};

$(document).ready(function() {

	// Start the search here!
	
	$(".searchBtn").on("click", function(event){
		$("#resultsBox").empty();
		event.preventDefault();
		textInput = $("#searchField").val();
		search(textInput);
	});
	$("#searchField").keypress(function(e){
        if(e.which == 13){
            $('.searchBtn').click();
        };
    });

	$("#resultsBox").on("click", "button", function(){
		$(this).parent().parent().fadeOut("fast");
		console.log("I'm working");
	});
});

function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

};
