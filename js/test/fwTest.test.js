QUnit.module("fwTest module non-ajax-JS method tests", function() {
    QUnit.test("secureUrl(url) : http url should convert to https url", function(assert) {
        assert.equal(fwTest.secureUrl("http://example.com"), "https://example.com");
        assert.equal(fwTest.secureUrl("http://www.example.com"), "https://www.example.com");
    });
});

QUnit.module("fwTest module ajax-JS method tests", {
        before: function() {
            // fillSelect() is the main function that kick-starts
            // the entire app
            fwTest.fillSelect();
        },
        after: function() {
            // the swFilms, removedCharList, and ships are fwTest module
            // variables that must be reset after each test
            fwTest.swFilms = [];
            fwTest.removeCharList = [];
            fwTest.ships = [];
            $.mockjax.clear();
        }
    },
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
            var done = assert.async();
            setTimeout(function() {
                assert.equal(fwTest.swFilms.length, 7);
                done();
            }, 2000);
            $.mockjax.clear();
        });

        QUnit.test("fillSelect() : Array of films should be sorted in order of release", function(assert) {
            $.mockjax({
                url: "https://swapi.co/api/films/",
                contentType: "json",
                responseText: {
                    // films can arrive from ajax call in any order
                    results: [{
                        "title": "The Force Awakens"
                    }, {
                        "title": "The Phantom Menace"
                    }, {
                        "title": "Attack of the Clones"
                    }, {
                        "title": "The Empire Strikes Back"
                    }, {
                        "title": "Revenge of the Sith"
                    }, {
                        "title": "Return of the Jedi"
                    }, {
                        "title": "A New Hope"
                    }]
                }
            });
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
            }, 2000);
        });
    }
);

///*** DOM tests
QUnit.module("fwTest module DOM tests", {
        before: function() {
            // fillSelect() is the main function that kick-starts
            // the entire app
            fwTest.fillSelect();
        },
        after: function() {
            fwTest.swFilms = [];
            $.mockjax.clear();
        }
    },
    function() {
        QUnit.test("Episodes in dropdown list should be in order of release", function(assert) {
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
            }, 2000);
        });
    }
);
