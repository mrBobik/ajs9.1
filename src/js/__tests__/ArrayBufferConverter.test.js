import ArrayBufferConverter from '../ArrayBufferConverter';

function getBuffer() {
  const data = '{"data":{"user":{"id":1,"name":"Boomer","level":10}}}';
  return ((input) => {
    const buffer = new ArrayBuffer(data.length * 2);
    const bufferView = new Uint16Array(buffer);
    for (let i = 0; i < input.length; i += 1) {
      bufferView[i] = input.charCodeAt(i);
    }
    return buffer;
  })(data);
}

test('ArrayBufferConverter 1', () => {
  const converter = new ArrayBufferConverter();
  expect(() => converter.toString()).toThrow('Данные не установлены.');
});

test('ArrayBufferConverter 2', () => {
  const data = getBuffer();

  const converter = new ArrayBufferConverter();
  converter.load(data);

  expect(converter.toString()).toEqual('{"data":{"user":{"id":1,"name":"Boomer","level":10}}}');
});
