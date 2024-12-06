import { GameObject } from "../../../../types/collision";

abstract class Collision {
  protected static isCollide(
    firstObj: GameObject,
    secObj: GameObject & { markDelete?: boolean }
  ) {
    const dx =
      secObj.x + secObj.width * 0.5 - (firstObj.x + firstObj.width * 0.5);

    const dy =
      secObj.y + secObj.height * 0.5 - (firstObj.y + firstObj.height * 0.5); // y  b

    const dz = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)); // hypotenuse c

    // check if the hypotenuse is less than the sum of the radius of the two circles (enemy and character) by trigonometry
    if (dz > secObj.width * 0.5 + firstObj.width * 0.5 && !secObj.markDelete)
      return false; // not collided

    return true;
  }
}

export default Collision;
