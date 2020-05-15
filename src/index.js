const R = require('ramda')

const makeFilterVals = (filter) => {
  const makeFilterDdb = (field, vals) => {
    vals = vals.map(R.prop(0))
    const expression = '(' + vals.map((_, i) => `#${field} = :${field}${i}`).join(' OR ') + ')'
    const attrNames = { [`#${field}`]: field }
    const attrVals = vals.reduce((acc, curr, i) => ({ ...acc, [`:${field}${i}`]: curr }), {})

    return { expression, attrNames, attrVals }
  }

  const makeFilter = ([key, val]) => {
    const field = key.slice(0, -1)
    return makeFilterDdb(field, val)
  }

  const mergeFilterVals = (prev, curr) => ({
    expression: [prev.expression, curr.expression].join(' AND '),
    attrNames: { ...prev.attrNames, ...curr.attrNames },
    attrVals: { ...prev.attrVals, ...curr.attrVals },
  })

  const initVals = { expression: '', attrNames: {}, attrVals: {} }
  if (!R.isEmpty(filter)) {
    return R.pipe(R.toPairs, R.map(makeFilter), R.reduce(mergeFilterVals, initVals))(filter)
  }
  return initVals
}

module.exports = {
  makeFilterVals,
}
