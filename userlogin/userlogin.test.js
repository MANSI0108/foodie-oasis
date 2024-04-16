const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const app = require("./app.js")


describe('userlogin', () => {

    let token;
    //let's set up the data we need to pass to the login method
    const userCredentials = {
        username: 'Mansid',
        password: 123456789,
        email: 'Ms1v23@gmail.com',
        phone: 7539514552,
        role: 'customer'
    }

    context('/register', () => {
        it('register user', (done) => {
            chai.request(app)
                .post('/foodApp/register')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(userCredentials)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    done(err);
                })
        })
    })



    context('/login', () => {
        it('login user', (done) => {
            chai.request(app)
                .post('/foodApp/login')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(userCredentials)
                .end(async (err, res) => {

                    expect(res).to.have.status(200);
                    token = res.body.accessToken;
                    done(err)
                })


        })

    })


    context('/currentuser', () => {
        it('cuurent user', (done) => {

            chai.request(app)
                .get('/foodApp/currentuser')
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);    // <= Test completes before this runs
                    done(err)
                });


        })

    })

    context('/verify-email', () => {
        it('verified-user', (done) => {
            chai.request(app)
                .post('/foodApp/verify-email')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({
                    email: "Ms1v23@gmail.com",
                    OTP: "123456"
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done(err);
                })



        })

    })



})