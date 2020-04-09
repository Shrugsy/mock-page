import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
console.log('Setting up test config...')

// configure enzyme for react 16
Enzyme.configure({ adapter: new Adapter() });

// this regex matches any js files ending with .spec.js with /src folder
const context = require.context('./src', true, /\.spec\.js$/);
context.keys().forEach(context);