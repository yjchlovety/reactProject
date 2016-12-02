/**
 * Created by liuzhengdong on 2016/11/13.
 */
import React from 'react'
import PureRenderMixin from 'rc-util/lib/PureRenderMixin'
import './less/loading.less'
class Loading extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      activeClick: null
    };
  }

  shouldComponentUpdate (...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  checkShow (v) {
    return { display: v ? 'block' : '' }
  }

  render () {
    const props = { ...this.props };
    const style1 = this.checkShow(props.state)
    const style2 = this.checkShow(props.mask)
    const style3 = this.checkShow(props.loadWords)
    return (
      <div className={this.props.isFixed ? 'zd_loading fix_load' : 'zd_loading' } style={style1}>
        <div className="zd_load_mark" style={style2}/>
        <div className="zd_load_center">
          <div className="zd_load_dot">
            <i/><i/><i/><i/>
          </div>
          <div className="zd_load_words" style={style3}>{props.loadWords}</div>
        </div>
      </div>
    )
  }
}
Loading.propTypes = {
  state: React.PropTypes.bool,
  mask: React.PropTypes.bool, //遮罩
  loadWords: React.PropTypes.string, //遮罩
  isFixed: React.PropTypes.bool // 是否fix 定位
}
Loading.defaultProps = {
  state: false,
  mask: false,
  loadWords: '',
  isFixed: false
}
export default Loading