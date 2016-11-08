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
            " with all characters from the film with correct starships (no characters removed)",
            function(assert) {
                // mockjax will not work here due to many nested ajax calls
                // so these are real ...
                fwTest.fillSelect();

                var done_1 = assert.async();
                setTimeout(function() {
                    // click on the "A New Hope" episode and wait for it ...
                    $("#film-titles").find("data[value='http://swapi.co/api/films/1/']").parent().parent().trigger("click");
                    done_1();
                    // wait for it some more ...
                    var done_2 = assert.async();
                    setTimeout(function() {
                        var rowSkywalker = $("#Luke-Skywalker").parent()[0].outerHTML;
                        var rowPorkins = $("#Jek-Tono-Porkins").parent()[0].outerHTML;
                        var rowAntilles = $("#Wedge-Antilles").parent()[0].outerHTML;
                        var rowSolo = $("#Han-Solo").parent()[0].outerHTML;
                        var rowChewbacca = $("#Chewbacca").parent()[0].outerHTML;
                        var rowDarklighter = $("#Biggs-Darklighter").parent()[0].outerHTML;
                        var rowKenobi = $("#Obi-Wan-Kenobi").parent()[0].outerHTML;
                        var rowVader = $("#Darth-Vader").parent()[0].outerHTML;
                        var rowTiure = $("#Jabba-Desilijic-Tiure").parent()[0].outerHTML;
                        var rowRAntilles = $("#Raymus-Antilles").parent()[0].outerHTML;
                        var rowGreedo = $("#Greedo").parent()[0].outerHTML;
                        var rowD4 = $("#R5-D4").parent()[0].outerHTML;
                        var rowTarkin = $("#Wilhuff-Tarkin").parent()[0].outerHTML;
                        var rowLars = $("#Owen-Lars").parent()[0].outerHTML;
                        var rowOrgana = $("#Leia-Organa").parent()[0].outerHTML;
                        var rowC3PO = $("#C-3PO").parent()[0].outerHTML;
                        var rowlars = $("#Beru-Whitesun-lars").parent()[0].outerHTML;
                        var rowD2 = $("#R2-D2").parent()[0].outerHTML;
                        assert.equal(rowSkywalker,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> Luke Skywalker</td><td id="Luke-Skywalker">X-wing, Imperial shuttle</td></tr>');
                        assert.equal(rowPorkins,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> Jek Tono Porkins</td><td id="Jek-Tono-Porkins">X-wing</td></tr>');
                        assert.equal(rowAntilles,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> Wedge Antilles</td><td id="Wedge-Antilles">X-wing</td></tr>');
                        assert.equal(rowSolo,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> Han Solo</td><td id="Han-Solo">Millennium Falcon, Imperial shuttle</td></tr>');
                        assert.equal(rowChewbacca,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> Chewbacca</td><td id="Chewbacca">Millennium Falcon, Imperial shuttle</td></tr>');
                        assert.equal(rowDarklighter,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> Biggs Darklighter</td><td id="Biggs-Darklighter">X-wing</td></tr>');
                        assert.equal(rowKenobi,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> Obi-Wan Kenobi</td><td id="Obi-Wan-Kenobi">Jedi starfighter, Trade' +
                            ' Federation cruiser, Naboo star skiff, Jedi Interceptor, Belbullab-22 starfighter</td></tr>');
                        assert.equal(rowVader,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> Darth Vader</td><td id="Darth-Vader">TIE Advanced x1</td></tr>');
                        assert.equal(rowTiure,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> Jabba Desilijic Tiure</td><td id="Jabba-Desilijic-Tiure"></td></tr>');
                        assert.equal(rowRAntilles,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> Raymus Antilles</td><td id="Raymus-Antilles"></td></tr>');
                        assert.equal(rowGreedo,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> Greedo</td><td id="Greedo"></td></tr>');
                        assert.equal(rowD4,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> R5-D4</td><td id="R5-D4"></td></tr>');
                        assert.equal(rowTarkin,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> Wilhuff Tarkin</td><td id="Wilhuff-Tarkin"></td></tr>');
                        assert.equal(rowLars,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> Owen Lars</td><td id="Owen-Lars"></td></tr>');
                        assert.equal(rowOrgana,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> Leia Organa</td><td id="Leia-Organa"></td></tr>');
                        assert.equal(rowC3PO,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> C-3PO</td><td id="C-3PO"></td></tr>');
                        assert.equal(rowlars,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> Beru Whitesun lars</td><td id="Beru-Whitesun-lars"></td></tr>');
                        assert.equal(rowD2,
                            '<tr><td><a href="#"><span class="glyphicon glyphicon-remove"></span>' +
                            '</a> R2-D2</td><td id="R2-D2"></td></tr>');

                        done_2();
                    }, 10000);
                }, 1000);
                fwTest.swFilms = [];
                fwTest.ships = [];
                //$.mockjax.clear();
            }
        );
    }
);
