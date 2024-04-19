const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const app = require("../../app.js")
const fs = require("fs")
const { TOKEN, GETRESTAURANT, RESTAURANT } = require('../../constants.js')



context('Restaurant', () => {

    let token = TOKEN
    //let's set up the data we need to pass to the login method

    describe('/restaurant/register', () => {
        it('add Restaurant', (done) => {

            chai.request(app)
                .post('/foodApp/restaurant/register')
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .field('Content-Type', 'multipart/form-data')
                .field('name', "hhf")
                .field('email', "h123@gmail.com")
                .field('address', "dwqjdiuhui")
                .field('lat', 5)
                .field('long', 5)
                .attach('profile', fs.readFileSync('./src/test/td.png'), 'preview.png')
                .end((err, res) => {
                    const data = res.body
                    if (res.status == 200) {
                        expect(res).to.have.status(200);
                        expect(data).to.haveOwnProperty("message");
                        expect(data).to.haveOwnProperty("profile_url");
                        expect(data).to.haveOwnProperty("restaurant");
                        expect(data.restaurant).to.have.keys(["id", "name", "email", "profile", "address", "lat", "long", "created_by", "updated_by"])
                    }
                    else if (res.status == 302) {
                        expect(data).to.have.keys(["message", "stack", "status", "success"])
                        expect(data).to.have.property("message", "Restaurant is already exist")
                    }
                    else {
                        expect(data).to.have.keys(["message", "stack", "status", "success"])
                        expect(data).to.have.property("message", "Token is Invalid")
                    }

                    done(err);
                })
        })


        it('Token is Not Passed to Test VerifyToken', (done) => {
            chai.request(app)
                .post('/foodApp/restaurant/register')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    const data = res.body
                    expect(res).to.have.status(500);
                    expect(data).to.have.keys(["message", "stack", "status", "success"])
                    expect(data).to.have.property("message", "Access token is missing")

                    done(err);
                })
        })
    })

    describe('/getRestaurant', () => {
        it('get Restaurant', (done) => {
            chai.request(app)
                .get('/foodApp/restaurant')
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .query(GETRESTAURANT)
                .end((err, res) => {
                    const data = res.body
                    if (res.status == 200) {
                        console.log("ok1");
                        expect(data).to.have.property("restaurants")
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
                .get('/foodApp/restaurant')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .query(GETRESTAURANT)
                .end((err, res) => {
                    const data = res.body
                    expect(res).to.have.status(500);
                    expect(data).to.have.keys(["message", "stack", "status", "success"])
                    expect(data).to.have.property("message", "Access token is missing")

                    done(err);
                })
        })
    })

    describe('/updateRestaurantById', () => {
        it('update Restaurant By Id', (done) => {
            let id = 26
            chai.request(app)
                .patch(`/foodApp/restaurant/update/${id}`)
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .field('Content-Type', 'multipart/form-data')
                .field('name', "hhf")
                .field('email', "hu@gmail.com")
                .field('address', "dwqjdiuhui")
                .field('lat', 5)
                .field('long', 5)
                .attach('profile', fs.readFileSync('./src/test/td.png'), 'preview.png')
                .end((err, res) => {
                    const data = res.body
                    if (res.status == 200) {
                        console.log("ok1");
                        expect(data).to.have.property("message", "Restaurant updated Successfully")

                    }
                    else if (res.status == 404) {
                        expect(data).to.have.keys(["message", "stack", "status", "success"])
                        expect(data).to.have.property("message", "Restuarant not Found")
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
            let id = 61
            chai.request(app)
                .patch(`/foodApp/restaurant/update/${id}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(RESTAURANT)
                .end((err, res) => {
                    const data = res.body
                    expect(res).to.have.status(500);
                    expect(data).to.have.keys(["message", "stack", "status", "success"])
                    expect(data).to.have.property("message", "Access token is missing")

                    done(err);
                })
        })
    })

    describe('/deleteRestaurantById', () => {
        it('delete restaurant By Id', (done) => {
            let id = 24
            chai.request(app)
                .delete(`/foodApp/restaurant/delete/${id}`)
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    const data = res.body
                    if (res.status == 200) {
                        console.log("ok1");
                        expect(data).to.have.property("message", "Deleted Successfully")

                    }
                    else if (res.status == 404) {
                        expect(data).to.have.keys(["message", "stack", "status", "success"])
                        expect(data).to.have.property("message", "Restaurant not found")
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
            let id = 61
            chai.request(app)
                .delete(`/foodApp/restaurant/delete/${id}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
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