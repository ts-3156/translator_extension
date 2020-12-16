import {Preferences} from './preferences'
import {I18n} from './i18n'

function updateUILabels() {
  const pref = new Preferences()
  const i18n = new I18n(pref.language())

  $('#language-title').text(i18n.t('options', 'language'))
  $('#license-key-title').text(i18n.t('options', 'license_key'))
  $('#license-key-help').text(i18n.t('options', 'license_key_help'))
  $('#support-link').text(i18n.t('options', 'support'))
  $('#privacy-policy-link').text(i18n.t('options', 'privacy_policy'))
  $('#terms-of-service-link').text(i18n.t('options', 'terms_of_service'))
  $('#plan-title').text(i18n.t('options', 'plan_title'))
  $('#plan-description').text(i18n.t('options', 'plan_description'))

  $('#free-price-amount').text(i18n.t('options', 'free_price_amount'))
  $('#free-price-description').text(i18n.t('options', 'free_price_description'))
  $('#free-features').text(i18n.t('options', 'free_features'))
  $('#free-characters-per-translation').text(i18n.t('options', 'free_characters_per_translation'))
  $('#free-characters-per-month').text(i18n.t('options', 'free_characters_per_month'))
  $('#free-button').text(i18n.t('options', 'free_button'))
  $('#free-link').text(i18n.t('options', 'free_link'))

  $('#pro-price-amount').text(i18n.t('options', 'pro_price_amount'))
  $('#pro-price-description').text(i18n.t('options', 'pro_price_description'))
  $('#pro-features').text(i18n.t('options', 'free_features'))
  $('#pro-characters-per-translation').text(i18n.t('options', 'pro_characters_per_translation'))
  $('#pro-characters-per-month').text(i18n.t('options', 'pro_characters_per_month'))
  $('#pro-button').text(i18n.t('options', 'pro_button'))
  $('#pro-link').text(i18n.t('options', 'pro_link'))

  $('#source-language-title').text(i18n.t('options', 'source_language'))
  $('#target-language-title').text(i18n.t('options', 'target_language'))
  $('#save-histories-title').text(i18n.t('options', 'save_histories'))

  $('label[for=\'save-histories-select\']').text(i18n.t('options', 'save_histories'))

  $('#website').text(i18n.t('options', 'website'))
  $('#sign-in').text(i18n.t('options', 'sign_in'))
  $('#save').text(i18n.t('options', 'save'))
  $('#restore').text(i18n.t('options', 'restore'))

  $('#language-select option').each(function () {
    const $opt = $(this)
    $opt.text(i18n.t($opt.attr('value')))
  })

  $('#source-language-select option').each(function () {
    const $opt = $(this)
    $opt.text(i18n.t($opt.attr('value')))
  })

  $('#target-language-select option').each(function () {
    const $opt = $(this)
    $opt.text(i18n.t($opt.attr('value')))
  })

  $('#save-histories-select option').each(function () {
    const $opt = $(this)
    $opt.text(i18n.t('options', $opt.attr('value')))
  })

  $('#save-histories-help').text(i18n.t('options', 'save_histories_help'))
}

function setValues() {
  const pref = new Preferences()
  setValue('language-select', pref.language())
  setValue('license-key-input', pref.licenseKey())
  setValue('source-language-select', pref.sourceLanguage())
  setValue('target-language-select', pref.targetLanguage())
  setValue('save-histories-select', pref.saveHistories())
}

function setValue(id, value) {
  const $elem = $('#' + id)
  if ($elem.get(0).tagName === 'SELECT') {
    $elem.find('option[value="' + value + '"]').prop('selected', true)
  } else if ($elem.get(0).tagName === 'INPUT') {
    $elem.val(value)
  }
}

function getValue(id) {
  const $elem = $('#' + id)
  if ($elem.get(0).tagName === 'SELECT') {
    return $elem.val()
  } else if ($elem.get(0).tagName === 'INPUT') {
    return $elem.val()
  }
}

function saveLanguage() {
  const pref = new Preferences()
  pref.language(getValue('language-select'))
}

function saveLicenseKey() {
  const pref = new Preferences()
  pref.licenseKey(getValue('license-key-input'))
}

function saveSourceLanguage() {
  const pref = new Preferences()
  pref.sourceLanguage(getValue('source-language-select'))
}

function saveTargetLanguage() {
  const pref = new Preferences()
  pref.targetLanguage(getValue('target-language-select'))
}

function updateUI(callback) {
  setValues()
  updateUILabels()

  getProfile(function () {
    if (callback) {
      callback()
    }
  }, function () {
    if (callback) {
      callback()
    }
  })
}

function getProfile(done, fail) {
  chrome.identity.getAuthToken({interactive: true}, function (token) {
    const init = {
      method: 'GET',
      async: true,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      'contentType': 'json'
    }
    fetch('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + token, init)
      .then(function (res) {
        if (res.status === 200) {
          res.json().then(done)
        } else {
          if (fail) {
            fail()
          }
        }
      })
  })
}

$(function () {
  updateUI(function () {
    $('#main-content').show()
  })

  $('#website').on('click', function () {
    chrome.tabs.create({url: process.env.WEBSITE_URL})
  })

  $('#language-select').on('change', function () {
    saveLanguage()
    updateUI()
  })

  $('#license-key-input').on('blur', function () {
    saveLicenseKey()
    $('#license-key-status').text('Saved').fadeIn('slow').delay(1000).fadeOut()
  })

  $('#free-button').on('click', function () {
    window.location.href = process.env.WEBSITE_URL + '?via=free_button'
    return false
  })

  $('#free-link').on('click', function () {
    window.location.href = process.env.WEBSITE_URL + '?via=free_link'
    return false
  })

  $('#pro-button').on('click', function () {
    window.location.href = process.env.WEBSITE_URL + '?via=pro_button'
    return false
  })

  $('#pro-link').on('click', function () {
    window.location.href = process.env.WEBSITE_URL + '?via=pro_link'
    return false
  })

  $('#source-language-select').on('change', function () {
    saveSourceLanguage()
    $('#source-language-status').text('Saved').fadeIn('slow').delay(1000).fadeOut()
  })

  $('#target-language-select').on('change', function () {
    saveTargetLanguage()
    $('#target-language-status').text('Saved').fadeIn('slow').delay(1000).fadeOut()
  })

  $('#restore').on('click', function () {
    new Preferences().clear()
    updateUI()
    $('#status').text('Restored').fadeIn('slow').delay(1000).fadeOut()
    return false
  })
})
