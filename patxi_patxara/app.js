import {
    Hero
} from "./class.js"
import {
    Foe
} from "./class.js"

var playBtn;
var mainBox = document.getElementById('main-box')
var botMenu = document.getElementById('bottom_menu')
var middle = document.getElementById('middle')
var top_text = document.getElementById('top_text')
var story_text = document.getElementById('story_text')
var enemy_box = document.getElementById('enemy_box')
var audioIntro = new Audio("./Retained/Sounds/ambiant.mp3")
var audioBattle = new Audio("./Retained/Sounds/combat-theme-t.mp3")
var audioLost = new Audio("./Retained/Sounds/game-over-t.mp3")
var audioWin = new Audio("./Retained/Sounds/Victory.mp3")

openingContent();
document.getElementById('play_btn').onclick = startGame;
console.log(startGame);

// function mute(){
//     if(Audio.play = true){
//         Audio.pause()
//     }
//     Audio.play
// }

// function attack() {
//     function getRandomArbitrary(min, max) {
//         return Math.random() * (max - min) + min;
//       }
//     const dmgDealt = this.atk * getRandomArbitrary()-Foe.def;
//     console.log(dmgDealt)
//     return dmgDealt
//    }


const patxi = new Hero('Patxi Patxaran', 160, 160, 50, 50, 12, 8, 10, 10, 0, 10, 1, 0.8, 2.2);
console.log(patxi);
//Foe#1
const rat = new Foe('Rat', 16, 16, 10, 5, 0, 3, 1, 10, false, true);
//Foe#2
const bat = new Foe('Bat', 22, 22, 12, 8, 1, 3, 2, 12, false, true);
//Foe#3
const slime = new Foe('Slime', 25, 25, 8, 25, 0, 3, 3, 15, false, false);
//Foe#4
const spider = new Foe('Spider', 20, 20, 20, 5, 5, 6, 4, 18, true, false);
//Foe#5
const scorpion = new Foe('Scorpion', 16, 16, 22, 8, 0, 6, 4, 20, false, true);
//Foe#6
const daemarbora = new Foe('Daemarbora', 35, 35, 7, 7, 17, 10, 3, 30, false, false);
//Foe#7
const drakaurum = new Foe('Drakaurum', 45, 30, 30, 18, 21, 20, 8, 42, true, false);
//Foe#8
const demonicEssence = new Foe('Demonic Esssence', 57, 57, 28, 22, 38, 27, 9, 57, false, false);
//Foe#9
const deceleon = new Foe('Deceleon', 65, 40, 40, 25, 20, 13, 11, 75, true, false);
//Boss
const boss = new Foe('Vino Veritas', 100, 60, 60, 35, 60, 33, 12, 100, true, true);

//First occurence
// function muteSound(){
//     if(audioLost.play = true){
//         audioLost.pause()
//     }

// }

// var foe = [rat,bat,slime,spider,healing,scorpion,daemarbora,drakaurum,demonicEssence,healing,deceleon,boss];
var currentFoe = rat

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
    audioLost.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);


}

function gameStartInner(){
    mainBox.style.background = "url(./Retained/intro.png)";
    botMenu.style.visibility = "visible";
    middle.innerHTML = `<aside id="enemy_box"></aside>
    <div ></div>`;
    botMenu.innerHTML = `<div id="story_text">In the Faraway land of Syldra, an evil mage named Vino Veritas stole the wine from the village of Astara... Patxi Patxaran, hero of the day, set to fight him to get it back...</div>`;
}

function startGame() {
    audioLost.pause()
    audioIntro.play()
    audioIntro.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);

    gameStartInner()
    
    setTimeout(() => {
        fightUi(currentFoe)
        firstFight(currentFoe);
    }, 5000);
}


function fightUi(currentFoe){
    mainBox.style.background = `url(./Retained/Background/${currentFoe.name.toLowerCase().split(' ')}.png)`;
    mainBox.classList.remove('animate-bg');
    mainBox.style.backgroundSize = "contain"
    mainBox.style.backgroundRepeat = "no-repeat"


    top_text.style.visibility = 'visible';
    // document.getElementById('story_text').style.visibility = "hidden";
    top_text.innerHTML = `A wild ${currentFoe.name} is blocking the way`;

    middle.innerHTML = `<div id="mid_battle"><aside id="enemy_box">${currentFoe.name}<br/>HP:${currentFoe.hp}/${currentFoe.maxHp}<br/>LVL: ${currentFoe.lvl}<br/>ATK:${currentFoe.atk}<br/>MAG:${currentFoe.mag}<br/>DEF:${currentFoe.def}<br/>SPR:${currentFoe.spr}</aside>
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
            <span>HP:${patxi.hp}/${patxi.maxHp}</span>
    </div>
    <div id="mana">
    <span>MP:${patxi.mp}/${patxi.maxMp}</span>
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
        <span>LVL:${patxi.lvl}</span>
    </div>
    <div id="name">
        <span>${patxi.name}</span>
    </div>
</div> 
</div> `;

console.log('Hey There! ')
}



function firstFight(currentFoe) {
    
    audioBattle.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
    audioBattle.play()
    audioIntro.pause()

   fightUi(currentFoe)
   document.getElementById('monster_spot').style.background = `url(./Retained/Foes/Foes_raw/${currentFoe.name.toLowerCase().split(' ')}.png)` 
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

    function turn() {
        
        document.getElementById('avatar').style.background = "url(./Retained/hero_fight.png)"
        setTimeout(() => {
            document.getElementById('avatar').style.background = "url(./Retained/hero_battle.png)";
        }, 500);
        let damageTo = patxi.attack()
        currentFoe.receiveDamage(damageTo)
        if(currentFoe.hp>=1){
        enemyHurt()
        }

        let audio = new Audio("./Retained/Sounds/hit33.mp3.flac")
        audio.play()
        document.getElementById('top_text').innerHTML = `You dealt ${damageTo-currentFoe.def} physical damage to ${currentFoe.name}!`;
        updateEnemyHP(currentFoe)
        if (currentFoe.hp >= 1) {
            setTimeout(() => {
                enemyTurn();
            }, 2000);
            document.getElementById("combat_menu").style.backgroundColor = "#dddddd";
            console.log(rat)

        } else if (currentFoe.hp <= 0) {
            currentFoe.hp == 0
            victory();
        }

    }

    function updateMp(){
        document.getElementById('mana').innerHTML=`<span>MP:${patxi.mp}/${patxi.maxMp}</span>`
    }

    function magicTurn(){
        document.getElementById('avatar').style.background = "url(./Retained/hero_magic.png)"
        setTimeout(() => {
            document.getElementById('avatar').style.background = "url(./Retained/hero_battle.png)";
        }, 500);
        let mDamage = patxi.magic()
        currentFoe.receiveMagicDamage(mDamage)
        updateMp()
        if(currentFoe.hp>=1){
        enemyHurt()
        }

        let audio = new Audio("./Retained/Sounds/hit33.mp3.flac")
        audio.play()
        document.getElementById('top_text').innerHTML = `You dealt ${mDamage-currentFoe.spr} magic damage to ${currentFoe.name}!`;
        updateEnemyHP(currentFoe)
        if (currentFoe.hp >= 1) {
            setTimeout(() => {
                enemyTurn();
            }, 2000);
            document.getElementById("combat_menu").style.backgroundColor = "#dddddd";
            console.log(rat)

        } else if (currentFoe.hp <= 0) {
            currentFoe.hp == 0
            victory();
        }

    }

    function seduceVictory(){
        audioBattle.pause()
        audioWin.play()

        document.getElementById('top_text').innerHTML = `You seduced ${currentFoe.name}! you gained ${currentFoe.xpDrop}XP!`
        const newXp = patxi.gainXp(currentFoe.xpDrop,newLevel )
            console.log(patxi.curXp)
        document.getElementById('monster_spot').style.visibility = "hidden";
        document.getElementById('enemy_box').style.visibility = "hidden";
        
        setTimeout(() => {betweenFights()},5000);
    } 

    function scareVictory(){
        audioBattle.pause()
        audioWin.play()

        document.getElementById('top_text').innerHTML = `You scared ${currentFoe.name}! you gained ${currentFoe.xpDrop}XP!`
        const newXp = patxi.gainXp(currentFoe.xpDrop,newLevel )
            console.log(patxi.curXp)
        document.getElementById('monster_spot').style.visibility = "hidden";
        document.getElementById('enemy_box').style.visibility = "hidden";
        
        setTimeout(() => {betweenFights()},5000);
    } 

    function seduceTurn(){
        if(currentFoe.seduction == true){
            seduceVictory()   
        }
        else {
            seduceEnemyTurn()
        }
    }

    function scareTurn(){
        if(currentFoe.scare == true){
            scareVictory()   
        }
        else {
            scareEnemyTurn()
        }

    }

    // function seduceTurn{
    //     magicDamage
    // }

    function newLevel(patxi){
       
        setTimeout(() => { document.getElementById('top_text').innerHTML = "You gained a level!"},2000);
        document.getElementById('status').innerHTML = `<span>LVL:${patxi.lvl}</span>`
        document.getElementById('health').innerHTML = `<span>HP:${patxi.hp}/${patxi.maxHp}</span>`
        document.getElementById('mana').innerHTML = `<span>MP:${patxi.mp}/${patxi.maxMp}</span>`
    }

    function victory() {
        audioBattle.pause()
        audioWin.play()

        document.getElementById('top_text').innerHTML = `You defeated ${currentFoe.name}! you gained ${currentFoe.xpDrop}XP!`
        const newXp = patxi.gainXp(currentFoe.xpDrop,newLevel )
            console.log(patxi.curXp)
        document.getElementById('monster_spot').style.visibility = "hidden";
        document.getElementById('enemy_box').style.visibility = "hidden";
        
        setTimeout(() => {betweenFights()},5000);

    }

    function betweenFights(){
        var audio = new Audio("./Retained/Sounds/Trippy.wav")
        audio.play()
        top_text.innerHTML=`You defeated ${currentFoe.name}! You are such a B.A Patxi!`
        // if(currentFoe.name == "healing"){
        //     healing()
        // }
        setTimeout(() => {currentFoe = bat;audio.pause();
            firstFight(currentFoe);},5000);

    }

    function updateEnemyHP() {
        document.getElementById('enemy_box').innerHTML = `${currentFoe.name}<br/>HP:${currentFoe.hp}/${currentFoe.maxHp}<br/>LVL: ${currentFoe.lvl}`;
        if (currentFoe.hp <= 0) {
            document.getElementById('enemy_box').innerHTML = `${currentFoe.name}<br/>HP: 0/${currentFoe.maxHp}<br/>LVL: ${currentFoe.lvl}`;
        }

    }

    function updateHeroHP() {
        document.getElementById('health').innerHTML = `HP:${patxi.hp}/${patxi.maxHp}`;

    }

    document.getElementById('atk').onclick = turn;
    document.getElementById('flex').onclick = magicTurn;
    document.getElementById('skill').onclick = seduceTurn;
    document.getElementById('def').onclick = scareTurn;

    function enemyTurn() {
        let audio = new Audio("./Retained/Sounds/hit16.mp3.flac")
        
        audio.play()
        document.getElementById('avatar').style.background = "url(./Retained/hero_weak.png)"
        setTimeout(() => {
            document.getElementById('avatar').style.background = "url(./Retained/hero_battle.png)";
        }, 2000);

        if(currentFoe.atk>currentFoe.mag){
        let damageFoe = currentFoe.foeAttack(currentFoe)
        patxi.receivePhysDamage(damageFoe)
        document.getElementById('top_text').innerHTML = `${currentFoe.name} dealt ${damageFoe-patxi.def} dmg!`;
        updateHeroHP();
        }
        else{
        let damageFoe = currentFoe.foeMagic(currentFoe)
        patxi.receiveMagDamage(damageFoe)
        document.getElementById('top_text').innerHTML = `${currentFoe.name} dealt ${damageFoe - patxi.spr} dmg!`;
        updateHeroHP();

        }
        
        document.getElementById("combat_menu").style.backgroundColor = "#234591"
        // if(currentFoe.hp<=currentFoe.maxHp/2){
        //     setTimeout(() => {document.getElementById('top_text').innerHTML = "Keep fighting! The enemy is weak!"},2000);
        // }
        ;
    }

    function seduceEnemyTurn() {
        let audio = new Audio("./Retained/Sounds/hit16.mp3.flac")
        
        audio.play()
        document.getElementById('avatar').style.background = "url(./Retained/hero_weak.png)"
        setTimeout(() => {
            document.getElementById('avatar').style.background = "url(./Retained/hero_battle.png)";
        }, 2000);

        if(currentFoe.atk>currentFoe.mag){
        let damageFoe = currentFoe.foeAttack(currentFoe)
        patxi.receivePhysDamage(damageFoe)
        document.getElementById('top_text').innerHTML = `Seduction didn't work ${currentFoe.name} dealt ${damageFoe - patxi.def} dmg! `;
        updateHeroHP();
        }
        else{
        let damageFoe = currentFoe.foeMagic(currentFoe)
        patxi.receiveMagDamage(damageFoe)
        document.getElementById('top_text').innerHTML = `${currentFoe.name} dealt ${damageFoe} dmg! You blocked ${patxi.spr} dmg with your mind!`;
        updateHeroHP();

        }
        
        document.getElementById("combat_menu").style.backgroundColor = "#234591"
        // if(currentFoe.hp<=currentFoe.maxHp/2){
        //     setTimeout(() => {document.getElementById('top_text').innerHTML = "Keep fighting! The enemy is weak!"},2000);
        // }
        
    }

    function scareEnemyTurn() {
        let audio = new Audio("./Retained/Sounds/hit16.mp3.flac")
        
        audio.play()
        document.getElementById('avatar').style.background = "url(./Retained/hero_weak.png)"
        setTimeout(() => {
            document.getElementById('avatar').style.background = "url(./Retained/hero_battle.png)";
        }, 2000);

        if(currentFoe.atk>currentFoe.mag){
        let damageFoe = currentFoe.foeAttack(currentFoe)
        patxi.receivePhysDamage(damageFoe)
        document.getElementById('top_text').innerHTML = `${currentFoe.name} is too strong to be scaered! It dealt ${damageFoe-patxi.def} dmg!`;
        updateHeroHP();
        }
        else{
        let damageFoe = currentFoe.foeMagic(currentFoe)
        patxi.receiveMagDamage(damageFoe)
        document.getElementById('top_text').innerHTML = `${currentFoe.name} is too strong to be scaered! It dealt dealt ${damageFoe-patxi.spr} dmg!`;
        updateHeroHP();

        }
        
        document.getElementById("combat_menu").style.backgroundColor = "#234591"
        // if(currentFoe.hp<=currentFoe.maxHp/2){
        //     setTimeout(() => {document.getElementById('top_text').innerHTML = "Keep fighting! The enemy is weak!"},2000);
        // }
        ;
    }


    document.getElementById('battle').style.visibility = "visible";
    // setTimeout(() => {
    //     document.getElementById('top_text').innerHTML = "What the... That thing is awful! I gotta slay it!";
    // }, 5000);

}


if (patxi.hp < patxi.maxHp / 2) {
    document.getElementById('avatar').background = 'url(./Retained/hero_weak.png)';
}








// document.getElementById('sound_control').onclick = muteSound;







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