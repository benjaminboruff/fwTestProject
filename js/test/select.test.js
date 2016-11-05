QUnit.module("fwTest async method tests", {
    before: fwTest.fillSelect()
}, function() {
    QUnit.test("Array of sorted films has length of 7", function(assert) {
        var done = assert.async();
        setTimeout(function() {
            assert.equal(fwTest.swFilms.length, 7);
            done();
        }, 1000);
    });

    QUnit.test("First film in array should be 'A New Hope'", function(assert) {
        var done = assert.async();
        setTimeout(function() {
            assert.equal(fwTest.swFilms[0].title, "A New Hope");
            done();
        }, 1000);
    });

    QUnit.test("Last film should be 'The Force Awakens'", function(assert) {
        var done = assert.async();
        setTimeout(function() {
            assert.equal(fwTest.swFilms[6].title, "The Force Awakens");
            done();
        }, 1000);
    });

    QUnit.test("First episode title in the DOM's dropdown list should be 'A New Hope'", function(assert) {
        console.log($("#ep-title").html());
        // get html from first child of dropdown list
        var done = assert.async();
        setTimeout(function() {
            var epTitle = $("#film-titles data").html();
            assert.equal(epTitle, "A New Hope");
            done();
        }, 5000);


    });
});

QUnit.module("fwTest non-async method tests", function() {
    QUnit.test("http url string should be converted to https url string", function(assert) {
        assert.equal(fwTest.secureUrl("http://example.com"), "https://example.com");
        assert.equal(fwTest.secureUrl("http://www.example.com"), "https://www.example.com");
    });

});
