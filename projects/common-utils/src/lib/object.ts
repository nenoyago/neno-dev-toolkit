export function areObjectsEqual(obj1: object, obj2: object) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (
      (obj1 as { [key: string]: unknown })[key] !==
      (obj2 as { [key: string]: unknown })[key]
    ) {
      return false;
    }
  }

  return true;
}
