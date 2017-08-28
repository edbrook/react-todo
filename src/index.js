import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LocalStorage from './LocalStorage';
import Todo from './Todo';
import registerServiceWorker from './registerServiceWorker';

const dataSource = new LocalStorage("todo__");

ReactDOM.render(<Todo dataSource={dataSource}/>, document.getElementById('root'));
registerServiceWorker();

// if (module.hot) {
//   module.hot.accept()
// }