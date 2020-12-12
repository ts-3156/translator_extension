import {I18n} from './i18n'

let pref
let i18n

const templates = {}

function removeButton() {
  $('#button-translate').remove()
}

function removePopup() {
  $('#popup-translate').remove()
}

function showButton(e, word) {
  word = (' ' + word).slice(1)

  const $elem = $('<div/>', {id: 'button-translate'})
  $elem.html(templates['button-translate-template'].innerHTML)
  $elem.css({position: 'fixed', top: -1000, left: -1000})

  $elem.find('#button-translate-inner').text('翻訳')
  $('body').append($elem)

  $elem.find('#button-translate-inner').on('click', function (e) {
    removeButton()
    translate(e, word)
  })

  setTimeout(function () {
    const pos = calculatePosition(e.clientX, e.clientY, $elem)
    $elem.css({position: 'absolute', top: pos.y, left: pos.x})
  }, 0)
}

function showPopup(e, content) {
  const $elem = $('<div/>', {id: 'popup-translate', style: 'width: 400px;'})

  $elem.html(templates['popup-translate-template'].innerHTML)
  $elem.css({position: 'fixed', top: -1000, left: -1000})

  $elem.find('#popup-translate-inner').html(content)
  $('body').append($elem)

  setTimeout(function () {
    const pos = calculatePosition(e.clientX, e.clientY, $elem)
    $elem.css({position: 'absolute', top: pos.y, left: pos.x})
  }, 0)

  $elem.find('#popup-translate-inner').on('click', function (e) {
    if (e.target.id === 'go-to-options') {
      goToOptions()
    }
    if ($(e.target).hasClass('btn-close')) {
      removePopup()
    }
    return false
  })
}

function calculatePosition(x, y, $elem) {
  const pos = {}
  const windowWidth = $(window).width()
  const windowHeight = $(window).height()
  const width = $elem.width()
  const height = $elem.height()

  if (x + width > windowWidth) {
    pos.x = windowWidth - width
    if (pos.x < 0) {
      pos.x = 0
    }
  } else {
    pos.x = x
  }

  if ($(document).scrollLeft() > 0) {
    pos.x += $(document).scrollLeft()
  }

  if (y + height > windowHeight) {
    pos.y = windowHeight - height
    if (pos.y < 0) {
      pos.x = 0
    }
  } else {
    pos.y = y
  }

  if ($(document).scrollTop() > 0) {
    pos.y += $(document).scrollTop()
  }

  return pos
}

function loadPrefs() {
  chrome.runtime.sendMessage({handler: 'get_prefs'}, function (response) {
    pref = JSON.parse(response.pref)
    i18n = new I18n(pref['language'])
  })
}

loadPrefs()

document.addEventListener('visibilitychange', function () {
  if (!document.hidden) {
    try {
      loadPrefs()
    } catch (e) {
      if (e.message !== 'Extension context invalidated.') {
        throw e
      }
    }
  }
}, false)

function processEvent(e) {
  const selection = window.getSelection()
  const hit_elem = document.elementFromPoint(e.clientX, e.clientY)

  if (!hit_elem) {
    return
  }

  if (/INPUT|TEXTAREA/.test(hit_elem.nodeName) || hit_elem.isContentEditable
    || $(hit_elem).parents().filter(function () {
      return this.isContentEditable
    }).length > 0) {

    return
  }

  let word = ''
  if (selection.toString()) {
    let sel_container = selection.getRangeAt(0).commonAncestorContainer

    while (sel_container.nodeType !== Node.ELEMENT_NODE) {
      sel_container = sel_container.parentNode
    }

    if (
      // only choose selection if mouse stopped within immediate parent of selection
      ($(hit_elem).is(sel_container) || $.contains(sel_container, hit_elem))
      // and since it can still be quite a large area
      // narrow it down by only choosing selection if mouse points at the element that is (partially) inside selection
      && selection.containsNode(hit_elem, true)
      // But what is the point for the first part of condition? Well, without it, pointing at body for instance would also satisfy the second part
      // resulting in selection translation showing up in random places
    ) {
      word = selection.toString()
    }
  }

  if (word && !word.match(/^\s+$/)) {
    removeButton()
    showButton(e, word)
  } else {
    removePopup()
    removeButton()
  }
}

function translate(e, word) {
  chrome.runtime.sendMessage({handler: 'translate', word: word}, function (response) {
    if (!response.translation) {
      console.log('skip empty translation')
      return
    }

    showPopup(e, formatTranslation(word, response))
  })
}

function formatTranslation(text, translation) {
  let sourceLanguage
  if (translation.sourceLanguage === 'automatic') {
    sourceLanguage = i18n.t('automatic') + ' (' + i18n.t(translation.detectedSourceLanguage.toLowerCase()) + ')'
  } else {
    sourceLanguage = i18n.t(translation.sourceLanguage)
  }

  return `
    <div style="position: relative;">
      <span class="text-muted btn-close" aria-hidden="true">&times;</span>
      <div class="text-muted small">${sourceLanguage} : </div>
      <div class="font-18 mb-3">${translation.text}</div>
      <div class="text-muted small">${i18n.t(translation.targetLanguage)} : </div>
      <div class="font-18 mb-3">${translation.translation}</div>
      <a id="go-to-options" class="text-muted small" href="#">${i18n.t('extension_options')}</a>
      <a id="TODO" class="text-muted small btn-web" href="#">${i18n.t('extension_web')}</a>
    </div>
  `
}

function goToOptions() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage()
  } else {
    window.open(chrome.runtime.getURL('options.html'))
  }
}

$(document).on('click', '#go-to-options', goToOptions)

$(document).click(function (e) {
  processEvent(e)
  return true
})

function registerComponent(component) {
  const html = component + '.html'
  const xhr = new XMLHttpRequest()
  xhr.open('GET', chrome.extension.getURL(html), true)
  xhr.responseType = 'document'
  xhr.onload = function (e) {
    const doc = e.target.response
    const template = doc.querySelector('template')
    templates[template.id] = template
  }
  xhr.send()

  // const script = component + '.js'
  // const s = document.createElement('script')
  // s.type = 'text/javascript'
  // s.src = chrome.extension.getURL(script)
  // s.async = true
  // document.head.appendChild(s)
}

$(function () {
  registerComponent('popup')
  registerComponent('button')
})
