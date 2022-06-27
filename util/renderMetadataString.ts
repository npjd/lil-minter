export const renderMetadataString = (
  string: string,
  index: number,
  metadata: {
    name: string
    description: string
    count: number
  }
): string => {
  let newString = string.replace('`index`', index.toString())
  newString = newString.replace('`count`', metadata.count.toString())
  return newString
}
