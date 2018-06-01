export const keyCompare = (a, b) => {
  if (a.key != b.key) return false;
  if (!!a.shift != !!b.shift) return false;
  if (!!a.alt != !!b.alt) return false;
  if (!!a.ctrl != !!b.ctrl) return false;
  return true;

}