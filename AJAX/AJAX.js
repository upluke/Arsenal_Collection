// AJAX stands for asynchronous JS and XML, Which is kinda of a misnomer these days,
// bc most of the time we're working with Jason APIs, not MXL APIs but in the early
// days of Ajax, XML was the reigning data format, so the term Ajax made sense also 
// it just sounds nice, Ajax.

// Let's frist talk about traditional browser requets. Traditional requests happen in 
// response to a couple of things, entering a URL and hitting enter, clicking on a link, 
// submitting a form. And in every single one of those cses, the traditional request, the 
// browser makes a request for us, it gets a response back and then it replaces the entire
// resource with new content, and the entrire page refreshes.

// Before AJAX, without making any requests via JS, all those requests all happen 
// through the browser, and you get a whole page refresh. Now let's compare that with Ajax.
// AJAX is a technique in Javascript for sending requests and receiving responses 
// from a server without having to reload the browser page. AJAX web request made from JavaScript
// in browser. In other words, we are making a request from JS, asynchronously,
// meaning that we're not refreshing the page 
// it's happening while the user still sees our original content that's already on the page, 
// JS gets a response back, then we show the user this new data

// So, to compare the two approaches: 
// A regular request, we have our browser, we click a link, we submit a form,
// we enter something into the nav bar and we hit enter, we're sending a request to the server,
// the server responds back with an entire page of HTML, and our page refreshes, and receive 
// brand new content in the form of a new document. (wikipedia.com)
// Regular Request: 
//          click link/submit form
//          ---------------------> 
// browser                          server
//           <--------------------
//        full HTML page replaces page

// WIth Ajax, we have our browser, typically a user clicks or something happens, 
// it could be on a timer, every 5s we load new data, but something triggers a 
// new request to be sent through JS, JS makes a request to a server, 
// it gets some response, sometimes it could be a ton of information,
// sometimes it might just be a couple pieces of data, these days it's usually Jason,
// not XML, but we get some data back rather than an entire webpage. Then through 
// JS, we can show the use with taht data, we can append it to the page with new elelents, etc. (caniuse.com)
// AJAX Request: 
//          javascript makes request 
//          ---------------------> 
// browser                          server
//           <--------------------
//         bit of data doesn't replace page

// Why Use AJAX?
// Don’t need to reload entire page if just 1 thing is changing
// Interactive web sites
// Fewer full page loads from server
// Your JS can talk to other servers directly
// Less info has to go across network

// There are some downsides though. Wikipedia has a nice summary, one of the big ones is that it's 
// harder to make accessible websites, that screen readers can understand and work with. It's not impossible,
// it used ot be a lot worse than it is today we have some new standards, things like ARIA. If somebody
// has very slow internet or an unreliable connection, if you're doing these Ajax requests in the background,
// sometimes the interaction or the user experience can be not great. So, it a user starts typing something,
// and immediately a request is sent, they haven't hit enter. With Ajax sometiems these requests just 
// happen when you don't know about it. And then one of the biggest issues people bring up has to do 
// with search ranking or SEO. So, most search engine algorithms including Google's, not anymore but in the past, 
// these algorithms would crawl across your web pages and look at the HTML, the content that is on the page when 
// the page loads. But if you're using a lot of Ajax to load information from a server behind the scenes, that 
// conent is not going to be there in the HTML. So, it can be hard to make a good index of your websight for 
// search engines to fully understand what actual content is on the page. But these days Google will wait for 
// JS to run, for information to come back, so it's not a huge issue, but it's somehting to be aware of.