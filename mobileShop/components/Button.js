/**
 * Created by liuzhengdong on 2016/11/10.
 */
import React from 'react'
import PureRenderMixin from 'rc-util/lib/PureRenderMixin'
import classNames from 'classnames'
import './less/button.less'

class Button extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      focused: false,
      clicked: false,
      activeClick: null
    };
  }

  shouldComponentUpdate (...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  doClick (e) {
    if (this.state.activeClick) {
      clearTimeout(this.state.activeClick)
      this.setState({ activeClick: null })
    }
    this.setState({
      clicked: true,
      activeClick: setTimeout(() => {
        this.setState({ clicked: false, activeClick: null })
      }, 100)
    })
    this.props.onClick({
      stopPropagation() {
        e.stopPropagation();
      },
      preventDefault() {
        e.preventDefault();
      },
    })
  }

  render () {
    const props = { ...this.props };
    const state = this.state;
    const className = classNames({
      ['zd_btn']: true,
      [`${props.className}`]: !!props.className,
      [`zd_btn_${props.size}`]: props.size,
      ['zd_btn_clicked']: state.clicked,
      ['zd_btn_disabled']: props.disabled
    });
    return (
      <button
        type="button"
        className={className}
        disabled={props.disabled}
        style={props.style}
        onClick={this.doClick.bind(this)}
      >
        <span>{props.children || '按钮'}</span>
      </button>
    )
  }
}

Button.propTypes = {
  onClick: React.PropTypes.func,
  className: React.PropTypes.string,
  icon: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  inline: React.PropTypes.bool,
  size: React.PropTypes.string,
  style: React.PropTypes.object,
}
Button.defaultProps = {
  onClick: () => {
  },
  className: '',
  icon: '',
  inline: false,
  disabled: false,
  size: '', // 通过设置 size 为 large small
  style: {},
}
export default Button