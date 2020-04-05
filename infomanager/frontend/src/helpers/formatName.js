export const formatName = (s) => {
    if (typeof s !== 'string') return ''
    if (s === s.toLowerCase() || s === s.toUpperCase()) {
      return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
    }
    return s
  }