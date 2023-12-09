const prefix = '\x1B'

const issueAnsiEscSeq = (arg: string): void => {
  process.stdout.write(`${prefix}${arg}`)
}

const spinCharactors = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

export const ANSIEscSeqHelper = {
  moveHeadLine (): void {
    issueAnsiEscSeq('[0G')
  },

  eraseCurrentLine (): void {
    issueAnsiEscSeq('[2K')
  },

  resetCharStyle (): void {
    issueAnsiEscSeq('[0m') // with cursor style
  },

  saveCursor (): void {
    issueAnsiEscSeq('[s')
  },

  moveSavedCursor (): void {
    issueAnsiEscSeq('[u')
  },

  setInvisibleCursor (): void {
    issueAnsiEscSeq('[?25l')
  },

  setVisibleCursor (): void {
    issueAnsiEscSeq('[?25h')
  },

  loadingSpin (): () => void {
    let spinCount = 0
    issueAnsiEscSeq('[1;35m')
    this.saveCursor()
    this.setInvisibleCursor()

    const timeout = setInterval(() => {
      process.stdout.write(spinCharactors[spinCount++])
      this.moveSavedCursor()
      if (spinCount >= spinCharactors.length) spinCount = 0
    }, 60)

    const stopSpin = (): void => {
      clearTimeout(timeout)
      process.stdout.write('\n')
      this.resetCharStyle()
      process.stdout.write('done!\n')
    }

    return stopSpin
  }
}
