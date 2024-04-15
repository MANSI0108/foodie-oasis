SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: orderitems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orderitems (
    id integer NOT NULL,
    orderid integer NOT NULL,
    itemid integer NOT NULL,
    itemname character varying(255) NOT NULL,
    itemprice integer NOT NULL
);


--
-- Name: orderitems_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orderitems_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orderitems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orderitems_id_seq OWNED BY public.orderitems.id;


--
-- Name: orderitems_itemid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orderitems_itemid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orderitems_itemid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orderitems_itemid_seq OWNED BY public.orderitems.itemid;


--
-- Name: orderitems_orderid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orderitems_orderid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orderitems_orderid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orderitems_orderid_seq OWNED BY public.orderitems.orderid;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    userid integer NOT NULL,
    restaurantid integer NOT NULL,
    total_amount integer NOT NULL,
    razorpay_payment_id character varying(255),
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: orders_restaurantid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_restaurantid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_restaurantid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_restaurantid_seq OWNED BY public.orders.restaurantid;


--
-- Name: orders_userid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_userid_seq OWNED BY public.orders.userid;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(128) NOT NULL
);


--
-- Name: orderitems id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orderitems ALTER COLUMN id SET DEFAULT nextval('public.orderitems_id_seq'::regclass);


--
-- Name: orderitems orderid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orderitems ALTER COLUMN orderid SET DEFAULT nextval('public.orderitems_orderid_seq'::regclass);


--
-- Name: orderitems itemid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orderitems ALTER COLUMN itemid SET DEFAULT nextval('public.orderitems_itemid_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: orders userid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN userid SET DEFAULT nextval('public.orders_userid_seq'::regclass);


--
-- Name: orders restaurantid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN restaurantid SET DEFAULT nextval('public.orders_restaurantid_seq'::regclass);


--
-- Name: orderitems orderitems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orderitems
    ADD CONSTRAINT orderitems_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: orderitems fk_special; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orderitems
    ADD CONSTRAINT fk_special FOREIGN KEY (orderid) REFERENCES public.orders(id);


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20240322042035');
