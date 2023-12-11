import { describe, expect, it } from '@jest/globals'
import { CharStyle, Color } from '../ANSICode'

describe('Color', () => {
  it('red', () => {
    const red = new Color('red')
    expect(red.toANSICode()).toBe('31')
  })

  it('green', () => {
    const green = new Color('green')
    expect(green.toANSICode()).toBe('32')
  })

  it('megenda', () => {
    const magenta = new Color('magenta')
    expect(magenta.toANSICode()).toBe('35')
  })
})

describe('CharStyle', () => {
  it('bold', () => {
    const bold = new CharStyle('bold')
    expect(bold.toANSICode()).toBe('1')
  })

  it('underline', () => {
    const bold = new CharStyle('underline')
    expect(bold.toANSICode()).toBe('4')
  })
})
