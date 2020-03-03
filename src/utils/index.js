function convertBase64toBinary(str) {
  return Buffer.from(str, 'base64');
}

function convertBinarytoBase64(buffer) {
  return buffer.toString('base64');
}

module.exports = {
  convertBase64toBinary,
  convertBinarytoBase64,
};
