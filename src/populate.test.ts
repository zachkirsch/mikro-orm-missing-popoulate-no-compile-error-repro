import {
  Entity,
  Loaded,
  ManyToOne,
  MikroORM,
  PrimaryKey,
  Property,
  Ref,
} from "@mikro-orm/sqlite";

@Entity()
class Pet {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  owner!: Ref<Person>;
}

@Entity()
class Person {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;
}

declare const orm: MikroORM;

async function test() {
  // this works because we're populating the owner name
  const petWithOwner = await orm.em.findOneOrFail(
    Pet,
    { id: 0 },
    { populate: ["owner"] }
  );
  printOwnerName(petWithOwner);

  const petWithoutOwner = await orm.em.findOneOrFail(Pet, { id: 0 });
  // @ts-expect-error, not populating owner
  printOwnerName(petWithoutOwner);

  // but when not storing the pet in a variable, we don't get a compile error!
  // @ts-expect-error, not populating owner
  printOwnerName(await orm.em.findOneOrFail(Pet, { id: 0 }));
}

function printOwnerName(pet: Loaded<Pet, "owner">) {
  console.log(pet.owner.$.name);
}
