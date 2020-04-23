//write code here
//Todos:
//1. set a timer when page is loaded XXX
//2.add listener to buttons

let counter = document.querySelector('#counter');



const bodyTag = document.querySelector('body');
const ulTag = document.querySelector('ul');
const minusBtn = document.querySelector('#minus');
const plusBtn = document.querySelector('#plus');
const heartBtn = document.querySelector('#heart');
const pauseBtn = document.querySelector('#pause');
const formTag = document.querySelector('#comment-form');
const commentList = document.querySelector("#list");

let timer = window.setInterval(setTimer, 1000);
function setTimer() {
    let startTime = parseInt(counter.textContent);
    startTime++;
    counter.textContent = startTime;
}

function isThere(number) { 
    let allLi = Array.from(ulTag.children);  
    for(const element in allLi) {
        if (parseInt(allLi[element].dataset.timeCount) === number) {
            return true;
        } 
    }
    return false;
}

bodyTag.addEventListener('click', function(event){
    let eTarget = event.target;
    let timeNumber = parseInt(counter.textContent);
    if (eTarget.id === 'minus') {
        counter.textContent = timeNumber - 1;
    } else if(eTarget.id === 'plus') {
        counter.textContent = timeNumber + 1;
    } else if(eTarget.id === 'heart') {
        let flag = isThere(timeNumber);
        if (!flag) {
            let likeLi = document.createElement('li');
            likeLi.id = `${timeNumber}`
            likeLi.dataset.timeCount = timeNumber;
            likeLi.dataset.likeCount = 1;
            likeLi.innerHTML = `
            Number: ${likeLi.dataset.timeCount}, Like Count: ${likeLi.dataset.likeCount}`
            ulTag.append(likeLi);
        }else {
            let thisLi = document.getElementById(`${timeNumber}`); 
            let num = parseInt(thisLi.dataset.likeCount);
            thisLi.dataset.likeCount = num + 1;
            thisLi.innerHTML = `
            Number: ${thisLi.dataset.timeCount}, Like Count: ${thisLi.dataset.likeCount}`
        }
    } else if(eTarget.textContent === ' pause ') {
        minusBtn.disabled = 'true';
        plusBtn.disabled = 'true';
        heartBtn.disabled = 'true';
        eTarget.textContent = "resume";
        //pause the counter: 
        clearInterval(timer);
    } else if(eTarget.textContent === 'resume') {
        !minusBtn.disabled;
        !plusBtn.disabled;
        !heartBtn.disabled;  
        setInterval(setTimer, 1000);
        eTarget.textContent = " pause ";
    }

})

formTag.addEventListener('submit', function(event) {
    event.preventDefault();
    let newComment = document.createElement('p');
    let userComment = document.querySelector('#comment-input').value;
    newComment.textContent = userComment;
    commentList.append(newComment);
})

