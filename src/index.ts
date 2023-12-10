import { ANSIEscSeqHelper } from './ANSIEscSeqHelper'
import { PromptHelper } from './PromptHelper'
import { sleep } from './sleep'

async function main (): Promise<void> {
  const clearLoading = ANSIEscSeqHelper.spin()
  await sleep(1000)
  clearLoading()
}

void (async () => {
  await main()
})()
