const Nightmare = require('nightmare')
const nightmare = Nightmare({ 
  show: true,
  fullscreen: true
})

var day = new Date().getDay() + 1
var timesheetURL = '<timesheet Login URL here>'

nightmare
  .goto(timesheetURL)
  .type('div#idPrimaryContent > form:nth-child(2) > div.clsLoginForm:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > input:nth-child(1)', process.argv[2])
  .type('div#idPrimaryContent > form:nth-child(2) > div.clsLoginForm:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > input:nth-child(1)', process.argv[2])
  .click('div#idPrimaryContent > form:nth-child(2) > div.clsLoginForm:nth-child(1) > p:nth-child(3) > input.clsButton:nth-child(1)')
  .wait('div#idTab_0 a')
  .click('div#idTab_0 a')
  .wait('table#idMainTableRight tr#rhsrow1')
  .type('table#idMainTableRight tr#rhsrow1 td:not(.weekends):nth-child('+day+') input', false)
  .type('table#idMainTableRight tr#rhsrow1 td:not(.weekends):nth-child('+day+') input', process.argv[3] ? process.argv[3] : "9")
  .wait(500)
  .click('#enterAction')
  .wait('#docStatus_status td:nth-child(2)')
  .wait(1500)
  .evaluate(function () {
    return document.querySelector('#docStatus_status td:nth-child(2)').textContent
  })
  .end()
  .then(function (result) {
    console.log("Success !!!  " + result)
  })
  .catch(function (error) {
    console.error('Error:', error)
  });
