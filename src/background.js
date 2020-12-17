import {Preferences} from './preferences'

function translate(word, sendResponse) {
  const pref = new Preferences()

  const data = {
    license_key: pref.licenseKey(),
    text: word,
    source_lang: pref.sourceLanguage(),
    target_lang: pref.targetLanguage()
  }

  sendData(data, function (res) {
    const translation = onTranslationResponse(res, word)
    sendResponse(translation)
  })
}

function sendData(data, callback) {
  const url = process.env.TRANSLATION_API_URL + '/api/translations'

  const xhr = new XMLHttpRequest()
  xhr.open('POST', url)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.responseType = 'json'

  xhr.addEventListener('load', function () {
    callback(xhr.response)
  })

  xhr.addEventListener('error', function () {
    console.error('translation failed', xhr)
  })

  xhr.send(JSON.stringify(data))
}

function onTranslationResponse(res, word) {
  const pref = new Preferences()
  return {
    text: word,
    translation: res.response_text,
    language: pref.language(),
    sourceLanguage: pref.sourceLanguage(),
    targetLanguage: pref.targetLanguage(),
    detectedSourceLanguage: res.detected_source_language
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.handler === 'get_prefs') {
    sendResponse({pref: new Preferences().toJSON()})
  } else if (request.handler === 'translate') {
    translate(request.word, sendResponse)
    return true
  } else {
    console.error('Unknown handler')
    sendResponse({})
  }
})

chrome.browserAction.onClicked.addListener(function () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage()
  } else {
    window.open(chrome.runtime.getURL('options.html'))
  }

})

function random(length) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  var charsLength = chars.length
  var str = ''

  for (var i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * charsLength)]
  }

  return str
}

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
    const key = 'lk_trial_' + random(32)
    const pref = new Preferences()
    pref.originalTrialKey(key)
    pref.licenseKey(key)

    chrome.tabs.create({url: chrome.extension.getURL('options.html')})
  }
})
