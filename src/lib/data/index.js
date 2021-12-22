import faker from 'faker';

faker.seed(999);

export const optionsDefaultStatic = new Array(20)
  .fill(null)
  .map((item, index) => ({ value: index, label: `label ${index}` }));

export const defaultValueStatic = optionsDefaultStatic[0];

export const optionsDefault = new Array(20).fill(null).map(() => ({
  value: faker.random.uuid(),
  label: `${faker.name.firstName()} - ${faker.internet.email()}`,
  lang: faker.address.country(),
}));

export const defaultValue = { ...optionsDefault[faker.random.number(19)] };

const guid = faker.random.uuid();

export const buildOptionsSize = (size) =>
  new Array(Math.round(size)).fill(null).map((item, index) => ({
    value: `${guid}-${index}`,
    label: `${faker.name.firstName()} - ${index} - ${faker.internet.email()}`,
    lang: faker.address.country(),
  }));

export const op50 = buildOptionsSize(50);
export const op100 = buildOptionsSize(100);
export const op300 = buildOptionsSize(300);
export const op500 = buildOptionsSize(500);
export const op800 = buildOptionsSize(800);
export const op1000 = buildOptionsSize(1000);
export const op1500 = buildOptionsSize(1500);
export const ops2500 = buildOptionsSize(2500);
export const ops4500 = buildOptionsSize(4500);
export const ops6000 = buildOptionsSize(6000);
export const ops8000 = buildOptionsSize(8000);
export const ops10500 = buildOptionsSize(10500);
export const group1 = buildOptionsSize(40);
export const group2 = buildOptionsSize(40);
export const group3 = buildOptionsSize(40);
export const group4 = buildOptionsSize(40);
export const group5 = buildOptionsSize(40);
export const group6 = buildOptionsSize(40);
export const group7 = buildOptionsSize(40);
export const group8 = buildOptionsSize(40);

export const opsGroup = [
  { label: `Group ${faker.name.firstName()}`, options: group1 },
  { label: `Group ${faker.name.firstName()}`, options: group2 },
  { label: `Group ${faker.name.firstName()}`, options: group3 },
  { label: `Group ${faker.name.firstName()}`, options: group4 },
  { label: `Group ${faker.name.firstName()}`, options: group5 },
  { label: `Group ${faker.name.firstName()}`, options: group6 },
  { label: `Group ${faker.name.firstName()}`, options: group7 },
  { label: `Group ${faker.name.firstName()}`, options: group8 },
];

export const opsGroup20000 = [
  { label: `Group ${faker.name.firstName()}`, options: ops2500 },
  { label: `Group ${faker.name.firstName()}`, options: ops2500 },
  { label: `Group ${faker.name.firstName()}`, options: ops2500 },
  { label: `Group ${faker.name.firstName()}`, options: ops2500 },
  { label: `Group ${faker.name.firstName()}`, options: ops2500 },
  { label: `Group ${faker.name.firstName()}`, options: ops2500 },
  { label: `Group ${faker.name.firstName()}`, options: ops2500 },
  { label: `Group ${faker.name.firstName()}`, options: ops2500 },
];

export const opsGroupF = () => [
  { label: `Group ${faker.name.firstName()}`, options: group1 },
  { label: `Group ${faker.name.firstName()}`, options: group2 },
  { label: `Group ${faker.name.firstName()}`, options: group3 },
  { label: `Group ${faker.name.firstName()}`, options: group4 },
  { label: `Group ${faker.name.firstName()}`, options: group5 },
  { label: `Group ${faker.name.firstName()}`, options: group6 },
  { label: `Group ${faker.name.firstName()}`, options: group7 },
  { label: `Group ${faker.name.firstName()}`, options: group8 },
];
