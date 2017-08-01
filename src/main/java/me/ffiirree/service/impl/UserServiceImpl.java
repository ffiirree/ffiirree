package me.ffiirree.service.impl;

import me.ffiirree.mapper.UserMapper;
import me.ffiirree.model.User;
import me.ffiirree.service.IUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class UserServiceImpl implements IUserService {

    @Resource private UserMapper userMapper;

    public boolean login(String username, String password) {
        return userMapper.getUserByUsername(username).getPassword().equals(password);
    }

    public void signup(String username, String password, String email) {
        userMapper.insert(username, password, email);
    }

    public User getUserById(Long id) {
        return userMapper.getUserById(id);
    }

    public User getUserByUsername(String username) {
        return userMapper.getUserByUsername(username);
    }
}
