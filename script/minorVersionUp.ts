/**
 * minor version up this package.
 */

import * as fs from 'fs'
import * as packageJson from '../package.json'
import { resolve } from 'path'

function incrementVersion (version: string): string {
  const versions = version.split('.')
  versions.push((Number(versions.pop()) + 1).toString()) // Convert the incremented version number to a string
  return versions.join('.')
}
function updateVersion (filename: string): string {
  const data = packageJson
  data.version = incrementVersion(data.version)
  const content = JSON.stringify(packageJson, null, 4)
  fs.writeFileSync(filename, content)
  return data.version
}

if (require.main === module) {
  const packageJsonFilePath = resolve('../package.json')
  const newVersion = updateVersion(packageJsonFilePath)
  console.log('Package version incremented to:', newVersion)
}
