class RandomWalkGenerator {
  constructor(options = {}) {
    // Set default parameters
    this.mean = options.mean || 0;
    this.standardDeviation = options.standardDeviation || 1;
    this.startingValue = options.startingValue || 100;
    this.drift = options.drift || 0; // Trend component
    this.currentValue = this.startingValue;
    this.timeStep = options.timeStep || 1; // For scaling the random changes
  }

  // Box-Muller transform to generate normally distributed random numbers
  static generateGaussian(mean = 0, stdDev = 1) {
    let u1, u2;
    do {
      u1 = Math.random();
      u2 = Math.random();
    } while (u1 === 0); // u1 can't be zero

    const magnitude = stdDev * Math.sqrt(-2.0 * Math.log(u1));
    const z = magnitude * Math.cos(2.0 * Math.PI * u2) + mean;

    return z;
  }

  // Generate next value in the random walk
  next() {
    const randomChange = RandomWalkGenerator.generateGaussian(
      this.drift * this.timeStep, // Drift component
      this.standardDeviation * Math.sqrt(this.timeStep) // Scaled by sqrt of time step
    );

    this.currentValue += randomChange;
    return this.currentValue;
  }

  // Generate multiple steps at once
  generateSteps(numSteps) {
    const values = [];
    for (let i = 0; i < numSteps; i++) {
      values.push({
        value: this.next(),
        timestamp: new Date(Date.now() + i * this.timeStep * 1000),
      });
    }
    return values;
  }

  // Reset the walk to the starting value
  reset() {
    this.currentValue = this.startingValue;
  }

  // Get current value without generating next step
  getCurrentValue() {
    return this.currentValue;
  }

  // Update generator parameters
  updateParameters(options = {}) {
    this.mean = options.mean ?? this.mean;
    this.standardDeviation =
      options.standardDeviation ?? this.standardDeviation;
    this.drift = options.drift ?? this.drift;
    this.timeStep = options.timeStep ?? this.timeStep;
  }
}

module.exports = RandomWalkGenerator;
