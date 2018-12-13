import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import MySwiper from '../../components/MySwiper';
import GoodsList from '../../components/GoodsList';
import SearchInto from '../../components/search/searchInto'

import './index.scss';

@connect(({ home, cart, loading }) => ({
  ...home,
  ...cart,
  ...loading,
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '',
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'home/load',
    });
    this.props.dispatch({
      type: 'home/product',
    });

    // 设置衣袋小红点
    if (this.props.items.length > 0) {
      Taro.setTabBarBadge({
        index: 1,
        text: String(this.props.items.length),
      })
    }else {
      Taro.removeTabBarBadge({
        index: 1,
      })
    }
  };

  //分享
  onShareAppMessage() {
    return {
      title: 'kindle书籍免费推送',
      path: '/pages/home/index',
    }
  };

  // 小程序上拉加载
  onReachBottom() {
    this.props.dispatch({
      type: 'home/save',
      payload: {
        page: this.props.page + 1,
      },
    });
    this.props.dispatch({
      type: 'home/product',
    });
  }

  

  render() {
    const { banner, brands, products_list, effects } = this.props;
    return (
      <View className="home-page">
        <View className='index-search_into'>
          <SearchInto placeholder='搜索框' type='index' />
        </View>
        <MySwiper banner={banner} home />
        {/* <View className="nav-list">
          { brands.map((item, index) => (
            <View className="nav-item" key={index}>
              <Image mode="widthFix" src={item.image_src}></Image>
            </View>
          ))}
        </View> */}
        {/* 流量主广告 */}
        {/* {Taro.getEnv() === Taro.ENV_TYPE.WEAPP && <ad unit-id="adunit-dc1c0a38156fa412"></ad>} */}
        <Text className="recommend">为你推荐</Text>
        <GoodsList list={products_list} loading={effects['home/product']} />
      </View>
    )
  }
}

