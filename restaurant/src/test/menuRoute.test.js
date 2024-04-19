const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const app = require("../../app.js")
const { MENU, GETMENU, TOKEN } = require('../../constants.js')



context('Menu', () => {

    let token = TOKEN;
    //let's set up the data we need to pass to the login method

    describe('/Menu/add', () => {
        it('add Menu', (done) => {
            chai.request(app)
                .post('/foodApp/menu/add')
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(MENU)
                .end((err, res) => {
                    const data = res.body
                    if (res.status == 200) {
                        expect(res).to.have.status(200);
                        expect(data).to.haveOwnProperty("message");
                        expect(data.restaurant_menu).to.include({
                            restaurant_id: 5,
                            category_id: 2,
                            dish_name: "jira",
                            description: "snakes",
                            price: "300.00",
                            sub_category_id: 12,
                        })
                    }
                    else {
                        expect(res).to.have.status(500);
                        expect(data).to.have.keys(["message", "stack", "status", "success"])
                        expect(data).to.have.property("message", "Token is Invalid")
                    }

                    done(err);
                })
        })
    })

    describe('/getMenu', () => {
        it('get Menu', (done) => {
            chai.request(app)
                .get('/foodApp/menu')
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .query(GETMENU)
                .end((err, res) => {
                    const data = res.body
                    if (res.status == 200) {
                        expect(data.Menu[0]).to.have.keys(["id", "dish_name", "price"])
                    }
                    else {
                        expect(res).to.have.status(500);
                        expect(data).to.have.keys(["message", "stack", "status", "success"])
                        expect(data).to.have.property("message", "Token is Invalid")
                    }
                    done(err);
                })
        })
    })

    describe('/getMenuById', () => {
        it('get Menu By Id', (done) => {
            let id = 61
            chai.request(app)
                .get(`/foodApp/menu/${id}`)
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    const data = res.body
                    if (res.status == 200) {
                        expect(data.Item[0]).to.have.keys(["id", "category_id", "restaurant_id", "dish_name", "description", "price", "createdby", "updatedby", "createdat", "updatedat", "sub_category_id"])
                    }
                    else if (res.status == 404) {
                        expect(data).to.have.keys(["message", "stack", "status", "success"])
                        expect(data).to.have.property("message", "Menu Not Found")
                    }
                    else {
                        expect(res).to.have.status(500);
                        expect(data).to.have.keys(["message", "stack", "status", "success"])
                        expect(data).to.have.property("message", "Token is Invalid")
                    }
                    done(err);
                })
        })
    })

    describe('/updateMenuById', () => {
        it('update Menu By Id', (done) => {
            let id = 84
            chai.request(app)
                .patch(`/foodApp/menu/update/${id}`)
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(MENU)
                .end((err, res) => {
                    const data = res.body
                    if (res.status == 200) {
                        expect(data).to.have.property("message", "Restaurant updated Successfully")

                    }
                    else if (res.status == 404) {
                        expect(data).to.have.keys(["message", "stack", "status", "success"])
                        expect(data).to.have.property("message", "Menu Not Found")
                    }
                    else {
                        expect(res).to.have.status(500);
                        expect(data).to.have.keys(["message", "stack", "status", "success"])
                        expect(data).to.have.property("message", "Token is Invalid")
                    }
                    done(err);
                })
        })
    })

    describe('/deleteMenuById', () => {
        it('delete Menu By Id', (done) => {
            let id = 84
            chai.request(app)
                .delete(`/foodApp/menu/delete/${id}`)
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    const data = res.body
                    if (res.status == 200) {
                        expect(data).to.have.property("message", "Deleted Successfully")

                    }
                    else if (res.status == 404) {
                        expect(data).to.have.keys(["message", "stack", "status", "success"])
                        expect(data).to.have.property("message", "Menu Not Found")
                    }
                    else {
                        expect(res).to.have.status(500);
                        expect(data).to.have.keys(["message", "stack", "status", "success"])
                        expect(data).to.have.property("message", "Token is Invalid")
                    }
                    done(err);
                })
        })
    })


})