/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */

import { PlayerSeatSub } from "./lib/states/sub/SeatSub";

export enum CardSuit {Clubs='Clubs', Diamonds='Diamonds', Hearts='Hearts', Spades='Spades'}
export enum CardRank {
  Two='2',
  Three='3',
  Four='4',
  Five='5',
  Six='6',
  Seven='7',
  Eight='8',
  Nine='9',
  Ten='10',
  Jack='J',
  Queen='Q',
  King='K',
  Ace='A'
}

export type CardName = `${CardSuit}${CardRank}`

export type Target = 'player' | 'dealer'

export type ChipVal = 1 | 5 | 10 | 25 | 50 | 100 | 500 | 1000 | 5000 | 10000 

export type StackName = `stack${ChipVal}`

export type PlayerCurrentPhase = 'inactive' | 'initial' | 'split' | 'doubled' | 'active';

export function isPlayerSeatSub(someObject: unknown): someObject is PlayerSeatSub {
  return someObject instanceof PlayerSeatSub;
}