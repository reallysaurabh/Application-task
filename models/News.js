var mongoose = require("mongoose");

var NewsSchema = new mongoose.Schema({
    keyword: String,
    author: String,
    title: String,
    description: String,
    publishedAt: Date,
    source: Object
});

module.exports = mongoose.model('News', NewsSchema);


// { status: 'ok',
//     totalResults: 36569,
//     articles:
//     [ { source: [Object],
//         author: 'ergrgergreg',
//         title: 'Bitcoin SuPpOrt 18005716109 Bitcoin',
//         description: 'Bitcoin SuPpOrt 18005716109 Bitcoin - posted in Windows 10 Support: Bitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nB…',
//         url: 'https://www.bleepingcomputer.com/forums/t/673721/bitcoin-support-18005716109-bitcoin/',
//         urlToImage: 'https://www.bleepingcomputer.com/forums/public/style_images/master/meta_image.png',
//         publishedAt: '2018-03-21T15:46:13Z' },
//         { source: [Object],
//             author: 'ergrgergreg',
//             title: 'Bitcoin PhOne 18005716109 number usa',
//             description: 'Bitcoin PhOne 18005716109 number usa - posted in Windows 10 Support: Bitcoin PhOne 18005716109 number usa\nBitcoin PhOne 18005716109 number usa\n \nBitcoin PhOne 18005716109 number usa\n \nBitcoin PhOne 18005716109 number usa\nBitcoin PhOne 18005716109 number usa\nB…',
//             url: 'https://www.bleepingcomputer.com/forums/t/673724/bitcoin-phone-18005716109-number-usa/',
//             urlToImage: 'https://www.bleepingcomputer.com/forums/public/style_images/master/meta_image.png',
//             publishedAt: '2018-03-21T15:48:33Z' },
//         { source: [Object],
//             author: 'ergrgergreg',
//             title: 'Bitcoin SuPpOrt 18005716109 number',
//             description: 'Bitcoin SuPpOrt 18005716109 number - posted in Windows 10 Support: Bitcoin SuPpOrt 18005716109 number\n \nBitcoin SuPpOrt 18005716109 number\nBitcoin SuPpOrt 18005716109 number\n \nBitcoin SuPpOrt 18005716109 number\n \nBitcoin SuPpOrt 18005716109 number\n \nBitcoin S…',
//             url: 'https://www.bleepingcomputer.com/forums/t/673722/bitcoin-support-18005716109-number/',
//             urlToImage: 'https://www.bleepingcomputer.com/forums/public/style_images/master/meta_image.png',
//             publishedAt: '2018-03-21T15:46:57Z' },
//         { source: [Object],
//             author: null,
//             title: 'Bitcoin: Master Bitcoin Today With Certified Bitcoin Pro',
//             description: '',
//             url: 'http://feedproxy.google.com/~r/avaxhome/bojL/~3/tLYLSYq8_5U/naag27574.html',
//             urlToImage: null,
//             publishedAt: '2018-04-13T00:46:59Z' },
//         { source: [Object],
//             author: null,
//             title: 'Bitcoin: Master Bitcoin Today With Certified Bitcoin Pro',
//             description: '',
//             url: 'http://feedproxy.google.com/~r/avaxhome/wkEo/~3/tLYLSYq8_5U/naag27574.html',
//             urlToImage: null,
//             publishedAt: '2018-04-13T00:46:59Z' },
//
