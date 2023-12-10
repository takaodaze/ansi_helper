import { charRederer } from './CharRenderer'

async function main (): Promise<void> {
  process.stdout.write('start')
  charRederer.writeLine('aaa')
  charRederer.addIndent()
  charRederer.writeLine('aaa')
  charRederer.addIndent()
  charRederer.writeLine('aaa')
  charRederer.reduceIndent()
  charRederer.writeLine('aaa')
  charRederer.reduceIndent()
  charRederer.writeLine('aaa')
  charRederer.reduceIndent()
  charRederer.reduceIndent()
  charRederer.writeLine('aaa')
}

void (async () => {
  await main()
})()
