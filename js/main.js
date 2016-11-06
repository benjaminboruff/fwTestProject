var fwTest = {
    swFilms: [],
    removeCharList: [],
    ships: [],

    /***
        fill selection dropdown with sw episodes ordered by release date
        and set click events on them
    ***/
    fillSelect: function() {
        // make ajax call to SWAPI to get all films
        $.when($.getJSON("https://swapi.co/api/films/"))
            .then(function(data, textStatus, jqXHR) {
                // push all film objects onto swFilms array
                $.each(data.results, function(index, value) {
                        fwTest.swFilms.push(value);
                        //console.log(value.title);
                    })
                    // sort swFilms array based on release date
                fwTest.swFilms.sort(function(a, b) {
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
                $.each(fwTest.swFilms, function(index, film) {
                    $("#film-titles").append('<li><a href="#"><data value="' +
                        film.url + '">' + film.title + '</data></a></li>');
                });

                // when a film is selected from the drop down, query SWAPI for title
                // to get characters
                $("#film-titles li").click(function(e) {
                    // clear old results
                    $("#sw-table").empty();
                    $("#ep-title").html($(this).html());
                    var titleUrl = $(this).find('data').attr('value');
                    titleUrl = fwTest.secureUrl(titleUrl);
                    var characters = [];
                    //console.log(titleUrl);
                    $.getJSON(titleUrl)
                        .done(function(data) {
                            characters = data.characters;
                            //console.log(characters);
                            fwTest.createCharacterTable(characters);
                        });
                });

            });
        //*** end async
    },

    //*** I develope from https, so I have to change the url's http to https.
    secureUrl: function(url) {
        return 'https://' + url.match(/[^http\:\/\/]\w*.*/);
    },

    //*** function to make table of character names and starships
    createCharacterTable: function(charArr) {
        // make axaj call for each character
        $.each(charArr, function(index, charUrl) {
            charUrl = fwTest.secureUrl(charUrl);
            $.when($.getJSON(charUrl))
                .then(function(char) {
                    // add a row with character name and starships if not removed
                    $("#sw-table").append(fwTest.makeRow(char.name, char.starships));
                });
        });
    },

    //*** insert character name and list of ships into table row
    //*** if not in "removed" array
    makeRow: function(charName, shipArr) {
        var shipDataId = charName.split(" ").join("-");
        // only add charactes that are not in the removed list
        if (!fwTest.removeCharList.find(function(char) {
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
            if (!fwTest.removeCharList.find(function(char) {
                    return char === shipDataId;
                })) {
                fwTest.removeCharList.push(shipDataId);
                console.log(fwTest.removeCharList);
            }
            // remove character from table if "x" is clicked
            $("#" + shipDataId).parent().remove();
        });
        // add list of starships to row if they have any
        if (shipArr.length !== 0) {
            //console.log(charName + " has ships!");
            fwTest.getShips(shipDataId, shipArr);
        }
    },

    /*** BOTTLENECK!!!!
     return a string of comma separated ships
     I turned off async to make this do-able in a short amount
     of time. This needs to be refactored into an async solution
     to improve perfomance; the UI suffers for it, otherwise.
    ***/
    getShips: function(shipDataId, shipArr) {
        var promises = [];

        function fetchShips(url) {
            return $.getJSON(url).then(function(data) {
                return data;
            });
        }
        for (var i = 0; i < shipArr.length; i++) {
            var starshipUrl = fwTest.secureUrl(shipArr[i]);
            //console.log(starshipUrl);
            promises.push(fetchShips(starshipUrl));
        }

        $.when.apply(this, promises).then(function() {
            var shipArray = Array.from(arguments);
            shipArray.forEach(function(ship) {
                //console.log(ship.name);
                fwTest.ships.push(ship.name);
            });
            $("#" + shipDataId).html(fwTest.ships.join(", "));
            fwTest.ships = [];
        });
    }
};
