import React from 'react';
import expect from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App.jsx';

Enzyme.configure({
    adapter: new Adapter()
});

function setup() {
    const props = {};
    return shallow(<App {...props} />);
}

describe('<App />', () => {
    it('renders h1', () => {
        const wrapper = setup();
        let h1 = wrapper.find('h1');
        expect(h1.length).toBe(1);
        expect(h1.text()).toEqual('This is the app...');
    });
});

