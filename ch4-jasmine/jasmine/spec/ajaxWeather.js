
describe('Using mock-ajax', () => {

    beforeEach(() => {
        jasmine.Ajax.install();
    });


    afterEach(() => {
        jasmine.Ajax.uninstall();
    });


    it('Checking weather report with AJAX API', () => {
        var successFuction = jasmine.createSpy("success");
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (args) {
            if (this.readyState == this.DONE) {
                successFuction(this.responseText);
            }
        };
        xhr.open("GET", "/get/weather/IN-Mumbai");
        xhr.send();

        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/get/weather/IN-Mumbai');

        expect(successFuction).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 200,
            "contentType": 'text/plain',
            "responseText": 'Temp 25 C, Sunlight'
        });

        expect(successFuction).toHaveBeenCalledWith('Temp 25 C, Sunlight');

    });
});
