import { MissionUtils } from "@woowacourse/mission-utils";

class Car {
  constructor(name) {
    this.name = name;
    this.position = 0;
  }

  moveForward() {
    const randomValue = Math.floor(Math.random() * 10);
    if (randomValue >= 4) {
      this.position++;
    }
  }

  getDisplay() {
    return `${this.name} : ${"-".repeat(this.position)}`;
  }
}

class App {
  async play() {
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
  }

  async getCarNames() {
    const input = await MissionUtils.Console.readLineAsync(
      "경주 할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n "
    );
    const carNames = input.split(",");
    if (!carNames.every((name) => name.length <= 5)) {
      throw new Error("[ERROR] 이름은 5자 이하여야 합니다.");
    }
    return carNames;
  }

  async getTryCount() {
    const input = await MissionUtils.Console.readLineAsync("시도할 횟수는 몇 회인가요? \n");
    const tryCount = parseInt(input);
    if (isNaN(tryCount) || tryCount <= 0) {
      throw new Error("[ERROR] 숫자가 잘못된 형식입니다.");
    }
    return tryCount;
  }
}

const app = new App();
await app.play();

export default App;