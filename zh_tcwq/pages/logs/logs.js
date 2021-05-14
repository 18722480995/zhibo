var util = require("../../utils/util.js"),
  app = getApp();

Page({
  data: {
    Return: !1
  },


  onUser(e) {
    console.log(e)
    if (!wx.getStorageSync("users").id) {
      wx.navigateTo({
        url: '../authorization/authorization',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      return false
    }
  },

  onLoad: function (t) {
    var e = this,
      n = getCurrentPages();
    n.route = "zh_tcwq/pages/logs/index", 1 == e.data.Return && n.setData({
      Return: !0
    }), app.pageOnLoad(this), app.setNavigationBarColor(this);
    var o = wx.getStorageSync("System").bq_name,
      a = wx.getStorageSync("System").bq_logo,
      c = wx.getStorageSync("users");
    console.log(c);
    var i = wx.getStorageSync("store"),
      u = wx.getStorageSync("url");
    console.log(i), e.setData({
      store: i,
      url: u,
      System: wx.getStorageSync("System"),
      support: o,
      bq_logo: a
    }),

      e.setData({
        avatarUrl: c.img,
        nickName: c.name,
        // { "id": "78", "openid": "oH2330P1we2Mr7BKgwH6SoSV9glY", "img": "https://wx.qlogo.cn/mmopen/vi_32/kqP4ibPW5IGCusFvgx067RFu6jQ0SNmCHKkXE2Aciamwd4zNTnUBkAGMlBX44m4K7iaeFQ0qj0e8oJvamGVD3As3w/132", "time": "1515577789", "name": "Wz.文", "uniacid": "146", "money": "0.14", "user_name": "", "user_tel": "", "user_address": "", "commission": "0.00", "state": "1", "total_score": "0", "day": "0" }
      });
  },


  collection: function (t) {
    wx.navigateTo({
      url: "../Collection/Collection"
    });
  },
  settled: function (t) {
    wx.navigateTo({
      url: "../settled/settled"
    });
  },
  yellow_page: function (t) {
    wx.navigateTo({
      url: "../yellow_page/mine_yellow",
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  jfsc: function () {
    wx.navigateTo({
      url: "../integral/integral"
    });
  },
  wdbm: function () {
    wx.navigateTo({
      url: "../wdbm/wdbm"
    });
  },
  wdyhq: function () {
    wx.navigateTo({
      url: "../wdq/wdq"
    });
  },
  wdqg: function () {
    wx.navigateTo({
      url: "../xsqg/order"
    });
  },
  wdpt: function () {
    wx.navigateTo({
      url: "../collage/group_order"
    });
  },
  tchhr: function (t) {
    var e = wx.getStorageSync("users").id;
    app.util.request({
      url: "entry/wxapp/MyDistribution",
      cachetime: "0",
      data: {
        user_id: e
      },
      success: function (t) {
        console.log(t.data), "2" == t.data.state ? (console.log("是分销商"), wx.navigateTo({
          url: "../distribution/yaoqing"
        })) : "1" == t.data.state ? wx.showModal({
          title: "提示",
          content: "您的申请正在审核中，请耐心等待"
        }) : wx.navigateTo({
          url: "../distribution/jrhhr"
        });
      }
    });
  },
  my_post: function (t) {
    wx.navigateTo({
      url: "../mypost/mypost",
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  content: function (t) {
    wx.navigateTo({
      url: "../content/content",
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  logs_store: function (t) {
    wx.navigateTo({
      url: "bbaa",
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  order: function (t) {
    wx.navigateTo({
      url: "order",
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  help: function (t) {
    wx.navigateTo({
      url: "../store/help",
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  subscribe: function (t) {
    wx.navigateTo({
      url: "../subscribe/subscribe",
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  ptgl: function () {
    wx.navigateTo({
      url: "../extra/ptgly/bbaa"
    });
  },
  wallet: function (t) {
    wx.navigateTo({
      url: "income",
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  mine_car: function (t) {
    wx.navigateTo({
      url: "mine_car",
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  address: function (t) {
    var e = wx.getStorageSync("users").id;
    wx.chooseAddress({
      success: function (t) {
        console.log(t), app.util.request({
          url: "entry/wxapp/UpdAdd",
          cachetime: "0",
          data: {
            user_id: e,
            user_name: t.userName,
            user_tel: t.telNumber,
            user_address: t.provinceName + t.cityName + t.countyName + t.detailInfo
          },
          success: function (t) {
            console.log(t);
          }
        });
      }
    });
  },
  jump: function (t) {
    wx.navigateToMiniProgram({
      appId: wx.getStorageSync("System").tz_appid,
      path: "",
      extraData: {
        foo: "bar"
      },
      envVersion: "develop",
      success: function (t) {
        console.log("跳转成功"), console.log(t);
      }
    });
  },
  about: function (t) {
    wx.navigateTo({
      url: "system",
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  onReady: function () { },

  onShow: function () {

    var e = this, c = wx.getStorageSync("users"),
      t = wx.getStorageSync("users").id;
    // app.getUser();
    app.util.request({
      url: "entry/wxapp/GetUserInfo",
      cachetime: "30",
      data: {
        user_id: t
      },
      success: function (t) {
        console.log(t), e.setData({
          UserInfo: t.data
        });
      }
    }), app.util.request({
      url: "entry/wxapp/MyCollection",
      cachetime: "30",
      data: {
        user_id: t
      },
      success: function (t) {
        console.log(t), e.setData({
          MyCollection: t.data
        });
      }
    }), app.util.request({
      url: "entry/wxapp/Signset",
      cachetime: "0",
      success: function (t) {
        console.log("签到设置", t), e.setData({
          qdset: t.data
        });
      }
    }), app.util.request({
      url: "entry/wxapp/MyDistribution",
      cachetime: "0",
      data: {
        user_id: t
      },
      success: function (t) {
        console.log(t.data), e.setData({
          MyDistribution: t.data
        });
      }
    });

    e.setData({
      avatarUrl: c.img,
      nickName: c.name,
      // { "id": "78", "openid": "oH2330P1we2Mr7BKgwH6SoSV9glY", "img": "https://wx.qlogo.cn/mmopen/vi_32/kqP4ibPW5IGCusFvgx067RFu6jQ0SNmCHKkXE2Aciamwd4zNTnUBkAGMlBX44m4K7iaeFQ0qj0e8oJvamGVD3As3w/132", "time": "1515577789", "name": "Wz.文", "uniacid": "146", "money": "0.14", "user_name": "", "user_tel": "", "user_address": "", "commission": "0.00", "state": "1", "total_score": "0", "day": "0" }
    });

  },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { }
});