/*const score={
  wins:0,
  losses:0,
  ties:0
};*/
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};



updateScoreElement(score);
/*  
if(!score)
{
score={
  wins:0,
  losses:0,
  ties:0
}
}*/

let isautoplaying = false;
let intervalId;
/*const autoplay = () => {

};*/

// prefer the below because
//1.easier to read
//hoisting

function autoplay(){
if(!isautoplaying){
  intervalId = setInterval(() => {
    const playermove = pickComputerMove();
    playgame(playermove);
  }, 1000);
  isautoplaying=true;
}
else{
  clearInterval(intervalId );
  isautoplaying=false;
}

if(document.querySelector('.js-autoplay')
.innerHTML === `Stop Autoplay`) {
document.querySelector('.js-autoplay')
.innerHTML = `Auto-play`;
}
else{
document.querySelector('.js-autoplay')
.innerHTML = `Stop Autoplay`;
}


}

document.querySelector('.js-rock-button')
.addEventListener('click', () => {
playgame('Rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
playgame('Paper');
})

document.querySelector('.js-scissor-button')
.addEventListener('click', () => {
playgame('Scissors');
})

document.querySelector('.js-autoplay')
.addEventListener('click', () => {
autoplay();
});

document.querySelector('.js-reset-button')
.addEventListener('click', () => {
  //playgame('Reset');
  score.wins=0;
  score.losses=0;
  score.ties=0;
  localStorage.removeItem('score');
  updateScoreElement(score); 
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playgame('Rock');
  }
  else if(event.key === 'p')
  {
    playgame('Paper');
  }
  else if(event.key === 's')
  {
    playgame('Scissors');
  }
});

function playgame(playermove){

  const computermove = pickComputerMove();
  let result='';

  if(playermove==='Scissors')
  {
      if(computermove==='Scissors'){
          result='Tie.';
        }
      else if(computermove==='Rock'){
          result = 'You lose.';
        }
      else if(computermove==='Paper'){
          result= 'You Win.';
        }
  }
  else if(playermove==='Paper')
  {

    if(computermove==='Paper'){
        result='Tie.';
      }
    else if(computermove==='Scissors'){
        result = 'You lose.';
      }
    else if(computermove==='Rock'){
        result= 'You Win.';
      }
  }
  else if(playermove==='Rock'){
        if(computermove==='Rock'){
          result='Tie.';
      }
      else if(computermove==='Paper'){
          result = 'You lose.';
      }
      else if(computermove==='Scissors'){
          result = 'You Win.';
      }
  }
  else if(playermove==='Reset')
  {
    result='Reset';
  }
  
  if(result === 'You Win.')
  {
    score.wins+=1;
  }
  else if(result === 'You lose.')
  {
    score.losses+=1;
  }
  else if(result === 'Tie.')
  {
    score.ties+=1;
  }
  /*else if(result === 'Reset')
  {
    score.wins=0;
    score.losses=0;
    score.ties=0;
  }*/

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement(score);
  resultElement(result);
  movesElement(playermove,computermove);

}

function updateScoreElement(score){
document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses},Ties: ${score.ties}`;
}

function resultElement(result){
document.querySelector('.js-result')
.innerHTML = `${result}`;
}

function movesElement(playermove,computermove){
document.querySelector('.js-moves')
.innerHTML=`You <img src="images/${playermove}-emoji.png" class="button-icon">  <img src="images/${computermove}-emoji.png" class="button-icon">Computer`;
}



function pickComputerMove(){
  const randomnumber3=Math.random(); 

  let computermove='';

  if(randomnumber3 >=0 && randomnumber3<1/3)
  {
    computermove= 'Rock'; 
  }
  else if(randomnumber3 >=1/3 &&randomnumber3 <2/3){
    computermove= 'Paper'; 
  }
  else if(randomnumber3 >=2/3 &&randomnumber3 <1){
    computermove= 'Scissors'; 
  }
  return computermove;
}
