import { ObsWithStatusPipe } from './obs-with-status.pipe';

describe('ObsWithStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new ObsWithStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
