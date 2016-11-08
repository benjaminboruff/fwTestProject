QUnit.module("fwTest module non-ajax-JS method tests", function() {
    QUnit.test("secureUrl(url) : http url should convert to https url", function(assert) {
        assert.equal(fwTest.secureUrl("http://example.com"), "https://example.com");
        assert.equal(fwTest.secureUrl("http://www.example.com"), "https://www.example.com");
    });
});

QUnit.module("fwTest module ajax-JS method tests",
    function() {
        QUnit.test("fillSelect() : Array of films has length of 7", function(assert) {
            $.mockjax({
                url: "https://swapi.co/api/films/",
                contentType: "json",
                responseText: {
                    // response should be an array of seven objects, one
                    // for each film
                    results: [{}, {}, {}, {}, {}, {}, {}]
                }
            });
            fwTest.fillSelect();
            var done = assert.async();
            setTimeout(function() {
                assert.equal(fwTest.swFilms.length, 7);
                done();
            }, 3000);
            fwTest.swFilms = [];
            fwTest.ships = [];
            $.mockjax.clear();
        });

        QUnit.test("fillSelect() : Array of films should be sorted in order of" +
            " release",
            function(assert) {
                $.mockjax({
                    url: "https://swapi.co/api/films/",
                    contentType: "json",
                    responseText: {
                        // films can arrive from ajax call in any order
                        results: [{
                            "title": "The Force Awakens",
                            "url": "http://swapi.co/api/films/7/",
                            "release_date": "2015-12-11"
                        }, {
                            "title": "The Phantom Menace",
                            "url": "http://swapi.co/api/films/4/",
                            "release_date": "1999-05-19"
                        }, {
                            "title": "Attack of the Clones",
                            "url": "http://swapi.co/api/films/5/",
                            "release_date": "2002-05-16"
                        }, {
                            "title": "The Empire Strikes Back",
                            "url": "http://swapi.co/api/films/2/",
                            "release_date": "1980-05-17"
                        }, {
                            "title": "Revenge of the Sith",
                            "url": "http://swapi.co/api/films/6/",
                            "release_date": "2005-05-19"
                        }, {
                            "title": "Return of the Jedi",
                            "url": "http://swapi.co/api/films/3/",
                            "release_date": "1983-05-25"
                        }, {
                            "title": "A New Hope",
                            "url": "http://swapi.co/api/films/1/",
                            "release_date": "1977-05-25"
                        }]
                    }
                });
                fwTest.fillSelect();
                var done = assert.async();
                setTimeout(function() {
                    assert.equal(fwTest.swFilms[0].title, "A New Hope");
                    assert.equal(fwTest.swFilms[1].title, "The Empire Strikes Back");
                    assert.equal(fwTest.swFilms[2].title, "Return of the Jedi");
                    assert.equal(fwTest.swFilms[3].title, "The Phantom Menace");
                    assert.equal(fwTest.swFilms[4].title, "Attack of the Clones");
                    assert.equal(fwTest.swFilms[5].title, "Revenge of the Sith");
                    assert.equal(fwTest.swFilms[6].title, "The Force Awakens");
                    done();
                }, 3000);
                fwTest.swFilms = [];
                fwTest.ships = [];
                $.mockjax.clear();
            }
        );
    }
);

///*** DOM tests
QUnit.module("fwTest module DOM tests",
    function() {
        QUnit.test("Episodes in dropdown list should be in order of release with " +
            "correct data values",
            function(assert) {
                fwTest.fillSelect();
                var done = assert.async();
                setTimeout(function() {
                    // get elements from the DOM
                    var ep4Title = $("#film-titles data")[0].outerHTML;
                    var ep5Title = $("#film-titles data")[1].outerHTML;
                    var ep6Title = $("#film-titles data")[2].outerHTML;
                    var ep1Title = $("#film-titles data")[3].outerHTML;
                    var ep2Title = $("#film-titles data")[4].outerHTML;
                    var ep3Title = $("#film-titles data")[5].outerHTML;
                    var ep7Title = $("#film-titles data")[6].outerHTML;
                    assert.equal(ep4Title, '<data value="http://swapi.co/api/films/1/">A New Hope</data>');
                    assert.equal(ep5Title, '<data value="http://swapi.co/api/films/2/">The Empire Strikes Back</data>');
                    assert.equal(ep6Title, '<data value="http://swapi.co/api/films/3/">Return of the Jedi</data>');
                    assert.equal(ep1Title, '<data value="http://swapi.co/api/films/4/">The Phantom Menace</data>');
                    assert.equal(ep2Title, '<data value="http://swapi.co/api/films/5/">Attack of the Clones</data>');
                    assert.equal(ep3Title, '<data value="http://swapi.co/api/films/6/">Revenge of the Sith</data>');
                    assert.equal(ep7Title, '<data value="http://swapi.co/api/films/7/">The Force Awakens</data>');
                    done();
                }, 3000);
                fwTest.swFilms = [];
                fwTest.ships = [];
                $.mockjax.clear();
            }
        );


        QUnit.test("Selecting 'A New Hope' from dropdown should produce table" +
            " with all characters from that film (no characters removed)",
            function(assert) {
                $.mockjax({
                    url: "https://swapi.co/api/films/1/",
                    contentType: "json",
                    responseText: {
                        // A click on Episode "A New Hope" results in
                        // an ajax call that returns the following array
                        "characters": [
                            "http://swapi.co/api/people/1/",
                            "http://swapi.co/api/people/2/",
                            "http://swapi.co/api/people/3/",
                            "http://swapi.co/api/people/4/",
                            "http://swapi.co/api/people/5/",
                            "http://swapi.co/api/people/6/",
                            "http://swapi.co/api/people/7/",
                            "http://swapi.co/api/people/8/",
                            "http://swapi.co/api/people/9/",
                            "http://swapi.co/api/people/10/",
                            "http://swapi.co/api/people/12/",
                            "http://swapi.co/api/people/13/",
                            "http://swapi.co/api/people/14/",
                            "http://swapi.co/api/people/15/",
                            "http://swapi.co/api/people/16/",
                            "http://swapi.co/api/people/18/",
                            "http://swapi.co/api/people/19/",
                            "http://swapi.co/api/people/81/"
                        ]
                    }
                });

                $.mockjax({
                    url: "https://swapi.co/api/people/1/",
                    contentType: "json",
                    responseText: {
                        // A click on Episode "A New Hope" results in
                        // an ajax call that returns the following array
                        "name": "Luke Skywalker",
                        "starships": [
                            "http://swapi.co/api/starships/12/",
                            "http://swapi.co/api/starships/22/"
                        ]
                    }
                });
                
                fwTest.fillSelect();

                var done_1 = assert.async();
                setTimeout(function() {
                    // click on the "A New Hope" episode and wait for it ...
                    $("#film-titles").find("data[value='http://swapi.co/api/films/1/']").parent().parent().trigger("click");
                    done_1();
                    // wait for it some more ...
                    var done_2 = assert.async();
                    setTimeout(function() {
                        var rowLukeSkywalker = $("#Luke-Skywalker").parent()[0].outerHTML;
                        assert.equal(rowLukeSkywalker,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> Luke Skywalker</td><td id="Luke-Skywalker">X-wing, Imperial shuttle</td></tr>');
                        done_2();
                    }, 5000);
                }, 1000);
                fwTest.swFilms = [];
                fwTest.ships = [];
                $.mockjax.clear();
            }
        );
    }
);
