import random from 'generate-random-data';

export const optionsDefaultStatic = new Array(20)
  .fill(null)
  .map((item, index) => ({ value: index, label: `label ${index}` }));

export const defaultValueStatic = optionsDefaultStatic[0];

export const optionsDefault = new Array(20).fill(null).map(() => ({
  value: random.guid(),
  label: `${random.maleFirstName()} - ${random.email(`${random.maleFirstName()}.com.au`)}`,
  lang: random.language(),
}));

export const defaultValue = { ...optionsDefault[random.int(1, 19)] };

const guid = random.guid();

export const buildOptionsSize = (size) => {
  return new Array(Math.round(size)).fill(null).map((item, index) => ({
    value: `${guid}-${index}`,
    label: `${random.maleFirstName()} - ${index} - ${random.email(`${random.lower(random.maleFirstName())}.com.au`)}`,
    lang: random.language(),
  }));
};

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
  { label: `Group ${random.maleFirstName()}`, options: group1 },
  { label: `Group ${random.maleFirstName()}`, options: group2 },
  { label: `Group ${random.maleFirstName()}`, options: group3 },
  { label: `Group ${random.maleFirstName()}`, options: group4 },
  { label: `Group ${random.maleFirstName()}`, options: group5 },
  { label: `Group ${random.maleFirstName()}`, options: group6 },
  { label: `Group ${random.maleFirstName()}`, options: group7 },
  { label: `Group ${random.maleFirstName()}`, options: group8 },
];

export const opsGroup20000 = [
  { label: `Group ${random.maleFirstName()}`, options: ops2500 },
  { label: `Group ${random.maleFirstName()}`, options: ops2500 },
  { label: `Group ${random.maleFirstName()}`, options: ops2500 },
  { label: `Group ${random.maleFirstName()}`, options: ops2500 },
  { label: `Group ${random.maleFirstName()}`, options: ops2500 },
  { label: `Group ${random.maleFirstName()}`, options: ops2500 },
  { label: `Group ${random.maleFirstName()}`, options: ops2500 },
  { label: `Group ${random.maleFirstName()}`, options: ops2500 },
];

export const opsGroupF = () => [
  { label: `Group ${random.maleFirstName()}`, options: group1 },
  { label: `Group ${random.maleFirstName()}`, options: group2 },
  { label: `Group ${random.maleFirstName()}`, options: group3 },
  { label: `Group ${random.maleFirstName()}`, options: group4 },
  { label: `Group ${random.maleFirstName()}`, options: group5 },
  { label: `Group ${random.maleFirstName()}`, options: group6 },
  { label: `Group ${random.maleFirstName()}`, options: group7 },
  { label: `Group ${random.maleFirstName()}`, options: group8 },
];

export const simpleDisabledOptions = [{ label: 'Disabled Option', value: null, isDisabled: true }, ...group1]

export const groupedDisabledOptions = [
  { label: `Group ${random.maleFirstName()}`, options: simpleDisabledOptions },
]
