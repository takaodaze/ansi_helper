import { Progress } from '../Progress'
import { sleep } from '../sleep'

async function main (): Promise<void> {
  const progress = new Progress(2562)
  let n = 0

  while (!progress.isComplete()) {
    n++
    progress.incrementProgress()
    if (n % 100 === 0) progress.message(`${n} completed!⭐`)
    progress.render()
    await sleep(2)
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err)
  })
}
