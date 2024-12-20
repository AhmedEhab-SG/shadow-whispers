import Collision from "./Collision.";
import Hero from "../Hero";
import HeroStates from "../../../../enum/HeroStates";
import FloatingMessage from "../../../ui/FloatingMessage";
import { CollectableInstance } from "../../../../types/collectable";

class CollectableCollision extends Collision {
  public static checkCollision(
    hero: Hero,
    collectables: CollectableInstance[],
    floatingMessages: FloatingMessage[]
  ): void {
    if (hero.currentState?.stateName === HeroStates.DEAD || !hero.lives) return;

    collectables.forEach((collectable) => {
      if (
        !Collision.isCollide(hero, {
          x: collectable.x,
          y: collectable.y,
          markDelete: collectable.markForDelete,
          width: collectable.size,
          height: collectable.size,
        })
      )
        return;

      collectable.effect({ hero });

      collectable.destroy();

      floatingMessages.push(
        new FloatingMessage(collectable.message, collectable.x, collectable.y)
      );
    });
  }
}

export default CollectableCollision;
