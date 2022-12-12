import { WaveTank } from "./WaveTank";

describe("WaveTank", () => {
  it("populates springs with correct default values upon instantiation", () => {
    const waveTank = new WaveTank();

    expect(waveTank.springs.length).toBe(waveTank.waveLength);
    waveTank.springs.forEach((spring: Spring) => {
      expect(spring.position).toBe(0);
      expect(spring.vibration).toBe(0);
    });
  });

  describe("udpate", () => {
    it("does not modify an array of springs with position and vibration values of 0", () => {
      const waveTank = new WaveTank();

      waveTank.update(waveTank.springs);

      waveTank.springs.forEach((spring: Spring) => {
        expect(spring.position).toBe(0);
        expect(spring.vibration).toBe(0);
      });
    });

    it("updates the springs array to be a parabola based on given spring having a set position value", () => {
      const waveTank = new WaveTank();
      // The 50th spring now has a position of -60 (epicentre of drop/wave)
      waveTank.springs[50].position = -60;

      waveTank.update(waveTank.springs);

      // The epicentre spring whoose position value is set should have the lowest position value and the highest vibration
      expect(Math.max(...waveTank.springs.map((item) => item.vibration))).toBe(
        waveTank.springs[50].vibration
      );
      expect(Math.min(...waveTank.springs.map((item) => item.position))).toBe(
        waveTank.springs[50].position
      );

      // The 8 springs previous to the 50th (epicentre) should have increasing position values to form the
      // left hand side of the parabola (curving up to the left) and increasing vibration values (from negative toward 0)
      // as the waves negative vibration (amplitude * 2) becomes smaller as it tapers off or "looses energy"

      // The exception here is the epicentres vibration which is large to represent the splash back of the "drop"
      // entering the water
      for (let i = 50; i >= 42; i--) {
        expect(waveTank.springs[i].position).toBeLessThan(
          waveTank.springs[i - 1].position
        );
        if (i == 50) {
          continue;
        }
        expect(waveTank.springs[i].vibration).toBeLessThan(
          waveTank.springs[i - 1].vibration
        );
      }

      // The 8 springs following the 50th (epicentre) should have increasing position values to form the
      // right hand side of the parabola (curving up and to the right) and increasing vibration values (from negative toward 0)
      // as the waves negative vibration (amplitude * 2) becomes smaller as it tapers off or "looses energy".

      // The exception here is the epicentres vibration which is large to represent the splash back of the "drop"
      // entering the water
      for (let i = 50; i <= 58; i++) {
        expect(waveTank.springs[i].position).toBeLessThan(
          waveTank.springs[i + 1].position
        );
        if (i == 50) {
          continue;
        }
        expect(waveTank.springs[i].vibration).toBeLessThan(
          waveTank.springs[i + 1].vibration
        );
      }
    });

    it("consequtive update calls increasingly updates the springs in groups of 8", () => {
      const waveTank = new WaveTank();
      // The 50th spring now has a position of -60 (epicentre of drop/wave)
      waveTank.springs[50].position = -60;

      // The wave moves 8 springs left and right away from the epicentre (8 spirngs either side in total)
      waveTank.update(waveTank.springs);
      // The wave moves enother 8 springs left and right away from the epicentre (16 springs either side in total)
      waveTank.update(waveTank.springs);

      // The epicentre spring whoose position value is set should have the lowest position value and the highest vibration
      expect(Math.max(...waveTank.springs.map((item) => item.vibration))).toBe(
        waveTank.springs[50].vibration
      );
      expect(Math.min(...waveTank.springs.map((item) => item.position))).toBe(
        waveTank.springs[50].position
      );

      // The 16 previous springs should have have decreasing position values to form the
      // left hand side of the parabola (curving up to the left) and decreasing vibration values
      // as the waves vibration decreases as it looses energy
      for (let i = 50; i >= 34; i--) {
        expect(waveTank.springs[i].position).toBeLessThan(
          waveTank.springs[i - 1].position
        );
        if (i == 50) {
          continue;
        }
        expect(waveTank.springs[i].vibration).toBeLessThan(
          waveTank.springs[i - 1].vibration
        );
      }

      // The 16 next springs should have have increasing position values to form the
      // right hand side of the parabola (curving up and to the right). Except for the 50th v which
      // should be the highest.
      for (let i = 50; i <= 66; i++) {
        expect(waveTank.springs[i].position).toBeLessThan(
          waveTank.springs[i + 1].position
        );
        if (i == 50) {
          continue;
        }
        expect(waveTank.springs[i].vibration).toBeLessThan(
          waveTank.springs[i + 1].vibration
        );
      }
    });
  });
});
