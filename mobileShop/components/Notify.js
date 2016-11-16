/**
 * Created by liuzhengdong on 2016/11/14.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Notice from './Notice'
import Confirm from './Confirm'

const Notify = () => {
}
Notify.notice = (arg) => {
  const props = arg || {};
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(<Notice {...props} />, div);
  div.children[ 0 ].style.marginLeft = -div.children[ 0 ].clientWidth / 2 + 'px'
  div.children[ 0 ].style.marginTop = -div.children[ 0 ].clientHeight / 2 + 'px'
  const timing = setTimeout(() => {
    props.onClose && props.onClose()
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  }, props.time || 2000)
}
Notify.confirm = (arg) => {
  const props = arg || {};
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(<Confirm {...props} onClick={() => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    }, 100)
  }}/>, div);
}
export default Notify