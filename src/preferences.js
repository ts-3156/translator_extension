const language = ['en', 'ja']
const sourceLanguage = ['automatic', 'de', 'en', 'en-gb', 'en-us', 'fr', 'es', 'it', 'ja', 'nl', 'pl', 'pt', 'pt-br', 'pt-pt', 'ru', 'zh']
const targetLanguage = ['de', 'en', 'en-gb', 'en-us', 'fr', 'es', 'it', 'ja', 'nl', 'pl', 'pt', 'pt-br', 'pt-pt', 'ru', 'zh']
const saveHistories = ['yes', 'no']

export class Preferences {
  constructor() {
    this.storage = localStorage
  }

  clear() {
    const key = this.originalTrialKey()
    this.storage.clear()
    this.originalTrialKey(key)
    this.licenseKey(key)
  }

  toJSON() {
    return JSON.stringify({
      language: this.language(),
      licenseKey: this.licenseKey(),
      originalTrialKey: this.originalTrialKey(),
      sourceLanguage: this.sourceLanguage(),
      targetLanguage: this.targetLanguage(),
      saveHistories: this.saveHistories()
    })
  }

  setValue(key, value) {
    this.storage[key] = value
  }

  getValue(key) {
    return this.storage[key]
  }

  accessValue(key, inputValue, defaultValue, defaultValues) {
    if (inputValue) {
      if (defaultValues) {
        if (defaultValues.includes(inputValue)) {
          this.setValue(key, inputValue)
        }
      } else {
        this.setValue(key, inputValue)
      }
    } else {
      return this.getValue(key) || defaultValue
    }
  }

  language(value) {
    return this.accessValue('language', value, 'en', language)
  }

  originalTrialKey(value) {
    return this.accessValue('originalTrialKey', value, null, null)
  }

  licenseKey(value) {
    return this.accessValue('licenseKey', value, null, null)
  }

  sourceLanguage(value) {
    return this.accessValue('sourceLanguage', value, 'automatic', sourceLanguage)
  }

  targetLanguage(value) {
    return this.accessValue('targetLanguage', value, 'en', targetLanguage)
  }

  saveHistories(value) {
    return this.accessValue('saveHistories', value, 'yes', saveHistories)
  }
}
