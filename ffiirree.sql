create table users(
	id bigint auto_increment primary key,
    username varchar(50) unique key,
    password varchar(20) not null,
    avatar varchar(255) default '/static/image/avatar/avatar.jpg',
    sex bool default false,
    email char(255) not null unique key,
    registerTime timestamp default current_timestamp
);

select * from users;

##################################################################################################
# article
#查询测试
create table articles(
	id bigint auto_increment primary key,
    uid bigint not null,
    cid bigint not null,
    title text collate utf8_general_ci not null,
    content text collate utf8_general_ci not null,
    
    readNumber bigint not null default 0,
    
    submitTime timestamp default current_timestamp,
    editTime timestamp default current_timestamp on update current_timestamp,
    
    foreign key(uid) references users(id) on delete no action,
    foreign key(cid) references categories(id) on delete no action
);

select * from articles;

insert into articles values(default, 1, 1, "C++11的主要变化", "sdfasdkfjaj a阿里斯顿发上来看风景啊啥两地分居艾尚理得发安萨里法德啊", 0, default, default);

##################################################################################################
create table categories(
	id bigint auto_increment primary key,
    name text collate utf8_general_ci not null,
    submitTime timestamp default current_timestamp
);
select * from categories;

insert into categories(name) values('C/C++');
insert into categories(name) values('Javascript');
insert into categories(name) values('CV');
insert into categories(name) values('OpenCV');
insert into categories(name) values('Ubuntu');

##################################################################################################
create table topics(
	id bigint auto_increment primary key,
    name varchar(50) collate utf8_general_ci not null unique key,
    submitTime timestamp default current_timestamp
);


create table ats(
	aid bigint not null,
    tid bigint not null,
    primary key(aid, tid),
    foreign key(aid) references articles(id) on delete cascade,
    foreign key(tid) references topics(id) on delete cascade
);

##################################################################################################
create table article_reviews(
	id bigint auto_increment primary key,
    aid bigint not null,
    reply_id int not null default 0,
    
    mine_id int not null,
    his_id int default 0,					# 被回复评论的用户id
    
    content text collate utf8_general_ci not null,
    submit_time timestamp default current_timestamp,
    
    foreign key(article_id) references articles(id) on delete cascade,
    
    foreign key(mine_id) references users(id) on delete no action
);