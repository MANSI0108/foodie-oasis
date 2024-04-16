const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const app = require("../../app.js")


describe('Menu', () => {

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiJDb3NpbmUwOCIsInJvbGUiOiJvd25lciIsImlhdCI6MTcxMzI3Mjk4NywiZXhwIjoxNzEzMjczNTg3fQ.S9_8EgrMmlkk-iyOdy4IaBDn20lfMSDSGkvBKvM09Vo';
    //let's set up the data we need to pass to the login method
    const Menu = {
        restaurant_id: 5,
        category_id: 2,
        dish_name: "jira",
        description: "snakes",
        price: "300.00",
        sub_category_id: 12,
    }

    const getMenu = {
        sort: true,
        sortBy: "id",
        sortType: "desc",
        search: "j",
        restaurant_id: 5,
        category_id: 2,
        sub_category_id: 12,
        page: 1
    }

    context('/Menu/add', () => {
        it('add Menu', (done) => {
            chai.request(app)
                .post('/foodApp/menu/add')
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(Menu)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done(err);
                })
        })
    })

    context('/getMenu', () => {
        it('get Menu', (done) => {
            chai.request(app)
                .get('/foodApp/menu')
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .query(getMenu)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done(err);
                })
        })
    })

    context('/getMenuById', () => {
        it('get Menu By Id', (done) => {
            let id = 52
            chai.request(app)
                .get(`/foodApp/menu/${id}`)
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done(err);
                })
        })
    })

    context('/updateMenuById', () => {
        it('update Menu By Id', (done) => {
            let id = 52
            chai.request(app)
                .patch(`/foodApp/menu/update/${id}`)
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(Menu)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done(err);
                })
        })
    })

    context('/deleteMenuById', () => {
        it('delete Menu By Id', (done) => {
            let id = 52
            chai.request(app)
                .delete(`/foodApp/menu/delete/${id}`)
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done(err);
                })
        })
    })


})