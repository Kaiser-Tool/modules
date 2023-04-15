this.config = {
    name: 'checkdomain',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'HuyKaiser',
    description: 'Check Domain',
    commandCategory: 'Tiện ích',
    usages: ['checkdomain <domain>'],
    cooldowns: 3
};

const axios = require('axios');

this.run = async function({ api, args, event }) {
    const domain = args[0];
    const threadID = event.threadID;
    const messageID = event.messageID;

    if (!domain) {
        return api.sendMessage(`Vui lòng nhập tên miền cần kiểm tra\n Ví dụ: .checkdomain + tên miền`, threadID, messageID);
    }

    try {
        const response = await axios.get(`https://api.huykaiser.me/check-domain?domain=${domain}`);
        const status = response.data.status;
        let message = '';
        {
            message = `Domain Của Bạn Đã [ ${status} ]`;
        }
        return api.sendMessage(message, threadID, messageID);
    } catch (error) {
        console.log(error);
        return api.sendMessage('Có lỗi xảy ra khi xử lý yêu cầu của bạn', threadID, messageID);
    }
};
