import Collision from "./Collision.";
import Enemy from "../../enemies/Enemy";
import Hero from "../Hero";
import HeroStates from "../../../../enum/HeroStates";
import Boom from "../../../vfx/Boom";
import FloatingMessage from "../../../ui/FloatingMessage";
import heartImg from "../../../../assets/imgs/ui/heart.png";

class EnemiesCollision extends Collision {
  public static score: number = 0;

  public static checkCollision(
    hero: Hero,
    enemies: Enemy[],
    booms: Boom[],
    score: number,
    floatingMessages: FloatingMessage[]
  ): void {
    if (hero.currentState?.stateName === HeroStates.DEAD || !hero.lives) return;

    enemies.forEach((enemy) => {
      if (!Collision.isCollide(hero, enemy)) return;
      // await until dizzy state is over
      if (hero.currentState?.stateName === HeroStates.DIZZY) return;

      if (
        hero.currentState?.stateName === HeroStates.ROLL_RIGHT ||
        hero.currentState?.stateName === HeroStates.ROLL_LEFT ||
        hero.currentState?.stateName === HeroStates.DIVE
      ) {
        // fix score
        score++;

        floatingMessages.push(
          new FloatingMessage("+1", enemy.x, enemy.y, {
            targetX: 400,
            targetY: 50,
          })
        );

        EnemiesCollision.score = score;
      } else {
        hero.setState(HeroStates.DIZZY, 0);

        floatingMessages.push(
          new FloatingMessage("-1", hero.x, hero.y, {
            imgSrc: heartImg,
          })
        );
      }

      if (hero.lives) {
        enemy.destroy();

        booms.push(
          new Boom(
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5,
            enemy.width,
            enemy.height
          )
        );
      }
    });
  }
}

export default EnemiesCollision;
