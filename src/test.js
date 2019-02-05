import Select, { Select as SelectFromDes } from './';

describe('Select from default exported', () => {
  it('is truthy', () => {
    expect(Select).toBeTruthy();
  });
});

describe('Select from exports exported', () => {
  it('is truthy', () => {
    expect(SelectFromDes).toBeTruthy();
  });
});
