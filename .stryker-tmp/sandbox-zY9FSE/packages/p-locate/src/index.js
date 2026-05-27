// @ts-nocheck
// @flupkejs/p-locate
module.exports = async function pLocate(iterable, tester) {
  for (const item of iterable) {
    if (await tester(item)) return item;
  }
};
