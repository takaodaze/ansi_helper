import { CharStyle, Color } from '../ANSICode'
import { ANSIEscSeqHelper } from '../ANSIEscSeqHelper'
import { CharRenderer } from '../CharRenderer'

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
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err)
  })
}
