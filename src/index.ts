import flatbuffers from "flatbuffers";
import {
  Color,
  Equipment,
  Monster,
  Vec3,
  Weapon,
} from "../_generated/game/sample";

function main() {
  const builder = new flatbuffers.Builder(1024);

  //   Weapons
  const sword = Weapon.createWeapon(builder, builder.createString("Sword"), 3);
  const axe = Weapon.createWeapon(builder, builder.createString("Axe"), 5);

  //   Monster
  const pos = Vec3.createVec3(builder, 1.0, 2.0, 3.0);
  const orc_equipment = Equipment.Weapon;
  const orc_weapons = Monster.createWeaponsVector(builder, [sword, axe]);
  const orc_path_vector = Vec3.createVec3(builder, 1.0, 2.0, 3.0);

  const orc = Monster.createMonster(
    builder,
    pos,
    100, // hp
    50, // mana
    Color.Red,
    orc_weapons,
    orc_equipment,
    orc_path_vector,
    orc_path_vector // pathOffset
  );

  builder.finish(orc);
  const buf = builder.asUint8Array();
  const monster = Monster.getRootAsMonster(new flatbuffers.ByteBuffer(buf));

  console.log(monster.hp());
}

main();
