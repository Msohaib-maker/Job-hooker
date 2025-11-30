export function handleDataBaseInsertion(
  fn: (...args: any[]) => void,
  errFn: (ex: any) => void
): void {
  try {
    fn();
  } catch (ex) {
    errFn(ex);
  }
}
