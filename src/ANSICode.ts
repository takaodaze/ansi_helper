export interface ANSICode {
  toANSICode: () => string
}

export class Color implements ANSICode {
  constructor (private readonly value: 'red' | 'green' | 'magenta') {}

  toANSICode (): string {
    const c = this.value
    if (c === 'green') return '32'
    else if (c === 'red') return '31'
    else if (c === 'magenta') return '35'
    else {
      throw new Error('invalid args')
    }
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
