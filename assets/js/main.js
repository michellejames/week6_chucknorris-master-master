console.log("Hello World from main.js!");


function processJokes (data) {

	var jokeResults = data.value;
	console.log(jokeResults);
	// console.log(jokeResults.value[0].categories);

	for (var i = 0; i < jokeResults.length; i++) {
		// console.log(jokeResults[i].categories);

		var jokeStorage = document.querySelector(".joke-storage");
		var joke = document.createElement("p");
		$(joke).html(jokeResults[i].joke);

		jokeStorage.appendChild(joke);
	}
}

function printText(text) {    
    var runButton = document.getElementById('runButton');
    text = "This is a test string for the purpose of checking the function.";
  //obviously don't set text to anything if you're going to actually use this 
    var characters = text.split("");
    var container = document.getElementById('stringDisplay');
    container.innerHTML = "";
  
    runButton.removeEventListener('click', printText);
    var printInterval = setInterval(printCharacters, 50);
  
    runButton.addEventListener('click', resetText);
  
    function resetText() {
      characters = text.split("");
      container.innerHTML = "";

      if ($(".waiting").show()) {
        $(".roundhouse").show();
        $(".waiting").hide();
      } else if ($(".roundhouse").show()) {
        $(".waiting").show();
        $(".roundhouse").hide();
      }
    }

    function printCharacters() {
        if (characters[0]) {
           var printThisCharacter = characters[0];
           container.innerHTML += printThisCharacter;
           characters.splice(printThisCharacter, 1);
        } else {
           console.log("done");
           clearInterval(printInterval);
           printInterval = false;
           runButton.addEventListener('click', printText);
        }
    }

};



document.getElementById('runButton').addEventListener('click', printText);

$(document).ready(function () {

    $(".roundhouse").hide();



    $("#general-jokes").on('click', function (e) {
    	e.preventDefault();			//e.stopPropagation()
        $.ajax({
          url: "http://api.icndb.com/jokes/categories" + $(".input").val()
        }).done(function(data) {
            console.log(data);
            processJokes(data);
            printText(data);


        }).fail(function () {
        	console.log("fuck");
        });
       		// return false


    });

    $("#name-jokes").on('submit', function (e) {
    	e.preventDefault();	
        $.ajax({
          url: "http://api.icndb.com/jokes/random?firstName=" + $(".input").val()
        }).done(function(data) {
            console.log(data);
        }).fail(function () {
        	console.log("fuck");
        });
    });
});