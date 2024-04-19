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

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiJDb3NpbmUwOCIsInJvbGUiOiJvd25lciIsImlhdCI6MTcxMzUwNTY5OCwiZXhwIjoxNzEzNTA2Mjk4fQ.I9tHrVaAN_nhJBhlR6S-icfnhaMuLMUEmX103mFuiw8'


module.exports={MENU, GETMENU, TOKEN}
