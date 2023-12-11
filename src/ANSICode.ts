export interface ANSICode {
  toANSICode: () => string
}

const COLOR_CODE_MAP = {
  black: '30',
  red: '31',
  green: '32',
  yellow: '33',
  blue: '34',
  magenta: '35',
  cyan: '36',
  white: '37',
  default: '39',
  reset: '0'
}

export class Color implements ANSICode {
  constructor (private readonly value: keyof typeof COLOR_CODE_MAP) {}

  toANSICode (): string {
    const colorCode = COLOR_CODE_MAP[this.value]
    if (colorCode == null) {
      throw new Error('invalid args')
    }

    return colorCode
  }
}

export class CharStyle implements ANSICode {
  constructor (private readonly value: 'bold' | 'underline') {}

  toANSICode (): string {
    const s = this.value
    if (s === 'bold') return '1'
    else if (s === 'underline') return '4'
    else {
      throw new Error('invalid args')
    }
  }
}
