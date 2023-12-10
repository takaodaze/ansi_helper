import { stdout } from 'node:process'
import { CharStyle, Color } from './ANSICode'
const prefix = '\x1B'

export const issueAnsiEscSeq = (arg: string): void => {
  stdout.write(`${prefix}${arg}`)
}

export const ANSIEscSeqHelper = {
  moveCursorHeadLine (): void {
    issueAnsiEscSeq('[0G')
  },

  moveCursorColumn (column: number) {
    if (column < 1) return // 0以下でもカーソルが進んでしまうので回避策

    issueAnsiEscSeq(`[${column}C`)
  },

  eraseCurrentLine (): void {
    issueAnsiEscSeq('[2K')
  },

  resetCharAllStyle (): void {
    issueAnsiEscSeq('[0m')
  },

  saveCursor (): void {
    issueAnsiEscSeq('[s')
  },

  moveSavedCursor (): void {
    issueAnsiEscSeq('[u')
  },

  makeInvisibleCursor (): void {
    issueAnsiEscSeq('[?25l')
  },

  makeVisibleCursor (): void {
    issueAnsiEscSeq('[?25h')
  },

  changeColor (color: Color): void {
    issueAnsiEscSeq('[' + color.toANSICode() + 'm')
  },

  changeCharStyle (style: CharStyle): void {
    issueAnsiEscSeq('[' + style.toANSICode() + 'm')
  },

  spin (): () => void {
    const spinCharactors = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    let spinCount = 0
    this.changeColor(new Color('magenta'))
    this.changeCharStyle(new CharStyle('bold'))
    this.saveCursor()
    this.makeInvisibleCursor()

    const timeout = setInterval(() => {
      process.stdout.write(spinCharactors[spinCount++])
      this.moveSavedCursor()
      if (spinCount >= spinCharactors.length) spinCount = 0
    }, 60)

    const stopSpin = (): void => {
      clearTimeout(timeout)
      process.stdout.write('\n')
      this.resetCharAllStyle()
      this.makeVisibleCursor()
    }

    return stopSpin
  }
}
