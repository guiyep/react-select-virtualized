import defaultSelect, { Select, Async, Creatable } from './index';

describe('exports expected', () => {
  it('packages available', () => {
    expect(defaultSelect).toStrictEqual(Select);
    expect(Select).toBeDefined();
    expect(Async).toBeDefined();
    expect(Creatable).not.toBeDefined();
  });
});
