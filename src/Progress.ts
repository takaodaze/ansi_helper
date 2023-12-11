import { Color } from './ANSICode'
import { ANSIEscSeqHelper } from './ANSIEscSeqHelper'
import { CharRenderer } from './CharRenderer'

export class Progress {
  private currentProgress: number = 0 // < whole
  private readonly whole: number
  private readonly charRenderer: CharRenderer

  constructor (wholeAmount: number) {
    this.whole = wholeAmount
    this.charRenderer = new CharRenderer()
  }

  isComplete (): boolean {
    return this.whole === this.currentProgress
  }

  incrementProgress (): void {
    const incremented = this.currentProgress + 1
    this.currentProgress = Math.min(incremented, this.whole)
  }

  private prograssRate (): number {
    return this.currentProgress / this.whole
  }

  private readblePrograssRate (): string {
    return `${(this.prograssRate() * 100).toFixed(1)}%`
  }

  render (): void {
    ANSIEscSeqHelper.makeInvisibleCursor()
    ANSIEscSeqHelper.eraseCurrentLine()
    ANSIEscSeqHelper.moveCursorHeadLine()
    this.renderGauge()
    process.stdout.write(`${this.currentProgress}/${this.whole}(${this.readblePrograssRate()})`)
    ANSIEscSeqHelper.makeVisibleCursor()
  }

  private renderGauge (): void {
    const gaugeResolution = 30
    const rate = Math.floor(this.prograssRate() * gaugeResolution)

    ANSIEscSeqHelper.changeColor(new Color('reset'))

    process.stdout.write('[')
    ANSIEscSeqHelper.changeColor(new Color('green'))
    for (let i = 0; i < rate; i++) {
      process.stdout.write('|')
    }
    ANSIEscSeqHelper.changeColor(new Color('reset'))
    for (let i = 0; i < gaugeResolution - rate; i++) {
      process.stdout.write('-')
    }
    process.stdout.write('] ')
  }

  message (msg: string): void {
    ANSIEscSeqHelper.eraseCurrentLine()
    this.charRenderer.writeLine(msg)
    this.render()
  }
}
