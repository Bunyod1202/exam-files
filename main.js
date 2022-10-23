//1 domdan elementlarn olish //////////////////////////////////////////////////////////
// ! kerakli elementlar
const input = document.querySelector("input");
const preview = document.querySelector(".preview");
const image = document.querySelector(".profile-img");
const elList = document.querySelector(".answer-list")  
const elModalStart = document.querySelector(".modal-stard")  
const elModalFinish = document.querySelector(".modal-finish")  
const elForm = document.querySelector(".form")
const elGameCategory = document.querySelector(".game-category")
const elGameTimer = document.querySelector(".game-timer")  
const elGameStart = document.querySelector(".game-start")  
const elhiro = document.querySelector(".hiro")  
const elQuestionTitle = document.querySelector(".question-title")  
const elBall = document.querySelector(".shans")  
const elshans = document.querySelector(".ball")  
//! user elementlar
const elInputImg = document.querySelector(".input-img")  
const elUserImg = document.querySelector(".user-img")  
const elUserName = document.querySelector(".user-name")
const elUserNmae = document.querySelector(".user-names")  
//! audio
let checkaudio = new Audio("./audio/audiocek.mp3");
let erraudio = new Audio("./audio/audioerr.mp3");

let listFrogment = new DocumentFragment()

let cheklist = true
//? localStorage user malumoti saqlangan array
const userArray = JSON.parse(localStorage.getItem("userArray")) || []
let arr = []
//$ balni hisoblovchi ozgaruvchilar
let arrandmTitle
let num = 0
let numerror = 0
let numtrue = 0
let arrerr=[]
//2 random array //////////////////////////////////////////
function randomarray() {
  array.forEach(itm => {
    let ass = array[Math.floor((Math.random() * array.length))]
    if (!arr.includes(ass)) {
      arr.push(ass)
    } else {
      arrerr.push(ass)
    }

  })
  console.log(arrerr)
  console.log(arr)
}


//3 add user img //////////////////////////////////////////
input.addEventListener("change", updateImageDisplay);
let img
function updateImageDisplay() {
  const curFiles = input.files;
  img = URL.createObjectURL(curFiles[0])
  image.src = URL.createObjectURL(curFiles[0]);
}

//4 user malumatlarni qabul qilish /////////////////////////
elForm.addEventListener("submit", function (evt) {
  evt.preventDefault()
  elModalStart.classList.remove("d-block")
  elModalStart.classList.add("d-none")
  elModalFinish.classList.toggle("d-none")
  //@ user rasimi va ismin objectga saqlash
  let obj = {
    user_name: elUserName.value,
    img:img
  }
  //* usern objecn arrayga joylash
  if (userArray.length !== 1) {
    userArray.push(obj)
  } else {
    
  }
  console.log(userArray);
  localStorage.setItem("userArray", JSON.stringify(userArray))
  
})
//5 usern malumotlarin  oziga korsatish ////////////////////////
userArray.forEach(user => {
  elUserImg.src = user.img
  elUserNmae.textContent = user.user_name
  image.src = user.img
  elUserName.value = user.user_name
  elInputImg.required = false
  elInputImg.disabled = true
})
//6 oyini boshlash ////////////////////////////////////////////
elGameStart.addEventListener("click", () => {
  //5 usern malumotlarin  oziga korsatish ////////////////////////
  userArray.forEach(user => {
    elUserImg.src = user.img
    elUserNmae.textContent = user.user_name
    image.src = user.img
    elUserName.value = user.user_name
  })
  elhiro.classList.remove("d-none")
  elModalFinish.classList.toggle("d-none")
  
  categori()
  
})

//7 user kiritilgan malumotlarn solishtitish ////////////////////
function categori() {
  randomarray()
  
  elList.innerHTML = ""
  let arrayRandomEasy = arr.slice(0, 20)
  let arrayRandomMidle = arr.slice(0, 40)
  let arrayRandomDifficult = arr.slice(0, 60)
  if (elGameCategory.value == "easy") {
    yutish(arrayRandomEasy,20)
    addList(arrayRandomEasy)
    arrandmTitle = arrayRandomEasy[Math.floor((Math.random() * arrayRandomEasy.length))]
    elQuestionTitle.textContent = arrandmTitle.name
    
  }else if (elGameCategory.value == "midle") {
    addList(arrayRandomMidle)
    arrandmTitle = arrayRandomMidle[Math.floor((Math.random() * arrayRandomMidle.length))]
    elQuestionTitle.textContent = arrandmTitle.name
    yutish(arrayRandomMidle,40)
    
  }else if (elGameCategory.value == "difficult") {
    addList(arrayRandomDifficult)
    arrandmTitle = arrayRandomDifficult[Math.floor((Math.random() * arrayRandomDifficult.length))]
    elQuestionTitle.textContent = arrandmTitle.name
    yutish(arrayRandomDifficult,60)
    
  }
  if (elGameTimer.value == "2time") {
    timers(1)
  }else if (elGameTimer.value == "3time") {
    timers(5)
  }else if (elGameTimer.value == "4time") {
    timers(8)
  }
}
//8 listlarni chizish//////////////////////////////////////////////
function addList(arr) {
  elList.innerHTML =""
  arr.forEach(item => {
    let card = document.createElement("li")
    let cardimg = document.createElement("img")
    
    card.classList.add("card-item")
    cardimg.classList.add("img-card")
    
    cardimg.src = item.arrayImg
    cardimg.dataset.cardid = item.id
    card.style.animationDirection
    card.appendChild(cardimg)
    listFrogment.appendChild(card)
  })
  elList.appendChild(listFrogment)
  
}
//9 harbir list bosilganda  ////////////////////////////////////////
function yutish(arrayRandomEasy,numbers) {
  elList.addEventListener("click", (evt) => {
    if (cheklist == true) {
      if (evt.target.matches(".img-card")) {
        let listId = evt.target.dataset.cardid
        let editinlist = evt.target.parentElement;
        
        
        if (listId == arrandmTitle.id) {
          //5 yutish ///////////////////////////////////////
          let editin = evt.target.parentElement.childNodes[0];
          document.querySelectorAll(".card-item").forEach(itm => {
            console.log(itm);
            itm.style.backgroundColor = "#00000000"
          })
          let dellfind = arrayRandomEasy.findIndex(itm => itm.id == listId)
          ++numtrue
          //4 oyinda yutib chiqish //////////////////////////////////
          setTimeout(() => {
            if (numtrue == numbers) {
              let imgYouWin = document.querySelector(".you-win")
              elhiro.classList.add("d-none")
              imgYouWin.classList.remove("d-none")
              setTimeout(() => {
                imgYouWin.classList.add("d-none")
                elModalStart.classList.toggle("d-none")
                arr = []
                numerror = 0
                elBall.textContent = `ball ${num = 0}`
              },"2000")
            }
       },1000)
        
          arrayRandomEasy.splice(dellfind, 1)
          arrandmTitle = arrayRandomEasy[Math.floor((Math.random() * arrayRandomEasy.length))]
          elQuestionTitle.textContent = arrandmTitle.name
          editin.style.transition = "opacity 1s "
          
          editin.style.opacity = "0"
          editinlist.style.backgroundColor = "#157d0077"
          checkaudio.play()

          cheklist = false
          setTimeout(() => {
            cheklist = true
          },100)
          setTimeout(() => {
            editin.style.opacity = "1"
            editin.src = "./images/check-mark.png"
            checkaudio.stop()
          }, "1000")
          
          elBall.textContent = `Ball: ${num += 2}`
          console.log(numerror);
        } else {
          // 3  yutqazish//////////////////////////////
          elBall.textContent = `Ball: ${--num}`
          ++numerror
          editinlist.classList.add("delanimation")
          setTimeout(() => {
            editinlist.classList.remove("delanimation")

          },1000)

          elshans.textContent= `Imkoniyat: -${numerror}`
          editinlist.style.transition = "all 1s "
          editinlist.style.backgroundColor = "#7d000077"
          erraudio.play()
          cheklist = false
          setTimeout(() => {
            cheklist = true
          },100)
          console.log(numerror);
          //8 oyin tugashi ///////////////////////////////////
          if (numerror == 5) {
            setTimeout(() => {
              let imgGaneOver = document.querySelector(".gane-over")
            elhiro.classList.add("d-none")
              imgGaneOver.classList.remove("d-none")
              setTimeout(() => {
                imgGaneOver.classList.add("d-none")
                elModalStart.classList.toggle("d-none")
                arr = []
                numerror = 0
                elshans.textContent= `Imkoniyat: 5ta imkon berild`
                elBall.textContent = `Ball: ${num = 0}`
                // location.reload()
              },2000)
           },1000)
        
            
          }
        }
      }
    }
 
  })
}

//2 Timer /////////////////////////////////////////////////

function timers(minutes) {
  let eltime = document.querySelector(".tim").innerHTML=""
  const oneSec = 1000,
  container = document.getElementById('timer');
  
  
  dataMinutes = minutes
  dataSeconds = container.getAttribute('data-seconds'),
  timerEnd 		= container.getAttribute('data-timer-end'),
  timerOnEndMsg = "data-timer-end";
  
  
  if (dataMinutes == '' || dataMinutes == null || dataMinutes == NaN) {
    dataMinutes = "0";
  }
  if (dataSeconds == '' || dataSeconds == null || dataSeconds == NaN) {
    dataSeconds = "0";
  }
  
  let hoursSpan = document.createElement('span'),
  minutesSpan = document.createElement('span'),
  secondsSpan = document.createElement('span'),
  separator1 = document.createElement('span'),
  separator2 = document.createElement('span'),
  separatorValue = ":",
  max = 59,
  s = parseInt(dataSeconds) > max ? max : parseInt(dataSeconds),
  m = parseInt(dataMinutes) > max ? max : parseInt(dataMinutes);
  
  secondsSpan.classList.add('time');
  minutesSpan.classList.add('time');
  
  
  
  
  separator2.textContent = separatorValue;
  
  checkValue = (value)=>{
    if (value < 10) {
      return "0" + value;
    } else {
      return value;
    }
  }
  
  
  minutesSpan.textContent = checkValue(dataMinutes);
  secondsSpan.textContent = checkValue(dataSeconds);
  
  timer = (sv,mv,)=>{
    
    s = parseInt(sv);
    m = parseInt(mv);
    
    
    if (s > 0) {
      return s -= 1;
    } else {
      s = max;
      if (m > 0) {
        return m -= 1;
      } else {
        m = max;
        
      }
    }
  }
  
  finished = ()=>{
    max = 0;
    let timerEnd = container.getAttribute(timerOnEndMsg);
    container.setAttribute(timerOnEndMsg ,"true");
    if (timerEnd == '' || timerEnd == null) {
    //8 oyin tugashi ///////////////////////////////////
      container.textContent = "00:00";
      elhiro.classList.add("d-none")
      
      let imgGaneOver = document.querySelector(".gane-over")
      imgGaneOver.classList.remove("d-none")
      setTimeout(() => {
        elModalStart.classList.toggle("d-none")
        imgGaneOver.classList.add("d-none")
        arr = []
        numerror = 0
        elshans.textContent = `Imkoniyat: 5ta imkon berild`
        elBall.textContent = `Ball: ${num = 0}`

      },1000)
    } else {
      container.textContent = timerEnd;
    }
  }
  // tryAgain.style.display = "none"
  counter = setInterval(()=>{
    
    if ( m == 0 && s == 0) {
      clearInterval(counter, finished());
    }
    
    if (s >= 0) {
      timer(s,m);
      
      minutesSpan.textContent = checkValue(m);
      secondsSpan.textContent = checkValue(s);
    }
  }, oneSec);
  
  let children = [hoursSpan, separator1, minutesSpan, separator2, secondsSpan];
  
  for (child of children) {
    container.appendChild(child);
  }
  
}

