let LuckyNumber = Math.floor(Math.random()*100+1)
console.log(`This is the lucky number: ${LuckyNumber}`)
let UserLuckyNumbers = [];
let UserWonTimes = [];
let Won = false;
let Lose = false;
let Timer = 30;
let playleft = document.getElementById("playleft")
let TitleBar = document.getElementById("game-title")
let lastwon = document.getElementById("lastwon-p")
let bestscope = document.getElementById("bestscope-p")
let HistoryBar = document.getElementById('history-row');
let TimerBar = document.getElementById('timer-row');
playleft.innerHTML = `On this game, your mission is guess the lucky number from 1 to 100`
function GuessLuckyNumber(){
    UserInput = Number(document.getElementById("number").value);
    Guessless = 10 - UserLuckyNumbers.length
    if(Guessless>0 && Won===false && Lose===false){
        if(UserLuckyNumbers.includes(UserInput)){
            Swal.fire(`You areally guess this number, please try with another number`, '', 'error')
        }else if(UserInput>LuckyNumber){
            if((UserInput-LuckyNumber)<=10){
                Swal.fire(`Down a little bit`, '', 'error')
                UserLuckyNumbers.push(UserInput)
                playleft.innerHTML = `You got ${10-UserLuckyNumbers.length} guess left`
            }else{
                Swal.fire(`Too big`, '', 'error')
                UserLuckyNumbers.push(UserInput)
                playleft.innerHTML = `You got ${10-UserLuckyNumbers.length} guess left`
            }
        }else if(UserInput<LuckyNumber){
            if((LuckyNumber-UserInput)<=10){
                Swal.fire(`Up a little bit`, '', 'error')
                UserLuckyNumbers.push(UserInput)
                playleft.innerHTML = `You got ${10-UserLuckyNumbers.length} guess left`
            }else{
                Swal.fire(`Too small`, '', 'error')
                UserLuckyNumbers.push(UserInput)
                playleft.innerHTML = `You got ${10-UserLuckyNumbers.length} guess left`
            }
        }else if(UserInput===LuckyNumber){
            Swal.fire(`You won`, '', 'success')
            document.body.style.backgroundImage = "url('https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555294326/shape/mentalfloss/amazon_14.jpg?itok=pQahlh_z')";
            Won=true;
            TitleBar.innerHTML = "WONWONWONWONWONWONWONWON!!!!"
            playleft.innerHTML = 'You wonnnnnnnnnnnn!'
            UserWonTimes.push(11-Guessless)
            let lastWon = ''
            for(let i=0; i<UserWonTimes.length;i++){
                lastWon += `<p>Round ${i+1} won with ${UserWonTimes[i]} guess</p>`
            }
            lastwon.innerHTML = lastWon
            CurrentLowestScope = Math.min(...UserWonTimes)
            IndexOfLowestScope = UserWonTimes.indexOf(CurrentLowestScope)
            bestscope.innerHTML = `Round ${IndexOfLowestScope+1} won with ${CurrentLowestScope} guess`
        }
    }else if(Guessless<1 || Won===true || Lose===true){
        if(Won === true){
            playleft.innerHTML = `You wonnnnnnnnnn!`
            Swal.fire(`The fun is end here, goodluck with your lottery`, '', 'success')
        }else if(Won === false || Lose === true){
        Swal.fire(`The game is over now. Please restart the game`, '', 'error')
        playleft.innerHTML = `The game is over!`
        }
    }
    Timer = 30;
    document.getElementById('number').value = "";
}

function refresh(){
    document.getElementById('number').value = "";
    playleft.innerHTML = `On this game, your mission is guess the lucky number from 1 to 100!`;
    document.getElementById("message").innerHTML = null;
    document.body.style.backgroundImage = "url('https://wallpaperplay.com/walls/full/6/9/b/238359.jpg')";
    UserLuckyNumbers = [];
    Won = false;
    Lose = false;
    Timer = 30;
    Swal.fire(`Refresh your session`, '', 'success')
    TitleBar.innerHTML = 'Welcome to my Lucky Number Game'
    TimeOut()
    LuckyNumber = Math.floor(Math.random()*100+1)
    console.log(`This is the lucky number: ${LuckyNumber}`)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function history(){
    while(true){
        let newContent = '<p>Your last guess</p>';
        for(let i = 0; i<UserLuckyNumbers.length;i++){
            newContent += `<p>Guess ${i+1} with number ${UserLuckyNumbers[i]}`;
        };
        HistoryBar.innerHTML = newContent;
        await sleep(500);
    };
};


async function TimeOut(){
    while(true){
        if (Timer===0){
            Swal.fire(`Your time is out now`, '', 'error')
            Lose = true;
            break
        }else if(Won===true){
            TimerBar.innerHTML = `Winner Winner Chicken Dinner!`
            break
        }
        Timer --
        TimerBar.innerHTML = `You have ${Timer} seccond left!`
        await sleep(1000)
    }
}




TimeOut()
history()