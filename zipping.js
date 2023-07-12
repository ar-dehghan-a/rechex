const fs = require('fs')
const archiver = require('archiver')

function zipFolder(folderPath, name = 'build') {
  const output = fs.createWriteStream(`${name}.zip`)
  const archive = archiver('zip', {zlib: {level: 9}})

  archive.directory(folderPath, false)

  archive.pipe(output)
  archive.finalize()

  console.log('The file was zipped')
}

zipFolder('./build', 'build')
