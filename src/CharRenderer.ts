import { stdout } from 'process'
import { ANSIEscSeqHelper } from './ANSIEscSeqHelper'
const INDENT_SIZE = 4

class CharRenderer {
  indent: number = 0

  constructor (indent?: number) {
    if (indent != null) this.indent = indent
  }

  addIndent (): void {
    this.indent += INDENT_SIZE
  }

  reduceIndent (): void {
    this.indent = Math.max(this.indent - INDENT_SIZE, 0)
  }

  writeLine (text: string): void {
    // indent
    ANSIEscSeqHelper.moveCursorColumn(this.indent)
    // write text
    stdout.write(text)
    stdout.write('\n')
  }
}

export const charRederer = new CharRenderer()
