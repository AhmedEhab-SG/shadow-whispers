// Class to handle 2D vector operations
class Vector {
 public constructor(public x: number, public y: number) {}

  // Add two vectors
  public add(vector: Vector): Vector {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  // Subtract two vectors
  public sub(vector: Vector): Vector {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  // Multiply vector by a scalar
  public mul(n: number): Vector {
    return new Vector(this.x * n, this.y * n);
  }

  // Divide vector by a scalar
  public div(n: number) {
    return new Vector(this.x / n, this.y / n);
  }

  // Calculate the magnitude (length) of the vector
  public mag(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  // Normalize the vector (make its magnitude 1)
  public normalize(): Vector {
    return this.mag() === 0 ? new Vector(0, 0) : this.div(this.mag());
  }

  // Calculate the angle of the vector
  public angle(): number {
    return Math.atan2(this.y, this.x);
  }
}

export default Vector;
