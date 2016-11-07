QUnit.module("Ajax method tests", {
    // before: function() {
    //     $.mockjax({
    //         url: "https://swapi.co/api/films/",
    //         contentType: "json",
    //         responseText: {
    //             results: [{}, {}, {}, {}, {}, {}, {}]
    //         }
    //     });
    // },
    // after: function() {
    //     $.mockjax.clear();
    // }
}, function() {
    QUnit.test("fwTest.fillSelect() : Array of films has length of 7", function(assert) {
        $.mockjax({
            url: "https://swapi.co/api/films/",
            contentType: "json",
            responseText: {
                results: [{}, {}, {}, {}, {}, {}, {}]
            }
        });
        //*** fwTest.fillSelect method test
        fwTest.fillSelect();
        var done = assert.async();
        setTimeout(function() {
            //   //  $.when($.getJSON("https://swapi.co/api/films/"))
            //     //    .then(function(data) {
            //       //      console.log(data.results);
            //         //    $.merge(fwTest.swFilms, data.results);
            //             assert.equal(fwTest.swFilms.length, 7);
            //         //});
            //
            assert.equal(fwTest.swFilms.length, 7);
            done();
        }, 1000);
        $.mockjax.clear();
    });

    // QUnit.test("First film in array should be 'A New Hope'", function(assert) {
    //     var done = assert.async();
    //     setTimeout(function() {
    //         assert.equal(fwTest.swFilms[0].title, "A New Hope");
    //         done();
    //     }, 1000);
    // });

    // QUnit.test("Last film should be 'The Force Awakens'", function(assert) {
    //     var done = assert.async();
    //     setTimeout(function() {
    //         assert.equal(fwTest.swFilms[6].title, "The Force Awakens");
    //         done();
    //     }, 1000);
    // });

    // QUnit.test("Films in dropdown should be listed in order of release date", function(assert) {
    //     var done = assert.async();
    //     setTimeout(function() {
    //         assert.equal(fwTest.swFilms[0].title, "A New Hope");
    //         assert.equal(fwTest.swFilms[6].title, "The Force Awakens");
    //         done();
    //     }, 1000);
    // });

    // QUnit.test("Episode titles in DOM dropdown list should be in order of release date", function(assert) {
    //     // console.log($("#ep-title").html());
    //     // get html from first child of dropdown list
    //     var done = assert.async();
    //     setTimeout(function() {
    //         var ep4Title = $("#film-titles data")[0].outerHTML;
    //         var ep5Title = $("#film-titles data")[1].outerHTML;
    //         var ep6Title = $("#film-titles data")[2].outerHTML;
    //         var ep1Title = $("#film-titles data")[3].outerHTML;
    //         var ep2Title = $("#film-titles data")[4].outerHTML;
    //         var ep3Title = $("#film-titles data")[5].outerHTML;
    //         var ep7Title = $("#film-titles data")[6].outerHTML;
    //         assert.equal(ep4Title, '<data value="http://swapi.co/api/films/1/">A New Hope</data>');
    //         assert.equal(ep5Title, '<data value="http://swapi.co/api/films/2/">The Empire Strikes Back</data>');
    //         assert.equal(ep6Title, '<data value="http://swapi.co/api/films/3/">Return of the Jedi</data>');
    //         assert.equal(ep1Title, '<data value="http://swapi.co/api/films/4/">The Phantom Menace</data>');
    //         assert.equal(ep2Title, '<data value="http://swapi.co/api/films/5/">Attack of the Clones</data>');
    //         assert.equal(ep3Title, '<data value="http://swapi.co/api/films/6/">Revenge of the Sith</data>');
    //         assert.equal(ep7Title, '<data value="http://swapi.co/api/films/7/">The Force Awakens</data>');
    //         done();
    //     }, 1000);


    // });
});

// QUnit.module("Non-ajax method tests", function() {
//     QUnit.test("http url string should be converted to https url string", function(assert) {
//         assert.equal(fwTest.secureUrl("http://example.com"), "https://example.com");
//         assert.equal(fwTest.secureUrl("http://www.example.com"), "https://www.example.com");
//     });

// });
