$(document).ready(function() {
    var swFilms = [];
    var removeCharList = [];
    // make ajax call to SWAPI to get all films
    $.getJSON("https://swapi.co/api/films/", function(data) {
        // push all film objects onto swFilms array
        $.each(data.results, function(index, value) {
                swFilms.push(value);
                //console.log(value.title);
            })
            // sort swFilms array based on release date
        swFilms.sort(function(a, b) {
            if (a.release_date < b.release_date) {
                return -1;
            }
            if (a.release_date > b.release_date) {
                return 1;
            }
            // names must be equal
            return 0;
        });
        // add each film title to drop down selector
        $.each(swFilms, function(index, film) {
            $("#film-titles").append('<li><a href="#"><data value="' + film.url + '">' + film.title + '</data></a></li>');
        });

        // when a film is selected from the drop down, query SWAPI for title
        // to get characters
        $("#film-titles li").click(function(e) {
            // clear old results
            $("#sw-table").empty();
            $("#ep-title").html($(this).html());
            var titleUrl = $(this).find('data').attr('value');
            titleUrl = secureUrl(titleUrl);
            var characters = [];
            //console.log(titleUrl);
            $.getJSON(titleUrl, function(data) {
                characters = data.characters;
                //console.log(characters);
                createCharacterTable(characters);
            });
        });

    });

    /********* Helper Functions *********/

    // I develope from https, so I have to change the url's http to https.
    function secureUrl(url) {
        return 'https://' + url.match(/[^http\:\/\/]\w*.*/);
    }

    // function to make table of character names and starships
    function createCharacterTable(charArr) {
        // make axaj call for each character
        $.each(charArr, function(index, charUrl) {
            charUrl = secureUrl(charUrl);
            $.getJSON(charUrl, function(char) {
                // add a row with character name and starships if not removed
                $("#sw-table").append(makeRow(char.name, char.starships));
            });
        });
    }

    // return string of html to insert into table row
    function makeRow(charName, shipArr) {
        var shipDataId = charName.split(" ").join("-");
        // only add charactes that are not in the removed list
        if (!removeCharList.find(function(char) {
                return char === shipDataId;
            })) {
            $("#sw-table").append('<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span></a> ' +
                charName + '</td><td id=' + shipDataId + '></td><td class="loading">Loading ...</td></tr>');
        }
        // turn "x" icon red when clicked, remove element, and add character to
        // filter list to remove from future queries
        $("#" + shipDataId).parent().find('span').click(function(e) {
            //$(this).css("color", "red");
            // add character to remove list only if they aren't there
            if (!removeCharList.find(function(char) {
                    return char === shipDataId;
                })) {
                removeCharList.push(shipDataId);
                console.log(removeCharList);
            }
            // remove character from table if "x" is clicked
            $("#" + shipDataId).parent().remove();
        });
        // add list of starships to row if they have any
        if (shipArr.length !== 0) {
            //console.log(charName + " has ships!");
            $("#" + shipDataId).html(getShips(shipArr).join(", "));
        }
    }

    // BOTTLENECK!!!!
    // return a string of comma separated ships
    // I turned off async to make this do-able in a short amount
    // of time. This needs to be refactored into an async solution
    // to improve perfomance; the UI suffers for it, otherwise.
    function getShips(shipArr) {
        var ships = [];
        for (var i = 0; i < shipArr.length; i++) {
            var starshipUrl = secureUrl(shipArr[i]);
            //console.log(starshipUrl);
            $.ajaxSetup({
                async: false
            });
            $.getJSON(starshipUrl, function(ship) {
                ships.push(ship.name);
            });
            $.ajaxSetup({
                async: true
            });
        };

        return ships;
    }

    $(document)
        .ajaxStart(function() {
            $(".loading").show();
        })
        .ajaxStop(function() {
            $(".loading").hide();
        });

});
