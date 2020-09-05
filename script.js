window.onload = function() {
    var infoPanel = document.getElementById('info__panel');
    var infoButton = document.getElementById('info__button');
    var infoCloseButton = document.getElementById('info__close-button');

    
    infoButton.onclick = function () {
        toggle( infoPanel );
        return false;
    }


    infoCloseButton.onclick = function () {
        toggle( infoPanel );
        return false;
    }
}

function toggle(el) {
    if (el.classList.contains("hide")){
        el.classList.remove("hide");
    }else {
        el.classList.add("hide");
    }
}


/* ***
 * Random Poems
 * ***/

var textArea = document.getElementById('textInput');

function getRandomPoemLine() {
    // Get poem from poemist API
    fetch('https://www.poemist.com/api/v1/randompoems').then(function (response) {
        return response.json();
    }).then(function (data) {
        // Split poem into lines
        var lines = data[0].content.split(/\r?\n/);
        // Get a random line
        var randIndex = getRandomInt(lines.length-1);
        textArea.value = lines[randIndex];
        // Trigger p5 image-to-text API call
        keyReleased();
    }).catch(function (err) {
        console.log('Poemist error: ' + err)
        textArea.value = 'Sorry - something didn\'t work';
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/* ***
 * Random Kanye West Quote
 * ***/

function getKanyeQuote() {
    // Get poem from poemist API
    fetch('https://api.kanye.rest').then(function (response) {
        return response.json();
    }).then(function (data) {
        textArea.value = data.quote;
        // Trigger p5 image-to-text API call
        keyReleased();
    }).catch(function (err) {
        console.log('Kanye.rest error: ' + err)
        textArea.value = 'Sorry - something didn\'t work';
    });
}
