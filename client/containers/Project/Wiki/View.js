import React, { PureComponent as Component } from 'react';
import hljs  from 'highlight.js'
import 'highlight.js/styles/github.css';
import { Anchor, Table, Tag } from 'antd';
import './view.scss';
import demoUrl from '../../../images/doc1.png';
import indicatorUrl from '../../../images/doc2.jpg';

const { Link } = Anchor;
const { Column } = Table;
	

export default class WikiView extends Component {
  state = {
    codeList: [
      { code: 200, msg: 'success', desc: '接口调用成功' },
      { cate: true, desc: '系统级别异常' },
      { code: 50001, msg: 'system error', desc: '系统异常，请联系管理员' },
      { code: 50002, msg: 'remote service error	', desc: '服务调用错误' },
      { code: 50003, msg: 'server busy', desc: '服务繁忙，当前请求资源过多，等待排队' },
      { cate: true, desc: '通用提示信息' },
      { code: 41000, msg: 'result empty', desc: '未匹配到符合条件的结果，查询结果为空' },
      { code: 41101, msg: 'miss required parameter', desc: '接口中必填的参数为空' },
      { code: 41102, msg: 'miss user id', desc: '用户标识为空，接口缺少clientid/casId参数' },
      { code: 41201, msg: 'invalid parameter', desc: '接口参数格式内容传递错误。传递的值不符合参数要求，参数值（array）个数超出接口限制，json格式错误' },
      { code: 41202, msg: 'invalid user id', desc: '无效用户，接口传入的clientid/casId不存在' },
      { code: 41203, msg: 'invalid json object format', desc: 'json格式错误，必须是合法的JsonObject格式' },
      { code: 41204, msg: 'invalid json array format', desc: 'json格式错误，必须是合法的JsonArray格式' },
      { code: 41025, msg: 'invalid parameter dataType', desc: '传入的参数数据类型和接口定义不一致' },
      { cate: true, desc: '网关校验' },
      { code: 42001, msg: 'api deined', desc: '接口没有权限调用' },
      { code: 42002, msg: 'call times out of the limit	', desc: '接口调用频次超出购买限制' },
      { code: 42003, msg: 'api expired', desc: '接口购买权限已过期' },
      { code: 42101, msg: 'miss accessToken', desc: 'accessToken 为空' },
      { code: 42201, msg: 'invalid clientId or clientSecret', desc: '不合法的clientId或clientSecret，clientId/clientSecret错误或不存在' },
      { code: 42202, msg: 'invalid accessToken', desc: '不合法的accessToken，accessToken无效或错误' },
      { code: 42203, msg: 'invalid freshToken', desc: '不合法的refreshToken，refreshToken无效或错误' },
      { code: 42204, msg: 'miss clientId', desc: 'clientId为空' },
      { code: 42205, msg: 'miss clientSecret', desc: 'clientSecret为空' },
      { code: 42206, msg: 'miss refreshToken', desc: 'refreshToken为空' },
      { code: 42301, msg: 'require https', desc: '需要使用HTTPS' },
      { code: 42302, msg: 'invalid request method', desc: '请求方式GET/METHOD不符合接口要求' },
      { code: 42401, msg: 'invalid api', desc: 'api接口不存在或者已下线' },
      { code: 42501, msg: 'too many requests', desc: '单接口调用频次超过系统限制（系统内部控制，和购买次数无关）' },
      { code: 42502, msg: 'ip not allowed', desc: '调用接口的IP地址不在允许范围内' },
      { code: 42601, msg: 'duplicate client name', desc: '相同的user下的client name重复了' }
    ],
    tokenReq: [
      { name: 'clientId', type: 'String', isRequired: '是', desc: '第三方用户唯一凭证' },
      { name: 'clientSecret', type: 'String', isRequired: '是', desc: '第三方用户唯一凭证密钥' }
    ],
    updateTokenReq: [
      { name: 'refreshToken', type: 'String', isRequired: '是', desc: '刷新AccessToken调用凭证' },
    ]
  }

  componentDidMount () {
    hljs.configure({useBR: true});
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }

  renderContent = (value, row) => {
    const obj = {
      children: value,
      props: {}
    };
    if (row.cate) {
      obj.props.colSpan = 0;
    }
    return obj;
  };

  renderRow =  (value, row) => {
    const obj = {
      children: value,
      props: {}
    };
    if (row.cate) {
      obj.props.colSpan = 3;
    }
    return obj;
  };

  render () {
    return (
      <div className="g-row">
        <div className="m-panel wiki-view">
          <div className="content">
            <h2 id="interface-intro">千帆API接口调用说明</h2>
            <h3 id="keyword">1、分析对象关键字解释</h3>
            <ul>
              <li>领域：cate</li>
              <li>行业：trade</li>
              <li>APP：app</li>
            </ul>
            <p>APP从属于某个领域、行业</p>
            <p>行业从属于某个领域</p>
            <p>所以在接口返回中，APP相关的接口会返回cateId和tradeId，行业相关接口会返回cateId</p>
            <h3 id="interface-demo">2、接口调用示例</h3>
            <p>已获取行业-现状分析-日均指标数据为例</p>
            <p>首先查看API文档：</p>
            <img src={demoUrl}></img>
            <p>在接口描述中能够得知，这个接口会返回三个指标，分别是：4:日均活跃人数 activeAvgDay、5:日均启动次数 launchAvgDay、6:日均使用时长 runtimeAvgDay。如果需要获取某个特定指标，可以传参数indexIds，如只需要日均活跃人数，indexIds=4，依次类推，多个指标间用逗号隔开。如果indexIds没有传，则返回接口描述里面的所有指标。</p>
            <p>调用接口返回内容如下：</p>
            <pre>
              <code>
                &#123;<br />
                  &nbsp;&nbsp;code: 200,<br />
                  &nbsp;&nbsp;msg: &quot;success&quot;,<br />
                  &nbsp;&nbsp;datas: [<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&#123;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tradeName: &quot;社交网络&quot;,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;activeAvgDay: &quot;82891.5&quot;,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;runtimeAvgDay: &quot;120388.7&quot;,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;launchAvgDay: &quot;1563109.5&quot;,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cateId: 119,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cateName: &quot;社交&quot;,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tradeId: 1191160,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                    &nbsp;&nbsp;]<br />
                &#125;
              </code>
            </pre>
            <p>通常接口会返回分析对象的基础信息和从属对象的基础信息，最主要的是返回指标数据，返回指标的key值和文档里面的接口描述是对应的。</p>
          
            <h2 id="response">返回接口协议及返回码说明</h2>
            <h3 id="agreement">1、接口协议</h3>
            <p>正常情况下，所有接口返回数据为json格式，例如：</p>
            <pre>
              <code>
                &#123;<br />
                &nbsp;&nbsp;&quot;code&quot;: 200,<br />
                &nbsp;&nbsp;&quot;datas&quot;: [<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&#123;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;id&quot;: 2028050,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;: &quot;微信&quot;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;],<br />
                  &nbsp;&nbsp;&quot;msg&quot;: &quot;操作成功&quot;<br />
                &#125;
              </code>
            </pre>
            <p>业务失败或者请求异常，则统一返回以下json格式，例如：</p>
            <pre>
              <code>
                &#123;<br />
                  &nbsp;&nbsp;&quot;code&quot;: 43002,<br />
                  &nbsp;&nbsp;&quot;msg&quot;: &quot;too many requests&quot;<br />
                &#125;
              </code>
            </pre>
            <p>具体code业务码，请参见下方返回码列表</p>
            <h3 id="code">2、返回码</h3>
            <Table bordered size="small" dataSource={this.state.codeList} pagination={false}>
              <Column width="180" title="返回码" dataIndex="code" key="code" render={this.renderContent} />
              <Column width="220" title="返回信息" dataIndex="msg" key="msg" render={this.renderContent} />
              <Column title="详细说明" dataIndex="desc" key="desc" render={this.renderRow} />
            </Table>
            <h2 id="accessToken">获取接口调用凭证accessToken</h2>
            <p>access_token是所有API的全局唯一接口调用凭据，第三方在调用各API接口时都需使用access_token。第三方开发者需要进行妥善保存。access_token的存储至少要保留256个字符空间。access_token的有效期目前为2个小时，需定时刷新，重复获取将导致上次获取的access_token失效。</p>
            <h3 id="get_token">1、获取access_token</h3>
            <p>接口地址: <span className="href" onClick={() => window.open('https://apikong.analysys.cn/access/token/create') }>https://apikong.analysys.cn/access/token/create</span></p>
            <p>请求方式：<Tag color="#108ee9">POST</Tag></p>
            <p>请求头：Content-Type：application/x-www-form-urlencoded</p>
            <p>请求参数</p>
            <Table bordered size="small" dataSource={this.state.tokenReq} pagination={false}>
              <Column width="140" title="参数名" dataIndex="name" key="name" />
              <Column width="220" title="数据类型" dataIndex="type" key="type" />
              <Column title="是否必传" dataIndex="isRequired" key="isRequired" />
              <Column title="参数说明" dataIndex="desc" key="desc" />
            </Table>
            <p style={{marginTop: '10px'}}>返回数据示例</p>
            <pre>
              <code>
                &#123;<br />
                  &nbsp;&nbsp;&quot;code&quot;: 0,<br />
                  &nbsp;&nbsp;&quot;msg&quot;: &quot;操作成功&quot;,<br />
                  &nbsp;&nbsp;&quot;datas&quot;: &#123;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&quot;accessToken&quot;: &quot;7eb643b17bd94358a332ba4ebfd76291&quot;,	//api接口调用凭证<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&quot;accessTokenExpTime&quot;:7200,			       //accessToken凭证有效时间(单位：秒),默认2小时过期；如果即将过期，用户可通过refreshToken来重新获取<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&quot;refreshToken&quot;: &quot;5417AEB4730CD1D72B92A7D7931C86CA&quot;//刷AccessToken调用凭证，默认24小时过期<br />
                  &nbsp;&nbsp;&#125;<br />
                &#125;
              </code>
            </pre>
            <h3 id="update_token">2、更新access_token</h3>
            <p>接口地址: <span className="href" onClick={() => window.open('https://apikong.analysys.cn/access/token/refresh') }>https://apikong.analysys.cn/access/token/refresh</span></p>
            <p>请求方式：<Tag color="#108ee9">POST</Tag></p>
            <p>请求头：Content-Type：application/x-www-form-urlencoded</p>
            <p>请求参数</p>
            <Table bordered size="small" dataSource={this.state.updateTokenReq} pagination={false}>
              <Column width="140" title="参数名" dataIndex="name" key="name" />
              <Column width="220" title="数据类型" dataIndex="type" key="type" />
              <Column title="是否必传" dataIndex="isRequired" key="isRequired" />
              <Column title="参数说明" dataIndex="desc" key="desc" />
            </Table>
            <p style={{marginTop: '10px'}}>返回数据示例</p>
            <pre>
              <code>
                &#123;<br />
                  &nbsp;&nbsp;&quot;code&quot;: 0,<br />
                  &nbsp;&nbsp;&quot;msg&quot;: &quot;操作成功&quot;,<br />
                  &nbsp;&nbsp;&quot;datas&quot;: &#123;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&quot;accessToken&quot;: &quot;7eb643b17bd94358a332ba4ebfd76291&quot;,	//api接口调用凭证<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&quot;accessTokenExpTime&quot;:7200,			       //accessToken凭证有效时间(单位：秒),默认2小时过期；如果即将过期，用户可通过refreshToken来重新获取<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&quot;refreshToken&quot;: &quot;5417AEB4730CD1D72B92A7D7931C86CA&quot;//刷AccessToken调用凭证，默认24小时过期<br />
                  &nbsp;&nbsp;&#125;<br />
                &#125;
              </code>
            </pre>
            <h3 id="speed">3、API接口调用次数速率控制</h3>
            <p>目前每个用户对每个API的调用次数会有一定限制，目前每分钟、每小时、每天都会有限制，超过次数状态码会返回42501（too many requests）</p>
            <h3 id="rule">4、API调用协议规则</h3>
            <p>所有的API调用必须在原有URL后拼接上具体的access_token； 即：<span className="href">http://apikong.analysys.cn/XXXXX?accessToken=7eb643b17bd94358a332ba4ebfd76291</span></p>
            <h2 id="indicators">API支持的指标及维度</h2>
            {/* <Table bordered size="small" dataSource={this.state.updateTokenReq} pagination={false}>
              <Column width="140" title="参数名" dataIndex="name" key="name" />
              <Column width="220" title="数据类型" dataIndex="type" key="type" />
              <Column title="是否必传" dataIndex="isRequired" key="isRequired" />
              <Column title="参数说明" dataIndex="desc" key="desc" />
            </Table> */}
            <img src={indicatorUrl}></img>
          </div>

          <div className="anchor">
            <Anchor offsetTop={20}>
              <Link href="#interface-intro" title="千帆API接口调用说明">
                <Link href="#keyword" title="1.分析对象关键字解释" />
                <Link href="#interface-demo" title="2.接口调用示例" />
              </Link>
              <Link href="#response" title="返回接口协议及返回码说明">
                <Link href="#agreement" title="1.接口协议" />
                <Link href="#code" title="2.返回码" />
              </Link>
              <Link href="#accessToken" title="获取接口调用凭证accessToken">
                <Link href="#get_token" title="1.获取access_token" />
                <Link href="#update_token" title="2.更新access_token" />
                <Link href="#speed" title="3.API接口调用次数速率控制" />
                <Link href="#rule" title="4.API调用协议规则" />
              </Link>
              <Link href="#indicators" title="API支持的指标及维度"></Link>
            </Anchor>
          </div>
        </div>
      </div>
    );
  }
}
