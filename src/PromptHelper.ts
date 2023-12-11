import readline from 'node:readline/promises'
import { stdout, stdin } from 'node:process'

export const PromptHelper = {
  async askConfirm (msg: string): Promise<boolean> {
    const rl = readline.createInterface({ input: stdin, output: stdout })
    const answer = await rl.question(`${msg} (y/n): `)
    rl.close()
    const trimed = answer.trim()
    return trimed === 'y'
  }
}
