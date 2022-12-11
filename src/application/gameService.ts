import { connectMySQL } from '../dataaccess/connection'
import { GameGateway } from '../dataaccess/gameGateway'
import { firstTurn } from '../domain/turn'
import {TurnRepository} from '../domain/turnRepository'

const turnRepository = new TurnRepository()

const gameGateway = new GameGateway()

export class GameService {
  async startNewGame() {
    const now = new Date()

    const conn = await connectMySQL()
    try {
      await conn.beginTransaction()

      const gameRecord = await gameGateway.insert(conn, now)

      const turn = firstTurn(gameRecord.id, now)

      await turnRepository.save(conn, turn)

      await conn.commit()
    } finally {
      await conn.end()
    }
  }
}
