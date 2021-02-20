// pages/goodsMsg/goodsMsg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    const that = this;
    // 接收跳转前页面 传递的数据
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('postGoodsMsg', function(data) {
      const gData = getApp().globalData;
      //拿到商品id
      const id = data;
      //获取商品信息 并 返回给页面
      const goods = gData.goodsList.find(item=>{
        return item.id === id;
      })
      that.setData({
        goods,
        // 获取详细介绍
        msgList:[
          "https://dcdn.it120.cc/2021/02/09/899059a7-e151-4b74-8f0a-478b7ec1ac49.png",
          "https://dcdn.it120.cc/2021/02/09/14fef087-09ec-4fcf-af78-e5790fb8b752.png",
          "https://dcdn.it120.cc/2021/02/09/009cf124-d06b-4415-8ba5-3dec57823c62.png",
          "https://dcdn.it120.cc/2021/02/09/380e5922-ee96-4673-a6a0-4cd891bc8bbc.png",
          "https://dcdn.it120.cc/2021/02/09/68958cff-2923-486b-86ef-60a4629742c0.png",
          "https://dcdn.it120.cc/2021/02/09/756d407a-6317-40d8-995f-27c565a2a175.png",
          "https://dcdn.it120.cc/2021/02/09/b9184765-f063-4fec-bae1-46dbfa979ce9.png",
          "https://dcdn.it120.cc/2021/02/09/e68d6daf-580b-42b2-8415-8465b4a1fbeb.png"
        ]
      })
      
      
    })
  },
  handleAdd(){
    this.setData({
      num:this.data.num+1
    })
  },
  handleRemove(){
    const result = this.data.num-1 < 1?1:this.data.num-1
    this.setData({
      num:result
    })
  },
  pushCart(){
    const that = this;
    let goodsArr = [];

    wx.getStorage({
      key: 'goods'
    }).then(data=>{
      let result = JSON.parse(data.data);
      //判断是否加入了相同的商品
      const isDb = result.every(item=>{
        return item.id !== that.data.goods.id;
      })
      if(!isDb){
        wx.showToast({
          title: '已存在购物车', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1500  // 提示窗停留时间，默认1500ms
        })
      }else{
        result.push(that.data.goods);
        goodsArr = result;
        goodsArr = JSON.stringify(goodsArr);

        wx.setStorage({
          data: goodsArr,
          key: 'goods',
        }).then(data=>{
          console.log('成功');
          wx.showToast({
            title: '加入成功！', // 标题
            icon: 'success',  // 图标类型，默认success
            duration: 1500  // 提示窗停留时间，默认1500ms
          })
        })
      }
      
    })
  }
})