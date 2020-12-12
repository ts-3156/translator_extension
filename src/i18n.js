const values = {
  en: {
    automatic: 'Automatic',
    extension_options: 'Extension Options',
    extension_web: 'Open website',
    de: 'German',
    en: 'English',
    fr: 'French',
    es: 'Spanish',
    it: 'Italian',
    ja: 'Japanese',
    nl: 'Dutch',
    pl: 'Polish',
    pt: 'Portuguese',
    'pt-br': 'Brazilian Portuguese',
    'pt-pt': 'European Portuguese',
    ru: 'Russian',
    ch: 'Chinese',
    options: {
      language: 'UI language',
      source_language: 'Source language',
      target_language: 'Target language',
      save_histories: 'Save histories',
      send_anonymous_data: 'Send your anonymous usage data',
      save_histories_help: 'If \'yes\' is selected, your translation history will be saved on your browser.',
      send_anonymous_data_help: 'If \'yes\' is selected, only the number of translation events will be sent to Google analytics.',
      yes: 'Yes',
      no: 'No',
      save: 'Save',
      restore: 'Restore Defaults',
    }
  },
  ja: {
    automatic: '自動検出',
    extension_options: '拡張機能オプション',
    extension_web: 'Webサイトで見る',
    de: 'ドイツ語',
    en: '英語',
    fr: 'フランス語',
    es: 'スペイン語',
    it: 'イタリア語',
    ja: '日本語',
    nl: 'オランダ語',
    pl: 'ポーランド語',
    pt: 'ポルトガル語',
    'pt-br': 'ブラジルポルトガル語',
    'pt-pt': 'イベリアポルトガル語',
    ru: 'ロシア語',
    ch: '中国語',
    options: {
      language: 'UIの言語',
      source_language: '翻訳前の言語',
      target_language: '翻訳後の言語',
      save_histories: '履歴を保存する',
      send_anonymous_data: '匿名の統計情報を送信する',
      save_histories_help: '\'はい\' を選択すると、翻訳履歴がブラウザに保存されます。',
      send_anonymous_data_help: '\'はい\' を選択すると、翻訳イベントの数のみをGoogle Analyticsに送信します。',
      yes: 'はい',
      no: 'いいえ',
      save: '変更を保存する',
      restore: 'デフォルトを復元する',
    }
  }
}

export class I18n {
  constructor(language) {
    this.language = language
  }

  t(key) {
    let text
    try {
      if (arguments.length === 2) {
        text = values[this.language][arguments[0]][arguments[1]]
      } else {
        text = values[this.language][key]
      }
    } catch (e) {
      text = 'translation missing: ' + this.language + '.' + key
    }
    return text
  }
}
