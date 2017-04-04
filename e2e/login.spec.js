import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Ricebook', () => {
    
    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('Log in as your test user', (done) => {
        sleep(500)
            .then(findId('currentLoginedUsername').getText()
                .then(text => {
                    expect(text).to.eql(common.creds.username)
                })
                .then(done))
    })

    // it("Update the headline and verify the change", (done) => {
    //     // IMPLEMENT ME
    //     // find the headline input
    //     // .sendKeys(new headline message)
    //     // verify the headline is updated
    //     // .sendKeys(the old headline message)
    //     // verify the headline is updated
    //     let newHeadline = "This is the new headline."
    //     let oldHeadline = "This is the old headline."
    //     findId("newHeadline").clear()
    //     .then(findId("newHeadline").sendKeys(newHeadline))
    //     .then(findId('headline').click())
    //     .then(sleep(500))
    //     .then(findId('message').getText().then(
    //         text => {expect(text).to.contain("This is the new headline.")}
    //     ))
    //     .then(findId('newHeadline').clear())
    //     .then(findId('newHeadline').sendKeys(oldHeadline))
    //     .then(findId('headline').click())
    //     .then(sleep(500))
    //     .then(findId('message').getText().then(
    //         text => {expect(text).to.contain("This is the old headline.")}
    //     ))
    //     .then(done)
    // })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
