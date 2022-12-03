import { connectMySQL } from '../dataaccess/connection';
import { GameGateway } from '../dataaccess/gameGateway';
import { TurnGateway } from '../dataaccess/turnGateway';
import { SquareGateway } from '../dataaccess/squareGateway';
import { DARK, LIGHT } from '../application/constants'
import { MoveGateway } from '../dataaccess/moveGateway';


const gameGateway = new GameGateway()
const turnGateway = new TurnGateway()
const moveGateway = new MoveGateway()
const squareGateway = new SquareGateway()

export class TurnService {
  async findLatestGameTurnByTurnCount(turnCount: number) {
    const conn = await connectMySQL()
    try {
      const gameRecord = await gameGateway.findLatest(conn)
      if (!gameRecord) {
        throw new Error('Latest game not found')
      }

      const turnRecord = await turnGateway.findForGameIdAndTurnCount(conn, gameRecord.id, turnCount)

      if (!turnRecord) {
        throw new Error('Specifind turn not found')
      }

      const squareRecords = await squareGateway.findForTurnId(conn, turnRecord.id)
      const board = Array.from(Array(8)).map(() => Array.from(Array(8)))
      squareRecords.forEach((s) => {
        board[s.y][s.x] = s.disc
      })

      return {
        turnCount,
        board,
        nextDisc: turnRecord.nextDisc,
        // TODO 決着がついている場合、game_results テーブルから取得する
        winnerDisc: null
      }
    } finally {
      await conn.end()
    }

  }

  async registerTurn(turnCount: number, disc: number, x: number, y: number) {
    const conn = await connectMySQL()
    try {
      // 1つ前のターンを取得する
      const gameRecord = await gameGateway.findLatest(conn)
      if (!gameRecord) {
        throw new Error('Latest game not found')
      }

      const previousTurnCount = turnCount - 1
      const previousTurnRecord = await turnGateway.findForGameIdAndTurnCount(
        conn,
        gameRecord.id,
        previousTurnCount
      )

      if (!previousTurnRecord) {
        throw new Error('Specifind turn not found')
      }

      const squareRecords = await squareGateway.findForTurnId(conn, previousTurnRecord.id)

      const board = Array.from(Array(8)).map(() => Array.from(Array(8)))
      squareRecords.forEach((s) => {
        board[s.y][s.x] = s.disc
      })

      // 盤面に置けるかチェックする

      // 石を置く
      board[y][x] = disc

      // ひっくり返す

      // ターンを保存する
      const nextDisc = disc === DARK ? LIGHT : DARK
      const now = new Date()
      const turnRecord = await turnGateway.insert(
        conn,
        gameRecord.id,
        turnCount,
        nextDisc,
        now
      )

      await squareGateway.insertAll(conn, turnRecord.id, board)

      await moveGateway.insert(conn, turnRecord.id, disc, x, y)

      await conn.commit()
    } catch (e) {
      console.log(`エラー発生 ${e}`);
    } finally {
      await conn.end()
    }
  }
}