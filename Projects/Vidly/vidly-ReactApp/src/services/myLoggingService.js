//What is sentry? its a loggingServiceProvider (log your app errors on Sentry )
//inspite of using console.log() to show error to user and think that the user will report  u the error then
//you will fix the error use as we know once we deploy our app we will not be able to see error as they will be shown on
//the user browser console who is using the webApp so solution is we need to log these error somewhere we can access them
//so use "loggingServiceProvider" we used here "SENTRY" website and its package SentryBrowser which we import on top
//in this way we sent the error to pur Sentry account for this application.

//first then    npm i @sentry/browser
import * as Sentry from "@sentry/browser";
//called this method in App.js before render it should called there see
function init() {
  //configure Sentry with this application
  //used this link which is for this only applicatio   https://docs.sentry.io/platforms/javascript/react/?_ga=2.133390475.444789647.1552720200-699920733.1552720200
  //also login in to sentry.com create project where you will get but below two lines Sentry.init{...}
  //this configuration should be written before rendering the application so its before reactDom.render()
  //dsn is unique value for every app
  //we used Sentry in httpService.js there we defined why we use it.
  Sentry.init({
    dsn: "https://c6a0c4c1323e436c9158fe499f9a55a7@sentry.io/1422437"
  });
}

function log(error) {
  //console.log("logging Error : ", error);
  //inspite of using console.log() to show error to user and think that the user will report  u the error then
  //you will fix the error use as we know once we deploy our app we will not be able to see error as they will be shown on
  //the user browser console who is using the webApp so solution is we need to log these error somewhere we can access them
  //so use "loggingServiceProvider" we used here "SENTRY" website and its package SentryBrowser which we import on top
  //in this way we sent the error to pur Sentry account for this application.
  Sentry.captureException(error);
}

//init and log objects are default exports. in js methods are also objects
export default {
  init,
  log
};
