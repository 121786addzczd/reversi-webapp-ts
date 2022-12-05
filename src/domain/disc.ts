export const Disc = {
  Empty: 1,
  Dark: 1,
  Light: 2
} as const

export type Disc = typeof Disc[keyof typeof Disc]
