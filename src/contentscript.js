import {I18n} from './i18n'

let pref
let i18n

const templates = {}

const iconBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAIAAABMXPacAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA35pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDMwMiwgMjAxNy8wMy8wMi0xNjo1OTozOCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkOGNmOGMzZC1mN2EyLTQwZTctYTRhZC1mMTlkYjBlOGJjNzkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjRDRTM0ODQzNEEwMTFFQkEwNDdEMDNGQkI4RkZBM0UiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjRDRTM0ODMzNEEwMTFFQkEwNDdEMDNGQkI4RkZBM0UiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIEVsZW1lbnRzIDE2LjAgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpiNWQ1YmM4Mi0yNmMxLTQ5ZTYtYmVlOS1iOWJmNDIzZDA4YjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZDhjZjhjM2QtZjdhMi00MGU3LWE0YWQtZjE5ZGIw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'
const iconTag = '<img class="clickable" src="' + iconBase64 + '" style="display: inline-block; vertical-align: middle;" width="24" height="24">'

function targetLanguageSelector() {
  const elem = `
       <div>
        <select id="target-language-selector" style="vertical-align: middle;">
          <option value="de">${i18n.t('de')}</option>
          <option value="en">${i18n.t('en')}</option>
          <option value="en-gb">${i18n.t('en-gb')}</option>
          <option value="en-us">${i18n.t('en-us')}</option>
          <option value="fr">${i18n.t('fr')}</option>
          <option value="es">${i18n.t('es')}</option>
          <option value="it">${i18n.t('it')}</option>
          <option value="ja">${i18n.t('ja')}</option>
          <option value="nl">${i18n.t('nl')}</option>
          <option value="pl">${i18n.t('pl')}</option>
          <option value="pt">${i18n.t('pt')}</option>
          <option value="pt-br">${i18n.t('pt-br')}</option>
          <option value="pt-pt">${i18n.t('pt-pt')}</option>
          <option value="ru">${i18n.t('ru')}</option>
          <option value="zh">${i18n.t('zh')}</option>
        </select>
        </div>
  `
  const $elem = $(elem)
  $elem.find('option[value="' + pref.targetLanguage + '"]').prop('selected', true).attr('selected', true)

  return $elem.html()
}

function translationButton() {
  // const button = i18n.t('translate', {selector: targetLanguageSelector()})
  // return $(iconTag + ' ' + button)
  return $(iconTag)
}

function removeButton() {
  $('#button-translate').remove()
}

function removePopup() {
  $('#popup-translate').remove()
}

function showButton(e, word) {
  word = (' ' + word).slice(1)
  let targetLanguage = pref.targetLanguage

  const $elem = $('<div/>', {id: 'button-translate', style: 'z-index: 10000;'})
  $elem.html(templates['button-translate-template'].innerHTML)
  $elem.css({position: 'fixed', top: -1000, left: -1000})

  $elem.find('#button-translate-inner').empty().append(translationButton())
  $('body').append($elem)

  $('#target-language-selector').on('change', function () {
    targetLanguage = $(this).val()
  })

  $elem.find('#button-translate-inner .clickable').on('click', function (e) {
    removeButton()
    translate(e, word, targetLanguage)
  })

  setTimeout(function () {
    const pos = calculatePosition(e.clientX, e.clientY, $elem)
    $elem.css({position: 'absolute', top: pos.y + 10, left: pos.x})
  }, 0)
}

function showPopup(e, content) {
  const $elem = $('<div/>', {id: 'popup-translate', style: 'z-index: 10000; width: 400px;'})

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

  if ($(e.target).parents('#button-translate-inner').length !== 0) {
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

function translate(e, word, targetLanguage) {
  chrome.runtime.sendMessage({handler: 'translate', word: word, targetLanguage: targetLanguage}, function (response) {
    if (response.error) {
      showPopup(e, formatError(word, response))
      return
    }

    if (!response.translation) {
      console.log('skip empty translation')
      return
    }

    showPopup(e, formatTranslation(word, response))
    loadPrefs() // targetLanguage may be changed
  })
}

function formatTranslation(text, response) {
  let sourceLanguage
  if (response.sourceLanguage === 'automatic') {
    sourceLanguage = i18n.t('automatic') + ' (' + i18n.t(response.detectedSourceLanguage.toLowerCase()) + ')'
  } else {
    sourceLanguage = i18n.t(response.sourceLanguage)
  }

  return `
    <div style="position: relative;">
      <span class="text-muted btn-close" aria-hidden="true">&times;</span>
      <div class="text-muted small">${sourceLanguage} : </div>
      <div class="font-18 mb-3">${response.text}</div>
      <div class="text-muted small">${i18n.t(response.targetLanguage)} : </div>
      <div class="font-18 mb-3">${response.translation}</div>
      <a id="go-to-options" class="text-muted small" href="#" onclick="goToOptions()">${i18n.t('extension_options')}</a>
      <a id="TODO" class="text-muted small btn-web" href="${process.env.WEBSITE_URL}">${i18n.t('extension_website')}</a>
    </div>
  `
}

function formatError() {
  return `
    <div style="position: relative;">
      <span class="text-muted btn-close" aria-hidden="true">&times;</span>
      <div class="text-muted small">${i18n.t('error_text')} : </div>
      <div class="font-18 mb-3">${i18n.t('error_message')}</div>
      <a id="go-to-options" class="text-muted small" href="#" onclick="goToOptions()">${i18n.t('extension_options')}</a>
      <a id="TODO" class="text-muted small btn-web" href="${process.env.WEBSITE_URL}">${i18n.t('extension_website')}</a>
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
