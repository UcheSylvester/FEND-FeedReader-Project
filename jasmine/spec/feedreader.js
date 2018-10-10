/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('feed URL should be defined', function() {
            for(let feed of allFeeds) {
                // console.log(feed);

                // expectations: feed URL should be defined and should not  be empty
                expect(feed.url).toBeDefined();
                expect(feed.url.length === 0).not.toBe(true);
            };
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('feed name should be defined', function() {
            for(let x = 0; x < allFeeds.length; x++) {
                // console.log(allFeeds[x]);

                // expectations: feed name should be defined and not be empty 
                expect(allFeeds[x].name).toBeDefined();
                expect(allFeeds[x].name.length === 0).not.toBe(true);
            };
         });
    });


    /* TODO: Write a new test suite named "The menu" */

    describe('The menu', function() {
        // Declaring needed variables
        let body,
            menu;

        beforeEach(function() {
            // assigning values to our variables
            body = document.querySelector('body');
            menu = document.querySelector('.menu-icon-link');
        });

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('should be hidden', function() {

            // expect the body to contain 'menu-hidden' (the styling for hiding menu) in it's class list
            expect(body.classList.contains('menu-hidden')).not.toBe(false);
        });

        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
        */

        it('should toggle visibility on click', function() {

            // stimulating click to open menu
            menu.click();
            // expectations for open menu
            expect(body.classList.contains('menu-hidden')).not.toBe(true);

            // stimulating click to close menu
            menu.click();
            // expectation for closed menu
            expect(body.classList.contains('menu-hidden')).toBe(true);
        })
    })


    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // declaring the feed and it's contents variables here to be accessed by the test
        const feed = document.querySelector('.feed'),
              contents = feed.children;

        // Using the beforeEach since loadFeed() is asynchronous
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('loadFeed completes work', function() {

            for(let content of contents) {
                // expect(ensuring) that it is really an entry element that's displayed
                expect(content.classList.contains('entry-link')).toBe(true);
            };

            // expect that there is atleast one entry element
            expect(contents.length > 0).toBe(true);           
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {
        const feed = document.querySelector('.feed'),
              contents = feed.children,
              firstFeed = [];

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // using beforeEach as loadFeed asynchronous functions 
        beforeEach(function(done) {
            loadFeed(0);
            // converting the first contents to array using forEach method to store it's entry(elem) in the firstFeed array      
            const entries = Array.from(contents);
            for(let entry of entries) {
                console.log(entry.innerText);

                firstFeed.push(entry.innerText);
            };

            loadFeed(1, done);
        });

        it('should be able to change contents', function() {
            const contentsArray = Array.from(contents);

          contentsArray.forEach(function(elem, index) {
            console.log(elem.innerText);
            // expecting a change in feed contents
            expect(elem.innerText === firstFeed[index]).not.toBe(true);
          });
        });

    });

}());
