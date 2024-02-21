const deserializeFunction = (funcString) =>
  new Function(`return ${funcString}`)()

export default deserializeFunction
