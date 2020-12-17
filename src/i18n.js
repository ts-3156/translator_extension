const values = {
  en: {
    translate: '<span class="clickable">Translate into</span> %{selector}',
    automatic: 'Automatic',
    extension_options: 'Extension Options',
    extension_website: 'Open website',
    de: 'German',
    en: 'English',
    'en-gb': 'British English',
    'en-us': 'American English',
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
    zh: 'Chinese',
    input_text: 'Input text',
    error_text: 'Error message',
    error_message: 'Sorry, an error has occurred. <br><br>If you are using the license key for the trial version, please <a class="sign-in" href="#">sign in</a> and enter the license key for the free version.',
    options: {
      language: 'UI language',
      account: 'Account',
      sign_out: 'Sign out',
      license_key: 'License key',
      license_key_description_unknown: 'Please enter a valid license key. You can get a license for the free version by simply <a class="sign-in" href="#">logging in</a>.',
      license_key_description_free: 'You have entered your license key for <span class="text-primary">the free version</span>. If you want to translation more sentences, please use the professional version.',
      license_key_description_pro: 'You have entered your license key for <span class="text-primary">the professional version</span>.',
      license_key_description_trial: 'You have entered your license key for the trial version. This key can only be used <b>immediately after installation</b>. Please <a class="sign-in" href="#">sign in</a> to get the license key for the free version.',
      license_key_help: 'To get a license key for the free version, please <a class="sign-in" href="#">sign in</a>.',
      pricing_plans: 'Pricing plans',
      support_account: 'Support account',
      privacy_policy: 'Privacy policy',
      terms_of_service: 'Terms of service',
      source_language: 'Source language',
      target_language: 'Target language',
      save_histories: 'Save histories',
      save_histories_help: 'If \'yes\' is selected, your translation history will be saved on your browser.',
      yes: 'Yes',
      no: 'No',
      website: 'Open website',
      website_help: 'If \'yes\' is selected, your translation history will be saved on your browser.',
      sign_in: 'Sign in with Google',
      save: 'Save',
      restore: 'Restore Defaults',
      test_connection_succeeded: 'Test connection succeeded',
      test_connection_failed: 'Test connection failed',
      invalid_key_format: 'Invalid key format'
    }
  },
  ja: {
    translate: '%{selector} <span class="clickable">に翻訳する</span>',
    automatic: '自動検出',
    extension_options: '拡張機能オプション',
    extension_website: 'Webサイトを開く',
    de: 'ドイツ語',
    en: '英語',
    'en-gb': 'イギリス英語',
    'en-us': 'アメリカ英語',
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
    zh: '中国語',
    input_text: '入力したテキスト',
    error_text: 'エラーメッセージ',
    error_message: '申し訳ありません、エラーが起きました。<br><br>トライアル版のライセンス キーをご利用の場合は、<a class="sign-in" href="#">ログイン</a>して無料版のライセンス キーを入力してください。',
    options: {
      language: 'UIの言語',
      account: 'アカウント',
      sign_out: 'ログアウト',
      license_key: 'ライセンス キー',
      license_key_description_unknown: '有効なライセンス キーを入力してください。無料版のライセンスは<a class="sign-in" href="#">ログイン</a>するだけで取得できます。',
      license_key_description_free: '<span class="text-primary">無料版</span> のライセンス キーが入力されています。もっとたくさん翻訳したい場合は、プロフェッショナル版をご利用ください。',
      license_key_description_pro: '<span class="text-primary">プロフェッショナル版</span> のライセンス キーが入力されています。',
      license_key_description_trial: 'トライアル版 のライセンス キーが入力されています。このキーは<b>インストール直後のみ</b>使えます。<a class="sign-in" href="#">ログイン</a>して無料版のキーを取得してください。',
      license_key_help: '無料版のライセンス キーを取得するには、<a class="sign-in" href="#">ログイン</a>してください。',
      pricing_plans: '料金プラン',
      support_account: 'サポートアカウント',
      privacy_policy: 'プライバシーポリシー',
      terms_of_service: '利用規約',
      source_language: '翻訳前の言語',
      target_language: '翻訳後の言語',
      save_histories: '履歴を保存する',
      save_histories_help: '\'はい\' を選択すると、翻訳履歴がブラウザに保存されます。',
      yes: 'はい',
      no: 'いいえ',
      website: 'ウェブサイトを開く',
      sign_in: 'Googleでログイン',
      save: '変更を保存する',
      restore: 'デフォルトを復元する',
      test_connection_succeeded: '有効なキーが入力されました',
      test_connection_failed: '無効なキーが入力されました',
      invalid_key_format: '無効なキーの形式です'
    }
  }
}

export class I18n {
  constructor(language) {
    this.language = language
  }

  t(key, attrs) {
    let text

    try {
      if (key.includes('.')) {
        text = values[this.language][key.split('.')[0]][key.split('.')[1]]
      } else {
        text = values[this.language][key]
      }

      if (attrs) {
        Object.keys(attrs).forEach(function (key) {
          text = text.replace(new RegExp('%{' + key + '}', 'g'), attrs[key])
        })
      }
    } catch (e) {
      console.error(e)
      text = 'translation missing: ' + this.language + '.' + key
    }

    return text
  }
}
