
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

    if(this.lvl>=7){
        this.curXp -= this.maxXp;
        this.maxXp +=15;   
        this.lvl+=1;
        this.atk += 8;
        this.maxHp += 25;
        this.hp += 25;
        this.maxMp += 14; 
        this.mp += 14; 
        this.def += 7;
        this.mag += 9;
        this.spr += 5;
        cb(this)   
        return 
        }

    if(this.lvl>=5){
            this.curXp -= this.maxXp;
            this.maxXp +=10;   
            this.lvl+=1;
            this.atk += 5;
            this.maxHp += 18;
            this.hp += 18;
            this.maxMp += 5; 
            this.mp += 5; 
            this.def += 4;
            this.mag += 4;
            this.spr += 3;
            this.max += 0.2;
            cb(this)   
            return 
            }


        if(this.lvl>=3){
        this.curXp -= this.maxXp;
        this.maxXp +=8;   
        this.lvl+=1;
        this.atk += 4;
        this.maxHp += 14;
        this.hp += 14;
        this.maxMp += 5; 
        this.mp += 5; 
        this.def += 4;
        this.mag += 4;
        this.spr += 4;
        cb(this)  
        return  
        }

        

        

        this.curXp -= this.maxXp;
        this.maxXp +=5;   
        this.lvl+=1;
        this.atk += 2;
        this.maxHp += 10;
        this.hp += 10;
        this.maxMp += 3; 
        this.mp += 3; 
        this.def += 2;
        this.mag += 2;
        this.spr += 1;
        cb(this)
        
        
   }

   fullHeal(){
       this.hp = this.maxHp;
       this.mp = this.maxMp;
   }

   criticalHit(min, max){
       let criticalHit = Number((Math.random() * max).toFixed(1));

            return  criticalHit <= min ? min : criticalHit;
   }


   attack() {
  return Number( (this.atk *this.criticalHit(this.min,this.max)).toFixed(0));

   }

   magic(){
       if(this.lvl<=4){
       this.mp -=5
    }
    else if (this.lvl>4){
        this.mp-= 7
    }
    else if (this.lvl>=7){
        this.mp-=9
    }
    return Number( (this.mag *this.criticalHit(this.min,this.max)).toFixed(0));

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
       if(physDmgReceived<1){
        physDmgReceived = 0
       }
       this.hp -= physDmgReceived;
       
       return physDmgReceived
   }
   failureDamage(damage){
        this.hp -= damage;
       return damage
   }

   receiveMagDamage(damage){
       let magDmgReceived = damage - this.spr;
       if(magDmgReceived<1){
        magDmgReceived = 0
       }
       this.hp -= magDmgReceived;
       
       return magDmgReceived
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
        this.min = 0.9;
        this.max = 1.2;
    
       }

       criticalHit(min, max){
        let criticalHit = Number((Math.random() * max).toFixed(1));
        console.log(criticalHit)
             return  criticalHit <= min ? min : criticalHit;
    }
 
 
       foeAttack() {
        return Number( (this.atk *this.criticalHit(this.min,this.max)).toFixed(0));
       }

       foeMagic(){
        return Number((this.mag *this.criticalHit(this.min,this.max)).toFixed(0));
       }

       receiveDamage(damage){
        let dmg =  damage-this.def; 
        console.log(dmg) 
        if (dmg <=0){
            dmg = 0
        }
        console.log(dmg)
        this.hp -= dmg
        console.log(this.hp)
        return dmg
       }
       
       
       receiveMagicDamage(damage){
        let mDmg =  damage-this.spr;
        console.log(mDmg)  
        if (mDmg <=0){
            mDmg = 0
            
        }
        console.log(this)
        console.log(mDmg)
        this.hp -= mDmg
        
        return mDmg
       }

}



