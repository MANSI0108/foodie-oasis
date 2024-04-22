const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const app = require("../../app.js")




context('Cart', () => {

    let token = "your-token"
    //let's set up the data we need to pass to the login method

    describe('/cart/add', () => {
        it('Add To Cart', (done) => {
            let id = 53;
            chai.request(app)
                .post(`/foodApp/cart/add/${id}`)
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    const data = res.body
                    if (res.status == 200) {
                        expect(res).to.have.status(200);
                        expect(data).to.have.keys(["Massege", "container"])
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
            let id = 53;
            chai.request(app)
                .post(`/foodApp/cart/add/${id}`)
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


    describe('/cart', () => {
        it('Get Cart', (done) => {
            chai.request(app)
                .get(`/foodApp/cart`)
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    const data = res.body

                    if (res.status == 200) {
                        expect(res).to.have.status(200);
                        expect(data).to.have.keys(["Message"])
                    }
                    
                    else if (res.status==201){
                        expect(res).to.have.status(201);
                        expect(data).to.have.keys(["items", "updated_by"])
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
                .get(`/foodApp/cart`)
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
    
    describe('/cart/delete', () => {
        it('Delete To Cart', (done) => {
            chai.request(app)
                .delete(`/foodApp/cart/delete`)
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    const data = res.body
                    console.log(data);
                    if (res.status == 200) {
                        expect(res).to.have.status(200);
                        expect(data).to.have.keys(["Message"])
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
                .delete(`/foodApp/cart/delete`)
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