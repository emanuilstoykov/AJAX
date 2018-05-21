var pageCounter = 1;
var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function () {

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
    ourRequest.onload = function () {
        if(ourRequest.status >= 200 && ourRequest.status < 400) {
            var ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);
        } else {
            console.log("We connected to the server, but it returned an error");
        }
        var ourData = JSON.parse(ourRequest.responseText);
       renderHTML(ourData);
    };
    ourRequest.onerror = function() {
        console.log("Connection error");
    }
    ourRequest.send();
    pageCounter +=1;
  if(pageCounter > 3) {
      btn.classList.add("hide-me");
  }
});
function renderHTML(data) {
var htmlString = '';
for(let i =0; i < data.length; i+=1) {
    htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";
    
    for(let ii =0; ii < data[i].foods.likes.length; ii+=1) {
        if(ii==0) {
            htmlString += data[i].foods.likes[ii];
        } else {
            htmlString += " and " + data[i].foods.likes[ii];
        }
    }

    htmlString += ' and dislikes ';
    for(let ii =0; ii < data[i].foods.dislikes.length; ii+=1) {
        if(ii==0) {
            htmlString += data[i].foods.dislikes[ii];
        } else {
            htmlString += " and " + data[i].foods.dislikes[ii];
        }
    }

    htmlString += '</p>';
}
animalContainer.insertAdjacentHTML('beforeend', htmlString);
}
