import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: 'pc30test',
    password: 'center-each-train'
}

exports.login = () =>
    sleep(500)
        .then(findId('loginInputUsername').clear())
        .then(findId('loginInputPassword').clear())
        .then(findId('loginInputUsername').sendKeys(exports.creds.username))
        .then(findId('loginInputPassword').sendKeys(exports.creds.password))
        .then(findId('loginBtn').click())
        .then(sleep(2000))

exports.logout = () =>
    sleep(500)
        .then(findId('logoutBtn').click())
        .then(sleep(500))
