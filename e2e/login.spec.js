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


    after('should log out', (done) => {
        common.logout().then(done)
    })
})
