const whitespaceRegex = /(\s+)/

export const splitText = (text: string, per: 'line' | 'word' | 'char') => {
  if (per === 'line') {
    return text.split('\n')
  }
  return text.split(whitespaceRegex)
}
