// Source code courtesy of the Fresh framework website. The code source can
// be found here https://github.com/denoland/fresh/tree/main/www

export class WaveTank {
  springs: Spring[] = [];
  waveLength = 100;
  kinetic = 0.02;
  damping = 0.02;
  spread = 0.02;

  constructor() {
    for (let i = 0; i < this.waveLength; i++) {
      this.springs[i] = {
        position: 0,
        vibration: 0,
      };
    }
  }

  // The purpose of the update method is to create a drop like effect
  // based around a given springs position value. For example, if we set
  // spring[50].position = -60 we are saying that at the 50th spring a drop landed into
  // the water and created a 'hole' or indent of -60px.

  // This update method then creates a wave like effect starting at spring 50 (epicentre) and tapering away/moving left or
  // right in groups of 8 springs with each update call. This wave like effect is created by a parabola curving
  // up from the indented spring. You can imagine the 50th
  // spring with position -60 to be the bottom of a tea cup and the upward parabolas being the upward
  // sloping sides of the teacup.

  // The wave effect is created by animating this parabola to the left and right with ever decreasing vibrations
  // (vibration = amplitude * 2) i.e. the parabola gets smaller as the wave (spearding away from the center)
  // looses energy much like a large wave becomes a smaller one once it hits the beach
  update(springs: Spring[]) {
    for (const i of springs) {
      const amplitude = -this.kinetic * i.position - this.damping * i.vibration;
      i.position += i.vibration;
      i.vibration += amplitude;
    }

    const leftDeltas = [];
    const rightDeltas = [];

    for (let t = 0; t < 8; t++) {
      for (let i = 0; i < springs.length; i++) {
        const prev = springs[(i - 1 + springs.length) % springs.length];
        const next = springs[(i + 1) % springs.length];

        leftDeltas[i] = this.spread * (springs[i].position - prev.position);
        rightDeltas[i] = this.spread * (springs[i].position - next.position);
      }

      for (let i = 0; i < springs.length; i++) {
        const prev = springs[(i - 1 + springs.length) % springs.length];
        const next = springs[(i + 1) % springs.length];
        prev.vibration += leftDeltas[i];
        next.vibration += rightDeltas[i];
        prev.position += leftDeltas[i];
        next.position += rightDeltas[i];
      }
    }
  }
}
