// pages/cateList/cateList.js
const ComUtils = require('../../utils/ComUtils.js')

//右侧继续往下滑动后，不显示顶部轮播图
var systemInfo = wx.getSystemInfoSync();
let scrollFunc = function(e) {
  wx.pageScrollTo({
    scrollTop: 422 / 750 * systemInfo.windowWidth,//422为顶部轮播图的高度，此处不懂的自行学下数学公式
    duration: 300
  })
}
const scrollToTop = ComUtils.throttle(scrollFunc, 3000)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodImages: [{
      imgUrl: '/images/adderley12.jpg'
    },
    {
      imgUrl: '/images/trummer12.jpg'
    }],
    conHeight: 500,
    navActive: 0,
    goodList: [{
        type: 1,
        typeName: '热卖',
        list: [{
            id: 1,
            goodsName: "林家玉米"
          },
          {
            id: 2,
            goodsName: "林家肉肉"
          }
        ]
      },
      {
        type: 2,
        typeName: '促销',
        list: [{
            id: 1,
            goodsName: "小小玉米"
          },
          {
            id: 2,
            goodsName: "小小肉肉"
          }
        ]
      },
      {
        type: 3,
        typeName: '健康',
        list: [{
            id: 1,
            goodsName: "健康玉米"
          },
          {
            id: 2,
            goodsName: "健康肉肉"
          }
        ]
      },
      {
        type: 3,
        typeName: '其他',
        list: [{
          id: 1,
          goodsName: "豆腐"
        },
        {
          id: 2,
          goodsName: "纸巾"
          }, 
          {
            id: 3,
            goodsName: "小玉米"
          }
        ]
      }
    ]
  },
  /**
   * 分类列表
   */
  setTypeList: function() {
    let typeList = []
    this.data.goodList.forEach(item => {
      let obj = {}
      obj.typeId = item.type
      obj.typeName = item.typeName,
        typeList.push(obj)
    })
    this.setData({
      typeList
    })
  },
  /**
   * 点击左侧菜单
   */
  chooseType: function(e) {
    let typeid = e.currentTarget.dataset.id
    this.setData({
      navActive: e.currentTarget.dataset.index,//当前类型
      contentActive: typeid
    })
  },
  /**
   * onScroll滚动事件
   */
  onScroll: function(e) {
    const scrollTop = e.detail.scrollTop;
    const scorllArr = this.data.heightArr;
    //节流执行滚动效果
    if (scrollTop <= this.data.heightArr[this.data.heightArr.length - 1] - this.data.conHeight) {
      scrollToTop(scrollTop);
    }
    if (scrollTop >= scorllArr[scorllArr.length - 1] - (this.data.conHeight / 2)) {
      return;
    } else {
      for (let i = 0; i < scorllArr.length; i++) {
        if (scrollTop >= 0 && scrollTop < scorllArr[0]) {
          if (0 != this.data.lastActive) {
            this.setData({
              navActive: 0,
              lastActive: 0,
            })
          }
        } else if (scrollTop >= scorllArr[i - 1] && scrollTop < scorllArr[i]) {
          if (i != this.data.lastActive) {
            this.setData({
              navActive: i,
              lastActive: i,
            })
          }
        }
      }
    }
  },
  /**
   * 获取页面参数
   */
  getPageDetails: function() {
    //获取系统参数
    wx.getSystemInfo({
      success: (res) => {
        let windowHeight = (res.windowHeight * (750 / res.windowWidth));
        this.setData({
          conHeight: windowHeight - 160   //160 为页面顶部不滚动部分的高度
        })
      }
    })
    //获取每个元素高度 数组
    let heightArr = []
    let h = 0

    let query = wx.createSelectorQuery()
    query.selectAll('.content').boundingClientRect()
    query.exec(res => {
      res[0].forEach((item) => {
        h += item.height;
        heightArr.push(h);
      })
      this.setData({
        heightArr: heightArr
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getPageDetails()
    this.setTypeList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})