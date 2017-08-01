package me.ffiirree.service;

import me.ffiirree.model.User;

public interface IUserService {

    boolean login(String username, String password);
    void signup(String username, String password, String email);

    User getUserById(Long id);
    User getUserByUsername(String username);
}
