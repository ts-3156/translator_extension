class Cache {
  constructor() {
    this.storage = localStorage
    this.ttl = 300 // 5 minutes
  }

  read(keyObj) {
    let key

    try {
      key = JSON.stringify(keyObj)
    } catch (e) {
      return null
    }

    const data = this.storage[key]

    if (!data) {
      return null
    }

    let entry

    try {
      entry = JSON.parse(data)
    } catch (e) {
      return null
    }

    if (!entry || entry.expiry > new Date().getTime()) {
      return null
    }

    let value

    try {
      value = JSON.parse(entry.value)
    } catch (e) {
      return null
    }

    return value
  }

  write(keyObj, valueObj) {
    let key

    try {
      key = JSON.stringify(keyObj)
    } catch (e) {
      return false
    }

    let value

    try {
      value = JSON.stringify(valueObj)
    } catch (e) {
      return false
    }

    const entry = {value: value, expiry: new Date().getTime() + this.ttl}
    this.storage[key] = JSON.stringify(entry)

    return true
  }
}

export {
  Cache
}
