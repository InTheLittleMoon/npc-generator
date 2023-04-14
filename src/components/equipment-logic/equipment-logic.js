//health logic is small enough just to include here
const generateHealth = () => {
  //bonus to health can range from 0 to 20 extra points
  let bonusToHealth = Math.floor(Math.random() * 21);
  let tempNum = null;
  for (let i = 0; i < 8; i++){
    tempNum += Math.floor(Math.random() * 9);
  }
  return tempNum + bonusToHealth;
};

generateHealth();

//every npc has a chance to roll with higher end equipment
const greaterItems = () => {
  let temp = Math.floor(Math.random() * 101);
  if (temp === 100) {
    return "Dm Choice";
  } else if (temp >= 95) {
    return "+2 Item";
  } else if (temp <= 94 && temp > 79) {
    return "+1 Item";
  } else {
    return "No Magic Items";
  }
};

//every npc has a chance to roll with a potion of varying tiers
const getsPotion = () => {
  let temp = Math.floor(Math.random() * 101);
  if (temp > 95) {
    return "Superior Healing Potion";
  } else if (temp <= 95 && temp > 85) {
    return "Greater Healing Potion";
  } else if (temp <= 85 && temp > 49) {
    return "Healing Potion";
  } else {
    return "No Potion";
  }
};

const getsShield = (npcClass) => {
  //filters out classes without shield proficiency
  if (
    npcClass === "bard" ||
    npcClass === "monk" ||
    npcClass === "rogue" ||
    npcClass === "sorcerer" ||
    npcClass === "warlock" ||
    npcClass === "wizard"
  ) {
    return false;
  } else {
    //coin toss for actually having a shield
    let temp = Math.floor(Math.random() * 2);
    if (temp === 0) {
      return true;
    } else {
      return false;
    }
  }
};

//based off class proficiencies in preferential logics in 'getEquipment' function
const armorSmith = (type) => {
  //static in game armors
  const lightArmor = ["Padded Leather", "Leather Armor", "Studded Leather"];
  const mediumArmor = [
    "Hide Armor",
    "Chainshirt",
    "Scale Mail",
    "Breastplate",
    "Half Plate",
  ];
  const heavyArmor = ["Ring Mail", "Chain Mail", "Splint", "Plate"];

  if (type === "light") {
    return lightArmor[Math.floor(Math.random() * lightArmor.length)];
  } else if (type === "med") {
    return mediumArmor[Math.floor(Math.random() * mediumArmor.length)];
  } else if (type === "heavy") {
    return heavyArmor[Math.floor(Math.random() * heavyArmor.length)];
  }
};

//based off class proficiencies in preferential logics in 'getEquipment' function
const weaponSmith = (type) => {
  //static in game weapons
  //melee
  const simpleMelee = [
    "Club",
    "Dagger",
    "Greatclub",
    "Handaxe",
    "Javelin",
    "Light Hammer",
    "Mace",
    "Quarterstaff",
    "Sickle",
    "Spear",
  ];
  const martialMelee = [
    "Battleaxe",
    "Flail",
    "Glaive",
    "Greataxe",
    "Greatsword",
    "Halberd",
    "Lance",
    "Longsword",
    "Maul",
    "Morningstar",
    "Pike",
    "Rapier",
    "Scimitar",
    "Shortsword",
    "Trident",
    "War Pick",
    "Warhammer",
    "Whip",
  ];
  //ranged
  const simpleRanged = ["Light Crossbow", "Dart", "Shortbow", "Sling"];
  const martialRanged = [
    "Blowgun",
    "Hand Crossbow",
    "Heavy Crossbow",
    "Longbow",
    "Net",
  ];

  if (type === "simpleR") {
    return simpleRanged[Math.floor(Math.random() * simpleRanged.length)];
  } else if (type === "simpleM") {
    return simpleMelee[Math.floor(Math.random() * simpleMelee.length)];
  } else if (type === "martialR") {
    return martialRanged[Math.floor(Math.random() * martialRanged.length)];
  } else if (type === "martialM") {
    return martialMelee[Math.floor(Math.random() * martialMelee.length)];
  }
};

//will randomize equipment based off class
//preferential logic will usually outfit a character with better equipment based on current meta of the game

//if class has multiple proficiencies, eg both simple and martial weapons,
//a roll for one will be made before the roll for the individual equipment is finished
const getEquipment = (target) => {
  let temp = [];
  let weaponRNG = null;
  let armorRNG = null;
  let customInv = null;

  switch (target) {
    //artificer
    case "artificer":
      weaponRNG = Math.floor(Math.random() * 11);
      if (weaponRNG >= 4) {
        temp.push(weaponSmith("simpleM"));
      } else {
        temp.push(weaponSmith("simpleR"));
      }

      armorRNG = Math.floor(Math.random() * 11);
      if (armorRNG >= 7) {
        temp.push(armorSmith("med"));
      } else {
        temp.push(armorSmith("light"));
      }
      break;
    //barbarian
    case "barbarian":
      weaponRNG = Math.floor(Math.random() * 11);
      if (weaponRNG > 5) {
        temp.push(weaponSmith("martialM"));
      } else if (weaponRNG <= 5 && weaponRNG > 2) {
        temp.push(weaponSmith("simpleM"));
      } else if (weaponRNG <= 2 && weaponRNG > 0) {
        temp.push(weaponSmith("martialR"));
      } else {
        temp.push(weaponSmith("simpleR"));
      }

      armorRNG = Math.floor(Math.random() * 11);
      if (armorRNG >= 7) {
        temp.push(armorSmith("med"));
      } else {
        temp.push(armorSmith("light"));
      }
      break;
    //bard
    case "bard":
      weaponRNG = Math.floor(Math.random() * 11);
      if (weaponRNG > 6) {
        customInv = ["hand crossbow", "longsword", "rapier", "shortsword"];
        temp.push(customInv[Math.floor(Math.random() * customInv.length)]);
      } else {
        temp.push(weaponSmith("simpleM"));
      }

      temp.push(armorSmith("light"));

      break;
    //cleric
    case "cleric":
      temp.push(weaponSmith("simpleM"));

      armorRNG = Math.floor(Math.random() * 11);
      if (armorRNG >= 7) {
        temp.push(armorSmith("med"));
      } else {
        temp.push(armorSmith("light"));
      }
      break;
    //druid
    case "druid":
      customInv = [
        "Club",
        "Dagger",
        "Dart",
        "Javelin",
        "Mace",
        "Quarterstaff",
        "Scimitar",
        "Sickle",
        "Sling",
        "Spear",
      ];
      temp.push(customInv[Math.floor(Math.random() * customInv.length)]);

      armorRNG = Math.floor(Math.random() * 11);
      if (armorRNG >= 7) {
        temp.push(armorSmith("med"));
      } else {
        temp.push(armorSmith("light"));
      }
      break;
    //fighter
    case "fighter":
      weaponRNG = Math.floor(Math.random() * 11);
      if (weaponRNG > 8) {
        temp.push(weaponSmith("martialM"));
        temp.push(weaponSmith("martialR"));
      } else if (weaponRNG <= 8 && weaponRNG > 6) {
        temp.push(weaponSmith("martialM"));
        temp.push(weaponSmith("simpleR"));
      } else if (weaponRNG <= 6 && weaponRNG > 4) {
        temp.push(weaponSmith("martialM"));
      } else if (weaponRNG <= 4 && weaponRNG > 2) {
        temp.push(weaponSmith("simpleM"));
        temp.push(weaponSmith("simpleR"));
      } else {
        temp.push(weaponSmith("simpleM"));
      }

      armorRNG = Math.floor(Math.random() * 11);
      if (armorRNG > 7) {
        temp.push(armorSmith("heavy"));
      } else if (armorRNG <= 7 && armorRNG > 2) {
        temp.push(armorSmith("med"));
      } else {
        temp.push(armorSmith("light"));
      }
      break;
    //monk
    case "monk":
      weaponRNG = Math.floor(Math.random() * 11);
      if (weaponRNG > 5) {
        temp.push("shortsword");
      } else {
        temp.push(weaponSmith("simpleM"));
      }

      temp.push("No Armor");
      break;
    //paladin
    case "paladin":
      weaponRNG = Math.floor(Math.random() * 11);
      if (weaponRNG > 8) {
        temp.push(weaponSmith("martialM"));
        temp.push(weaponSmith("martialR"));
      } else if (weaponRNG <= 8 && weaponRNG > 6) {
        temp.push(weaponSmith("martialM"));
        temp.push(weaponSmith("simpleR"));
      } else if (weaponRNG <= 6 && weaponRNG > 4) {
        temp.push(weaponSmith("martialM"));
      } else if (weaponRNG <= 4 && weaponRNG > 2) {
        temp.push(weaponSmith("simpleM"));
        temp.push(weaponSmith("simpleR"));
      } else {
        temp.push(weaponSmith("simpleM"));
      }

      armorRNG = Math.floor(Math.random() * 11);
      if (armorRNG > 7) {
        temp.push(armorSmith("heavy"));
      } else if (armorRNG <= 7 && armorRNG > 2) {
        temp.push(armorSmith("med"));
      } else {
        temp.push(armorSmith("light"));
      }
      break;
    //ranger
    case "ranger":
      weaponRNG = Math.floor(Math.random() * 11);
      if (weaponRNG > 8) {
        temp.push(weaponSmith("martialM"));
        temp.push(weaponSmith("martialR"));
      } else if (weaponRNG <= 8 && weaponRNG > 6) {
        temp.push(weaponSmith("simpleM"));
        temp.push(weaponSmith("martialR"));
      } else if (weaponRNG <= 6 && weaponRNG > 4) {
        temp.push(weaponSmith("martialR"));
      } else if (weaponRNG <= 4 && weaponRNG > 2) {
        temp.push(weaponSmith("simpleM"));
        temp.push(weaponSmith("simpleR"));
      } else {
        temp.push(weaponSmith("simpleR"));
      }

      armorRNG = Math.floor(Math.random() * 11);
      if (armorRNG >= 7) {
        temp.push(armorSmith("med"));
      } else {
        temp.push(armorSmith("light"));
      }
      break;
    //rogue
    case "rogue":
      weaponRNG = Math.floor(Math.random() * 11);
      if (weaponRNG > 6) {
        customInv = ["Hand crossbow", "Longsword", "Rapier", "Shortsword"];
        temp.push(customInv[Math.floor(Math.random() * customInv.length)]);
      } else {
        temp.push(weaponSmith("simpleM"));
      }

      temp.push(armorSmith("light"));
      break;
    //sorcerer
    case "sorcerer":
      customInv = ["Dagger", "Dart", "Sling", "Quarterstaff", "Light Crossbow"];
      temp.push(customInv[Math.floor(Math.random() * customInv.length)]);

      temp.push("No Armor");
      break;
    //warlock
    case "warlock":
      temp.push(weaponSmith("simpleM"));

      temp.push(armorSmith("light"));
      break;
    //wizard
    case "wizard":
      customInv = ["Dagger", "Dart", "Sling", "Quarterstaff", "Light Crossbow"];
      temp.push(customInv[Math.floor(Math.random() * customInv.length)]);

      temp.push("No Armor");
      break;
    default:
      return;
  }

  return temp;
};

export { getEquipment, getsShield, getsPotion, greaterItems, generateHealth };
