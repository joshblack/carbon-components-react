// import React from 'react';
// import { storiesOf, action } from '@storybook/react';
// import MultiSelect from './MultiSelect';

// const items = [
// {
// id: 'option-1',
// text: 'Option 1',
// },
// {
// id: 'option-2',
// text: 'Option 2',
// },
// {
// id: 'option-3',
// text: 'Option 3',
// },
// {
// id: 'option-4',
// text: 'Option 4',
// },
// ];

// storiesOf('MultiSelect', module)
// .addWithInfo(
// 'default',
// `
// MultiSelect
// `,
// () => (
// <MultiSelect
// items={items}
// itemToString={i => i.text}
// label="Label"
// onChange={action('onChange')}
// />
// )
// )
// .addWithInfo(
// 'inline',
// `
// Inline MultiSelect
// `,
// () => (
// <MultiSelect
// type="inline"
// items={items}
// itemToString={i => i.text}
// label="Label"
// onChange={action('onChange')}
// />
// )
// )
// .addWithInfo(
// 'with pre-selected items',
// `
// MultiSelect with pre-selected items
// `,
// () => (
// <MultiSelect
// label="Label"
// items={items}
// initialSelectedItems={[0, 1]}
// itemToString={i => i.text}
// onChange={action('onChange')}
// />
// )
// );