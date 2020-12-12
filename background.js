import {Preferences} from './lib/preferences'

function translate(word, sendResponse) {
  const pref = new Preferences()
  const key = [KEY]

  const data = {
    auth_key: key,
    text: word,
    tag_handling: 0,
    target_lang: pref.targetLanguage()
  }

  if (pref.sourceLanguage() !== 'automatic') {
    data['source_lang'] = pref.sourceLanguage()
  }

  sendData(data, function (res) {
    const translation = onTranslationResponse(res.translations[0], word)
    sendResponse(translation)
  })
}

function sendData(data, callback) {
  const url = 'https://api.deepl.com/v2/translate'

  const xhr = new XMLHttpRequest()
  xhr.open('POST', url)
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.responseType = 'json'

  xhr.addEventListener('load', function () {
    callback(xhr.response)
  })

  xhr.addEventListener('error', function () {
    console.error('translation failed', xhr)
  })

  xhr.send(encodeData(data))
}

function encodeData(data) {
  const urlEncodedDataPairs = []

  Object.keys(data).forEach(function (key) {
    urlEncodedDataPairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
  })

  return urlEncodedDataPairs.join('&').replace(/%20/g, '+')
}

function onTranslationResponse(translation, word) {
  const pref = new Preferences()
  return {
    text: word,
    translation: translation.text,
    language: pref.language(),
    sourceLanguage: pref.sourceLanguage(),
    targetLanguage: pref.targetLanguage(),
    detectedSourceLanguage: translation.detected_source_language
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

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
    chrome.tabs.create({url: chrome.extension.getURL('options.html')})
  }
})
