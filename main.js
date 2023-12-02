let arrowTop = document.querySelector(".arrow-top");

let awesomeSection = document.querySelector(".ourawesome");
let awesomeContainerNum = document.querySelectorAll(".ourawesome .box .number");
let started = false;

let skillsSection = document.querySelector(".skills");
let skillsContainerSkill = document.querySelectorAll(
  ".skills .skill .progress span"
);

let pageScroll = document.querySelector(".page-progress");

window.onscroll = function () {
  //start arrow top
  this.scrollY >= 500
    ? arrowTop.classList.add("show-top-arrow")
    : arrowTop.classList.remove("show-top-arrow");
  //End arrow top

  //Start Skills Section
  if (this.scrollY + 400 > skillsSection.offsetTop) {
    skillsContainerSkill.forEach((ele) => {
      ele.style.width = ele.dataset.width;
    });
  }
  //End Skills section

  //Start awesome Section
  if (this.scrollY + 400 > awesomeSection.offsetTop && !started) {
    awesomeContainerNum.forEach((ele) => startAwesomeCount(ele));
    started = true;
    //can search in asyncronase progarmming
    // can search in request animation frame
  }
  //End Awesome section

  //start page scroll
  pageScroll.style.width = `${
    (document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)) *
    100
  }%`;
  //Edn page scroll
};

//start arrow top
arrowTop.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
//End arrow top

//Start Awesome Count
function startAwesomeCount(ele) {
  let dataGoal = ele.dataset.goal;
  let count = setInterval(() => {
    ele.textContent++;
    if (ele.textContent == dataGoal) {
      clearInterval(count);
    }
  }, 3000 / dataGoal);
}
//End Awesome Count

//Start event time change
let eventSecs = document.querySelector(".events .time .seconds");
let eventMins = document.querySelector(".events .time .minutes");
let eventHours = document.querySelector(".events .time .hours");
let eventDays = document.querySelector(".events .time .days");
let EventWantTimer = new Date("Aug 15, 2024 23:59:59");
let days, hours, minutes, seconds;
// Get Date Now
let dateNow = new Date().getTime();
//find the date difference between now and event time
let dateDiff = EventWantTimer - dateNow;
let startEventTimer = setInterval(() => {
  dateDiff -= 1000;
  // Get time units
  days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

  eventSecs.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
  eventMins.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
  eventHours.innerHTML = hours < 10 ? `0${hours}` : hours;
  eventDays.innerHTML = days < 10 ? `0${days}` : days;
  if (dateDiff < 1000) clearInterval(startEventTimer);
}, 1000);
//End event time change

//Start Top Videos
let topVideosLinks = document.querySelectorAll(".topvideos ul li");
topVideosLinks.forEach((ele) => {
  ele.addEventListener("click", function (e) {
    changeTopVideos(e.currentTarget);
  });
});
let btnShuffleTopVideos = document.querySelector(".topvideos .shuffle-icon");
btnShuffleTopVideos.onclick = function () {
  let rndmIndx = Math.floor(Math.random() * topVideosLinks.length);
  changeTopVideos(topVideosLinks[rndmIndx]);
};

function changeTopVideos(e) {
  //remove active class from all
  topVideosLinks.forEach((ele) => {
    ele.classList.remove("active");
  });
  //add active class to clicked one
  e.classList.add("active");
  //add img to preview
  document
    .querySelector(".topvideos .preview img")
    .setAttribute("src", `images/${e.dataset.preview}.jpg`);
  //change video headline
  document.querySelector(".topvideos .preview .info > div").textContent =
    e.firstChild.textContent;
  //change video Time
  document.querySelector(".topvideos .preview .info > span").textContent =
    e.lastChild.textContent;
}
//End Top Video
