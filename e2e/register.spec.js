import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Ricebook', () => {

    it("Register a new user", (done)=>{
        sleep(1000)
        .then(findId('register_username').clear())
        .then(findId('register_username').sendKeys('pc31'))
        .then(findId('register_email').clear())
        .then(findId('register_email').sendKeys('pc31@rice.edu'))
        .then(findId('register_dob').sendKeys('01011991'))
        .then(findId('register_zipcode').clear())
        .then(findId('register_zipcode').sendKeys('77005'))
        .then(findId('register_password').clear())
        .then(findId('register_password').sendKeys('123'))
        .then(findId('register_confirmation').clear())
        .then(findId('register_confirmation').sendKeys('123'))
        .then(findId('register_button').click())
        .then(sleep(2000))
        .then(findId('success_message').getText().then(text=>{
            expect(text).to.eql("pc31, you have successfully registered. Enjoy Ricebook!")
        }))
        .then(done);
    })

})
