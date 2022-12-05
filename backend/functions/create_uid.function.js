'use strict'

const possible = "0123456789";

const getRandomChar =()=> {
    return possible.charAt(Math.floor(Math.random()*possible.length));
}

const getFourRandom=() => {
    return getRandomChar() + getRandomChar() + getRandomChar() + getRandomChar() + getRandomChar() + getRandomChar()+ getRandomChar() + getRandomChar();
}

const getUID=()=>{
    return Number(getFourRandom());  
}

module.exports = getUID;