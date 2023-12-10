import { CharStyle, Color } from './ANSICode'
import { ANSIEscSeqHelper } from './ANSIEscSeqHelper'
import { CharRenderer } from './CharRenderer'
import { Progress } from './Progress'
import { sleep } from './sleep'

async function main (): Promise<void> {
  const charRederer = new CharRenderer()
  charRederer.writeLine('aaa')
  charRederer.addIndent()
  charRederer.writeLine('aaa')
  charRederer.addIndent()
  ANSIEscSeqHelper.changeCharStyle(new CharStyle('underline'))
  ANSIEscSeqHelper.changeColor(new Color('green'))
  charRederer.writeLine('aaa')
  charRederer.reduceIndent()
  ANSIEscSeqHelper.changeColor(new Color('red'))
  ANSIEscSeqHelper.changeCharStyle(new CharStyle('bold'))
  charRederer.writeLine('aaa')
  charRederer.reduceIndent()
  ANSIEscSeqHelper.resetCharAllStyle()
  charRederer.writeLine('aaa')

  const progress = new Progress(1000)
  let n = 0
  while (!progress.isComplete()) {
    n++
    progress.incrementProgress()
    if (n % 100 === 0) progress.message(`${n}:⭐`)
    progress.render()
    await sleep(1)
  }
  charRederer.newLine()
}

void (async () => {
  await main()
})()
