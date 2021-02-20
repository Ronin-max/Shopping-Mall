// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
    // wx.clearStorageSync();
    // 判断是否进入过小程序
    const ago = wx.getStorageSync('goods');
    if(!ago){//如果没有则需要先创建一个本地存储属性，以便后续处理
      wx.setStorageSync('goods', '[]')
    }
  },
  globalData: {
    // 商品信息列表
    goodsList:[],
    // 商品分类信息
    goodsType:[],
    // 过滤后的商品列表
    showList:[],
    //点击商品进入商品详情页
    toGoods(data){
      wx.navigateTo({
          url: '../goodsMsg/goodsMsg',
          events:{
            postGoodsMsg:function(data){
              console.log(data);
            }
          },
          success(res){
            res.eventChannel.emit('postGoodsMsg',data);
          }
        })
    },
    toSearch(data){
      wx.navigateTo({
        url: '../search/search',
        events:{
          postGoodsMsg:function(data){
            console.log(data);
          }
        },
        success(res){
          res.eventChannel.emit('postGoodsMsg',data);
        }
      })
    }
  }
})
