export default function createInt8TypedArray(length, position, value) {
  if (position < 0 || position >= length) {
    throw new Error('Position outside range');
  }

  const dataBlock = new ArrayBuffer(length);
  const dataView = new DataView(dataBlock);
  dataView.setInt8(position, value);
  return dataView;
}
