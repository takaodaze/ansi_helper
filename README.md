# What
CLI UI development tool made by TS

# How to install
```bash
npm i rich-cli
```

# Usage
### Confirm
```ts
import { PromptHelper } from "rich-cli"

async function main (): Promise<void> {
  const yn = await PromptHelper.askConfirm('Are you sure?')
  if (yn) {
    console.log('Yes')
  } else {
    console.log('No')
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err)
  })
}

```
#### output
![confirm](https://github.com/takaodaze/rich-cli/assets/42061897/49e80ed4-1f6a-41a4-b81e-08d8cb4f390f)

### CharRenderer
```ts
import { ANSIEscSeqHelper, CharRenderer, CharStyle, Color } from "rich-cli"

async function main (): Promise<void> {
  const charRederer = new CharRenderer()
  charRederer.writeLine('aaa')
  charRederer.addIndent()
  charRederer.writeLine('bbb')
  charRederer.addIndent()
  ANSIEscSeqHelper.changeCharStyle(new CharStyle('underline'))
  ANSIEscSeqHelper.changeColor(new Color('green'))
  charRederer.writeLine('ccc')
  charRederer.reduceIndent()
  ANSIEscSeqHelper.changeColor(new Color('red'))
  ANSIEscSeqHelper.changeCharStyle(new CharStyle('bold'))
  charRederer.writeLine('ddd')
  charRederer.reduceIndent()
  ANSIEscSeqHelper.resetCharAllStyle()
  charRederer.writeLine('eee')
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err)
  })
}

```
#### output
![char](https://github.com/takaodaze/rich-cli/assets/42061897/491450da-ac8c-4237-9af1-90d859893967)


### Progress
```ts
import { Progress } from "rich-cli"

export const sleep = async (ms: number): Promise<void> => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}


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

```
#### output
![progress](https://github.com/takaodaze/rich-cli/assets/42061897/a84dcbfd-1d6e-4f5c-9f4f-fc657c18750b)

### Spinner
```ts
import { ANSIEscSeqHelper, Color } from "rich-cli"

export const sleep = async (ms: number): Promise<void> => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

async function main (): Promise<void> {
  const stopSpin = ANSIEscSeqHelper.spin(new Color('magenta'))
  await sleep(3000)
  stopSpin()
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err)
  })
}

```
#### output
![spin](https://github.com/takaodaze/rich-cli/assets/42061897/a3f04047-daf3-46a2-87bf-596923595789)

develop with
``` bash
node -v  
v20.10.0
```
