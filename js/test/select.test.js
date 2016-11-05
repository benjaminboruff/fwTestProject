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

    QUnit.test("The first film released should be 'A New Hope", function(assert) {
        var done = assert.async();
        setTimeout(function() {
            assert.equal(fwTest.swFilms[0].title, "A New Hope");
            done();
        }, 1000);
    });

    QUnit.test("The last film released should be 'The Force Awakens'", function(assert) {
        var done = assert.async();
        setTimeout(function() {
            assert.equal(fwTest.swFilms[6].title, "The Force Awakens");
            done();
        }, 1000);
    });

    QUnit.test("Selected episode title should be inserted into the DOM above table", function(assert) {

        var done = assert.async();
        setTimeout(function() {
            console.log($("#ep-title").html());

            // get html from first child of dropdown list
            var epTitle = $("#film-titles data").html();
            assert.equal(epTitle, "A New Hope");
            done();
        }, 1000);


    });
});

QUnit.module("fwTest non-async method tests", function() {
    QUnit.test("http url string should be converted to https url string", function(assert) {
        assert.equal(fwTest.secureUrl("http://example.com"), "https://example.com");
        assert.equal(fwTest.secureUrl("http://www.example.com"), "https://www.example.com");
    });

});
