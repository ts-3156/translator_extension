import {Preferences} from './preferences'
import {I18n} from './i18n'

function licenseKeyDescription() {
  const pref = new Preferences()
  const i18n = new I18n(pref.language())
  const key = pref.licenseKey()
  let text

  if (!key) {
    text = i18n.t('options.license_key_description_unknown')
  } else if (key.match(/^lk_pro_/)) {
    text = i18n.t('options.license_key_description_pro')
  } else if (key.match(/^lk_free_/)) {
    text = i18n.t('options.license_key_description_free')
  } else if (key.match(/^lk_trial_/)) {
    text = i18n.t('options.license_key_description_trial')
  } else {
    text = i18n.t('options.license_key_description_unknown')
  }

  return text
}

function updateUILabels() {
  const pref = new Preferences()
  const i18n = new I18n(pref.language())

  $('#language-title').text(i18n.t('options.language'))
  $('#license-key-title').text(i18n.t('options.license_key'))
  $('#license-key-description').html(licenseKeyDescription())
  $('#license-key-help').html(i18n.t('options.license_key_help'))
  $('#pricing-plans-link').text(i18n.t('options.pricing_plans'))
  $('#support-link').text(i18n.t('options.support_account'))
  $('#privacy-policy-link').text(i18n.t('options.privacy_policy'))
  $('#terms-of-service-link').text(i18n.t('options.terms_of_service'))
  $('#source-language-title').text(i18n.t('options.source_language'))
  $('#target-language-title').text(i18n.t('options.target_language'))
  $('#save-histories-title').text(i18n.t('options.save_histories'))

  $('label[for=\'save-histories-select\']').text(i18n.t('options.save_histories'))

  $('#website').text(i18n.t('options.website'))
  $('#sign-in').text(i18n.t('options.sign_in'))
  $('#save').text(i18n.t('options.save'))
  $('#restore').text(i18n.t('options.restore'))

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
    $opt.text(i18n.t('options.' + $opt.attr('value')))
  })

  $('#save-histories-help').text(i18n.t('options.save_histories_help'))
}

function setTagValues() {
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
    $elem.find('option[value="' + value + '"]').prop('selected', true).attr('selected', true)
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
  const value = getValue('license-key-input')
  if (value && (value.match(/^lk_(trial|free|pro)_/))) {
    const pref = new Preferences()
    pref.licenseKey(value)
    return true
  } else {
    return false
  }
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
  setTagValues()
  updateUILabels()
  if (callback) {
    callback()
  }
}

function testLicenseKey(done, fail) {
  const pref = new Preferences()

  if (!pref.licenseKey()) {
    fail()
    return
  }

  if (pref.licenseKey().match(/^lk_trial/)) {
    if (pref.licenseKey() === pref.originalTrialKey()) {
      done()
    } else {
      fail()
    }
    return
  }

  getProfile(function (data) {
    getLicenseKeyType(data.id, pref.licenseKey(), done, fail)
  }, fail)
}

function getLicenseKeyType(id, key, done, fail) {
  const init = {
    method: 'GET',
    async: true,
    headers: {
      'Content-Type': 'application/json'
    },
    'contentType': 'json'
  }
  const url = process.env.TRANSLATION_API_URL + '/api/licenses' + '?id=' + id + '&key=' + key
  fetch(url, init)
    .then(function (res) {
      if (res.status === 200) {
        res.json().then(done)
      } else {
        if (fail) {
          fail()
        }
      }
    })
}

function getProfile(done, fail) {
  chrome.identity.getAuthToken({interactive: false}, function (token) {
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

function showStatus(id, options) {
  let category
  if (options['category'] === 'primary') {
    category = 'text-primary'
  } else if (options['category'] === 'danger') {
    category = 'text-danger'
  }
  $('#' + id).removeClass('text-primary').removeClass('text-danger').addClass(category).text(options['text']).fadeIn('slow').delay(2000).fadeOut()
}

function signIn() {
  window.location.href = process.env.WEBSITE_URL
  return false
}

setTimeout(function () {
  document.getElementById('main-content').style.display = 'block'
}, 1000)

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
    const pref = new Preferences()
    const i18n = new I18n(pref.language())

    if (saveLicenseKey()) {
      testLicenseKey(function () {
        showStatus('license-key-status', {category: 'primary', text: i18n.t('options.test_connection_succeeded')})
      }, function () {
        showStatus('license-key-status', {category: 'danger', text: i18n.t('options.test_connection_failed')})
      })
    } else {
      showStatus('license-key-status', {category: 'danger', text: i18n.t('options.invalid_key_format')})
    }
  })

  $('#source-language-select').on('change', function () {
    saveSourceLanguage()
    showStatus('source-language-status', {category: 'primary', text: 'Saved'})
  })

  $('#target-language-select').on('change', function () {
    saveTargetLanguage()
    $('#target-language-status').text('Saved').fadeIn('slow').delay(1000).fadeOut()
  })

  $('#restore').on('click', function () {
    new Preferences().clear()
    updateUI()
    showStatus('restore-status', {category: 'primary', text: 'Restored'})
    return false
  })

  $(document).on('click', '.sign-in', function () {
    return signIn()
  })

  $('#pricing-plans-link').on('click', function () {
    window.location.href = process.env.WEBSITE_URL + '?via=pricing_plans'
    return false
  })

  $('#support-link').on('click', function () {
    window.location.href = 'https://twitter.com/deeptranslator'
    return false
  })

  $('#privacy-policy-link').on('click', function () {
    window.location.href = process.env.WEBSITE_URL + '?via=privacy_policy'
    return false
  })

  $('#terms-of-service-link').on('click', function () {
    window.location.href = process.env.WEBSITE_URL + '?via=terms_of_service'
    return false
  })
})
