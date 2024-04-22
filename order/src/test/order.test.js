const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const app = require("../../app.js")




context('Order', () => {

    let token = "your-token"
    //let's set up the data we need to pass to the login method

    describe('/order', () => {
        it('get Order', (done) => {
            chai.request(app)
                .get('/foodApp/order')
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    const data = res.body
                    if (res.status == 200) {
                        expect(res).to.have.status(200);
                        expect(data).to.have.keys(["items", "orderID", "total_amount"])
                    }
                    else {
                        expect(res).to.have.status(500);
                        expect(data).to.have.keys(["message", "stack", "status", "success"])
                        expect(data).to.have.property("message", "Token is Invalid")
                    }

                    done(err);
                })
        })


        it('Token is Not Passed to Test VerifyToken', (done) => {

            chai.request(app)
                .get('/foodApp/order')
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    const data = res.body
                    expect(res).to.have.status(500);
                    expect(data).to.have.keys(["message", "stack", "status", "success"])
                    expect(data).to.have.property("message", "Access token is missing")

                    done(err);
                })
        })



    })




})