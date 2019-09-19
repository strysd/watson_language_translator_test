msg.payload = msg.lang.mydetect + msg.payload;
if (msg.payload.length > 200) {
    msg.payload = msg.payload.substr(0, 200) + ' (以下略)';
}
return msg;