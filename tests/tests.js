const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const router = require('../controllers/item-controllers');

chai.use(chaiHttp);

//Tester om applikationen henter varerne under varekategori korrekt
describe('Items', function () {
    describe('Get /showItems', function() {
        it('should return an array', function (done) {
            chai
            .request(router)
            .get('/showItems')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res.body).to.be.an('array')
                done();
            });
        });
        it('should respond status code 200 ', function (done) {
            chai
            .request(router)
            .get('/showItems')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res.status).to.equal(200)
                done();
            });
        });
    });
    
})