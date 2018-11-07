import React from 'react';
import expect from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { App } from './App.jsx';

Enzyme.configure({
    adapter: new Adapter()
});

function setup() {
    const props = {};
    return shallow(<App {...props} />).dive();
}

describe('<App />', () => {
    it('renders div', () => {
        const wrapper = setup();
        let div = wrapper.find('div');
        expect(div.length).toBe(1);
    });
});
