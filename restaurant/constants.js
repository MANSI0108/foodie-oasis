const MENU = {
    restaurant_id: 5,
    category_id: 2,
    dish_name: "jira",
    description: "snakes",
    price: "300.00",
    sub_category_id: 12,
}

const GETMENU = {
    sort: true,
    sortBy: "id",
    sortType: "desc",
    search: "j",
    restaurant_id: 5,
    category_id: 2,
    sub_category_id: 12,
    page: 1
}

const GETRESTAURANT = {
    sort: true,
    sortBy: "id",
    sortType: "asc",
    search: "",
    page: 1
}

const RESTAURANT = {
    name:"Bunglow cafe1",
    email:"bq13@gmail.com",
    address:"Vesu",
    lat:5,
    long:8
}

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiJDb3NpbmUwOCIsInJvbGUiOiJvd25lciIsImlhdCI6MTcxMzc1ODg2MSwiZXhwIjoxNzEzNzU5NDYxfQ.ugVHqaVFVFt7b9ljgBHDAtgEJFMxwD3AxAj8oKMU0yA"


module.exports = { MENU, GETMENU, TOKEN, GETRESTAURANT, RESTAURANT }
