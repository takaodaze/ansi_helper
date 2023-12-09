import { ANSIEscSeqHelper } from './ANSIEscSeqHelper'

process.stdout.write('hoge')
ANSIEscSeqHelper.moveHeadLine()
ANSIEscSeqHelper.eraseCurrentLine()
process.stdout.write('fooo\n')
process.stdout.write('var\n')

const clear = ANSIEscSeqHelper.loadingSpin()

setTimeout(() => { clear() }, 1000)
