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
-- Name: category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: restaurant; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.restaurant (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    profile character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    lat integer,
    long integer,
    created_by integer NOT NULL,
    updated_by integer NOT NULL
);


--
-- Name: restaurant_created_by_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.restaurant_created_by_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: restaurant_created_by_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.restaurant_created_by_seq OWNED BY public.restaurant.created_by;


--
-- Name: restaurant_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.restaurant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: restaurant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.restaurant_id_seq OWNED BY public.restaurant.id;


--
-- Name: restaurant_menu; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.restaurant_menu (
    id integer NOT NULL,
    category_id integer NOT NULL,
    restaurant_id integer NOT NULL,
    dish_name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    createdby character varying(255) NOT NULL,
    updatedby character varying(255) NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    sub_category_id integer NOT NULL
);


--
-- Name: restaurant_menu_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.restaurant_menu_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: restaurant_menu_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.restaurant_menu_category_id_seq OWNED BY public.restaurant_menu.category_id;


--
-- Name: restaurant_menu_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.restaurant_menu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: restaurant_menu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.restaurant_menu_id_seq OWNED BY public.restaurant_menu.id;


--
-- Name: restaurant_menu_restaurant_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.restaurant_menu_restaurant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: restaurant_menu_restaurant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.restaurant_menu_restaurant_id_seq OWNED BY public.restaurant_menu.restaurant_id;


--
-- Name: restaurant_menu_sub_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.restaurant_menu_sub_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: restaurant_menu_sub_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.restaurant_menu_sub_category_id_seq OWNED BY public.restaurant_menu.sub_category_id;


--
-- Name: restaurant_updated_by_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.restaurant_updated_by_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: restaurant_updated_by_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.restaurant_updated_by_seq OWNED BY public.restaurant.updated_by;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(128) NOT NULL
);


--
-- Name: sub_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sub_category (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    category_id integer NOT NULL
);


--
-- Name: sub_category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sub_category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sub_category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sub_category_category_id_seq OWNED BY public.sub_category.category_id;


--
-- Name: sub_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sub_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sub_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sub_category_id_seq OWNED BY public.sub_category.id;


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: restaurant id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurant ALTER COLUMN id SET DEFAULT nextval('public.restaurant_id_seq'::regclass);


--
-- Name: restaurant created_by; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurant ALTER COLUMN created_by SET DEFAULT nextval('public.restaurant_created_by_seq'::regclass);


--
-- Name: restaurant updated_by; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurant ALTER COLUMN updated_by SET DEFAULT nextval('public.restaurant_updated_by_seq'::regclass);


--
-- Name: restaurant_menu id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurant_menu ALTER COLUMN id SET DEFAULT nextval('public.restaurant_menu_id_seq'::regclass);


--
-- Name: restaurant_menu category_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurant_menu ALTER COLUMN category_id SET DEFAULT nextval('public.restaurant_menu_category_id_seq'::regclass);


--
-- Name: restaurant_menu restaurant_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurant_menu ALTER COLUMN restaurant_id SET DEFAULT nextval('public.restaurant_menu_restaurant_id_seq'::regclass);


--
-- Name: restaurant_menu sub_category_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurant_menu ALTER COLUMN sub_category_id SET DEFAULT nextval('public.restaurant_menu_sub_category_id_seq'::regclass);


--
-- Name: sub_category id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sub_category ALTER COLUMN id SET DEFAULT nextval('public.sub_category_id_seq'::regclass);


--
-- Name: sub_category category_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sub_category ALTER COLUMN category_id SET DEFAULT nextval('public.sub_category_category_id_seq'::regclass);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: restaurant restaurant_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurant
    ADD CONSTRAINT restaurant_email_key UNIQUE (email);


--
-- Name: restaurant_menu restaurant_menu_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurant_menu
    ADD CONSTRAINT restaurant_menu_pkey PRIMARY KEY (id);


--
-- Name: restaurant restaurant_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurant
    ADD CONSTRAINT restaurant_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sub_category sub_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sub_category
    ADD CONSTRAINT sub_category_pkey PRIMARY KEY (id);


--
-- Name: restaurant_menu fk_menu; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurant_menu
    ADD CONSTRAINT fk_menu FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- Name: sub_category fk_special; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sub_category
    ADD CONSTRAINT fk_special FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- Name: restaurant_menu restaurant_menu_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurant_menu
    ADD CONSTRAINT restaurant_menu_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurant(id);


--
-- Name: restaurant_menu restaurant_menu_sub_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurant_menu
    ADD CONSTRAINT restaurant_menu_sub_category_id_fkey FOREIGN KEY (sub_category_id) REFERENCES public.sub_category(id);


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20240315093503');
