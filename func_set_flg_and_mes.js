var langname = {
    'af':'アフリカーンス','ar':'アラビア','az':'アゼルバイジャン',
    'ba':'バシキール','be':'ベラルーシ','bg':'ブルガリア',
    'bn':'ベンガル','bs':'ボスニア',
    'ca':'カタルーニャ（カタロニア）','cs':'チェコ','cv':'チュヴァシ',
    'da':'デンマーク','de':'ドイツ',
    'el':'ギリシャ','en':'英','eo':'エスペラント',
    'es':'スペイン','et':'エストニア','eu':'バスク',
    'fa':'ペルシア','fi':'フィンランド','fr':'フランス',
    'ga':'アイルランド','gu':'グジャラート',
    'he':'ヘブライ','hi':'ヒンディ','hr':'クロアチア',
    'ht':'ハイチ','hu':'ハンガリー','hy':'アルメニア',
    'id':'インドネシア','is':'アイスランド','it':'イタリア',
    'ja':'日本',
    'ka':'ジョージア（グルジア）','kk':'カザフ','km':'中央クメール',
    'ko':'韓国・朝鮮','ku':'クルド','ky':'キルギス',
    'lt':'リトアニア','lv':'ラトビア',
    'ml':'マラヤーラム','mn':'モンゴル',
    'ms':'マレー','mt':'マルタ',
    'nb':'(ブークモール)ノルウェー','nl':'オランダ','nn':'(ニーノシュク)ノルウェー',
    'pa':'パンジャーブ','pl':'ポーランド','ps':'パシュトー',
    'pt':'ポルトガル',
    'ro':'ルーマニア・モルドバ','ru':'ロシア',
    'sk':'スロバキア','sl':'スロベニア',
    'so':'ソマリ','sq':'アルバニア',
    'sr':'セルビア','sv':'スウェーデン',
    'ta':'タミール','te':'テルグ','th':'タイ',
    'tr':'トルコ','uk':'ウクライナ','ur':'ウルドゥー',
    'vi':'ベトナム',
    'zh':'中国','zh-TW':'繁体字中国'
};

var msgtemp ,msgtemp2, swflag;

if (msg.tweet.user.screen_name !== 'igibmswtest') {
    msgtemp = '@' + msg.tweet.user.screen_name + ' こんにちは！';
}
    msg.params = {in_reply_to_status_id:msg.tweet.id_str};


if (msg.lang.language in langname === false) {
    msg.mydetect = msgtemp + "ごめんなさい、どこの言葉かわかりませんでした。";
    msg.myflg = -1;
    return msg;
}

var translatable_to_en = [
    'ar', 'bg', 'cs', 'da', 'de', 'el', 'es', 'et',
    'fi', 'fr', 'he', 'hi', 'hr', 'hu', 'it', 'ja', 'ko',
    'nb', 'nl', 'pt', 'pl', 'ro', 'ru', 'sk', 'sl', 'sv',
    'tr', 'zh', 'zh-TW'
];
var do_translate_to_en = [
    'ja', 'ru', 'tr', 'zh', 'zh-TW',
//test new languages
    'bg', 'et'
];
var translatable_to_ja = ['en'];

if (msg.lang.confidence >= 0.9)  {
    msgtemp += "きっと"; 
    msgtemp2 = "語だよ！"; 
} else if (msg.lang.confidence >= 0.6) {
    msgtemp += "たぶん"; 
    msgtemp2 = "語かなぁ。"; 
} else if (msg.lang.confidence >= 0.3) {
    msgtemp += "もしかしたら";
    msgtemp2 = "語かも。"; 
} else {
    msgtemp += "ひょっとして"
    msgtemp2 = "語かも？";
}

msgtemp += langname[msg.lang.language] + msgtemp2 ;

if (msg.lang.confidence >= 0.3) {
    if (translatable_to_ja.indexOf(msg.lang.language) >= 0) {
        msgtemp += "日本語へ翻訳してみた→";
        swflag = 1;
    } else if (translatable_to_en.indexOf(msg.lang.language) >= 0) {
        if (do_translate_to_en.indexOf(msg.lang.language) >= 0) {
            msgtemp += "英語へ翻訳できます→";
            swflag = 2;
        } else {
            msgtemp += "英語へ翻訳できますが、今はテスト対象外です。";
            swflag = -1;
        }
    } else {
        msgtemp += "残念ながら翻訳対象外でした。";
        swflag = -1;
    }
} else {
    msgtemp += "他にも試してみてね。";
    swflag = -1;
}

msg.lang.mydetect = msgtemp;
msg.lang.myflg = swflag;
return msg;