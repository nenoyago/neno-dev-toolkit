import { SafeTransformPipe } from './safe-transform.pipe';

describe('SafeTransformPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeTransformPipe({} as any);
    expect(pipe).toBeTruthy();
  });
});
