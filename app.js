import {
    Hero
} from "./class.js"
import {
    Foe
} from "./class.js"

// document.getElementById('sound_control').onclick = soundOff;
// function soundOff(){
// if ( document.getElementById("sound_control").classList.contains('fa-volume-mute') ){
//     document.getElementById("sound_control").classList.add('fa-volume-up');
//     document.getElementById("sound_control").classList.remove('fa-volume-mute');
// }
// else{
//     document.getElementById("sound_control").classList.add('fa-volume-mute');
//     document.getElementById("sound_control").classList.remove('fa-volume-up');
// }

// }


var playBtn;
var mainBox = document.getElementById('main-box')
var botMenu = document.getElementById('bottom_menu')
var middle = document.getElementById('middle')
var top_text = document.getElementById('top_text')
var story_text = document.getElementById('story_text')
var enemy_box = document.getElementById('enemy_box')
var audioOpening = new Audio("./Retained/Sounds/Trippy.wav")
var audioIntro = new Audio("./Retained/Sounds/ambiant.mp3")
var audioBattle = new Audio("./Retained/Sounds/combat-theme-t.mp3")
var audioLost = new Audio("./Retained/Sounds/game-over-t.mp3")
var audioWin = new Audio("./Retained/Sounds/Victory.mp3")
var healSound = new Audio("./Retained/Sounds/magical_3.ogg")
var magicSound = new Audio("./Retained/Sounds/magic.mp3")
var bossSound = new Audio("./Retained/Sounds/boss.wav") 



const patxi = new Hero('Patxi Patxaran', 160, 160, 50, 50, 12, 8, 10, 10, 0, 10, 1, 0.8, 2.1);
console.log(patxi);
//Foe#1
const rat = new Foe('Rat', 16, 16, 10, 5, 0, 3, 1, 10, false, true);
//Foe#2
const bat = new Foe('Bat', 22, 22, 22, 8, 1, 3, 2, 12, false, true);
//Foe#3
const slime = new Foe('Slime', 25, 25, 18, 25, 0, 3, 3, 15, false, true);
//Foe#4
const spider = new Foe('Spider', 20, 20, 20, 5, 5, 6, 4, 18, true, false);
//Foe#5
const scorpion = new Foe('Scorpion', 23, 23, 22, 8, 0, 6, 4, 20, false, true);
//Foe#6
const daemarbora = new Foe('Daemarbora', 35, 35, 7, 7, 23, 10, 3, 30, false, false);
//Foe#7
const drakaurum = new Foe('Drakaurum', 45, 45, 30, 18, 21, 20, 8, 42, true, false);
//Foe#8
const demon = new Foe('Demon', 57, 57, 28, 22, 38, 27, 9, 57, false, true);
//Foe#9
const deceleon = new Foe('Deceleon', 65, 65, 40, 25, 20, 13, 11, 75, true, false);
//Boss
const boss = new Foe('Vino', 100, 100, 60, 35, 60, 35, 12, 100, true, true);
//Healing


var foe = [rat,bat,slime,spider,scorpion,daemarbora,drakaurum,demon,deceleon,boss];

var step = 0;

openingContent();
document.getElementById('play_btn').onclick = () => startGame(foe[step]);
console.log(startGame);



//SETUP ------------------------------------------------

function openingBackGround(){
    mainBox.style.background = "ur(./Retained/environment.psd.png)";
    botMenu.style.visibility = "hidden";
    middle.innerHTML = `<div id="mid_content"><div><h1>The Adventures of Patxi Patxaran</h1></div>
    <br/><br/>
    <div id="play_btn"><p>Play</p></div>
    </div>`
}

function openingContent() {
    audioLost.play()
    openingBackGround()
    audioOpening.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);


}

function gameStartInner(){
    document.getElementById('title').innerHTML="<h1 id='main_title'>The Adventures of Patxi Patxaran</h1>"
    mainBox.style.background = "url(./Retained/intro.png)";
    botMenu.style.visibility = "visible";
    middle.innerHTML = `<aside id="enemy_box"></aside>
    <div ></div>`;
    botMenu.innerHTML = `<div id="story_text">In the Faraway land of Syldra, an evil mage named Vino Veritas stole the wine from the village of Astara... Patxi Patxaran, hero of the day, set to fight him to get it back...</div>`;
}

// function healingInner(cb){
//     mainBox.style.background = "url(./Retained/Background/healing.jpg)";
//     botMenu.style.visibility = "visible";
//     middle.innerHTML = `<aside id="enemy_box"></aside>
//     <div ></div>`;
//     botMenu.innerHTML = `<div id="story_text">You encountered a fountain of healing. You regained ${patxi.maxHp-patxi.hp}HP and ${patxi.maxMp-patxi.mp}MP.</div>`;
//     patxi.fullHeal()
//     cb()
// }

function startGame(currentFoe) {
    audioLost.pause()
    audioIntro.play()
    audioIntro.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);

    gameStartInner()
    
    setTimeout(() => {
        fightUi(currentFoe)
        fight(currentFoe);
    }, 7000);
}




//SPECIAL ITERATIONS --------------

// function healing(){
//     healingInner(() => {
//         step +=1
//         setTimeout(() => {fight(foe[step])},5000);
//     })
 
// }

function betweenFights(currentFoe){
    var audio = new Audio("./Retained/Sounds/Trippy.wav")
    audio.play()
    top_text.innerHTML=`You defeated ${currentFoe.name}! You are such a B.A Patxi!`
    document.getElementById('avatar').style.background = "url(./Retained/hero_victory.png)"
    console.log(step,'This is the step yo')
    
    
    setTimeout(() => {audio.pause();
        if(step==9){
            console.log("ici")
            bossIntro(foe[step])

        }else fight(foe[step]);},3000);

}
//BOSSFIGHT-------------------------------

function bossIntro(currentFoe){
    bossSound.play()
    
    console.log('face the boss')
    mainBox.style.background = "url(./Retained/Background/vino.png)";
    mainBox.style.backgroundSize = "contain"
    botMenu.style.visibility = "visible";
    top_text.innerHTML="VINO VERITAS IS PISSED!"
    middle.innerHTML = `<div id="mid_content">
    <br/><br/>
    <div id="boss_intro"></div>
    </div>`;
    botMenu.innerHTML = `<div id="story_text"></div>`;
    document.getElementById('story_text').innerHTML = `You are no match for me, Patxi Patxaran.`
    // setTimeout(() => {document.getElementById('story_text').innerHTML = `You will never get my wine!!!!`},2000);
    setTimeout(() => {bossBattle(currentFoe)},5000);

}

function bossBattle(currentFoe){
    fightUi(currentFoe)
    bossFight(currentFoe)
}

// VICTORY --------------------------

function newLevel(patxi){
    var newLevelAudio = new Audio("./Retained/Sounds/blessing.ogg")
     
    setTimeout(() => { document.getElementById('top_text').innerHTML = "You gained a level!";newLevelAudio.play()  },3000);
    document.getElementById('mana').innerHTML = `<span>LVL:${patxi.lvl}</span>`
    document.getElementById('status').innerHTML = `<span>HP:${patxi.hp}/${patxi.maxHp}</span>`
    document.getElementById('name').innerHTML = `<span>MP:${patxi.mp}/${patxi.maxMp}</span>`
    document.getElementById('atk').innerHTML = `<span>ATK:${patxi.atk}</span>`
    document.getElementById('flex').innerHTML = `<span>MAG:${patxi.mag}</span>`
}

function victory(currentFoe) {
    audioBattle.pause()
    audioWin.play()

    document.getElementById('top_text').innerHTML = `You defeated ${currentFoe.name}! you gained ${currentFoe.xpDrop}XP!`
    const newXp = patxi.gainXp(currentFoe.xpDrop,newLevel )
        console.log(patxi.curXp)
    document.getElementById('monster_spot').style.visibility = "hidden";
    document.getElementById('enemy_box').style.visibility = "hidden";
    
    setTimeout(() => {step +=1;
        
        // if(step>9){
        //     firstEnding()
        // }
        betweenFights(currentFoe)},5000);

}
function victoryBoss(currentFoe) {
    audioBattle.pause()
    audioWin.play()

    document.getElementById('top_text').innerHTML = `You defeated ${currentFoe.name}!`
    document.getElementById('monster_spot').style.visibility = "hidden";
    document.getElementById('enemy_box').style.visibility = "hidden";
    
    setTimeout(() => {
        
        // if(step>9){
        //     firstEnding()
        // }
        ending(currentFoe)},5000);

}

function seduceVictory(currentFoe){
    audioBattle.pause()
    audioWin.play()

    document.getElementById('top_text').innerHTML = `You seduced ${currentFoe.name}! you gained ${currentFoe.xpDrop}XP!`
    const newXp = patxi.gainXp(currentFoe.xpDrop,newLevel )
        console.log(patxi.curXp)
    document.getElementById('monster_spot').style.visibility = "hidden";
    document.getElementById('enemy_box').style.visibility = "hidden";
    
    setTimeout(() => {step+=1;
        // if(step>9){
        //     secondEnding()
        // }
        betweenFights(currentFoe)},5000);
} 

function scareVictory(currentFoe){
    audioBattle.pause()
    audioWin.play()

    document.getElementById('top_text').innerHTML = `You scared ${currentFoe.name}! you gained ${currentFoe.xpDrop}XP!`
    const newXp = patxi.gainXp(currentFoe.xpDrop,newLevel )
        console.log(patxi.curXp)
    document.getElementById('monster_spot').style.visibility = "hidden";
    document.getElementById('enemy_box').style.visibility = "hidden";
    
    setTimeout(() => {step +=1;
        // if(step>9){
        //     thirdEnding()
        // }
        betweenFights(currentFoe)},5000);
} 

// ENDING ---------------------------------------------------

function ending(){
    bossSound.pause()
    audioWin.play()
    
    mainBox.style.backgroundSize="cover";
    
    mainBox.style.backgroundImage = "url(./Retained/Story_sprite/PNG/environment/environment-preview.png)";
    mainBox.classList.toggle('animate-bg')
    document.getElementById('battle').style.visibility = "hidden";
    botMenu.style.visibility = "visible";
    // document.getElementById('story_text').style.visibility="visible";
    top_text.innerHTML="YOU DID IT! YOU DEFEATED VINO VERITAS!!"
    botMenu.innerHTML="<div id='story_text'>You win this time, Patxi...But I'll come back!!</div>";
    middle.innerHTML = `<div id="mid_content"><div><h1>GAME WON</h1></div>
    <br/><br/>
    <div id="game_won"></div>
    </div>`
    setTimeout(() => {window.location.reload()},10000);
}

function seduceEnding(){
    bossSound.pause()
    audioWin.play()
    mainBox.style.backgroundSize="cover";
    
    mainBox.style.backgroundImage = "url(./Retained/Story_sprite/PNG/environment/environment-preview.png)";
    mainBox.classList.toggle('animate-bg');
    document.getElementById('battle').style.visibility = "hidden";
    botMenu.style.visibility = "visible";
    // document.getElementById('story_text').style.visibility="visible";
    top_text.innerHTML="YOU SEDUCED VINO, YOU ARE NOW LOVERS!!"
    botMenu.innerHTML="<div id='story_text'>I... did not expect that... Seems like a deep hatred of each other hides a profound love unveiled by alcohol intoxication!</div>";
    middle.innerHTML = `<div id="mid_content"><div><h1>LOVE WINS</h1></div>
    <br/><br/>
    <div id="game_won"></div>
    </div>`
    setTimeout(() => {window.location.reload()},10000);

}

function scareEnding(){
    bossSound.pause()
    audioWin.play()
    mainBox.style.backgroundSize="cover";
    
    mainBox.style.backgroundImage = "url(./Retained/Story_sprite/PNG/environment/environment-preview.png)";
    mainBox.classList.toggle('animate-bg')
    document.getElementById('battle').style.visibility = "hidden";
    botMenu.style.visibility = "visible";
    // document.getElementById('story_text').style.visibility="visible";
    top_text.innerHTML="YOU SCARED HIM! HAHA, HE'S SUCH A LOSER!!"
    botMenu.innerHTML="<div id='story_text'>You're pretty scary Patxi... What are you gonna do with that wine?</div>";
    middle.innerHTML = `<div id="mid_content"><div><h1>I'M ACTUALLY SCARED</h1></div>
    <br/><br/>
    <div id="game_won"></div>
    </div>`
    setTimeout(() => {window.location.reload()},10000);

}

// DEFEAT ----------------------------------------------------

function gameOver(){
    audioBattle.pause()
    audioLost.play()
    audioLost.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    
    mainBox.style.background = "url(./Retained/environment.psd.png)";
    document.getElementById('battle').style.visibility = "hidden";
    botMenu.style.visibility = "visible";
    // document.getElementById('story_text').style.visibility="visible";
    botMenu.innerHTML="<div id='story_text'>You lose...Maybe Next Time!</div>";
    middle.innerHTML = `<div id="mid_content"><div><h1>GAME OVER</h1></div>
    <br/><br/>
    <div id="game_over"></div>
    </div>`
    setTimeout(() => {window.location.reload()},5000);
}

//TURN ROTATION ------------------------------------------------------------

//PATXI MAG DAMAGE TURN 

function updateMp(){
    document.getElementById('name').innerHTML=`<span>MP:${patxi.mp}/${patxi.maxMp}</span>`
}


function magicTurn(currentFoe){
    if(patxi.mp <5){
        document.getElementById('top_text').innerHTML = `You dealt don't have enough MP for that!`;
        enemyTurn(currentFoe)
    }
    document.getElementById('avatar').style.background = "url(./Retained/hero_magic.png)"
    
    
    setTimeout(() => {
        document.getElementById('avatar').style.background = "url(./Retained/hero_battle.png)";
    }, 500);
    let mDamage = patxi.magic()
   let damage =  currentFoe.receiveMagicDamage(mDamage)
    updateMp()
    if(currentFoe.hp>=1){
    enemyHurt(currentFoe)
    }

    
    magicSound.play()
    document.getElementById('top_text').innerHTML = `You dealt ${damage} magic damage to ${currentFoe.name}!`;
    updateEnemyHP(currentFoe)
    if (currentFoe.hp >= 1) {
        setTimeout(() => {
            enemyTurn(currentFoe);
        }, 2000);
        document.getElementById("combat_menu").style.backgroundColor = "#dddddd";
        console.log(rat)

    } else if (currentFoe.hp <= 0) {
        currentFoe.hp == 0
        victory(currentFoe);
    }

}

function bossMagicTurn(currentFoe){
    if(patxi.mp <5){
        document.getElementById('top_text').innerHTML = `You dealt don't have enough MP for that!`;
        enemyTurn(currentFoe)
    }
    document.getElementById('avatar').style.background = "url(./Retained/hero_magic.png)"
    
    
    setTimeout(() => {
        document.getElementById('avatar').style.background = "url(./Retained/hero_battle.png)";
    }, 500);
    let mDamage = patxi.magic()
   let damage =  currentFoe.receiveMagicDamage(mDamage)
    updateMp()
    if(currentFoe.hp>=1){
    enemyHurt(currentFoe)
    }

    
    magicSound.play()
    document.getElementById('top_text').innerHTML = `You dealt ${damage} magic damage to ${currentFoe.name}!`;
    updateEnemyHP(currentFoe)
    if (currentFoe.hp >= 1) {
        setTimeout(() => {
            enemyTurn(currentFoe);
        }, 2000);
        document.getElementById("combat_menu").style.backgroundColor = "#dddddd";
        console.log(rat)

    } else if (currentFoe.hp <= 0) {
        currentFoe.hp == 0
        ending(currentFoe);
    }

}

// PATXI PHYSICAL DAMAGE TURN ---------
function turn(currentFoe) {
        
    document.getElementById('avatar').style.background = "url(./Retained/hero_fight.png)"
    setTimeout(() => {
        document.getElementById('avatar').style.background = "url(./Retained/hero_battle.png)";
    }, 500);

    let damageTo = patxi.attack()
    let damage = currentFoe.receiveDamage(damageTo)
    if(currentFoe.hp>=1){
    enemyHurt()
    }

    let audio = new Audio("./Retained/Sounds/hit33.mp3.flac")
    audio.play();
    document.getElementById('top_text').innerHTML = `You dealt ${damage} physical damage to ${currentFoe.name}!`;
    
    updateEnemyHP(currentFoe)
    if (currentFoe.hp >= 1) {
        setTimeout(() => {
            enemyTurn(currentFoe);
        }, 2000);
        document.getElementById("combat_menu").style.backgroundColor = "#dddddd";
        console.log(rat)

    } else if (currentFoe.hp <= 0) {
        currentFoe.hp == 0
        victory(currentFoe);
    }

}
function bossTurn(currentFoe) {
        
    document.getElementById('avatar').style.background = "url(./Retained/hero_fight.png)"
    setTimeout(() => {
        document.getElementById('avatar').style.background = "url(./Retained/hero_battle.png)";
    }, 500);

    let damageTo = patxi.attack()
    let damage = currentFoe.receiveDamage(damageTo)
    if(currentFoe.hp>=1){
    enemyHurt()
    }

    let audio = new Audio("./Retained/Sounds/hit33.mp3.flac")
    audio.play();
    document.getElementById('top_text').innerHTML = `You dealt ${damage} physical damage to ${currentFoe.name}!`;
    
    updateEnemyHP(currentFoe)
    if (currentFoe.hp >= 1) {
        setTimeout(() => {
            enemyTurn(currentFoe);
        }, 2000);
        document.getElementById("combat_menu").style.backgroundColor = "#dddddd";
        

    } else if (currentFoe.hp <= 0) {
        currentFoe.hp == 0
        bossSound.pause();
        victoryBoss(currentFoe);
    }

}


//SEDUCTION ----------------------------------------------------


function seduceTurn(currentFoe){
    if(currentFoe.seduction == true){
        seduceVictory(currentFoe)   
    }
    else {
        seduceEnemyTurn(currentFoe)
    }
}

function seduceBoss(currentFoe){
    if(currentFoe.seduction == true){
        seduceEnding(currentFoe)   
    }
    else {
        seduceEnemyTurn(currentFoe)
    }
}

//SCARE ----------------------------------------------------
function scareTurn(currentFoe){
    if(currentFoe.scare == true){
        scareVictory(currentFoe)   
    }
    else {
        scareEnemyTurn(currentFoe)
    }

}
function scareBoss(currentFoe){
    if(currentFoe.scare == true){
        scareEnding(currentFoe)   
    }
    else {
        scareEnemyTurn(currentFoe)
    }

}

// function seduceTurn{
//     magicDamage
// }


//HP UPDATES UPON ATTACK---------------------------------------------------------------

function updateEnemyHP(currentFoe) {
    document.getElementById('enemy_box').innerHTML = `${currentFoe.name}<br/>LVL: ${currentFoe.lvl}<br/>HP:${currentFoe.hp}/${currentFoe.maxHp}<br/><br/>ATK:${currentFoe.atk}<br/>DEF:${currentFoe.def}<br/>MAG:${currentFoe.mag}<br/>SPR:${currentFoe.spr}`;
    if (currentFoe.hp <= 0) {
        document.getElementById('enemy_box').innerHTML = `${currentFoe.name}<br/>HP: 0/${currentFoe.maxHp}<br/>LVL: ${currentFoe.lvl}`;
    }

}

function updateHeroHP() {
    document.getElementById('status').innerHTML = `HP:${patxi.hp}/${patxi.maxHp}`;
    if (patxi.hp<1){    
        gameOver()
    }

}

//ENEMY TURN --------------------------------------------------------------

function enemyTurn(currentFoe) {
    let audio = new Audio("./Retained/Sounds/hit16.mp3.flac")
    
    
    document.getElementById('avatar').style.background = "url(./Retained/hero_weak.png)"
    setTimeout(() => {
        document.getElementById('avatar').style.background = "url(./Retained/hero_battle.png)";
    }, 2000);

    if(currentFoe.atk>currentFoe.mag){
    let damageFoe = currentFoe.foeAttack(currentFoe)
    audio.play()
    let damage = patxi.receivePhysDamage(damageFoe)
    document.getElementById('top_text').innerHTML = `${currentFoe.name} dealt ${damage} dmg!`;
    updateHeroHP();
    }
    else{
    let damageFoe = currentFoe.foeMagic(currentFoe)
    magicSound.play()
    let damage = patxi.receiveMagDamage(damageFoe)
    document.getElementById('top_text').innerHTML = `${currentFoe.name} dealt ${damage} dmg!`;
    updateHeroHP();

    }
    
    document.getElementById("combat_menu").style.backgroundColor = "#234591"
    // if(currentFoe.hp<=currentFoe.maxHp/2){
    //     setTimeout(() => {document.getElementById('top_text').innerHTML = "Keep fighting! The enemy is weak!"},2000);
    // }
    
}
// WHAT HAPPENS UPON SEDUCE AND SCARE ENEMY ----------------------------------------

function seduceEnemyTurn(currentFoe) {
    let audio = new Audio("./Retained/Sounds/hit16.mp3.flac")
    
    audio.play()
    document.getElementById('avatar').style.background = "url(./Retained/hero_weak.png)"
    setTimeout(() => {
        document.getElementById('avatar').style.background = "url(./Retained/hero_battle.png)";
    }, 2000);

    if(currentFoe.atk>currentFoe.mag){
    let damageFoe = currentFoe.foeAttack(currentFoe)
    patxi. failureDamage(damageFoe)
    document.getElementById('top_text').innerHTML = `Seduction didn't work ${currentFoe.name} dealt ${damageFoe} dmg! `;
    document.getElementById("combat_menu").style.backgroundColor = "#234591"
    updateHeroHP();
    }
    else{
    let damageFoe = currentFoe.foeMagic(currentFoe)
    patxi. failureDamage(damageFoe)
    document.getElementById('top_text').innerHTML = `Seduction didn't work ${currentFoe.name} dealt ${damageFoe} dmg! `;
    document.getElementById("combat_menu").style.backgroundColor = "#234591"
    updateHeroHP();

    }
    
    
    // if(currentFoe.hp<=currentFoe.maxHp/2){
    //     setTimeout(() => {document.getElementById('top_text').innerHTML = "Keep fighting! The enemy is weak!"},2000);
    // }
    
}

function scareEnemyTurn(currentFoe) {
    let audio = new Audio("./Retained/Sounds/hit16.mp3.flac")
    
    audio.play()
    document.getElementById('avatar').style.background = "url(./Retained/hero_weak.png)"
    setTimeout(() => {
        document.getElementById('avatar').style.background = "url(./Retained/hero_battle.png)";
    }, 2000);

    if(currentFoe.atk>currentFoe.mag){
    let damageFoe = currentFoe.foeAttack(currentFoe)
    patxi. failureDamage(damageFoe)
    document.getElementById('top_text').innerHTML = `${currentFoe.name} is too strong to be scared! It dealt ${damageFoe} dmg!`;
    updateHeroHP();
    }
    else{
    let damageFoe = currentFoe.foeMagic(currentFoe)
    patxi. failureDamage(damageFoe)
    document.getElementById('top_text').innerHTML = `${currentFoe.name} is too strong to be scared! It dealt ${damageFoe} dmg!`;
    updateHeroHP();

    }
    
    document.getElementById("combat_menu").style.backgroundColor = "#234591"
    // if(currentFoe.hp<=currentFoe.maxHp/2){
    //     setTimeout(() => {document.getElementById('top_text').innerHTML = "Keep fighting! The enemy is weak!"},2000);
    // }
    ;
}




//----------------------------ENEMY-----------------------------------------

function enemyHurt(){
    setTimeout(() => {
        document.getElementById('monster_spot').style.visibility = "hidden";
    }, 500);
    setTimeout(() => {
        document.getElementById('monster_spot').style.visibility = "visible";
    }, 500);
    setTimeout(() => {
        document.getElementById('monster_spot').style.visibility = "hidden";
    }, 500);
    setTimeout(() => {
        document.getElementById('monster_spot').style.visibility = "visible";
    }, 500);

}


//FIGHT FUNCTION AND INTERFACE ---------------------------------------------

function fightUi(currentFoe){
    mainBox.style.background = `url(./Retained/Background/${currentFoe.name.toLowerCase().split(' ')}.png)`;
    mainBox.classList.remove('animate-bg');
    mainBox.style.backgroundSize = "contain"
    mainBox.style.backgroundRepeat = "no-repeat"


    top_text.style.visibility = 'visible';
    // document.getElementById('story_text').style.visibility = "hidden";
    top_text.innerHTML = `A wild ${currentFoe.name} is blocking the way`;

    middle.innerHTML = `<div id="mid_battle"><aside id="enemy_box">${currentFoe.name}<br/>LVL: ${currentFoe.lvl}<br/>HP:${currentFoe.hp}/${currentFoe.maxHp}<br/><br/>ATK:${currentFoe.atk}<br/>DEF:${currentFoe.def}<br/>MAG:${currentFoe.mag}<br/>SPR:${currentFoe.spr}</aside>
    <div id="monster_spot"></div></div>`;
    // document.getElementById('skill_screen').style.visibility = "visible";
    document.getElementById('enemy_box').style.visibility = 'visible';

    botMenu.innerHTML = `<div id="battle">
    <div id="combat_menu">  
    <div id="atk">
        <span id="combat_atk" class="combat">Atk:${patxi.atk}</span>
    </div>
    <div id="skill">
            <span id="combat_skill" class="combat">Seduce</span>
    </div>
    <div id="health">
            <span>${patxi.name}</span>
    </div>
    <div id="mana">
        <span>LVL:${patxi.lvl}</span>
    </div>
    <div id="avatar">
    </div>
    <div id="def">
            <span id="combat_def" class="combat">Scare</span>
    </div>
    <div id="flex">
            <span id="combat_flex" class="combat">Mag:${patxi.mag}</span>
    </div>
    <div id="status">
    <span>HP:${patxi.hp}/${patxi.maxHp}</span>
    </div>
    <div id="name">
    <span>MP:${patxi.mp}/${patxi.maxMp}</span>
    </div>
</div> 
</div> `;

}

function bossFightUi(currentFoe){
    
    mainBox.style.background = `url(./Retained/Background/${currentFoe.name.toLowerCase().split(' ')}.png)`;
    mainBox.classList.remove('animate-bg');
    mainBox.style.backgroundSize = "contain"
    mainBox.style.backgroundRepeat = "no-repeat"


    top_text.style.visibility = 'visible';
    // document.getElementById('story_text').style.visibility = "hidden";
    top_text.innerHTML = `You'll never have my wine Patxi!`;
    setTimeout(() => {
        top_text.innerHTML = `You are done Vino Veritas!`;
    }, 1000);
    setTimeout(() => {
        top_text.innerHTML = `Vino Veritas is fighting you, have no mercy!`;
    }, 1000);


    middle.innerHTML = `<div id="mid_battle"><aside id="enemy_box">${currentFoe.name}<br/>LVL: ${currentFoe.lvl}<br/>HP:${currentFoe.hp}/${currentFoe.maxHp}<br/><br/>ATK:${currentFoe.atk}<br/>DEF:${currentFoe.def}<br/>MAG:${currentFoe.mag}<br/>SPR:${currentFoe.spr}</aside>
    <div id="monster_spot"></div></div>`;
    // document.getElementById('skill_screen').style.visibility = "visible";
    document.getElementById('enemy_box').style.visibility = 'visible';

    botMenu.innerHTML = `<div id="battle">
    <div id="combat_menu">  
    <div id="atk">
        <span id="combat_atk" class="combat">ATK:${patxi.atk}</span>
    </div>
    <div id="skill">
            <span id="combat_skill" class="combat">Seduce</span>
    </div>
    <div id="health">
            <span>${patxi.name}</span>
    </div>
    <div id="mana">
        <span>LVL:${patxi.lvl}</span>
    </div>
    <div id="avatar">
    </div>
    <div id="def">
            <span id="combat_def" class="combat">Scare</span>
    </div>
    <div id="flex">
            <span id="combat_flex" class="combat">MAG:${patxi.mag}</span>
    </div>
    <div id="status">
    <span>HP:${patxi.hp}/${patxi.maxHp}</span>
    </div>
    <div id="name">
    <span>MP:${patxi.mp}/${patxi.maxMp}</span>
    </div>
</div> 
</div> `;


}

//FIGHT -----------------------------------------------------------

function fight(currentFoe) {
    
    audioBattle.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
    audioBattle.play()
    audioIntro.pause()
    // if (step==5){
    //     healSound.play()
    //     // top_text.innerHTML=`You recovered ${patxi.maxHp-patxi.hp}HP and ${patxi.maxMp-patxi.mp}MP`
    //     // document.getElementById('atk').innerHTML=`<span>ATK:${patxi.atk}</span>`
    //     // document.getElementById('flex').innerHTML=`<span>MAG:${patxi.mag}</span>`
        
    //     patxi.fullHeal()
    //     console.log('you are healed!')

    // }

   fightUi(currentFoe)
   document.getElementById('monster_spot').style.background = `url(./Retained/Foes/Foes_raw/${currentFoe.name.toLowerCase().split(' ')}.png)` 


    document.getElementById('atk').onclick = () => turn(currentFoe);
    document.getElementById('flex').onclick = () => magicTurn(currentFoe);
    document.getElementById('skill').onclick = () => seduceTurn(currentFoe);
    document.getElementById('def').onclick = () => scareTurn(currentFoe);



    document.getElementById('battle').style.visibility = "visible";

    if (patxi.hp < patxi.maxHp / 2) {
        document.getElementById('avatar').background = 'url(./Retained/hero_weak.png)';
    }
    if (step==5){
        healSound.play()
        top_text.innerHTML=`You recovered ${patxi.maxHp-patxi.hp}HP and ${patxi.maxMp-patxi.mp}MP`
        patxi.fullHeal()
        document.getElementById('atk').innerHTML=`<span>ATK:${patxi.atk}</span>`
        document.getElementById('flex').innerHTML=`<span>MAG:${patxi.mag}</span>`
        document.getElementById('status').innerHTML=`<span>HP:${patxi.hp}/${patxi.maxHp}</span>`
        document.getElementById('name').innerHTML=`<span>MP:${patxi.mp}/${patxi.maxMp}</span>`
        
        
        console.log('you are healed!')
    }
    if (step==8){
        healSound.play()
        top_text.innerHTML=`You recovered ${patxi.maxHp-patxi.hp}HP and ${patxi.maxMp-patxi.mp}MP`
        patxi.fullHeal()
        document.getElementById('atk').innerHTML=`<span>ATK:${patxi.atk}</span>`
        document.getElementById('flex').innerHTML=`<span>MAG:${patxi.mag}</span>`
        document.getElementById('status').innerHTML=`<span>HP:${patxi.hp}/${patxi.maxHp}</span>`
        document.getElementById('name').innerHTML=`<span>MP:${patxi.mp}/${patxi.maxMp}</span>`
        
        
        console.log('you are healed!')
    }

}

function bossFight(currentFoe) {
    
    
    audioBattle.pause()
    audioIntro.pause()
    bossSound.play()
    bossSound.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);

   bossFightUi(currentFoe)
   document.getElementById('monster_spot').style.background = `url(./Retained/Foes/Foes_raw/${currentFoe.name.toLowerCase().split(' ')}.png)` 


    document.getElementById('atk').onclick = () => bossTurn(currentFoe);
    document.getElementById('flex').onclick = () => bossMagicTurn(currentFoe);
    document.getElementById('skill').onclick = () => seduceBoss(currentFoe);
    document.getElementById('def').onclick = () => scareBoss(currentFoe);



    document.getElementById('battle').style.visibility = "visible";

    if (patxi.hp < (patxi.maxHp / 2)) {
        document.getElementById('avatar').background = 'url(./Retained/hero_weak.png)';
    }

}







// var sound = document.getElementById('sound_control');

// function mutePage() {
//     if(sound.classList.contains('fa-volume-up')){
//     document.querySelectorAll("video, audio").forEach( elem => muteMe(elem) );
//     sound.classList.toggle('fa-volume-mute')
// }
//     else if(sound.classList.contains('fa-volume-mute')){
//         document.querySelectorAll("video, audio").forEach( elem => play(elem) );
//         sound.classList.toggle('fa-volume-up')
//     }

    

// }

// document.getElementById('sound_control').onclick = mutePage;







//     let currentEnemy = rat;
// console.log(currentEnemy, "i am here")
//     setInterval(gameLoop, 100)


//     function gameLoop(){
//         console.log("ici many times")
//         updateDOM();
//     }



//     function updateDOM(){
//         // updateCharacter();s
//         const boox = document.getElementById("enemy_box");
//         updateEnemy(boox,currentEnemy);
//     }

//     function updateEnemy(boox, enemy){
//         enemy.hp = 2;
//         boox.innerHTML = `${enemy.name}<br/>HP:${enemy.hp}/${enemy.maxHp}<br/>LVL: ${enemy.lvl}`

//     }