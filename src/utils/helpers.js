export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100)
}

export const getUniqueValues = (data, type) => {
  // Ritorna solo i valori in delle proprietà specifiche
  // Tipo data.categories
  let unique = data.map((item) => item[type])

  // I colori sono array di array, quindi bisogna flattarli
  // Flat crea un array unico con tutti i sotto array dati in ingresso
  // Unique ha tanti sotto array, che diventeranno 1 solo, senza doppioni grazie al set
  if( type === 'colors'){
    unique = unique.flat()
  }
  // Ritorniamo un nuovo set dei valori nella proprietà
  // Aggiungendo all
  return ['all', ...new Set(unique)]
}
