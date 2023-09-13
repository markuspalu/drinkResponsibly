let startPouring = false;
let drops;
let glass;
let drop;
let oldfilm;
let glassText0, glassText1, glassPalette;
let glassTexts = [];
let drinkCounter = 0;
let eyeLid1, eyeLid2;

function setup() {
	new Canvas(400, 400);

  oldfilm = new Sprite();
  oldfilm.addAni("./videosprite.png", { frameSize: [2250/5, 7616/34] , frames: 68});
  oldfilm.scale = 0.37

  table = new Sprite();
	table.width = 50;
	table.height = 50;
  table.x = 25;
  table.y = 350;
  table.w = 800;
  table.h = 200;
  table.color = "DarkSlateGray"
  table.layer = 1;

  tv = new Sprite();
  tv.image = "./tv.png";
  tv.scale = 0.45; 

  tv.overlaps(table);
  tv.layer = 1;

  oldfilm.layer = 2;
  oldfilm.removeColliders()
  oldfilm.overlaps(table);
  
  let bottleText = `
  ........
  ...uu...
  ...yy...
  ...yy...
  ...yy...
  ..yyyy..
  .yyyyyy.
  .yyyyyy.
  .yyyyyy.
  .yyyyyy.
  .yyyyyy.
  .yyyyyy.
  .yyyyyy.
  .yyyyyy.
  .yyyyyy.
  `;

  let bottlePalette = {
    y: color("gray"),
    u: color("lightgray")
  };
  
  bottle = new Sprite();
  bottle.img = spriteArt(bottleText, 8, bottlePalette);
  bottle.x = 300;
  bottle.y = 320;

  table.overlaps(bottle)
  tv.overlaps(bottle)

  glassText0 = `
  ........
  .kkkkkk.
  .kkkkkk.
  ..kkkk..
  ..kkkk..
  ...kk...
  ...kk...
  ...kk...
  .kkkkkk.
  `;

  glassText1 = `
  ........
  .kbbbbk.
  .kbbbbk.
  ..kbbk..
  ..kkkk..
  ...kk...
  ...kk...
  ...kk...
  .kkkkkk.
  `;

  glassText2 = `
  ........
  ........
  ..kkkk..
  .kkbbkk.
  .kbbbbk.
  .kbbbbk.
  .kkbbkk.
  ..kkkk..
  ........
  `;

  glassText3 = `
  ........
  ........
  ..kkkk..
  .kkkkkk.
  .kkkkkk.
  .kkkkkk.
  .kkkkkk.
  ..kkkk..
  ........
  `;

  glassPalette = {
    k: color("gray"),
    b: color("lightgray")
  };

  glass = new Sprite();
  glass.img = spriteArt(glassText0, 6, glassPalette);
  glass.x = 150;
  glass.y = 350;

  table.overlaps(glass);
  tv.overlaps(glass);
  bottle.overlaps(glass);

  drops = new Group();

}

let draggableBottle = true;
let dropCounter = 0;

async function drinkGlass() {
  glass.moveTo(150, 200, 2);
  glass.scale = 4;
  await glass.moveTo(150, 100, 5);
  await glass.moveTo(150, 250, 5);
  glass.img = spriteArt(glassText2, 6, glassPalette);
  await delay(500)
  glass.img = spriteArt(glassText3, 6, glassPalette);
  await delay(250)
  glass.scale = 2;
  await delay(250)
  glass.img = spriteArt(glassText0, 6, glassPalette);
  await glass.moveTo(150, 350)
  glass.scale = 1;

  dropCounter = 0;
  drinkCounter += 1;
}


function draw() {
  clear()
  background("BurlyWood")

  if (bottle.mouse.dragging() && draggableBottle) {
		bottle.moveTowards(
			mouse.x + bottle.mouse.x,
			mouse.y + bottle.mouse.y,
      0.1
		);
	} 

  if (bottle.mouse.pressed() && bottle.x > 70 && bottle.x < 250 && bottle.y < 300 && !startPouring) {
    startPouring = true;
    bottle.rotateTo(-90, 3)
    setTimeout(() => {
      for (let i = 0; i < 20; i++) {
        drop = new drops.Sprite(random(bottle.x-45, bottle.x-55), random(bottle.y+i, bottle.y+i*5), 2);
        drop.color = "white"
        drop.strokeWeight = 0
        bottle.overlaps(drop)
        tv.overlaps(drop)
        table.overlaps(drop)
        glass.overlaps(drop)
        drop.mass = 0;
        drop.vel.y = 3;
      }
      draggableBottle = false;
    }, 1500);

    setTimeout(() => {
      drops.remove();
    }, 2500);

    if (drops.length === 0) {
      setTimeout(() => {
        bottle.moveTo(300, 320, 3);
        bottle.rotateTo(0, 3);
      }, 2000)
    }
    setTimeout(() => { 
      draggableBottle = true;
      startPouring = false;
    }, 4000);

  }  

  drops.forEach(drop => {
    if (glass.collides(drop)) {
      glass.img = spriteArt(glassText1, 6, glassPalette);
      dropCounter++;
    }
  });

  if (dropCounter > 0 && glass.mouse.presses()) {
    drinkGlass()
  } 


  if (drinkCounter === 5) {
    tv.rotateTo(90, 5);
    table.rotateTo(90, 5);
    oldfilm.rotateTo(90, 5);
    bottle.rotateTo(90, 5);
    glass.rotateTo(90, 5);
    glass.vel.x = -20
    glass.vel.y = -20

    bottle.vel.x = 12
    bottle.vel.y = 12

    setTimeout(() => {
      eyeLid1 = new Sprite(0, -200);
      eyeLid1.color = "black"
      eyeLid1.width = 1000;
      eyeLid1.h = 500;
  
      eyeLid1.overlaps(glass)
      eyeLid1.overlaps(bottle)
      eyeLid1.overlaps(table)
      eyeLid1.overlaps(tv)
      eyeLid1.overlaps(oldfilm)
  
      eyeLid2 = new Sprite(0, 600);
      eyeLid2.color = "black"
      eyeLid2.width = 1000;
      eyeLid2.h = 500;
  
      eyeLid2.overlaps(glass)
      eyeLid2.overlaps(bottle)
      eyeLid2.overlaps(table)
      eyeLid2.overlaps(tv)
      eyeLid2.overlaps(oldfilm)
      eyeLid1.overlaps(eyeLid2)
  
      eyeLid1.vel.y = 1;
      eyeLid2.vel.y = -1; 
    }, 500);
  }

}




