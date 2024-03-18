

-- migrate:up

 create table restaurant (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    profile VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    lat int,
    long int,
    created_by  SERIAL  NOT NULL,
    updated_by  SERIAL NOT NULL    
 );

 create table category (
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
 );

insert into category(name) values ('Gujarati');
insert into category(name) values ('Punjabi');
insert into category(name) values ('South Indian');
insert into category(name) values ('Japanese');
insert into category(name) values ('Italian');
insert into category(name) values ('Chinese');
insert into category(name) values ('Desserts');
insert into category(name) values ('Beverages');


create table sub_category(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  category_id SERIAL NOT NULL,
   CONSTRAINT fk_special
   FOREIGN KEY(category_id)   
   REFERENCES category(id) 
);

insert into sub_category(name, category_id) values ('rice', 1);
insert into sub_category(name, category_id) values ('dal/kadhi', 1);
insert into sub_category(name, category_id) values ('roti', 1);
insert into sub_category(name, category_id) values ('gujarati_veg', 1);
insert into sub_category(name, category_id) values ('breakfast', 1);


insert into sub_category(name, category_id) values ('veg_Special', 2);
insert into sub_category(name, category_id) values ('Paneer_Special', 2);
insert into sub_category(name, category_id) values ('Rice_Special', 2);
insert into sub_category(name, category_id) values ('Fix_Thali', 2);
insert into sub_category(name, category_id) values ('Dal', 2);
insert into sub_category(name, category_id) values ('Chapati/roti', 2);
insert into sub_category(name, category_id) values ('starter', 2);


insert into sub_category(name, category_id) values ('Dosa', 3);
insert into sub_category(name, category_id) values ('UTTAPAM', 3);
insert into sub_category(name, category_id) values ('IDLI', 3);
insert into sub_category(name, category_id) values ('VADA', 3);
insert into sub_category(name, category_id) values ('Rasam', 3);
insert into sub_category(name, category_id) values ('Paayasam', 3);
insert into sub_category(name, category_id) values ('Rice-Bath', 3);
insert into sub_category(name, category_id) values ('PALYA', 3);
insert into sub_category(name, category_id) values ('Sambhar', 3);


insert into sub_category(name, category_id) values ('Sushi', 4);
insert into sub_category(name, category_id) values ('Ramen', 4);
insert into sub_category(name, category_id) values ('Oden', 4);
insert into sub_category(name, category_id) values ('Soup ', 4);
insert into sub_category(name, category_id) values ('Yakitori', 4);
insert into sub_category(name, category_id) values ('Rice-Items', 4);
insert into sub_category(name, category_id) values ('Sashimi', 4);
insert into sub_category(name, category_id) values ('Tempara', 4);


insert into sub_category(name, category_id) values ('Bread-Items', 5);
insert into sub_category(name, category_id) values ('Pasta', 5);
insert into sub_category(name, category_id) values ('Pizzas', 5);
insert into sub_category(name, category_id) values ('Lasagna', 5);
insert into sub_category(name, category_id) values ('Rissoto', 5);
insert into sub_category(name, category_id) values ('Focaccia', 5);
insert into sub_category(name, category_id) values ('Arancini', 5);
insert into sub_category(name, category_id) values ('Ossobuco', 5);
insert into sub_category(name, category_id) values ('Truffles', 5);


insert into sub_category(name, category_id) values ('Soup', 6);
insert into sub_category(name, category_id) values ('Noodles', 6);
insert into sub_category(name, category_id) values ('AppeTizers', 6);
insert into sub_category(name, category_id) values ('Chowmein', 6);
insert into sub_category(name, category_id) values ('Lo-main', 6);
insert into sub_category(name, category_id) values ('Chicken', 6);
insert into sub_category(name, category_id) values ('Fish-Items', 6);


insert into sub_category(name, category_id) values ('Cake', 7);
insert into sub_category(name, category_id) values ('Ice-Cream', 7);
insert into sub_category(name, category_id) values ('Donuts', 7);
insert into sub_category(name, category_id) values ('Confection', 7);
insert into sub_category(name, category_id) values ('Frozen', 7);
insert into sub_category(name, category_id) values ('Gelatin', 7);
insert into sub_category(name, category_id) values ('Pastries', 7);
insert into sub_category(name, category_id) values ('Cookies', 7);
insert into sub_category(name, category_id) values ('Chocolate', 7);
insert into sub_category(name, category_id) values ('Cheesecake', 7);
insert into sub_category(name, category_id) values ('Candies', 7);
insert into sub_category(name, category_id) values ('Pies', 7);
insert into sub_category(name, category_id) values ('Yogurt', 7);


insert into sub_category(name, category_id) values ('Beer', 8);
insert into sub_category(name, category_id) values ('Energy-drink', 8);
insert into sub_category(name, category_id) values ('Hot-chocolate', 8);
insert into sub_category(name, category_id) values ('Cider', 8);
insert into sub_category(name, category_id) values ('Coffee', 8);
insert into sub_category(name, category_id) values ('Wine', 8);
insert into sub_category(name, category_id) values ('Tea', 8);


 create table restaurant_menu (
   id SERIAL PRIMARY KEY,
   category_id SERIAL NOT NULL,
   restaurant_id SERIAL NOT NULL,
   dish_name VARCHAR(255) NOT NULL,
   description VARCHAR(255) NOT NULL,
   price DECIMAL(10,2) NOT NULL,
   createdBy VARCHAR(255) NOT NULL,
   updatedBy VARCHAR(255) NOT NULL,
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
   updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   sub_category_id SERIAL ,
   CONSTRAINT fk_menu
   FOREIGN KEY(category_id)   
   REFERENCES category(id) ,
   FOREIGN KEY(restaurant_id)
   REFERENCES restaurant(id),
   FOREIGN KEY(sub_category_id)
   REFERENCES sub_category(id)
   
 );

-- migrate:down

DROP TABLE IF EXISTS restaurant;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS restaurant_menu
