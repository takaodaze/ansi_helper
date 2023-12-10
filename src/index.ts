import { CharStyle, Color } from './ANSICode'
import { ANSIEscSeqHelper } from './ANSIEscSeqHelper'
import { CharRenderer } from './CharRenderer'
import { ProgressBar } from './ProgressBar'
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

  const progressBar = new ProgressBar(10000)
  let n = 0
  while (true) {
    n++
    progressBar.incrementProgress()
    if (n % 3 === 0) progressBar.message(`${n}`)
    progressBar.render()
    await sleep(1000)
  }
}

void (async () => {
  await main()
})()
