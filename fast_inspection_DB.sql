PGDMP                      |           fast_inspection_db    16.0    16.0 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    131085    fast_inspection_db    DATABASE     �   CREATE DATABASE fast_inspection_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
 "   DROP DATABASE fast_inspection_db;
                postgres    false            �            1259    139377    campo    TABLE     �   CREATE TABLE public.campo (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    "nivelImportancia" integer NOT NULL,
    "herramientaAnalisisCriticidadId" integer NOT NULL,
    "configVersion" integer NOT NULL
);
    DROP TABLE public.campo;
       public         heap    postgres    false            �            1259    139328    campoDefinido    TABLE     �   CREATE TABLE public."campoDefinido" (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    tipo character varying NOT NULL,
    "tipoDeterioroConfigId" integer NOT NULL
);
 #   DROP TABLE public."campoDefinido";
       public         heap    postgres    false            �            1259    139327    campoDefinido_id_seq    SEQUENCE     �   CREATE SEQUENCE public."campoDefinido_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."campoDefinido_id_seq";
       public          postgres    false    224            �           0    0    campoDefinido_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."campoDefinido_id_seq" OWNED BY public."campoDefinido".id;
          public          postgres    false    223            �            1259    139376    campo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.campo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.campo_id_seq;
       public          postgres    false    234            �           0    0    campo_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.campo_id_seq OWNED BY public.campo.id;
          public          postgres    false    233            �            1259    139341    causa    TABLE     �   CREATE TABLE public.causa (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    "tipoDeterioroConfigId" integer NOT NULL
);
    DROP TABLE public.causa;
       public         heap    postgres    false            �            1259    139340    causa_id_seq    SEQUENCE     �   CREATE SEQUENCE public.causa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.causa_id_seq;
       public          postgres    false    226            �           0    0    causa_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.causa_id_seq OWNED BY public.causa.id;
          public          postgres    false    225                       1259    172145    config    TABLE     �   CREATE TABLE public.config (
    version integer NOT NULL,
    nombre character varying NOT NULL,
    descripcion character varying NOT NULL,
    state boolean NOT NULL
);
    DROP TABLE public.config;
       public         heap    postgres    false                       1259    172144    config_version_seq    SEQUENCE     �   CREATE SEQUENCE public.config_version_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.config_version_seq;
       public          postgres    false    258            �           0    0    config_version_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.config_version_seq OWNED BY public.config.version;
          public          postgres    false    257            �            1259    139300 	   deterioro    TABLE     �   CREATE TABLE public.deterioro (
    id integer NOT NULL,
    "idSistema" integer NOT NULL,
    "idSubSistema" integer NOT NULL,
    "idMaterial" integer NOT NULL,
    "idTipoDeterioro" integer NOT NULL,
    "levantamientoId" integer
);
    DROP TABLE public.deterioro;
       public         heap    postgres    false            �            1259    139299    deterioro_id_seq    SEQUENCE     �   CREATE SEQUENCE public.deterioro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.deterioro_id_seq;
       public          postgres    false    220            �           0    0    deterioro_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.deterioro_id_seq OWNED BY public.deterioro.id;
          public          postgres    false    219            �            1259    139278    edificacion    TABLE     �   CREATE TABLE public.edificacion (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    direccion character varying NOT NULL,
    "ubicacionX" double precision NOT NULL,
    "ubicacionY" double precision NOT NULL
);
    DROP TABLE public.edificacion;
       public         heap    postgres    false            �            1259    139277    edificacion_id_seq    SEQUENCE     �   CREATE SEQUENCE public.edificacion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.edificacion_id_seq;
       public          postgres    false    216            �           0    0    edificacion_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.edificacion_id_seq OWNED BY public.edificacion.id;
          public          postgres    false    215            �            1259    139363    herramienta    TABLE     �   CREATE TABLE public.herramienta (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    tipo character varying NOT NULL,
    "configVersion" integer NOT NULL
);
    DROP TABLE public.herramienta;
       public         heap    postgres    false            �            1259    139370    herramientaAnalisisCriticidad    TABLE     �   CREATE TABLE public."herramientaAnalisisCriticidad" (
    id integer NOT NULL,
    "configVersion" integer,
    nombre character varying NOT NULL,
    tipo character varying NOT NULL
);
 3   DROP TABLE public."herramientaAnalisisCriticidad";
       public         heap    postgres    false            �            1259    139369 $   herramientaAnalisisCriticidad_id_seq    SEQUENCE     �   CREATE SEQUENCE public."herramientaAnalisisCriticidad_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public."herramientaAnalisisCriticidad_id_seq";
       public          postgres    false    232            �           0    0 $   herramientaAnalisisCriticidad_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public."herramientaAnalisisCriticidad_id_seq" OWNED BY public."herramientaAnalisisCriticidad".id;
          public          postgres    false    231            �            1259    139362    herramienta_id_seq    SEQUENCE     �   CREATE SEQUENCE public.herramienta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.herramienta_id_seq;
       public          postgres    false    230            �           0    0    herramienta_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.herramienta_id_seq OWNED BY public.herramienta.id;
          public          postgres    false    229            �            1259    139450 	   indicador    TABLE     8  CREATE TABLE public.indicador (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    valor integer NOT NULL,
    tipo character varying NOT NULL,
    "limiteInferior" integer,
    "limiteSuperior" integer,
    "indiceCalculableIntervaloId" integer,
    "indiceCalculableSinIntervaloId" integer
);
    DROP TABLE public.indicador;
       public         heap    postgres    false            �            1259    139474    indicadorIntervalo    TABLE       CREATE TABLE public."indicadorIntervalo" (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    valor integer NOT NULL,
    "limiteInferior" integer NOT NULL,
    "limiteSuperior" integer NOT NULL,
    "indiceCalculableIntervaloId" integer
);
 (   DROP TABLE public."indicadorIntervalo";
       public         heap    postgres    false            �            1259    139473    indicadorIntervalo_id_seq    SEQUENCE     �   CREATE SEQUENCE public."indicadorIntervalo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."indicadorIntervalo_id_seq";
       public          postgres    false    250            �           0    0    indicadorIntervalo_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."indicadorIntervalo_id_seq" OWNED BY public."indicadorIntervalo".id;
          public          postgres    false    249            �            1259    139502    indicadorSinIntervalo    TABLE     �   CREATE TABLE public."indicadorSinIntervalo" (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    valor integer NOT NULL,
    "indiceCalculableSinIntervaloId" integer
);
 +   DROP TABLE public."indicadorSinIntervalo";
       public         heap    postgres    false            �            1259    139501    indicadorSinIntervalo_id_seq    SEQUENCE     �   CREATE SEQUENCE public."indicadorSinIntervalo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public."indicadorSinIntervalo_id_seq";
       public          postgres    false    254            �           0    0    indicadorSinIntervalo_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."indicadorSinIntervalo_id_seq" OWNED BY public."indicadorSinIntervalo".id;
          public          postgres    false    253            �            1259    139449    indicador_id_seq    SEQUENCE     �   CREATE SEQUENCE public.indicador_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.indicador_id_seq;
       public          postgres    false    246                        0    0    indicador_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.indicador_id_seq OWNED BY public.indicador.id;
          public          postgres    false    245            �            1259    139432    indiceCalculable    TABLE     �   CREATE TABLE public."indiceCalculable" (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    tipo character varying NOT NULL,
    "configVersion" integer NOT NULL,
    calculo integer NOT NULL
);
 &   DROP TABLE public."indiceCalculable";
       public         heap    postgres    false            �            1259    139463    indiceCalculableIntervalo    TABLE     �   CREATE TABLE public."indiceCalculableIntervalo" (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    "configVersion" integer
);
 /   DROP TABLE public."indiceCalculableIntervalo";
       public         heap    postgres    false            �            1259    139462     indiceCalculableIntervalo_id_seq    SEQUENCE     �   CREATE SEQUENCE public."indiceCalculableIntervalo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public."indiceCalculableIntervalo_id_seq";
       public          postgres    false    248                       0    0     indiceCalculableIntervalo_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public."indiceCalculableIntervalo_id_seq" OWNED BY public."indiceCalculableIntervalo".id;
          public          postgres    false    247            �            1259    139491    indiceCalculableSinIntervalo    TABLE     �   CREATE TABLE public."indiceCalculableSinIntervalo" (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    "configVersion" integer
);
 2   DROP TABLE public."indiceCalculableSinIntervalo";
       public         heap    postgres    false            �            1259    139490 #   indiceCalculableSinIntervalo_id_seq    SEQUENCE     �   CREATE SEQUENCE public."indiceCalculableSinIntervalo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public."indiceCalculableSinIntervalo_id_seq";
       public          postgres    false    252                       0    0 #   indiceCalculableSinIntervalo_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public."indiceCalculableSinIntervalo_id_seq" OWNED BY public."indiceCalculableSinIntervalo".id;
          public          postgres    false    251            �            1259    139431    indiceCalculable_id_seq    SEQUENCE     �   CREATE SEQUENCE public."indiceCalculable_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."indiceCalculable_id_seq";
       public          postgres    false    244                       0    0    indiceCalculable_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."indiceCalculable_id_seq" OWNED BY public."indiceCalculable".id;
          public          postgres    false    243            �            1259    139291    levantamiento    TABLE     �   CREATE TABLE public.levantamiento (
    id integer NOT NULL,
    "fechaInicio" timestamp without time zone NOT NULL,
    "fechaFinalizado" timestamp without time zone NOT NULL,
    "edificacionId" integer NOT NULL,
    "configVersion" integer NOT NULL
);
 !   DROP TABLE public.levantamiento;
       public         heap    postgres    false            �            1259    139290    levantamiento_id_seq    SEQUENCE     �   CREATE SEQUENCE public.levantamiento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.levantamiento_id_seq;
       public          postgres    false    218                       0    0    levantamiento_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.levantamiento_id_seq OWNED BY public.levantamiento.id;
          public          postgres    false    217            �            1259    139401    materialConfig    TABLE     �   CREATE TABLE public."materialConfig" (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    "subsistemaConfigId" integer NOT NULL
);
 $   DROP TABLE public."materialConfig";
       public         heap    postgres    false            �            1259    139400    materialConfig_id_seq    SEQUENCE     �   CREATE SEQUENCE public."materialConfig_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."materialConfig_id_seq";
       public          postgres    false    238                       0    0    materialConfig_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."materialConfig_id_seq" OWNED BY public."materialConfig".id;
          public          postgres    false    237            �            1259    139423    sistemaConfig    TABLE     �   CREATE TABLE public."sistemaConfig" (
    id integer NOT NULL,
    nombre character varying,
    "configVersion" integer NOT NULL,
    "herramientaId" integer NOT NULL
);
 #   DROP TABLE public."sistemaConfig";
       public         heap    postgres    false            �            1259    139422    sistemaConfig_id_seq    SEQUENCE     �   CREATE SEQUENCE public."sistemaConfig_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."sistemaConfig_id_seq";
       public          postgres    false    242                       0    0    sistemaConfig_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."sistemaConfig_id_seq" OWNED BY public."sistemaConfig".id;
          public          postgres    false    241            �            1259    139412    subsistemaConfig    TABLE     �   CREATE TABLE public."subsistemaConfig" (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    "sistemaConfigId" integer NOT NULL
);
 &   DROP TABLE public."subsistemaConfig";
       public         heap    postgres    false            �            1259    139411    subsistemaConfig_id_seq    SEQUENCE     �   CREATE SEQUENCE public."subsistemaConfig_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."subsistemaConfig_id_seq";
       public          postgres    false    240                       0    0    subsistemaConfig_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."subsistemaConfig_id_seq" OWNED BY public."subsistemaConfig".id;
          public          postgres    false    239            �            1259    139514    tip_det_ana_cri_con_cam_afe_cam    TABLE     �   CREATE TABLE public.tip_det_ana_cri_con_cam_afe_cam (
    "tipoDeterioroAnalisisCriticidadConfigId" integer NOT NULL,
    "campoId" integer NOT NULL
);
 3   DROP TABLE public.tip_det_ana_cri_con_cam_afe_cam;
       public         heap    postgres    false            �            1259    139390 %   tipoDeterioroAnalisisCriticidadConfig    TABLE     �   CREATE TABLE public."tipoDeterioroAnalisisCriticidadConfig" (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    "materialConfigId" integer,
    tipo character varying NOT NULL
);
 ;   DROP TABLE public."tipoDeterioroAnalisisCriticidadConfig";
       public         heap    postgres    false            �            1259    139389 ,   tipoDeterioroAnalisisCriticidadConfig_id_seq    SEQUENCE     �   CREATE SEQUENCE public."tipoDeterioroAnalisisCriticidadConfig_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 E   DROP SEQUENCE public."tipoDeterioroAnalisisCriticidadConfig_id_seq";
       public          postgres    false    236                       0    0 ,   tipoDeterioroAnalisisCriticidadConfig_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."tipoDeterioroAnalisisCriticidadConfig_id_seq" OWNED BY public."tipoDeterioroAnalisisCriticidadConfig".id;
          public          postgres    false    235            �            1259    139352    tipoDeterioroConfig    TABLE     �   CREATE TABLE public."tipoDeterioroConfig" (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    tipo character varying NOT NULL,
    "materialConfigId" integer NOT NULL,
    detectabilidad integer NOT NULL
);
 )   DROP TABLE public."tipoDeterioroConfig";
       public         heap    postgres    false            �            1259    139351    tipoDeterioroConfig_id_seq    SEQUENCE     �   CREATE SEQUENCE public."tipoDeterioroConfig_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public."tipoDeterioroConfig_id_seq";
       public          postgres    false    228            	           0    0    tipoDeterioroConfig_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."tipoDeterioroConfig_id_seq" OWNED BY public."tipoDeterioroConfig".id;
          public          postgres    false    227                        1259    156074 ,   tipo_deterioro_config_campos_afectados_campo    TABLE     �   CREATE TABLE public.tipo_deterioro_config_campos_afectados_campo (
    "tipoDeterioroConfigId" integer NOT NULL,
    "campoId" integer NOT NULL
);
 @   DROP TABLE public.tipo_deterioro_config_campos_afectados_campo;
       public         heap    postgres    false                       1259    213011    usuario    TABLE     �   CREATE TABLE public.usuario (
    id integer NOT NULL,
    "nombreUsuario" character varying NOT NULL,
    contrasena character varying NOT NULL,
    email character varying NOT NULL,
    rol character varying
);
    DROP TABLE public.usuario;
       public         heap    postgres    false                       1259    213010    usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.usuario_id_seq;
       public          postgres    false    260            
           0    0    usuario_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;
          public          postgres    false    259            �            1259    139315    valorCampoDefinido    TABLE     �   CREATE TABLE public."valorCampoDefinido" (
    id integer NOT NULL,
    valor character varying NOT NULL,
    "campoDefinidoId" integer,
    "deterioroId" integer
);
 (   DROP TABLE public."valorCampoDefinido";
       public         heap    postgres    false            �            1259    139314    valorCampoDefinido_id_seq    SEQUENCE     �   CREATE SEQUENCE public."valorCampoDefinido_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."valorCampoDefinido_id_seq";
       public          postgres    false    222                       0    0    valorCampoDefinido_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."valorCampoDefinido_id_seq" OWNED BY public."valorCampoDefinido".id;
          public          postgres    false    221            �           2604    139380    campo id    DEFAULT     d   ALTER TABLE ONLY public.campo ALTER COLUMN id SET DEFAULT nextval('public.campo_id_seq'::regclass);
 7   ALTER TABLE public.campo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    233    234            �           2604    139331    campoDefinido id    DEFAULT     x   ALTER TABLE ONLY public."campoDefinido" ALTER COLUMN id SET DEFAULT nextval('public."campoDefinido_id_seq"'::regclass);
 A   ALTER TABLE public."campoDefinido" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    139344    causa id    DEFAULT     d   ALTER TABLE ONLY public.causa ALTER COLUMN id SET DEFAULT nextval('public.causa_id_seq'::regclass);
 7   ALTER TABLE public.causa ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    226    226            �           2604    172148    config version    DEFAULT     p   ALTER TABLE ONLY public.config ALTER COLUMN version SET DEFAULT nextval('public.config_version_seq'::regclass);
 =   ALTER TABLE public.config ALTER COLUMN version DROP DEFAULT;
       public          postgres    false    257    258    258            �           2604    139303    deterioro id    DEFAULT     l   ALTER TABLE ONLY public.deterioro ALTER COLUMN id SET DEFAULT nextval('public.deterioro_id_seq'::regclass);
 ;   ALTER TABLE public.deterioro ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    139281    edificacion id    DEFAULT     p   ALTER TABLE ONLY public.edificacion ALTER COLUMN id SET DEFAULT nextval('public.edificacion_id_seq'::regclass);
 =   ALTER TABLE public.edificacion ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    139366    herramienta id    DEFAULT     p   ALTER TABLE ONLY public.herramienta ALTER COLUMN id SET DEFAULT nextval('public.herramienta_id_seq'::regclass);
 =   ALTER TABLE public.herramienta ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229    230            �           2604    139373     herramientaAnalisisCriticidad id    DEFAULT     �   ALTER TABLE ONLY public."herramientaAnalisisCriticidad" ALTER COLUMN id SET DEFAULT nextval('public."herramientaAnalisisCriticidad_id_seq"'::regclass);
 Q   ALTER TABLE public."herramientaAnalisisCriticidad" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    232    232            �           2604    139453    indicador id    DEFAULT     l   ALTER TABLE ONLY public.indicador ALTER COLUMN id SET DEFAULT nextval('public.indicador_id_seq'::regclass);
 ;   ALTER TABLE public.indicador ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    246    245    246            �           2604    139477    indicadorIntervalo id    DEFAULT     �   ALTER TABLE ONLY public."indicadorIntervalo" ALTER COLUMN id SET DEFAULT nextval('public."indicadorIntervalo_id_seq"'::regclass);
 F   ALTER TABLE public."indicadorIntervalo" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    249    250    250            �           2604    139505    indicadorSinIntervalo id    DEFAULT     �   ALTER TABLE ONLY public."indicadorSinIntervalo" ALTER COLUMN id SET DEFAULT nextval('public."indicadorSinIntervalo_id_seq"'::regclass);
 I   ALTER TABLE public."indicadorSinIntervalo" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    254    253    254            �           2604    139435    indiceCalculable id    DEFAULT     ~   ALTER TABLE ONLY public."indiceCalculable" ALTER COLUMN id SET DEFAULT nextval('public."indiceCalculable_id_seq"'::regclass);
 D   ALTER TABLE public."indiceCalculable" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    243    244    244            �           2604    139466    indiceCalculableIntervalo id    DEFAULT     �   ALTER TABLE ONLY public."indiceCalculableIntervalo" ALTER COLUMN id SET DEFAULT nextval('public."indiceCalculableIntervalo_id_seq"'::regclass);
 M   ALTER TABLE public."indiceCalculableIntervalo" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    248    247    248            �           2604    139494    indiceCalculableSinIntervalo id    DEFAULT     �   ALTER TABLE ONLY public."indiceCalculableSinIntervalo" ALTER COLUMN id SET DEFAULT nextval('public."indiceCalculableSinIntervalo_id_seq"'::regclass);
 P   ALTER TABLE public."indiceCalculableSinIntervalo" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    252    251    252            �           2604    139294    levantamiento id    DEFAULT     t   ALTER TABLE ONLY public.levantamiento ALTER COLUMN id SET DEFAULT nextval('public.levantamiento_id_seq'::regclass);
 ?   ALTER TABLE public.levantamiento ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    139404    materialConfig id    DEFAULT     z   ALTER TABLE ONLY public."materialConfig" ALTER COLUMN id SET DEFAULT nextval('public."materialConfig_id_seq"'::regclass);
 B   ALTER TABLE public."materialConfig" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    237    238            �           2604    139426    sistemaConfig id    DEFAULT     x   ALTER TABLE ONLY public."sistemaConfig" ALTER COLUMN id SET DEFAULT nextval('public."sistemaConfig_id_seq"'::regclass);
 A   ALTER TABLE public."sistemaConfig" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    241    242    242            �           2604    139415    subsistemaConfig id    DEFAULT     ~   ALTER TABLE ONLY public."subsistemaConfig" ALTER COLUMN id SET DEFAULT nextval('public."subsistemaConfig_id_seq"'::regclass);
 D   ALTER TABLE public."subsistemaConfig" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    239    240    240            �           2604    139393 (   tipoDeterioroAnalisisCriticidadConfig id    DEFAULT     �   ALTER TABLE ONLY public."tipoDeterioroAnalisisCriticidadConfig" ALTER COLUMN id SET DEFAULT nextval('public."tipoDeterioroAnalisisCriticidadConfig_id_seq"'::regclass);
 Y   ALTER TABLE public."tipoDeterioroAnalisisCriticidadConfig" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    235    236            �           2604    139355    tipoDeterioroConfig id    DEFAULT     �   ALTER TABLE ONLY public."tipoDeterioroConfig" ALTER COLUMN id SET DEFAULT nextval('public."tipoDeterioroConfig_id_seq"'::regclass);
 G   ALTER TABLE public."tipoDeterioroConfig" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227    228            �           2604    213014 
   usuario id    DEFAULT     h   ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 9   ALTER TABLE public.usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    259    260    260            �           2604    139318    valorCampoDefinido id    DEFAULT     �   ALTER TABLE ONLY public."valorCampoDefinido" ALTER COLUMN id SET DEFAULT nextval('public."valorCampoDefinido_id_seq"'::regclass);
 F   ALTER TABLE public."valorCampoDefinido" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            �          0    139377    campo 
   TABLE DATA           s   COPY public.campo (id, nombre, "nivelImportancia", "herramientaAnalisisCriticidadId", "configVersion") FROM stdin;
    public          postgres    false    234   �      �          0    139328    campoDefinido 
   TABLE DATA           T   COPY public."campoDefinido" (id, nombre, tipo, "tipoDeterioroConfigId") FROM stdin;
    public          postgres    false    224   
      �          0    139341    causa 
   TABLE DATA           D   COPY public.causa (id, nombre, "tipoDeterioroConfigId") FROM stdin;
    public          postgres    false    226   �
      �          0    172145    config 
   TABLE DATA           E   COPY public.config (version, nombre, descripcion, state) FROM stdin;
    public          postgres    false    258   ]      �          0    139300 	   deterioro 
   TABLE DATA           x   COPY public.deterioro (id, "idSistema", "idSubSistema", "idMaterial", "idTipoDeterioro", "levantamientoId") FROM stdin;
    public          postgres    false    220   �      �          0    139278    edificacion 
   TABLE DATA           X   COPY public.edificacion (id, nombre, direccion, "ubicacionX", "ubicacionY") FROM stdin;
    public          postgres    false    216   �      �          0    139363    herramienta 
   TABLE DATA           H   COPY public.herramienta (id, nombre, tipo, "configVersion") FROM stdin;
    public          postgres    false    230         �          0    139370    herramientaAnalisisCriticidad 
   TABLE DATA           \   COPY public."herramientaAnalisisCriticidad" (id, "configVersion", nombre, tipo) FROM stdin;
    public          postgres    false    232         �          0    139450 	   indicador 
   TABLE DATA           �   COPY public.indicador (id, nombre, valor, tipo, "limiteInferior", "limiteSuperior", "indiceCalculableIntervaloId", "indiceCalculableSinIntervaloId") FROM stdin;
    public          postgres    false    246   "      �          0    139474    indicadorIntervalo 
   TABLE DATA           �   COPY public."indicadorIntervalo" (id, nombre, valor, "limiteInferior", "limiteSuperior", "indiceCalculableIntervaloId") FROM stdin;
    public          postgres    false    250   v      �          0    139502    indicadorSinIntervalo 
   TABLE DATA           f   COPY public."indicadorSinIntervalo" (id, nombre, valor, "indiceCalculableSinIntervaloId") FROM stdin;
    public          postgres    false    254   �      �          0    139432    indiceCalculable 
   TABLE DATA           X   COPY public."indiceCalculable" (id, nombre, tipo, "configVersion", calculo) FROM stdin;
    public          postgres    false    244   �      �          0    139463    indiceCalculableIntervalo 
   TABLE DATA           R   COPY public."indiceCalculableIntervalo" (id, nombre, "configVersion") FROM stdin;
    public          postgres    false    248         �          0    139491    indiceCalculableSinIntervalo 
   TABLE DATA           U   COPY public."indiceCalculableSinIntervalo" (id, nombre, "configVersion") FROM stdin;
    public          postgres    false    252   2      �          0    139291    levantamiento 
   TABLE DATA           o   COPY public.levantamiento (id, "fechaInicio", "fechaFinalizado", "edificacionId", "configVersion") FROM stdin;
    public          postgres    false    218   O      �          0    139401    materialConfig 
   TABLE DATA           L   COPY public."materialConfig" (id, nombre, "subsistemaConfigId") FROM stdin;
    public          postgres    false    238   �      �          0    139423    sistemaConfig 
   TABLE DATA           W   COPY public."sistemaConfig" (id, nombre, "configVersion", "herramientaId") FROM stdin;
    public          postgres    false    242   C      �          0    139412    subsistemaConfig 
   TABLE DATA           K   COPY public."subsistemaConfig" (id, nombre, "sistemaConfigId") FROM stdin;
    public          postgres    false    240   �      �          0    139514    tip_det_ana_cri_con_cam_afe_cam 
   TABLE DATA           o   COPY public.tip_det_ana_cri_con_cam_afe_cam ("tipoDeterioroAnalisisCriticidadConfigId", "campoId") FROM stdin;
    public          postgres    false    255   ]       �          0    139390 %   tipoDeterioroAnalisisCriticidadConfig 
   TABLE DATA           g   COPY public."tipoDeterioroAnalisisCriticidadConfig" (id, nombre, "materialConfigId", tipo) FROM stdin;
    public          postgres    false    236   z       �          0    139352    tipoDeterioroConfig 
   TABLE DATA           e   COPY public."tipoDeterioroConfig" (id, nombre, tipo, "materialConfigId", detectabilidad) FROM stdin;
    public          postgres    false    228   �       �          0    156074 ,   tipo_deterioro_config_campos_afectados_campo 
   TABLE DATA           j   COPY public.tipo_deterioro_config_campos_afectados_campo ("tipoDeterioroConfigId", "campoId") FROM stdin;
    public          postgres    false    256   �!      �          0    213011    usuario 
   TABLE DATA           N   COPY public.usuario (id, "nombreUsuario", contrasena, email, rol) FROM stdin;
    public          postgres    false    260   <"      �          0    139315    valorCampoDefinido 
   TABLE DATA           [   COPY public."valorCampoDefinido" (id, valor, "campoDefinidoId", "deterioroId") FROM stdin;
    public          postgres    false    222   �#                 0    0    campoDefinido_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."campoDefinido_id_seq"', 53, true);
          public          postgres    false    223                       0    0    campo_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.campo_id_seq', 198, true);
          public          postgres    false    233                       0    0    causa_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.causa_id_seq', 53, true);
          public          postgres    false    225                       0    0    config_version_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.config_version_seq', 103, true);
          public          postgres    false    257                       0    0    deterioro_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.deterioro_id_seq', 16, true);
          public          postgres    false    219                       0    0    edificacion_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.edificacion_id_seq', 7, true);
          public          postgres    false    215                       0    0 $   herramientaAnalisisCriticidad_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."herramientaAnalisisCriticidad_id_seq"', 59, true);
          public          postgres    false    231                       0    0    herramienta_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.herramienta_id_seq', 119, true);
          public          postgres    false    229                       0    0    indicadorIntervalo_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."indicadorIntervalo_id_seq"', 34, true);
          public          postgres    false    249                       0    0    indicadorSinIntervalo_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."indicadorSinIntervalo_id_seq"', 30, true);
          public          postgres    false    253                       0    0    indicador_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.indicador_id_seq', 722, true);
          public          postgres    false    245                       0    0     indiceCalculableIntervalo_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public."indiceCalculableIntervalo_id_seq"', 34, true);
          public          postgres    false    247                       0    0 #   indiceCalculableSinIntervalo_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public."indiceCalculableSinIntervalo_id_seq"', 31, true);
          public          postgres    false    251                       0    0    indiceCalculable_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."indiceCalculable_id_seq"', 277, true);
          public          postgres    false    243                       0    0    levantamiento_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.levantamiento_id_seq', 10, true);
          public          postgres    false    217                       0    0    materialConfig_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."materialConfig_id_seq"', 67, true);
          public          postgres    false    237                       0    0    sistemaConfig_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."sistemaConfig_id_seq"', 133, true);
          public          postgres    false    241                       0    0    subsistemaConfig_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."subsistemaConfig_id_seq"', 72, true);
          public          postgres    false    239                       0    0 ,   tipoDeterioroAnalisisCriticidadConfig_id_seq    SEQUENCE SET     ]   SELECT pg_catalog.setval('public."tipoDeterioroAnalisisCriticidadConfig_id_seq"', 1, false);
          public          postgres    false    235                       0    0    tipoDeterioroConfig_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."tipoDeterioroConfig_id_seq"', 56, true);
          public          postgres    false    227                        0    0    usuario_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuario_id_seq', 17, true);
          public          postgres    false    259            !           0    0    valorCampoDefinido_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."valorCampoDefinido_id_seq"', 1, false);
          public          postgres    false    221            
           2606    139509 4   indicadorSinIntervalo PK_0bf000c6c145e9357c359f790f2 
   CONSTRAINT     v   ALTER TABLE ONLY public."indicadorSinIntervalo"
    ADD CONSTRAINT "PK_0bf000c6c145e9357c359f790f2" PRIMARY KEY (id);
 b   ALTER TABLE ONLY public."indicadorSinIntervalo" DROP CONSTRAINT "PK_0bf000c6c145e9357c359f790f2";
       public            postgres    false    254            �           2606    139296 ,   levantamiento PK_0c027d35ed69f14c3c9a74c1dfa 
   CONSTRAINT     l   ALTER TABLE ONLY public.levantamiento
    ADD CONSTRAINT "PK_0c027d35ed69f14c3c9a74c1dfa" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.levantamiento DROP CONSTRAINT "PK_0c027d35ed69f14c3c9a74c1dfa";
       public            postgres    false    218                       2606    156078 K   tipo_deterioro_config_campos_afectados_campo PK_0c073fa53582bc10cf33ffb9810 
   CONSTRAINT     �   ALTER TABLE ONLY public.tipo_deterioro_config_campos_afectados_campo
    ADD CONSTRAINT "PK_0c073fa53582bc10cf33ffb9810" PRIMARY KEY ("tipoDeterioroConfigId", "campoId");
 w   ALTER TABLE ONLY public.tipo_deterioro_config_campos_afectados_campo DROP CONSTRAINT "PK_0c073fa53582bc10cf33ffb9810";
       public            postgres    false    256    256            �           2606    139397 D   tipoDeterioroAnalisisCriticidadConfig PK_176bc25891d5add9154a849b64c 
   CONSTRAINT     �   ALTER TABLE ONLY public."tipoDeterioroAnalisisCriticidadConfig"
    ADD CONSTRAINT "PK_176bc25891d5add9154a849b64c" PRIMARY KEY (id);
 r   ALTER TABLE ONLY public."tipoDeterioroAnalisisCriticidadConfig" DROP CONSTRAINT "PK_176bc25891d5add9154a849b64c";
       public            postgres    false    236                       2606    139470 8   indiceCalculableIntervalo PK_2ee475db92e2a16c37ed5ba6378 
   CONSTRAINT     z   ALTER TABLE ONLY public."indiceCalculableIntervalo"
    ADD CONSTRAINT "PK_2ee475db92e2a16c37ed5ba6378" PRIMARY KEY (id);
 f   ALTER TABLE ONLY public."indiceCalculableIntervalo" DROP CONSTRAINT "PK_2ee475db92e2a16c37ed5ba6378";
       public            postgres    false    248            �           2606    139430 ,   sistemaConfig PK_308770d60b2bfcbc376dc15bef3 
   CONSTRAINT     n   ALTER TABLE ONLY public."sistemaConfig"
    ADD CONSTRAINT "PK_308770d60b2bfcbc376dc15bef3" PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public."sistemaConfig" DROP CONSTRAINT "PK_308770d60b2bfcbc376dc15bef3";
       public            postgres    false    242                       2606    139481 1   indicadorIntervalo PK_34ddf1ce546126178c36ec58416 
   CONSTRAINT     s   ALTER TABLE ONLY public."indicadorIntervalo"
    ADD CONSTRAINT "PK_34ddf1ce546126178c36ec58416" PRIMARY KEY (id);
 _   ALTER TABLE ONLY public."indicadorIntervalo" DROP CONSTRAINT "PK_34ddf1ce546126178c36ec58416";
       public            postgres    false    250            �           2606    139384 $   campo PK_49d18e6d351c1211405c74f0867 
   CONSTRAINT     d   ALTER TABLE ONLY public.campo
    ADD CONSTRAINT "PK_49d18e6d351c1211405c74f0867" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.campo DROP CONSTRAINT "PK_49d18e6d351c1211405c74f0867";
       public            postgres    false    234                       2606    139457 (   indicador PK_4fb899a0a74513336667876b0cf 
   CONSTRAINT     h   ALTER TABLE ONLY public.indicador
    ADD CONSTRAINT "PK_4fb899a0a74513336667876b0cf" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.indicador DROP CONSTRAINT "PK_4fb899a0a74513336667876b0cf";
       public            postgres    false    246                       2606    139518 >   tip_det_ana_cri_con_cam_afe_cam PK_536528692a8613ee6e51f10d7d3 
   CONSTRAINT     �   ALTER TABLE ONLY public.tip_det_ana_cri_con_cam_afe_cam
    ADD CONSTRAINT "PK_536528692a8613ee6e51f10d7d3" PRIMARY KEY ("tipoDeterioroAnalisisCriticidadConfigId", "campoId");
 j   ALTER TABLE ONLY public.tip_det_ana_cri_con_cam_afe_cam DROP CONSTRAINT "PK_536528692a8613ee6e51f10d7d3";
       public            postgres    false    255    255            �           2606    139419 /   subsistemaConfig PK_7571fce51e8966914e96cfbcc15 
   CONSTRAINT     q   ALTER TABLE ONLY public."subsistemaConfig"
    ADD CONSTRAINT "PK_7571fce51e8966914e96cfbcc15" PRIMARY KEY (id);
 ]   ALTER TABLE ONLY public."subsistemaConfig" DROP CONSTRAINT "PK_7571fce51e8966914e96cfbcc15";
       public            postgres    false    240            �           2606    139375 <   herramientaAnalisisCriticidad PK_7a2541aaca692f2b41d53c58afa 
   CONSTRAINT     ~   ALTER TABLE ONLY public."herramientaAnalisisCriticidad"
    ADD CONSTRAINT "PK_7a2541aaca692f2b41d53c58afa" PRIMARY KEY (id);
 j   ALTER TABLE ONLY public."herramientaAnalisisCriticidad" DROP CONSTRAINT "PK_7a2541aaca692f2b41d53c58afa";
       public            postgres    false    232            �           2606    139359 2   tipoDeterioroConfig PK_7d4e493cedaf89e8c76a8c90de2 
   CONSTRAINT     t   ALTER TABLE ONLY public."tipoDeterioroConfig"
    ADD CONSTRAINT "PK_7d4e493cedaf89e8c76a8c90de2" PRIMARY KEY (id);
 `   ALTER TABLE ONLY public."tipoDeterioroConfig" DROP CONSTRAINT "PK_7d4e493cedaf89e8c76a8c90de2";
       public            postgres    false    228            �           2606    139322 1   valorCampoDefinido PK_8f19f37198769b3e661121810a5 
   CONSTRAINT     s   ALTER TABLE ONLY public."valorCampoDefinido"
    ADD CONSTRAINT "PK_8f19f37198769b3e661121810a5" PRIMARY KEY (id);
 _   ALTER TABLE ONLY public."valorCampoDefinido" DROP CONSTRAINT "PK_8f19f37198769b3e661121810a5";
       public            postgres    false    222            �           2606    139408 -   materialConfig PK_906d2dd1b662f1398d4f849aa21 
   CONSTRAINT     o   ALTER TABLE ONLY public."materialConfig"
    ADD CONSTRAINT "PK_906d2dd1b662f1398d4f849aa21" PRIMARY KEY (id);
 [   ALTER TABLE ONLY public."materialConfig" DROP CONSTRAINT "PK_906d2dd1b662f1398d4f849aa21";
       public            postgres    false    238            �           2606    139348 $   causa PK_9652d16a527e7aae89c1930b2e4 
   CONSTRAINT     d   ALTER TABLE ONLY public.causa
    ADD CONSTRAINT "PK_9652d16a527e7aae89c1930b2e4" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.causa DROP CONSTRAINT "PK_9652d16a527e7aae89c1930b2e4";
       public            postgres    false    226                       2606    213018 &   usuario PK_a56c58e5cabaa04fb2c98d2d7e2 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2";
       public            postgres    false    260            �           2606    139368 *   herramienta PK_aa654b814d478bf5b5e85bbb0f4 
   CONSTRAINT     j   ALTER TABLE ONLY public.herramienta
    ADD CONSTRAINT "PK_aa654b814d478bf5b5e85bbb0f4" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.herramienta DROP CONSTRAINT "PK_aa654b814d478bf5b5e85bbb0f4";
       public            postgres    false    230            �           2606    139335 ,   campoDefinido PK_af4c6b2aa992fcec4c3d68ad553 
   CONSTRAINT     n   ALTER TABLE ONLY public."campoDefinido"
    ADD CONSTRAINT "PK_af4c6b2aa992fcec4c3d68ad553" PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public."campoDefinido" DROP CONSTRAINT "PK_af4c6b2aa992fcec4c3d68ad553";
       public            postgres    false    224            �           2606    139285 *   edificacion PK_b9a12efb62d508e3ecf7ca0c386 
   CONSTRAINT     j   ALTER TABLE ONLY public.edificacion
    ADD CONSTRAINT "PK_b9a12efb62d508e3ecf7ca0c386" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.edificacion DROP CONSTRAINT "PK_b9a12efb62d508e3ecf7ca0c386";
       public            postgres    false    216                       2606    139498 ;   indiceCalculableSinIntervalo PK_c599da71807c348c60e73fd9494 
   CONSTRAINT     }   ALTER TABLE ONLY public."indiceCalculableSinIntervalo"
    ADD CONSTRAINT "PK_c599da71807c348c60e73fd9494" PRIMARY KEY (id);
 i   ALTER TABLE ONLY public."indiceCalculableSinIntervalo" DROP CONSTRAINT "PK_c599da71807c348c60e73fd9494";
       public            postgres    false    252            �           2606    139305 (   deterioro PK_e6c5ae445538f8977b9ed1acb30 
   CONSTRAINT     h   ALTER TABLE ONLY public.deterioro
    ADD CONSTRAINT "PK_e6c5ae445538f8977b9ed1acb30" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.deterioro DROP CONSTRAINT "PK_e6c5ae445538f8977b9ed1acb30";
       public            postgres    false    220                       2606    172152 %   config PK_ec8cda12936640e2ea7f8292f3f 
   CONSTRAINT     j   ALTER TABLE ONLY public.config
    ADD CONSTRAINT "PK_ec8cda12936640e2ea7f8292f3f" PRIMARY KEY (version);
 Q   ALTER TABLE ONLY public.config DROP CONSTRAINT "PK_ec8cda12936640e2ea7f8292f3f";
       public            postgres    false    258            �           2606    139439 /   indiceCalculable PK_edccd547915225b788c35397368 
   CONSTRAINT     q   ALTER TABLE ONLY public."indiceCalculable"
    ADD CONSTRAINT "PK_edccd547915225b788c35397368" PRIMARY KEY (id);
 ]   ALTER TABLE ONLY public."indiceCalculable" DROP CONSTRAINT "PK_edccd547915225b788c35397368";
       public            postgres    false    244            �           2606    139326 1   valorCampoDefinido REL_cebdd9d69f6c261b81145df9b9 
   CONSTRAINT     }   ALTER TABLE ONLY public."valorCampoDefinido"
    ADD CONSTRAINT "REL_cebdd9d69f6c261b81145df9b9" UNIQUE ("campoDefinidoId");
 _   ALTER TABLE ONLY public."valorCampoDefinido" DROP CONSTRAINT "REL_cebdd9d69f6c261b81145df9b9";
       public            postgres    false    222            �           2606    139289 *   edificacion UQ_203459bad5e3e04ea612f4394e0 
   CONSTRAINT     l   ALTER TABLE ONLY public.edificacion
    ADD CONSTRAINT "UQ_203459bad5e3e04ea612f4394e0" UNIQUE (direccion);
 V   ALTER TABLE ONLY public.edificacion DROP CONSTRAINT "UQ_203459bad5e3e04ea612f4394e0";
       public            postgres    false    216                       2606    213020 &   usuario UQ_2863682842e688ca198eb25c124 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE (email);
 R   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "UQ_2863682842e688ca198eb25c124";
       public            postgres    false    260            �           2606    139324 1   valorCampoDefinido UQ_58593184c7193b7ab70ab4c06ab 
   CONSTRAINT     q   ALTER TABLE ONLY public."valorCampoDefinido"
    ADD CONSTRAINT "UQ_58593184c7193b7ab70ab4c06ab" UNIQUE (valor);
 _   ALTER TABLE ONLY public."valorCampoDefinido" DROP CONSTRAINT "UQ_58593184c7193b7ab70ab4c06ab";
       public            postgres    false    222            �           2606    139287 *   edificacion UQ_59fad78b3f7494af213400cc239 
   CONSTRAINT     i   ALTER TABLE ONLY public.edificacion
    ADD CONSTRAINT "UQ_59fad78b3f7494af213400cc239" UNIQUE (nombre);
 V   ALTER TABLE ONLY public.edificacion DROP CONSTRAINT "UQ_59fad78b3f7494af213400cc239";
       public            postgres    false    216                       2606    213022 &   usuario UQ_7ea57d693272b94228192c612bf 
   CONSTRAINT     n   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "UQ_7ea57d693272b94228192c612bf" UNIQUE ("nombreUsuario");
 R   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "UQ_7ea57d693272b94228192c612bf";
       public            postgres    false    260                        1259    156052    IDX_0e6a9e6c3571b9165ba919b777    INDEX     V   CREATE INDEX "IDX_0e6a9e6c3571b9165ba919b777" ON public.indicador USING btree (tipo);
 4   DROP INDEX public."IDX_0e6a9e6c3571b9165ba919b777";
       public            postgres    false    246                       1259    156080    IDX_16dd5775c33728e19269e80847    INDEX     ~   CREATE INDEX "IDX_16dd5775c33728e19269e80847" ON public.tipo_deterioro_config_campos_afectados_campo USING btree ("campoId");
 4   DROP INDEX public."IDX_16dd5775c33728e19269e80847";
       public            postgres    false    256            �           1259    156068    IDX_37aa8748e1b7bbee1c1b42ba04    INDEX     b   CREATE INDEX "IDX_37aa8748e1b7bbee1c1b42ba04" ON public."tipoDeterioroConfig" USING btree (tipo);
 4   DROP INDEX public."IDX_37aa8748e1b7bbee1c1b42ba04";
       public            postgres    false    228                       1259    156079    IDX_a68950c9af59688ca4f13ff359    INDEX     �   CREATE INDEX "IDX_a68950c9af59688ca4f13ff359" ON public.tipo_deterioro_config_campos_afectados_campo USING btree ("tipoDeterioroConfigId");
 4   DROP INDEX public."IDX_a68950c9af59688ca4f13ff359";
       public            postgres    false    256                       1259    139520    IDX_bf6d00cb07941001e28add15a4    INDEX     q   CREATE INDEX "IDX_bf6d00cb07941001e28add15a4" ON public.tip_det_ana_cri_con_cam_afe_cam USING btree ("campoId");
 4   DROP INDEX public."IDX_bf6d00cb07941001e28add15a4";
       public            postgres    false    255            �           1259    156051    IDX_c2528783f93171b493919cd265    INDEX     _   CREATE INDEX "IDX_c2528783f93171b493919cd265" ON public."indiceCalculable" USING btree (tipo);
 4   DROP INDEX public."IDX_c2528783f93171b493919cd265";
       public            postgres    false    244                       1259    139519    IDX_ddd41e104a56bc69995727cfa7    INDEX     �   CREATE INDEX "IDX_ddd41e104a56bc69995727cfa7" ON public.tip_det_ana_cri_con_cam_afe_cam USING btree ("tipoDeterioroAnalisisCriticidadConfigId");
 4   DROP INDEX public."IDX_ddd41e104a56bc69995727cfa7";
       public            postgres    false    255            �           1259    155708    IDX_f7cd030224f67cd6c4c8ccab80    INDEX     X   CREATE INDEX "IDX_f7cd030224f67cd6c4c8ccab80" ON public.herramienta USING btree (tipo);
 4   DROP INDEX public."IDX_f7cd030224f67cd6c4c8ccab80";
       public            postgres    false    230            *           2606    180237 /   indiceCalculable FK_00da2093660541ced1d1bda26a4    FK CONSTRAINT     �   ALTER TABLE ONLY public."indiceCalculable"
    ADD CONSTRAINT "FK_00da2093660541ced1d1bda26a4" FOREIGN KEY ("configVersion") REFERENCES public.config(version) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public."indiceCalculable" DROP CONSTRAINT "FK_00da2093660541ced1d1bda26a4";
       public          postgres    false    4884    244    258            '           2606    180262 /   subsistemaConfig FK_110ce532a574b1c01055131b675    FK CONSTRAINT     �   ALTER TABLE ONLY public."subsistemaConfig"
    ADD CONSTRAINT "FK_110ce532a574b1c01055131b675" FOREIGN KEY ("sistemaConfigId") REFERENCES public."sistemaConfig"(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public."subsistemaConfig" DROP CONSTRAINT "FK_110ce532a574b1c01055131b675";
       public          postgres    false    4860    242    240            1           2606    156086 K   tipo_deterioro_config_campos_afectados_campo FK_16dd5775c33728e19269e80847e    FK CONSTRAINT     �   ALTER TABLE ONLY public.tipo_deterioro_config_campos_afectados_campo
    ADD CONSTRAINT "FK_16dd5775c33728e19269e80847e" FOREIGN KEY ("campoId") REFERENCES public.campo(id) ON UPDATE CASCADE ON DELETE CASCADE;
 w   ALTER TABLE ONLY public.tipo_deterioro_config_campos_afectados_campo DROP CONSTRAINT "FK_16dd5775c33728e19269e80847e";
       public          postgres    false    234    4852    256                       2606    172175 (   deterioro FK_17437c9e55d7685aa562b464d16    FK CONSTRAINT     �   ALTER TABLE ONLY public.deterioro
    ADD CONSTRAINT "FK_17437c9e55d7685aa562b464d16" FOREIGN KEY ("levantamientoId") REFERENCES public.levantamiento(id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.deterioro DROP CONSTRAINT "FK_17437c9e55d7685aa562b464d16";
       public          postgres    false    218    4830    220                       2606    188429 ,   levantamiento FK_200a5ead41ec6c144d378f2a986    FK CONSTRAINT     �   ALTER TABLE ONLY public.levantamiento
    ADD CONSTRAINT "FK_200a5ead41ec6c144d378f2a986" FOREIGN KEY ("configVersion") REFERENCES public.config(version) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.levantamiento DROP CONSTRAINT "FK_200a5ead41ec6c144d378f2a986";
       public          postgres    false    4884    218    258            $           2606    180292 $   campo FK_226dac0dc53700f1672c8fbf2be    FK CONSTRAINT     �   ALTER TABLE ONLY public.campo
    ADD CONSTRAINT "FK_226dac0dc53700f1672c8fbf2be" FOREIGN KEY ("herramientaAnalisisCriticidadId") REFERENCES public.herramienta(id) ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.campo DROP CONSTRAINT "FK_226dac0dc53700f1672c8fbf2be";
       public          postgres    false    4848    230    234            #           2606    172155 *   herramienta FK_38feae53bd37efa6597649b11ae    FK CONSTRAINT     �   ALTER TABLE ONLY public.herramienta
    ADD CONSTRAINT "FK_38feae53bd37efa6597649b11ae" FOREIGN KEY ("configVersion") REFERENCES public.config(version) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.herramienta DROP CONSTRAINT "FK_38feae53bd37efa6597649b11ae";
       public          postgres    false    4884    230    258            .           2606    147529 4   indicadorSinIntervalo FK_4912159fcd1f29b15da8e2451c5    FK CONSTRAINT     �   ALTER TABLE ONLY public."indicadorSinIntervalo"
    ADD CONSTRAINT "FK_4912159fcd1f29b15da8e2451c5" FOREIGN KEY ("indiceCalculableSinIntervaloId") REFERENCES public."indiceCalculableSinIntervalo"(id) ON DELETE CASCADE;
 b   ALTER TABLE ONLY public."indicadorSinIntervalo" DROP CONSTRAINT "FK_4912159fcd1f29b15da8e2451c5";
       public          postgres    false    4872    254    252            (           2606    172160 ,   sistemaConfig FK_662c14c9180b0902a1fa4477f08    FK CONSTRAINT     �   ALTER TABLE ONLY public."sistemaConfig"
    ADD CONSTRAINT "FK_662c14c9180b0902a1fa4477f08" FOREIGN KEY ("configVersion") REFERENCES public.config(version) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public."sistemaConfig" DROP CONSTRAINT "FK_662c14c9180b0902a1fa4477f08";
       public          postgres    false    258    242    4884            "           2606    180272 2   tipoDeterioroConfig FK_749ba00e2beff30c42b5253fbcb    FK CONSTRAINT     �   ALTER TABLE ONLY public."tipoDeterioroConfig"
    ADD CONSTRAINT "FK_749ba00e2beff30c42b5253fbcb" FOREIGN KEY ("materialConfigId") REFERENCES public."materialConfig"(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public."tipoDeterioroConfig" DROP CONSTRAINT "FK_749ba00e2beff30c42b5253fbcb";
       public          postgres    false    238    4856    228            )           2606    180257 ,   sistemaConfig FK_7996c8334d2497b73febff534b4    FK CONSTRAINT     �   ALTER TABLE ONLY public."sistemaConfig"
    ADD CONSTRAINT "FK_7996c8334d2497b73febff534b4" FOREIGN KEY ("herramientaId") REFERENCES public.herramienta(id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public."sistemaConfig" DROP CONSTRAINT "FK_7996c8334d2497b73febff534b4";
       public          postgres    false    4848    242    230                        2606    180277 ,   campoDefinido FK_a106a9fe4b0df7bddc1a4bd897f    FK CONSTRAINT     �   ALTER TABLE ONLY public."campoDefinido"
    ADD CONSTRAINT "FK_a106a9fe4b0df7bddc1a4bd897f" FOREIGN KEY ("tipoDeterioroConfigId") REFERENCES public."tipoDeterioroConfig"(id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public."campoDefinido" DROP CONSTRAINT "FK_a106a9fe4b0df7bddc1a4bd897f";
       public          postgres    false    4845    228    224            2           2606    156081 K   tipo_deterioro_config_campos_afectados_campo FK_a68950c9af59688ca4f13ff359b    FK CONSTRAINT     �   ALTER TABLE ONLY public.tipo_deterioro_config_campos_afectados_campo
    ADD CONSTRAINT "FK_a68950c9af59688ca4f13ff359b" FOREIGN KEY ("tipoDeterioroConfigId") REFERENCES public."tipoDeterioroConfig"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 w   ALTER TABLE ONLY public.tipo_deterioro_config_campos_afectados_campo DROP CONSTRAINT "FK_a68950c9af59688ca4f13ff359b";
       public          postgres    false    256    4845    228            /           2606    139611 >   tip_det_ana_cri_con_cam_afe_cam FK_bf6d00cb07941001e28add15a42    FK CONSTRAINT     �   ALTER TABLE ONLY public.tip_det_ana_cri_con_cam_afe_cam
    ADD CONSTRAINT "FK_bf6d00cb07941001e28add15a42" FOREIGN KEY ("campoId") REFERENCES public.campo(id) ON UPDATE CASCADE ON DELETE CASCADE;
 j   ALTER TABLE ONLY public.tip_det_ana_cri_con_cam_afe_cam DROP CONSTRAINT "FK_bf6d00cb07941001e28add15a42";
       public          postgres    false    234    4852    255                       2606    180287 ,   levantamiento FK_c79e3d3ef7c4b830bfbe5d65522    FK CONSTRAINT     �   ALTER TABLE ONLY public.levantamiento
    ADD CONSTRAINT "FK_c79e3d3ef7c4b830bfbe5d65522" FOREIGN KEY ("edificacionId") REFERENCES public.edificacion(id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.levantamiento DROP CONSTRAINT "FK_c79e3d3ef7c4b830bfbe5d65522";
       public          postgres    false    4824    218    216            &           2606    180267 -   materialConfig FK_ca9c8b8f3b74df1c11890cd923e    FK CONSTRAINT     �   ALTER TABLE ONLY public."materialConfig"
    ADD CONSTRAINT "FK_ca9c8b8f3b74df1c11890cd923e" FOREIGN KEY ("subsistemaConfigId") REFERENCES public."subsistemaConfig"(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public."materialConfig" DROP CONSTRAINT "FK_ca9c8b8f3b74df1c11890cd923e";
       public          postgres    false    240    4858    238            +           2606    156063 (   indicador FK_caaf9fdcff2ebd1f75ad4c59675    FK CONSTRAINT     �   ALTER TABLE ONLY public.indicador
    ADD CONSTRAINT "FK_caaf9fdcff2ebd1f75ad4c59675" FOREIGN KEY ("indiceCalculableSinIntervaloId") REFERENCES public."indiceCalculable"(id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.indicador DROP CONSTRAINT "FK_caaf9fdcff2ebd1f75ad4c59675";
       public          postgres    false    246    4863    244                       2606    139531 1   valorCampoDefinido FK_cebdd9d69f6c261b81145df9b91    FK CONSTRAINT     �   ALTER TABLE ONLY public."valorCampoDefinido"
    ADD CONSTRAINT "FK_cebdd9d69f6c261b81145df9b91" FOREIGN KEY ("campoDefinidoId") REFERENCES public."campoDefinido"(id);
 _   ALTER TABLE ONLY public."valorCampoDefinido" DROP CONSTRAINT "FK_cebdd9d69f6c261b81145df9b91";
       public          postgres    false    4840    222    224            !           2606    180282 $   causa FK_ced436cafbce951abdd99785257    FK CONSTRAINT     �   ALTER TABLE ONLY public.causa
    ADD CONSTRAINT "FK_ced436cafbce951abdd99785257" FOREIGN KEY ("tipoDeterioroConfigId") REFERENCES public."tipoDeterioroConfig"(id) ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.causa DROP CONSTRAINT "FK_ced436cafbce951abdd99785257";
       public          postgres    false    4845    228    226                       2606    139536 1   valorCampoDefinido FK_cf1bd66f9e78f9c4bfea4eea91d    FK CONSTRAINT     �   ALTER TABLE ONLY public."valorCampoDefinido"
    ADD CONSTRAINT "FK_cf1bd66f9e78f9c4bfea4eea91d" FOREIGN KEY ("deterioroId") REFERENCES public.deterioro(id);
 _   ALTER TABLE ONLY public."valorCampoDefinido" DROP CONSTRAINT "FK_cf1bd66f9e78f9c4bfea4eea91d";
       public          postgres    false    4832    222    220            0           2606    139606 >   tip_det_ana_cri_con_cam_afe_cam FK_ddd41e104a56bc69995727cfa7e    FK CONSTRAINT       ALTER TABLE ONLY public.tip_det_ana_cri_con_cam_afe_cam
    ADD CONSTRAINT "FK_ddd41e104a56bc69995727cfa7e" FOREIGN KEY ("tipoDeterioroAnalisisCriticidadConfigId") REFERENCES public."tipoDeterioroAnalisisCriticidadConfig"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 j   ALTER TABLE ONLY public.tip_det_ana_cri_con_cam_afe_cam DROP CONSTRAINT "FK_ddd41e104a56bc69995727cfa7e";
       public          postgres    false    4854    236    255            %           2606    147489 D   tipoDeterioroAnalisisCriticidadConfig FK_e7ac6e82b63fa4c8875f681f22c    FK CONSTRAINT     �   ALTER TABLE ONLY public."tipoDeterioroAnalisisCriticidadConfig"
    ADD CONSTRAINT "FK_e7ac6e82b63fa4c8875f681f22c" FOREIGN KEY ("materialConfigId") REFERENCES public."materialConfig"(id) ON DELETE CASCADE;
 r   ALTER TABLE ONLY public."tipoDeterioroAnalisisCriticidadConfig" DROP CONSTRAINT "FK_e7ac6e82b63fa4c8875f681f22c";
       public          postgres    false    236    238    4856            -           2606    147519 1   indicadorIntervalo FK_f59a9da6bb04a560132818202b9    FK CONSTRAINT     �   ALTER TABLE ONLY public."indicadorIntervalo"
    ADD CONSTRAINT "FK_f59a9da6bb04a560132818202b9" FOREIGN KEY ("indiceCalculableIntervaloId") REFERENCES public."indiceCalculableIntervalo"(id) ON DELETE CASCADE;
 _   ALTER TABLE ONLY public."indicadorIntervalo" DROP CONSTRAINT "FK_f59a9da6bb04a560132818202b9";
       public          postgres    false    250    4868    248            ,           2606    156058 (   indicador FK_f7917ba259f36bee33334ddc98f    FK CONSTRAINT     �   ALTER TABLE ONLY public.indicador
    ADD CONSTRAINT "FK_f7917ba259f36bee33334ddc98f" FOREIGN KEY ("indiceCalculableIntervaloId") REFERENCES public."indiceCalculable"(id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.indicador DROP CONSTRAINT "FK_f7917ba259f36bee33334ddc98f";
       public          postgres    false    244    246    4863            �   Z  x�e�1rC1kt��I�	Ҧ�$e*Ǿ�g�Qp�Zix���B���7	�AMs������u�_/�'5�$:!.jd&��z��R��[�/n�!2�Ғ�8��FRAR��#�Ia6�0��4�f�#��Ha�aa����0�%�A��I��N4��]�IԸ*u���7愙{��NF;)V����$*)J���h�2RT��=��k��"�ԛ��"�4�б��\�%Y�~"ͪ�a���:����4j���h�o�eչ��� YV��C]X��U�G�\�6�g�us9Ԇ��Yu~�ʏ� ʵ:_���n��g����ð������~<�Xn�|��R� ��5�      �   �   x�]��A�b��^��5A$�����$3^�����<������[D�ah��"�?ʝX���%��LC"�P�V�i�9HK�EZj�ETQQ�,��2c���I�Q;�%�Ȍ2��Q�Q��Z���A[D'mK�h�ꦭ�n��1�      �   �   x�E��BA�bTs����"H�y���OƆJ��C����^�-&ѦEL�&���O9�c
r��S�iY�&�%'�-�H��נ\��\(Q.TSv֢|_m�N���N	٩Fvj!;��W� ��v���-ڽnڽ�<��gqa      �   7  x���R�8���S���å��L��Y�vjo[	Nٖ-�q�k�#̋��r @m�%[��E�$�-�un;:d�S��S��ㅼ�y�*�J�I[��Xg�*�N��X��H�y�鷬3�˪�b#�,ն�W�P��Rco����r^k�2y��eY6�:�k��g��]=��_.�R���δuǥ&��Pce��lh�<�MF�aW�Љ��
�?�C�kk�15
q�4�R�U[AhJ%�͑�J�*cg%C�P��K&��ʄ
�@C�Bڂ*�9�a�̩/���SS�
��SR	S�rR�js����*�T���r
[u��P��$I�Q*� #���A_.�0�!ˤ�C������G�\8|����I�)|��WNi��� א;�#y	��8� `#5U�Vg�+�d]�yPX|h5~�U���4��H�4���A-����]��*J�*��#L�+������A���h(n�L}T�Ɩj�Z`�Uf�/V�C�J�	�*�T�/P��ɠ�{���4L)S��î��f���:�Z�G�ʴzFk(NM#Z��*f������%��T|�J�m��*r[k8�Q|S����x+{��eQ��G�h�ؕa��O�=9�fv������UT?Of�B�ay ��^9�\�3S����8�ܾ�pQ w�ٜ�ԉ�9�9B/�46	����t[Z�����[9g?I�L���t�ς�컕���w߂`�:� �_��S�}W�_��h���'k��������!�e��Kk�@��[iݷ��H���y}������Pֳ[�Q_0��w������3����.�Z��7j���e�H=#ʈz��I;'�t�"*��!������cxES0�L�_�{b=�|CEcwКYGu�V���-���q���23���@�B8�ʨz��`,&�$��:gHR� wşn♼��J�bo#M�)s�s2��k�m��F�QFtgD��ټ���r*eN}�t�߃�E49f�u�ҥz�ߙ�%7� z]]�e�W_��o���-x[RL(bs�~�����g�wgP�x=U�����P��-aX}�u ~G��^~S)��8�2��A�]g�u.�Z#���3���}q�,�����^Ǭz�jO��HJ�F~V�a�!����f���T�|����!��Qh��0�70�o/;��;̘^��/z�}�{��"#nGxiI�x+����������ŷD� �3E4�g"�ϯ./�gS*�u�$�߬N᪝;�_�{#5�pc5��+��N���mkXw��2�u���K����r5m]f�FM���%��p>�qr���Wr�]rkt���'ù+���vH�      �   "   x�34�0�42�42�44�44��h"1z\\\ ~��      �   8   x�3���/I�QK,JLI-��t,KUKM��K�42�34�Ե0�36�0����� b�      �   �   x���;�@�:s�� ��v�h8MD"��Hra
�L��Wx��˶M����4^�����������i������p��B�W�xE��WyŠ�Vr�f^���+	Zy%C�(���}ớƷ�ߺ�`|ҵ��������O�Ϩ�\���2b�Cj���͜�c����4g�����I��8�K���-8�n���y��ᣊ!��g廀�����      �      x������ � �      �   D  x���ˎ7E����U��M6�z3�x1�c���Z$5qj�x��`���+R*�������-�޾���������o_�����^�|�}�M1m��o��?����"����ˏ�[bt<��n��u,t����;���6�rxG\�-���R�D���$�l[HDCv?�$�A�خ	�dkltz���O��tz<��'��=�F�v���8�_��ȇ�B�d4�L�-�hH��6���;�!�X@�vo��c�����hc���(��
b!W
b�DA��� !r%!�I�h���h��q���i�!�St�Ґ!�ak< !��2C�$Dم
2Y� 3�JA4�CH  �2Y* !l���NDhׁ�0x�@?&��c��$�($���r��!�	AVy�al�1ـ�G�?��<����1�$]��P�.������H�5='��YJ�'"!��� ������Le�B�l�N �W�YO�h_J�H^&Rj�#�?�������t}��5=%b�YJ�&b!��F�B��XGO��0�,�OF0�N �W�YO�h_J�H^!R�lu���Qѐ����B~���D�=K��D4���(�W����Le�5��=VnM���n��F��F���kj!�5�����.XS��4��5���kj,����G^[�A�R*իH�c�]���[S�^ER��5�_O��Iq�XR�,����ǃ[Ӂck:h_J�H�A���kj!�5M�bM�]���6_OS�話Ě��i�;ͭ���5�/�鐤���`M-ķ�yx��55v��Z���9I��XbM���4�Nsk:plM�KiN�4�Re�5�ߚ�,$���.XS��4!��K���|k��5866�k�7�H�e�~�~�+C�Kq������.��"I��2Y�^?Q|�(�=e�N��͠ɶXD�2�Sc���~C%J1��^��Dхm���e"����h�5vY�A�T�]A�� 1���q��5��,ĠN�T��A�b$+1��+Q��A�����r�:plo�7�C٫DM�]Y�r�P5�*��j�E��=V�F4�X�Q�ŃX��lܣ;�A��M�lDN�݁��2��#wbS����Lt�nS�O�ħV��9`��r�yd�X�M&vӴ��0|C�X�J)��Iѕ�WkB���@��e��w��2�e�A��W;$m��L����}�9�m�ث�fb�Bk`B�c�u7�;�w���Ϡ�H�I�&���ya5Z�,(�d�]8H[IѿLd�X��-�^ql�\�Qw�3hr�=dbW�^�_�Ѕ��%�u�G]C��!�e��eO�2Q���[��}���4I�׍�c
OBFR�B#6�؅=LC��>�/�Ć������i�4�!��-Lh��_RI;f�|1���_RI;f���4C���6��3Yp"P6����lB�G]����Mt� ���-�'Y�]�-Kp!�/(]�}�I�o#Dc�
E~��{��ǥ�A�*��%.��d��k��U�2q!w�'�o]]�=�T\�eecX5�~`����i��Ԡ���뢅�F��ʷ��h�h!�Q'��P�ɽ�B�N��2�b�c��.3p�Xo��e��-�B��Rg�ԍre�����G��O��r%u�ਫl���r�y�n�X��FӬ��0v�ig!`7��g#���.t�4$��@
���S'K6���O�˲�+���_\ڷ�Ҟ���?��g!��m��W�����{K�lKs������<�Tvǻ@���O��=��>�w�9}��b�mq�?.��<�6v�[������2cɁQ�O��������      �      x������ � �      �      x������ � �      �   U  x����nA�k�)��.�n�\�M#�*P������L� �>k{��w���������|y�|��߮�������~9�OO�u{>=6��߿�n��������rX퐎��I�ϯ�};���5�)P��2)���r~�������I��?O���;��1���C�6{��*0��c��К��C�bh�0tz�14`�Y�Ѐ��?�}�Q�y�·|����Ҭ?��V`HbK�iǐf-��pIoF/��?��n�bK��<kɝ(��ڨ�U��Y����̺�bȳf܉�j�QEݐg]��`��n�Y3��@7XT�6��DE�i`���AW� ��"K"Q�~tEz`��C�*�d`(�"��c(�"��c(�"� 0DY�LQ���l�Y�I]���|�*�_0���ӎa��â+�8�%�Ho'ǰ������+� ��H/ aEroX]���,��aQ����V$��5Е�k��\V����Q7,���.̪�a����[X80G�*'�П�R�C��a1�n��U#:0+'�f�����CWSŤ������/��9�aQ�HKꋀ"-�+2�M��NX�-��+b�M�����l+1��l�v�@�l�v�@�l�v�p�l�v15a�J��*1��Sõ���U'5ZubD�N�h��`�N�NE�ѪSP�h���@��4t8Z�N�:v8D���Ѫc��p��"m�)v`��@11��.[��3�@´i�؃	��b a�4P�Ā�i5�9��ɪ�8� ����$����(Z�#rB��&��;���*8��7* Etb�T�B8��@�Ї*���O���7S��L      �      x������ � �      �      x������ � �      �   )   x�34�4202�50�5�P00�#����9��)W�  �	      �   �   x�=�;1��:s��')�(9 ��VZq��/�9k�.��Z�0S$���x�uE������Upu�5��9>�TL��0��p����H��!-&B�fCH����4&(��A9@=HVPt~���������&R`�H��!v����%{9ޖ}��/ Q�m�      �   A  x�m��N�@E��W��<23�Ub�n`�&JR1Ri�i+��sST��3�}r�xڜ��2�/m8P�T�%XX�(K�PHKo��x�d`t$�%[�I"K�0��,ba$I,jaO�Y������?��V+�;R�j�S ��V)eҞ�*�B�X�R�����K�&�#��Z�\��6����J����F�����CVoEd=	o�A�;`�$�����~nu\($*�}p�X�8���j<��m����8L�G�����D�԰(�n���O��?�m����[�?�=թ-��X�C����^����5���:�
<�� �<c��\����� ���/      �   �   x�M�;NC1����Ud��=uh�X �%.U�ܰ
Δ���d���}����6�S�B'eФ֨�	�aJ�Q�T�xK6oI���c=�B89�,d¹)M�P�Y�)�+�/LDYA�eQ�,4�V�%��������龽�_��X��m��㾎������QM0ʠ)�>^ �����      �      x������ � �      �      x������ � �      �   �   x���A
�0��uri23i�/��*�H�������o^�J�5����u�[���y_�~�qi����^���W�)��F2ʈ&2D3�/��DFQ&���фH�hFd\$"r�Edr�Ed��
y\�q�$�I. �\A.��BO���xOJ�)��\�b�J�)���3�)�g�SR��z�`�5�c1|,F�ȍ$/�0�� ��?� �~�1~JZ<      �   �   x�%л�1C�xQ��/����0,D7���?���Hؐ�dą-ه�!&n$D�hx��d�J�p�H�������G�M�`:G\ӹ��$��������d�M8��w�F2����dlLp��)�I�f�Er���=(�n�F1�!�ؖ�������M]A�      �   E  x�]͹��@@���Dp�FY�aˤQ�i7�0_?֌�:w��4%�`�� �,W�G�J��;<�RХ��4��XE�#��C����$-�++Q^(�ER揜V%@xI�jZ#���_ܻ̞�i���f�4��;d	w)c��͝�y��S!+�T�B}+N�-/��0�y[�V �/�����[� ���>��h�E�^j+]S,*�#�
sܽ�~��������h���:	�$:{�p�8���k�Mh�MǅgC����[��}Pz�,���t����uZa�,�6*]��J~�2d�!z��q�H�	iV����Y�y��؝�      �      x������ � �     