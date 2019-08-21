
export class Hero {
   
   constructor(name,hp,maxHp,mp,maxMp,atk,def,mag,spr,curXp,maxXp,lvl,min,max){
    this.name = name;
    this.lvl = lvl;
    this.hp = hp;
    this.maxHp = maxHp
    this.mp = mp;
    this.maxMp = maxMp
    this.atk = atk;
    this.def = def;
    this.mag = mag;
    this.spr = spr;
    this.curXp = curXp;
    this.maxXp = maxXp;
    this.skills = [];
    this.min = min;
    this.max = max;
     
   }

   newSkill(skill){
       this.skills.push(skill);
   }

   gainXp(xpDrop, cb){
       this.curXp += xpDrop
       if (this.curXp >= this.maxXp) this.lvlUp(cb);
       return this.curXp;
   }

   lvlUp(cb){
        if(this.lvl>=5){
        this.curXp -= this.maxXp;
        this.maxXp +=8;   
        this.lvl+=1;
        this.atk += 5;
        this.maxHp += 25;
        this.hp += 25;
        this.maxMp += 10; 
        this.mp += 10; 
        this.def += 4;
        this.mag += 5;
        this.spr += 5;
        cb(this)   
        }

        this.curXp -= this.maxXp;
        this.maxXp +=5;   
        this.lvl+=1;
        this.atk += 3;
        this.maxHp += 20;
        this.hp += 20;
        this.maxMp += 5; 
        this.mp += 5; 
        this.def += 3;
        this.mag += 4;
        this.spr += 3;
        cb(this)
        
   }

   criticalHit(min, max){
            return Math.random() * (max - min) + min;
   }


   attack() {
    return this.atk;
   
   }

   magic(){
       this.mp -=5
       return this.mag;
   }

   seduce(){
    if (Foe.seduce=true){
        battleWin()
    }
    this.receivePhysDamage(damage)
   }

   scare(){
    if (Foe.scare=true){
        battleWin()
    }
    this.receivePhysDamage(damage)

   }


    

    gameOver(){

    }

   receivePhysDamage(damage){
       let physDmgReceived = damage - this.def;
       return this.hp -= physDmgReceived; 
   }

   receiveMagDamage(damage){
       let magDmgReceived = damage - this.spr;
       return this.hp -=magDmgReceived;
   }

   everyFiveStages(){
       this.hp = this.maxHp;
       this.mp = this.maxMp;
       return this.hp, this.mp;
   }
}

// let Hero = new Hero

// const patxi = new Hero('Patxi Patxaran', 50,160,50,50, 12,12, 10,8,11,10,1,0.8,2.2);
// console.log(patxi)
// Hero.prototype.everyFiveStages(patxi)
// console.log(patxi)


export class Foe{
    constructor(name,hp,maxHp,atk,def,mag,spr,lvl,xpDrop,seduction,scare){
        this.name = name;
        this.atk = atk;
        this.hp = hp;
        this.maxHp = maxHp
        this.def = def;
        this.mag = mag;
        this.spr = spr;
        this.xpDrop = xpDrop;
        this.lvl = lvl;
        this.scare = scare;
        this.seduction = seduction;
    
       }

       foeAttack() {
        return this.atk;
       }

       foeMagic(){
           return this.mag;
       }

       receiveDamage(damage){
        let dmgReceived =  damage-this.def;  
        this.hp -= dmgReceived 
       }
       
       receiveMagicDamage(magicDamage){
        let mDmgReceived =  magicDamage-this.spr;  
        this.hp -= mDmgReceived 
       }

}



