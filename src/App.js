import { MissionUtils } from "@woowacourse/mission-utils";

class Car {
  constructor(name) {
    this.name = name;
    this._position = 0; // 캡슐화를 위해 _position을 private 변수로 변경
  }

  moveForward() {
    const randomValue = Math.floor(Math.random() * 10);
    if (randomValue >= 4) {
      this._position++; // 조건 수정
    }
  }

  getDisplay() {
    return `${this.name} : ${"-".repeat(this._position)}`; // private 변수인 _position 사용
  }

  get position() {
    return this._position; // position의 값을 직접적으로 변경할 수 없도록 getter만 사용
  }
}

class App {
  async play() {
    try {
      const carNames = await this.getCarNames();
      const tryCount = await this.getTryCount();
      const cars = carNames.map((name) => new Car(name));

      for (let i = 0; i < tryCount; i++) {
        cars.forEach((car) => car.moveForward());
        const display = cars.map((car) => car.getDisplay()).join("\n");
        console.log(display + "\n");
      }

      const maxPosition = Math.max(...cars.map((car) => car.position));
      const winners = cars
        .filter((car) => car.position === maxPosition)
        .map((car) => car.name);

      if (winners.length === 1) {
        console.log(`최종 우승자 : ${winners[0]}`);
      } else {
        console.log(`최종 우승자 : ${winners.join(", ")}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async getCarNames() {
    const input = await MissionUtils.Console.readLineAsync(
      "경주 할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)"
    );
    const carNames = input.split(",");
    if (!carNames.every((name) => name.length <= 5)) {
      throw new Error("[ERROR] 이름은 5자 이하여야 합니다.");
    }
    return carNames;
  }

  async getTryCount() {
    const input = await MissionUtils.Console.readLineAsync("시도할 횟수는 몇 회인가요?");
    const tryCount = parseInt(input);
    if (Number.isNaN(tryCount) || tryCount <= 0) {
      throw new Error("[ERROR] 숫자가 잘못된 형식입니다.");
    }
    return tryCount;
  }
}

const app = new App();
await app.play();

export default App;
