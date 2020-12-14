import {Preferences} from './preferences'
import {I18n} from './i18n'

function setLabels() {
  const pref = new Preferences()
  const i18n = new I18n(pref.language())

  $('label[for=\'language-select\']').text(i18n.t('options', 'language'))
  $('label[for=\'source-language-select\']').text(i18n.t('options', 'source_language'))
  $('label[for=\'target-language-select\']').text(i18n.t('options', 'target_language'))
  $('label[for=\'save-histories-select\']').text(i18n.t('options', 'save_histories'))
  $('label[for=\'send-anonymous-data-select\']').text(i18n.t('options', 'send_anonymous_data'))

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

  $('#send-anonymous-data-select option').each(function () {
    const $opt = $(this)
    $opt.text(i18n.t('options', $opt.attr('value')))
  })

  $('#save-histories-help').text(i18n.t('options', 'save_histories_help'))
  $('#send-anonymous-data-help').text(i18n.t('options', 'send_anonymous_data_help'))
}

function setValues() {
  const pref = new Preferences()
  setValue('language-select', pref.language())
  setValue('source-language-select', pref.sourceLanguage())
  setValue('target-language-select', pref.targetLanguage())
  setValue('save-histories-select', pref.saveHistories())
  setValue('send-anonymous-data-select', pref.sendAnonymousData())
}

function setValue(id, value) {
  const $elem = $('#' + id)
  $elem.find('option[value="' + value + '"]').prop('selected', true)
}

function getValue(id) {
  const $elem = $('#' + id)
  if ($elem.get(0).tagName === 'SELECT') {
    return $elem.val()
  }
}

function saveOptions() {
  const pref = new Preferences()
  pref.language(getValue('language-select'))
  pref.sourceLanguage(getValue('source-language-select'))
  pref.targetLanguage(getValue('target-language-select'))
  pref.saveHistories(getValue('save-histories-select'))
  pref.sendAnonymousData(getValue('send-anonymous-data-select'))
}

function updateUI() {
  setValues()
  setLabels()
}

function updateProfile(email, picture) {
  $('#profile-email').text(email)
  $('#profile-picture').attr('src', picture).show()
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
          fail()
        }
      })
  })
}

function signIn() {
  getProfile(function (data) {
    updateProfile(data.email, data.picture)
  }, function () {
    chrome.tabs.create({url: process.env.AUTHORIZATION_URL})
  })
}

$(function () {
  updateUI()

  $('#website').on('click', function () {
    chrome.tabs.create({url: process.env.WEBSITE})
  })
  $('#sign-in').on('click', signIn)

  $('#save').on('click', function () {
    saveOptions()
    updateUI()
    $('#status').text('Saved').fadeIn('slow').delay(1000).fadeOut()
    return false
  })

  $('#restore').on('click', function () {
    new Preferences().clear()
    updateUI()
    $('#status').text('Restored').fadeIn('slow').delay(1000).fadeOut()
    return false
  })
})
