import { expect } from 'chai'
import { go, sleep, findId, findCSS, findClass, By } from './selenium'
import common from './common'

describe('Test Ricebook', () => {
    
    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it("Create a new article and validate the article appears in the feed", (done) => {

        let articlesNumBeforePost = 0
        const postText = 'Good Morning.'
        sleep(500)
        .then(findClass('article').then(
            (articles) => {
                articlesNumBeforePost = articles.length
                expect(articlesNumBeforePost).to.be.at.least(1)
            }
        ))
        .then(findId("new-article-textarea").clear())
        .then(findId("new-article-textarea").sendKeys(postText))
        .then(findId('post-btn').click())
        .then(sleep(1000))
        .then(findClass('article').then(
            (articles) => {
                return articles.length
            }
        )
        .then((articlesNumAfterPost) => {
            expect(articlesNumBeforePost + 1).to.eql(articlesNumAfterPost)
        }))
        .then(done)
    })

    it("Edit an article and validate the article text has updated", (done) => {

        const updatedArticleText = 'Good Afternoon.'
        sleep(500)
        .then(findClass('article-edit-btn').then(
            (btns) => {
                btns[0].click()
            }
        ))
        .then(findClass("article-edit-textarea").then(
            (textareas) => {
                textareas[0].clear()
                textareas[0].sendKeys(updatedArticleText)
            }
        ))
        .then(sleep(500))
        .then(findClass("article-edit-post-btn").then(
            (btns) => {
                btns[0].click()
            }
        ))
        .then(sleep(1000))
        .then(findClass('article-text').then((texts)=>texts[0].getText())
            .then((text0)=>{
                expect(text0).to.eql(updatedArticleText);
            }
        ))
        .then(done)
    })

    it("Update the status headline and verify the change", (done) => {
        const updatedHeadline = 'Happy'
        sleep(500)
        .then(findId("mystatusInput").clear())
        .then(findId("mystatusInput").sendKeys(updatedHeadline))        
        .then(findId('update-headline-btn').click())
        .then(sleep(1000))
        .then(findId("current-headline").getText()
            .then((text)=>{
                expect(text).to.eql(updatedHeadline);
            })
        )
        .then(done)
    })

    it("Count the number of followed users", (done) => {
        
        sleep(500)
        .then(findClass('followed').then(
            (followeds) => {
                expect(followeds.length).to.be.at.least(0)
            }
        ))
        .then(done)        
    })

    it("Add the user 'Follower' to the list of followed users and verify the count increases by one", (done) => {
        
        let countFollowedsBeforeAdd = 0

        const followedName = 'Follower'

        sleep(500)
        .then(findClass('followed').then(
            (followeds) => {
                if (followeds) {
                    countFollowedsBeforeAdd = followeds.length
                }
            }
        ))
        .then(findId("new-followed-input").clear())
        .then(findId("new-followed-input").sendKeys(followedName))      
        .then(findId('new-followed-add-btn').click())
        .then(sleep(5000))
        .then(findClass('followed').then(
            (followeds) => {
                expect(followeds.length).to.eql(countFollowedsBeforeAdd + 1);
            }
        ))
        .then(done)
    })

    it("Remove the user 'Follower' from the list of followed users and verify the count decreases by one", (done) => {

        let countFollowedsBeforeRemoval = 0

        const followedName = 'Follower'

        sleep(500)
        .then(findClass('followed').then(
            (followeds) => {
                if (followeds) {
                    countFollowedsBeforeRemoval = followeds.length
                }
            }
        ))
        .then(findId('Follower-remove-btn').click())
        .then(sleep(5000))
        .then(findClass('followed').then(
            (followeds) => {
                expect(followeds.length).to.eql(countFollowedsBeforeRemoval - 1);
            }
        ))
        .then(done)
    })    

    it("Search for 'Only One Article Like This' and verify only one article shows, and verify the author", (done) => {


        let articlesNumBeforeSearch = 0
        const searchWord = 'Only One Article Like This'

        sleep(500)
        .then(findClass('article').then(
            (articles) => {
                articlesNumBeforeSearch = articles.length
                expect(articlesNumBeforeSearch).to.be.at.least(1)
            }
        ))
        .then(findId('searchPost').clear())
        .then(findId('searchPost').sendKeys(searchWord))
        .then(sleep(500))
        .then(findClass('article').then(
            (articles) => {
                expect(articles.length).to.eql(1)
            }
        ))
        .then(findClass('article-author')
            .then((authors)=>authors[0].getText())
            .then((author0)=>{
                expect(author0.indexOf(common.creds.username)).to.eql(0);
            }
        ))
        .then(done)
    })    

    it("Navigate to the profile view, Update the user's email and verify", (done) => {

        sleep(500)
        .then(findId('profile-page-nav').click())
        .then(sleep(1000))
        .then(findId('new-email').clear())
        .then(findId('new-email').sendKeys('test@rice.edu'))
        .then(sleep(500))
        .then(findId('update-profile-btn').click())
        .then(sleep(2000))
        .then(findId('current-email').getText()
            .then((currentEmail) => {
                expect(currentEmail).to.contain('test@rice.edu')
            })
        )
        .then(findId('main-page-nav').click())
        .then(done)
    })

    it("Navigate to the profile view, Update the user's zipcode and verify", (done) => {

        sleep(500)
        .then(findId('profile-page-nav').click())
        .then(sleep(1000))
        .then(findId('new-zipcode').clear())
        .then(findId('new-zipcode').sendKeys('77004'))
        .then(sleep(500))
        .then(findId('update-profile-btn').click())
        .then(sleep(2000))
        .then(findId('current-zipcode').getText()
            .then((currentZipcode) => {
                expect(currentZipcode).to.contain('77004')
            })
        )
        .then(findId('main-page-nav').click())
        .then(done)
    }) 

    it("Navigate to the profile view, Update the user's password, verify a 'will not change' message is returned", (done) => {

        sleep(500)
        .then(findId('profile-page-nav').click())
        .then(sleep(1000))
        .then(findId('new-password').clear())
        .then(findId('new-password').sendKeys('1'))
        .then(sleep(500))
        .then(findId('new-confirmation').clear())
        .then(findId('new-confirmation').sendKeys('2'))
        .then(findId('update-profile-btn').click())
        .then(sleep(500))
        .then(findId('error-message').getText()
            .then((text) => {
                expect(text).to.exist
            })
        )
        .then(findId('main-page-nav').click())
        .then(done)
    }) 


    after('should log out', (done) => {
        common.logout().then(done)
    })
})
