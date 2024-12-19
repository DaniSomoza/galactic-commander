const formatterWithoutDecimal = new Intl.NumberFormat('es-ES', {
  style: 'decimal',
  maximumFractionDigits: 0
})

const formatter = new Intl.NumberFormat('es-ES', {
  style: 'decimal',
  maximumFractionDigits: 2
})

// TODO: use a object as a parameter
function formatNumber(amount: number, showFullAmount = false): string {
  if (showFullAmount) {
    return formatterWithoutDecimal.format(amount)
  }

  if (amount > 1_000_000) {
    return `${formatter.format(amount / 1_000_000)}M`
  }

  if (amount > 1_000) {
    return `${formatter.format(amount / 1_000)}K`
  }

  return formatterWithoutDecimal.format(amount)
}

export default formatNumber
