import {parse_error, ContextInvalidatedError, GeneralError, EmptyWordError, OnlyNumbersWordError} from './errors'
import {I18n} from './i18n'

let pref
let i18n

const templates = {}

const iconBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4xpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDMwMiwgMjAxNy8wMy8wMi0xNjo1OTozOCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkOGNmOGMzZC1mN2EyLTQwZTctYTRhZC1mMTlkYjBlOGJjNzkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REQxNjIwNEEzOUE0MTFFQkJERURCMzMxODMzREVCRDUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REQxNjIwNDkzOUE0MTFFQkJERURCMzMxODMzREVCRDUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIEVsZW1lbnRzIDE2LjAgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4ODhkZDljYS0xMGJjLTRjNzItOGZmNC1iOGJjODYyODhmZmEiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpmYmEwZDFiYS03ZDBhLTExN2UtOGNlZC1mZmQ0MmUwMDAwMDAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6gEDGpAAAChElEQVR42pxVSWtTURS+5777hgwmqW1ShwpRqFGcoLSIdeVO1y4cdu4Uf4MopfgHdONGty5d6EYoXVYUabUWqrTFQiuk0SYmZHh5993rl1cqaRqSJneVQM53zjecE8qenLYYd7TQTLPeHzGqkawzJYCyavz9YuaE5n0ASVJjXirtx4SjjXmxNRX9ENFmH0AVktOlyYwcACMmGAdKf0CghnKA9EOn7RMt3z1SPtMUfNaNhgzaGYx6A1JMp2VsQNt+4CCqXVKbvJTnbkiLHoBc8u9Vz11305IpixmNAZnaNEovw0tv7TVgSaarJGG0rQ3dmRqGApHPZu67yIMUfB33hh+VLhfInbU2Rv3EjVp63tz6ZGXNvXFpFRt98ItZe+NJdO5p9OP9+MwbZyWszdvVDCKTVKGH5fEJb7hIbots7V0DFtIQDQLx3l4vkzeiolfqR+9UM0VeuVo/frd2BvJ1B2pizvPkQhcINKicuLYVafRIKLtlpbrnCJJxpE7zRfP3s8hCTJnv7LUX4UXo3QOQy+QJ/xA4FrhbpLoTmIUxzX2L2T4diCV0gQYJbd+sjVra+GrmtnmNa4LGSBny0QWIApRr7sgxP4K25+XgBTmUNSqvnR/gGESchnQopcK4HtSU+FYgyIGGl7zkhHckoOZ/E3+eRxaWxTb0zvFqjlduVU8D8XF0rjnue4Cg36vQEoLzf0Vq5K8bpTLVd2pwuR7EZ5DSX0bZ2iu2aBnnpyiuNi0tD5bW2e2MQVZEYRmhb2wJ1x00gi6dzxIGsXbb9Jajg94jsICXMJsOcHT2PxSivHG2IOeYTE2VJkVf0wHlokzi/gj8k5zy42flYd0Xox1nAfJPgAEAKocXcqfLPQ0AAAAASUVORK5CYII='
const iconTag = '<img class="clickable" src="' + iconBase64 + '" style="display: inline-block; vertical-align: middle; filter: none;" width="24" height="24">'

const loaderBase64 = 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
const loaderTag = '<img src="' + loaderBase64 + '" style="display: inline-block; vertical-align: middle; filter: none;" width="16" height="16">'

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

// function translationButton() {
//   const button = i18n.t('translate', {selector: targetLanguageSelector()})
//   return $(iconTag + ' ' + button)
// }

function removeButton() {
  $('#dt-button-translate').remove()
}

function removePopup() {
  $('#dt-popup-translate').remove()
}

function showButton(e, word) {
  word = (' ' + word).slice(1)
  let targetLanguage = pref.targetLanguage

  const $elem = $('<div/>', {id: 'dt-button-translate', style: 'z-index: 10000;'})
  $elem.html(templates['dt-button-template'].innerHTML)
  $elem.css({position: 'fixed', top: -1000, left: -1000})

  $elem.find('#dt-button-container').empty().append($(iconTag))
  $('body').append($elem)

  $('#target-language-selector').on('change', function () {
    targetLanguage = $(this).val()
  })

  $elem.find('#dt-button-container .clickable').on('click', function (e) {
    removeButton()
    translate(e, word, targetLanguage)
  })

  setTimeout(function () {
    const pos = calculatePosition(e.clientX, e.clientY, $elem)
    $elem.css({position: 'absolute', top: pos.y + 10, left: pos.x})
  }, 0)
}

function showPopup(e, content) {
  const $elem = $('<div/>', {id: 'dt-popup-translate', style: 'z-index: 10000; width: 400px;'})

  $elem.html(templates['dt-popup-template'].innerHTML)
  $elem.css({position: 'fixed', top: -1000, left: -1000})

  $elem.find('#dt-popup-container').html(content)
  $('body').append($elem)

  setTimeout(function () {
    const pos = calculatePosition(e.clientX, e.clientY, $elem)
    $elem.css({position: 'absolute', top: pos.y, left: pos.x})
  }, 0)

  $elem.find('#dt-popup-container .btn-close').on('click', function () {
    removePopup()
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
      if (e.message === 'Extension context invalidated.') {
        console.warn(e)
      } else {
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

  if ($(e.target).parents('#dt-button-container').length !== 0) {
    return
  }

  if ($(e.target).parents('#dt-popup-container').length !== 0) {
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
    removePopup()
    showButton(e, word)
  } else {
    removePopup()
    removeButton()
  }
}

function translate(e, word, targetLanguage) {
  if (!word || word === '') {
    showPopup(e, formatError(EmptyWordError))
    return
  }

  if (word.match(/^\d+$/)) {
    showPopup(e, formatError(OnlyNumbersWordError))
    return
  }

  const callback = function (response) {
    if (response.error) {
      showPopup(e, formatError(response.error_class))
      return
    }

    if (!response.translation) {
      console.log('skip empty translation')
      return
    }

    showPopup(e, formatTranslation(word, response))
    loadPrefs() // targetLanguage may be changed
  }

  try {
    chrome.runtime.sendMessage({handler: 'translate', word: word, targetLanguage: targetLanguage}, callback)
  } catch (err) {
    if (err.message === 'Extension context invalidated.') {
      console.warn(err)
      showPopup(e, formatError(ContextInvalidatedError))
    } else {
      showPopup(e, formatError(GeneralError))
    }
  }
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
      <div id="dt-source-language" class="text-muted small mb-1">${sourceLanguage} : </div>
      <div id="dt-source-text" class="font-18 mb-3">${response.text}</div>
      <div id="dt-target-language" class="text-muted small mb-1">${i18n.t(response.targetLanguage)} : </div>
      <div id="dt-target-text" class="font-18 mb-3">${response.translation}</div>
      <a class="go-to-options text-muted small" href="#">${i18n.t('extension_options')}</a>
      <a class="go-to-website text-muted small" href="${process.env.WEBSITE_URL}">${i18n.t('extension_website')}</a>
    </div>
  `
}

function formatError(error_class) {
  let message

  try {
    if (typeof error_class === 'string') {
      error_class = parse_error(error_class)
    }
    const key = 'error_reason.' + new error_class().name

    if (i18n.exist(key)) {
      message = i18n.t(key)
    } else {
      message = i18n.t('error_message')
    }

    message += '<br><br>' + i18n.t('error_reason.contact')
  } catch (e) {
    console.warn(e)
    message = i18n.t('error_message')
  }

  return `
    <div style="position: relative;">
      <span class="text-muted btn-close" aria-hidden="true">&times;</span>
      <div id="dt-error-title" class="text-muted small mb-1">${i18n.t('error_text')} : </div>
      <div id="dt-error-message" class="font-18 mb-3">${message}</div>
      <a class="go-to-options text-muted small" href="#">${i18n.t('extension_options')}</a>
      <a class="go-to-website text-muted small" href="${process.env.WEBSITE_URL}">${i18n.t('extension_website')}</a>
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

function goToWebsite() {
  window.location.href = process.env.WEBSITE_URL + '?via=popup'
  return false
}

$(document).on('click', '#dt-popup-container .go-to-website', goToWebsite)
$(document).on('click', '#dt-popup-container .sign-in', goToWebsite)
$(document).on('click', '#dt-popup-container .go-to-options', goToOptions)

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
