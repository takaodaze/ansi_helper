import { stdout } from 'node:process'
import { type CharStyle, type Color } from './ANSICode'
const prefix = '\x1b'

export const issueAnsiEscSeq = (arg: string): void => {
  stdout.write(`${prefix}${arg}`)
}

export const ANSIEscSeqHelper = {
  moveCursorHeadLine (): void {
    issueAnsiEscSeq('[0G')
  },

  /**
   * Moves the cursor `column` cells left/right. If the cursor is already at the edge of the screen, this has no effect
   */
  moveCursorColumn (column: number) {
    if (column < 1) return // 0以下でもカーソルが進んでしまうので回避策

    issueAnsiEscSeq(`[${column}C`)
  },

  /**
   * Moves the cursor `lines` cells down/up. If the cursor is already at the edge of the screen, this has no effect
   */
  moveCursorLine (line: number) {
    const int = Math.floor(line)
    if (int <= -1) {
      issueAnsiEscSeq(`[${Math.abs(int)}A`)
    } else if (int >= 1) {
      issueAnsiEscSeq(`[${int}B`)
    }
  },

  /**
   * Moves cursor to beginning of the line n lines down. If the cursor is already at the edge of the screen, this has no effect
   */
  moveCursorLineHead (line?: number): void {
    line = line ?? 1
    const int = Math.floor(line)
    if (int <= -1) {
      issueAnsiEscSeq(`[${Math.abs(int)}F`)
    } else if (int >= 1) {
      issueAnsiEscSeq(`[${int}E`)
    }
  },

  newLine () {
    issueAnsiEscSeq('E')
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

  scrollDown (line: number): void {
    issueAnsiEscSeq(`[${line}S`)
  },

  scrollUp (line: number): void {
    issueAnsiEscSeq(`[${line}T`)
  },

  spin (color: Color): () => void {
    const spinCharactors = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    let spinCount = 0
    this.changeColor(color)
    this.saveCursor()
    this.makeInvisibleCursor()

    const timeout = setInterval(() => {
      process.stdout.write(spinCharactors[spinCount++])
      this.moveSavedCursor()
      if (spinCount >= spinCharactors.length) spinCount = 0
    }, 50)

    const stopSpin = (): void => {
      clearTimeout(timeout)
      process.stdout.write('\n')
      this.resetCharAllStyle()
      this.makeVisibleCursor()
    }

    return stopSpin
  }
}
