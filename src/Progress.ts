import { ANSIEscSeqHelper } from './ANSIEscSeqHelper'
import { CharRenderer } from './CharRenderer'

export class Progress {
  private currentProgress: number = 0 // < whole
  private readonly whole: number
  private readonly charRenderer: CharRenderer

  constructor (wholeAmount: number) {
    this.whole = wholeAmount
    this.charRenderer = new CharRenderer()
    ANSIEscSeqHelper.saveCursor()
  }

  isComplete (): boolean {
    return this.whole === this.currentProgress
  }

  incrementProgress (): void {
    const incremented = this.currentProgress + 1
    this.currentProgress = Math.min(incremented, this.whole)
  }

  render (): void {
    // TODO: ゲージの実装
    ANSIEscSeqHelper.eraseCurrentLine()
    ANSIEscSeqHelper.moveSavedCursor()
    const content = `[${this.currentProgress}/${this.whole}]`
    process.stdout.write(content)
  }

  message (msg: string): void {
    ANSIEscSeqHelper.eraseCurrentLine()
    this.charRenderer.writeLine(msg)
    this.render()
  }
}
