import {ConnectionRefusedError, ParseError, UnknownError, BadRequest, RequestTimeout, InternalServerError} from './errors'
import {Preferences} from './preferences'

function translate(word, targetLanguage, sendResponse) {
  const pref = new Preferences()
  if (targetLanguage) {
    pref.targetLanguage(targetLanguage)
  }

  const data = {
    license_key: pref.licenseKey(),
    text: word,
    source_lang: pref.sourceLanguage(),
    target_lang: pref.targetLanguage()
  }

  sendData(data, function (res) {
    const translation = onTranslationResponse(res, word)
    sendResponse(translation)
  }, function (xhr, error_class) {
    console.error('translation failed', xhr.response)
    const res = {error: true, error_keys: xhr.response.keys, error_class: error_class}
    const translation = onTranslationResponse(res, word)
    sendResponse(translation)
  })
}

function sendData(data, done, fail) {
  const url = process.env.TRANSLATION_API_URL + '/api/translations'

  const xhr = new XMLHttpRequest()
  xhr.open('POST', url)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.responseType = 'text'
  xhr.timeout = 5000

  xhr.onload = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        try {
          const res = JSON.parse(xhr.response)
          done(res)
        } catch (e) {
          fail(xhr, ParseError)
        }
      } else if (xhr.status === 408) {
        fail(xhr, RequestTimeout)
      } else if (400 <= xhr.status && xhr.status < 500) {
        fail(xhr, BadRequest)
      } else if (500 <= xhr.status && xhr.status < 600) {
        fail(xhr, InternalServerError)
      } else {
        fail(xhr, UnknownError)
      }
    }
  }

  xhr.onerror = function () {
    if (xhr.status === 0) {
      fail(xhr, ConnectionRefusedError)
    } else {
      fail(xhr, UnknownError)
    }
  }

  xhr.send(JSON.stringify(data))
}

function onTranslationResponse(res, word) {
  const pref = new Preferences()
  return {
    error: res.error,
    error_keys: res.error_keys,
    error_class: new res.error_class().name,
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
    translate(request.word, request.targetLanguage, sendResponse)
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
