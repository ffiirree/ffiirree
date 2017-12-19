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
insert into users values(default, 'ffiirree', 960215, default, default, 'ice_qi@163.com', default);

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
update articles set readNumber=readNumber+1 where id = 3;

insert into articles values(default, 1, 1, "C++11的主要化", "sdfasdkfjaj a阿里斯顿发上来看风景啊啥两地分居艾尚理得发安萨里法德啊", 0, default, default);

# 文章的阅读量
create table article_read_number(
	aid bigint not null,
    ip varchar(40) not null,
    times int default 0,
    timestamp timestamp default current_timestamp on update current_timestamp,
    
    primary key(aid, ip, timestamp),
    foreign key(aid) references articles(id) on delete cascade # 当文章删除时，其对应的这条阅读量的记录也被删除
);
select * from article_read_number;
insert into article_read_number values(3, '127.0.0.1', default);

select * from article_read_number where aid=3 and ip='0:0:0:0:0:0:0:1' order by timestamp desc limit 1;

##################################################################################################
# 文章分类
create table categories(
	id bigint auto_increment primary key,
    position bigint unique not null,
    parent_id bigint not null default 0,
    name text collate utf8_general_ci not null,
    submitTime timestamp default current_timestamp,
    
    foreign key(parent_id) references categories(id) on delete cascade
);
select * from categories;

insert into categories(name) values('前端');
insert into categories(name) values('C/C++');
insert into categories(name) values('Javascript');
insert into categories(name) values('CV');
insert into categories(name) values('OpenCV');
insert into categories(name) values('Ubuntu');
insert into categories(name) values('CUDA');
insert into categories(name) values('Machine Learning');

##################################################################################################
# 文章的Topic
# 记录一共有多少种Topic
# 问题：
# 	1.不区分大小写
# 	2.对重复意义的Topic没有管理
create table topics(
	id bigint auto_increment primary key,
    name varchar(50) collate utf8_general_ci not null unique key,
    submitTime timestamp default current_timestamp
);

select * from topics;

# 文章和Topic的对应关系
create table ats(
	aid bigint not null,
    tid bigint not null,
    primary key(aid, tid),
    foreign key(aid) references articles(id) on delete cascade, # 文章删除时，这条记录被删除
    foreign key(tid) references topics(id) on delete cascade # Topic被删除时，被删除，但是这样做我觉得不太好
);

##################################################################################################
# 文章的评论
# 文章评论和评论的回复都用的这个表，感觉方法有点歪
create table article_reviews(
	id bigint auto_increment primary key,
    uid bigint not null,
    atuid bigint not null,
    aid bigint not null,
    rid bigint not null,
    
    content text collate utf8_general_ci not null,
    submitTime timestamp default current_timestamp,
    
    foreign key(aid) references articles(id) on delete cascade,
    foreign key(uid) references users(id) on delete no action
);