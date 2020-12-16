const values = {
  en: {
    automatic: 'Automatic',
    extension_options: 'Extension Options',
    extension_website: 'Open website',
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
      account: 'Account',
      sign_out: 'Sign out',
      license_key: 'License key',
      license_key_help: 'If you have already purchased the subscription, please enter the key.',
      support: 'Support account',
      privacy_policy: 'Privacy policy',
      terms_of_service: 'Terms of service',
      plan_title: 'Plan',
      plan_description: 'You are using the free version of Deep Translator.',
      free_price_amount: '$0',
      free_price_description: 'per person, per month, when billed monthly',
      free_features: 'Top features :',
      free_characters_per_translation: '250 characters per translation',
      free_characters_per_month: '10,000 characters per month',
      free_button: 'Get free license',
      free_link: 'Learn more',
      pro_price_amount: '$5',
      pro_price_description: 'per person, per month, when billed monthly',
      pro_features: 'Top features :',
      pro_characters_per_translation: 'Unlimited characters per translation',
      pro_characters_per_month: 'Unlimited characters per month',
      pro_button: 'Upgrade',
      pro_link: 'Learn more',
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
    }
  },
  ja: {
    automatic: '自動検出',
    extension_options: '拡張機能オプション',
    extension_website: 'Webサイトを開く',
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
      account: 'アカウント',
      sign_out: 'ログアウト',
      license_key: 'ライセンス キー',
      license_key_help: 'サブスクリプションを購入済みの場合は、ライセンス キーを入力してください。',
      support: 'サポートアカウント',
      privacy_policy: 'プライバシーポリシー',
      terms_of_service: '利用規約',
      plan_title: 'プラン',
      plan_description: '無料版の Deep Translator を利用中です。',
      free_price_amount: '¥0',
      free_price_description: '1人あたり、毎月、月契約の価格',
      free_features: 'プランの特徴 :',
      free_characters_per_translation: '250文字 / 翻訳',
      free_characters_per_month: '10,000文字 / 1ヶ月',
      free_button: '無料ライセンス',
      free_link: 'もっと詳しく',
      pro_price_amount: '¥500',
      pro_price_description: '1人あたり、毎月、月契約の価格',
      pro_features: 'プランの特徴 :',
      pro_characters_per_translation: '無制限の文字数 / 翻訳',
      pro_characters_per_month: '無制限の文字数 / 1ヶ月',
      pro_button: 'アップグレード',
      pro_link: 'もっと詳しく',
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
