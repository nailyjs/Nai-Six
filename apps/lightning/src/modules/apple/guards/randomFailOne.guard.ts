import { BadRequestException, CanActivate, Injectable } from "@nestjs/common";

namespace Random {
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  export function randomOneOrZero(): number {
    return getRandomInt(2);
  }
}

@Injectable()
export class RandomFailOneGuard implements CanActivate {
  canActivate() {
    const randomHash = Random.randomOneOrZero();
    if (randomHash === 0) throw new BadRequestException(1054);
    return true;
  }
}
