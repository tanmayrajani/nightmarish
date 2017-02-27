var Nightmare = require('nightmare');       
var nightmare = Nightmare({
  /*openDevTools: {
    mode: 'detach'
  },*/
  show: true
});

nightmare
  .goto('http://www.google.com')
  .type('#lst-ib', process.argv[2] ? process.argv[2] : 'tanmay rajani')
  // .type('body', '\u000d')
  .click('.sbico-c#_fZl')
  .wait(3000)
  .evaluate(function () {
    var nodes = document.querySelectorAll('.g .rc a:not([id^=am]):not(.fl):not(.gl)');
    var links = [];
    nodes.forEach(function (node) {
      links.push(node.getAttribute('href'))
    })
    return links;
  })
  .end()
  .then(function (result) {
    result.forEach(function(link) {
      console.log(link)
    })
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
