var app = getApp();

Page({
  data: {
    reply: !1,
    comment: !1,
    select: 0,
    arrow: 1,
    sure: !1,
    receive: !1,
    rob_redbag: !1,
    share: !1,
    hb_share: !1,
    share_red: !1
  },
  openshare: function() {
    this.setData({
      share_modal_active: "active"
    });
  },
  showShareModal: function() {
    this.setData({
      share_modal_active: "active"
    });
  },
  shareModalClose: function() {
    this.setData({
      share_modal_active: ""
    });
  },
  updateUserInfo: function(t) {
    console.log(t), "getUserInfo:ok" == t.detail.errMsg && (this.setData({
      hydl: !1
    }), this.getUserinfo());
  },
  getUserinfo: function() {
    var s = this;
    wx.login({
      success: function(t) {
        var e = t.code;
        wx.setStorageSync("code", e), wx.getSetting({
          success: function(t) {
            console.log(t), t.authSetting["scope.userInfo"] ? wx.getUserInfo({
              success: function(t) {
                wx.setStorageSync("user_info", t.userInfo);
                var i = t.userInfo.nickName,
                  n = t.userInfo.avatarUrl;
                app.util.request({
                  url: "entry/wxapp/openid",
                  cachetime: "0",
                  data: {
                    code: e
                  },
                  success: function(t) {
                    wx.setStorageSync("key", t.data.session_key);
                    var e = n,
                      a = i;
                    wx.setStorageSync("openid", t.data.openid);
                    var o = t.data.openid;
                    app.util.request({
                      url: "entry/wxapp/Login",
                      cachetime: "0",
                      data: {
                        openid: o,
                        img: e,
                        name: a
                      },
                      success: function(t) {
                        wx.setStorageSync("users", t.data), wx.setStorageSync("uniacid", t.data.uniacid),
                          s.setData({
                            user_id: t.data.id,
                            user_name: a
                          });
                      }
                    });
                  }
                });
              }
            }) : (console.log("未授权过"), s.setData({
              hydl: !0
            }));
          }
        });
      }
    });
  },
  onLoad: function(t) {
    var o = this;
    console.log(t), app.util.request({
      url: "entry/wxapp/System",
      cachetime: "0",
      success: function (t) {
        console.log(t.data)
        console.log(t), o.setData({
          system: t.data
        });
      }
    }), app.util.request({
      url: "entry/wxapp/HdPoster",
      cachetime: "0",
      data: {
        id: t.id
      },
      success: function(t) {
        console.log(t), o.setData({
          qr_code: t.data
        });
      }
    }), wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: wx.getStorageSync("color"),
      animation: {
        duration: 0,
        timingFunc: "easeIn"
      }
    }), wx.getSystemInfo({
      success: function(t) {
        var e = t.windowWidth / 2,
          a = 1.095 * e;
        o.setData({
          width: e,
          height: a
        });
      }
    }), app.util.request({
      url: "entry/wxapp/Url",
      cachetime: "0",
      success: function(t) {
        wx.setStorageSync("url", t.data), o.setData({
          url: t.data
        });
      }
    }), app.util.request({
      url: "entry/wxapp/Url2",
      cachetime: "0",
      success: function(t) {
        console.log(t), o.setData({
          url2: t.data
        });
      }
    });
    var e = wx.getStorageSync("users").id;
    null != t.type ? (o.getUserinfo(), o.setData({
      post_info_id: t.my_post
    })) : null != t.scene ? o.setData({
      user_id: e,
      post_info_id: t.scene,
      user_name: wx.getStorageSync("users").name
    }) : o.setData({
      user_id: e,
      post_info_id: t.id,
      user_name: wx.getStorageSync("users").name
    }), o.reload(), app.util.request({
      url: "entry/wxapp/Llz",
      cachetime: "0",
      data: {
        cityname: wx.getStorageSync("city"),
        type: 1
      },
      success: function(t) {
        console.log(t), o.setData({
          unitid: t.data
        });
      }
    });
  },
  reload: function(t) {
    var c = this,
      d = c.data.post_info_id;
    app.util.request({
      url: "entry/wxapp/IsCollection",
      cachetime: "0",
      data: {
        information_id: d,
        user_id: c.data.user_id
      },
      success: function(t) {
        1 == t.data ? c.setData({
          Collection: !0
        }) : c.setData({
          Collection: !1
        });
      }
    });
    var e = wx.getStorageSync("System");
    c.setData({
      system_name: e.pt_name
    }), app.util.request({
      url: "entry/wxapp/PostInfo",
      cachetime: "0",
      data: {
        id: d
      },
      success: function(t) {
        if (console.log(t), null == t.data.tz.type2_name) var e = "";
        else e = t.data.tz.type2_name;
        wx.setNavigationBarTitle({
          title: t.data.tz.type_name + " " + e
        });
        var a = c.ormatDate(t.data.tz.sh_time);
        for (var o in t.data.tz.time2 = a.slice(0, 16), t.data.pl) t.data.pl[o].time = c.ormatDate(t.data.pl[o].time),
          t.data.pl[o].time = t.data.pl[o].time.slice(0, 16);
        var i = t.data.tz.givelike;
        for (var n in t.data.tz.img = t.data.tz.img.split(","), t.data.label) t.data.label[n].number = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")";
        var s = Number(t.data.tz.hb_num),
          r = Number(t.data.tz.hb_random);
        Number(t.data.tz.hb_type);
        t.data.tz.hb_money = 1 == r ? t.data.tz.hb_money : (Number(t.data.tz.hb_money) * s).toFixed(2),
          app.util.request({
            url: "entry/wxapp/HongList",
            cachetime: "0",
            data: {
              id: t.data.tz.id
            },
            success: function(t) {
              console.log(t);
              var e = t.data,
                a = 0;
              if (1 == (o = function(t, e) {
                  for (var a = 0; a < t.length; a++)
                    if (e === t[a].user_id) return !0;
                  return !1;
                }(e, c.data.user_id))) var o = 2;
              else if (s == e.length) o = 1;
              else o = 3;
              for (var i in e) a += Number(e[i].money);
              c.setData({
                price: a.toFixed(2),
                hongbao_use: o,
                hongbao_len: t.data.length,
                hongbao: e
              });
            }
          }), t.data.tz.details = t.data.tz.details.replace("↵", "\n"), t.data.tz.trans1 = 1,
          t.data.tz.trans2 = 1, t.data.tz.dis1 = "block", t.data.tz.trans_1 = 2, t.data.tz.trans_2 = 1,
          console.log(t.data.tz),
          c.setData({
            post: t.data.tz,
            dianzan: t.data.dz,
            givelike: i,
            post_info_id: d,
            tei_id: t.data.tz.id,
            criticism: t.data.pl,
            label: t.data.label
          });
      }
    });
  },
  ormatDate: function(t) {
    var e = new Date(1e3 * t);
    return e.getFullYear() + "-" + a(e.getMonth() + 1, 2) + "-" + a(e.getDate(), 2) + " " + a(e.getHours(), 2) + ":" + a(e.getMinutes(), 2) + ":" + a(e.getSeconds(), 2);

    function a(t, e) {
      for (var a = "" + t, o = a.length, i = "", n = e; n-- > o;) i += "0";
      return i + a;
    }
  },
  rob_redbag: function(t) {
    var e = this.data.rob_redbag;
    this.data.hongbao_use;
    1 == e ? this.setData({
      rob_redbag: !1
    }) : this.setData({
      rob_redbag: !0
    });
  },
  trans1: function(t) {
    var e = this,
      a = e.data.post,
      o = e.data.num;
    if (2 == e.data.system.is_hbzf) {
      if (null == o && (o = 1), 1 == o) {
        a.trans1 = "trans1", a.trans2 = "trans2";
        var i = wx.getStorageSync("users").id,
          n = e.data.post_info_id;
        app.util.request({
          url: "entry/wxapp/GetHong",
          cachetime: "0",
          data: {
            id: n,
            user_id: i
          },
          success: function(t) {
            console.log("领取"), console.log(t), "error" == t.data && wx.showModal({
              title: "提示",
              content: "手慢了，" + e.data.system.hb_name + "被抢光了"
            });
          }
        }), setTimeout(function() {
          a.trans_1 = 1, a.trans_2 = 2, a.dis1 = "none", a.dis2 = "block", e.setData({
            store: a
          });
        }, 500), setTimeout(function() {
          a.trans_1 = 2, a.trans_2 = 1, a.dis1 = "block", a.dis2 = "none", e.setData({
            store: a
          });
        }, 1e3), setTimeout(function() {
          a.trans_1 = 1, a.trans_2 = 2, a.dis1 = "none", a.dis2 = "block", e.setData({
            store: a
          });
        }, 1500), setTimeout(function() {
          wx.navigateTo({
            url: "../redbag/redinfo/see_rob?id=" + e.data.post_info_id,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
          }), e.setData({
            rob_redbag: !1
          });
        }, 1300);
      }
      e.setData({
        post: a,
        num: o + 1
      });
    } else e.setData({
      share_red: !0,
      rob_redbag: !1
    });
  },
  trans2: function(t) {
    this.data.store;
    wx.navigateTo({
      url: "../redbag/redinfo/see_rob?id=" + this.data.post_info_id,
      success: function(t) {},
      fail: function(t) {},
      complete: function(t) {}
    }), this.setData({
      rob_redbag: !1
    });
  },
  weixin: function(t) {
    this.setData({
      hb_share: !1
    });
  },
  shouye: function(t) {
    wx.reLaunch({
      url: "../index/index",
      success: function(t) {},
      fail: function(t) {},
      complete: function(t) {}
    });
  },
  receive1: function(t) {
    this.setData({
      receive: !1
    });
  },
  fabu: function(t) {
    wx.reLaunch({
      url: "../fabu/fabu/fabu",
      success: function(t) {},
      fail: function(t) {},
      complete: function(t) {}
    });
  },
  previewImage: function(t) {
    var e = this.data.url,
      a = [],
      o = t.currentTarget.dataset.inde,
      i = this.data.post.img;
    for (var n in i) a.push(e + i[n]);
    wx.previewImage({
      current: e + i[o],
      urls: a
    });
  },

  Collection: function(t) {

    if (!wx.getStorageSync("users").id) {
      wx.navigateTo({
        url: '../authorization/authorization',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      return false
    }

    var e = this,
      a = e.data.tei_id,
      o = wx.getStorageSync("users").id;
    app.util.request({
      url: "entry/wxapp/Collection",
      cachetime: "0",
      data: {
        information_id: a,
        user_id: o
      },
      success: function(t) {
        1 == t.data ? (e.setData({
          Collection: !0
        }), wx.showToast({
          title: "收藏成功",
          icon: "",
          image: "",
          duration: 2e3,
          mask: !0,
          success: function(t) {},
          fail: function(t) {},
          complete: function(t) {}
        })) : (wx.showToast({
          title: "取消收藏成功",
          icon: "fail",
          image: "",
          duration: 2e3,
          mask: !0,
          success: function(t) {},
          fail: function(t) {},
          complete: function(t) {}
        }), e.setData({
          Collection: !1
        }));
      }
    });
  },
  hb_keyword: function(e) {
    var t = e.detail.value;
    this.data.post.hb_keyword == t ? this.setData({
      sure: !0
    }) : wx.showModal({
      title: "提示",
      content: "输入的口令错误，请重新输入",
      showCancel: !0,
      cancelText: "取消",
      confirmText: "确定",
      success: function(t) {
        e.detail.value;
      },
      fail: function(t) {},
      complete: function(t) {}
    });
  },


  comment: function(t) {

    if (!wx.getStorageSync("users").id) {
      wx.navigateTo({
        url: '../authorization/authorization',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      return false
    }

    var e = this,
      a = wx.getStorageSync("users").id;
    app.util.request({
      url: "entry/wxapp/GetUserInfo",
      cachetime: "0",
      data: {
        user_id: a
      },
      success: function(t) {
        console.log(t), 1 == t.data.state ? e.setData({
          comment: !0
        }) : wx.showModal({
          title: "提示",
          content: "您的账号异常，请尽快联系管理员",
          showCancel: !0,
          cancelText: "取消",
          confirmText: "确定",
          success: function(t) {},
          fail: function(t) {},
          complete: function(t) {}
        });
      }
    }), app.util.request({
      url: "entry/wxapp/GetSensitive",
      cachetime: "0",
      success: function (a) {
        console.log(a), a.data ? e.setData({
          mgnr: a.data
        }) : e.setData({
          mgnr: {
            content: ""
          }
        });
      }
    });
  },
  complete: function(t) {
    this.setData({
      complete: t.detail.value
    });
  },
  complete1: function(t) {
    this.setData({
      complete1: t.detail.value
    });
  },
  complete2: function(t) {
    this.setData({
      complete2: t.detail.value
    });
  },
  formid_two: function(t) {
    console.log(t), app.util.request({
      url: "entry/wxapp/SaveFormid",
      cachetime: "0",
      data: {
        user_id: wx.getStorageSync("users").id,
        form_id: t.detail.formId,
        openid: wx.getStorageSync("openid")
      },
      success: function(t) {}
    });
    var e = this,
      a = (t.detail.formId, e.data.complete),
      o = e.data.user_id,
      p = this.data.mgnr.content.split(","), 
      i = e.data.post_info_id;
      e.data.post.user_id;
      console.log(p)
    var n, s, r; 
    if (console.log(p), "" != this.data.mgnr.content)
      for (var h = 0; h < p.length; h++)
        if (-1 != a.indexOf(p[h])){ 
        return console.log(a.indexOf(p[h])),
          void wx.showModal({
            title: "温馨提示",
            content: "您发布的内容在第" + (a.indexOf(p[h]) + 1) + "个字符出现违规敏感词汇,请修改后提交"
          });
        }
    n = new Date(), s = n.getMonth() + 1, r = n.getDate(), 1 <= s && s <= 9 && (s = "0" + s),
      0 <= r && r <= 9 && (r = "0" + r), n.getFullYear(), n.getHours(), n.getMinutes(),
      n.getSeconds();
    "" == a || null == a ? wx.showToast({
      title: "内容为空",
      icon: "loading",
      duration: 1e3
    }) : (e.setData({
      replay: !1,
      comment: !1,
      complete: ""
    }), app.util.request({
      url: "entry/wxapp/Comments",
      cachetime: "0",
      data: {
        information_id: i,
        details: a,
        user_id: o
      },
      success: function(t) {
        "error" != t.data ? (wx.showToast({
          title: "评论成功"
        }), setTimeout(function() {
          e.reload();
        }, 1e3)) : wx.showToast({
          title: "评论失败",
          icon: "loading"
        });
      }
    }));
  },
  
  reply1: function(t) {

    if (!wx.getStorageSync("users").id) {
      wx.navigateTo({
        url: '../authorization/authorization',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      return false
    }

    var e = t.currentTarget.dataset.reflex_id,
      a = t.currentTarget.dataset.name;
    this.data.user_id, this.data.post.user_id;
    this.setData({
      reply: !0,
      reflex_id: e,
      reflex_name: "回复" + a
    });
  },
  formid_one: function(t) {
    app.util.request({
      url: "entry/wxapp/SaveFormid",
      cachetime: "0",
      data: {
        user_id: wx.getStorageSync("users").id,
        form_id: t.detail.formId,
        openid: wx.getStorageSync("openid")
      },
      success: function(t) {}
    });
    this.setData({
      reply: !1,
      comment: !1,
      replyhf: !1
    });
  },
  SaveFormid: function(t) {
    app.util.request({
      url: "entry/wxapp/SaveFormid",
      cachetime: "0",
      data: {
        user_id: wx.getStorageSync("users").id,
        form_id: t.detail.formId
      },
      success: function(t) {}
    });
  },
  reply3: function(t) {
    var e = this,
      a = e.data.user_id,
      o = e.data.post_info_id,
      i = e.data.reflex_id,
      n = e.data.complete1;
    "" == n || null == n ? wx.showToast({
      title: "内容为空",
      icon: "loading",
      duration: 1e3
    }) : (e.setData({
      reply: !1,
      complete1: ""
    }), app.util.request({
      url: "entry/wxapp/Comments",
      cachetime: "0",
      data: {
        information_id: o,
        details: n,
        user_id: a,
        bid: i
      },
      success: function(t) {
        console.log(t), "error" != t.data && (wx.showToast({
          title: "回复成功"
        }), setTimeout(function() {
          e.reload();
        }, 1e3));
      }
    }));
  },
  openhf: function(t) {
    var e = t.currentTarget.dataset.reflex_id,
      a = t.currentTarget.dataset.name,
      o = t.currentTarget.dataset.hfid;
    this.setData({
      replyhf: !0,
      reflex_id: e,
      hfid: o,
      reflex_name: "回复" + a
    });
  },
  huifu: function(t) {
    var e = this,
      a = e.data.user_id,
      o = e.data.post_info_id,
      i = this.data.hfid,
      n = this.data.reflex_id,
      s = e.data.complete2;
    console.log(o, s, a, n, i), "" == s || null == s ? wx.showToast({
      title: "内容为空",
      icon: "loading",
      duration: 1e3
    }) : (e.setData({
      replyhf: !1,
      complete2: ""
    }), app.util.request({
      url: "entry/wxapp/Comments",
      cachetime: "0",
      data: {
        information_id: o,
        details: s,
        user_id: a,
        bid: n,
        hf_id: i
      },
      success: function(t) {
        console.log(t), "error" != t.data && (wx.showToast({
          title: "回复成功"
        }), setTimeout(function() {
          e.reload();
        }, 1e3));
      }
    }));
  },
  phone: function(t) {
    var e = this.data.post;
    wx.makePhoneCall({
      phoneNumber: e.user_tel
    });
  },
  move: function(t) {
    var e = this,
      a = e.data.select;
    1 == e.data.arrow ? setTimeout(function() {
      e.setData({
        arrow: 2
      });
    }, 1500) : setTimeout(function() {
      e.setData({
        arrow: 1
      });
    }, 1500), 1 == a ? e.setData({
      select: 0
    }) : e.setData({
      select: 1
    });
  },
  formSubmit: function(t) {
    app.util.request({
      url: "entry/wxapp/SaveFormid",
      cachetime: "0",
      data: {
        user_id: wx.getStorageSync("users").id,
        form_id: t.detail.formId,
        openid: wx.getStorageSync("openid")
      },
      success: function(t) {}
    });
    var e = t.detail.formId;
    console.log("用户的form——id是" + e), console.log(this.data);
    var a = wx.getStorageSync("openid");
    console.log(a);
    var o = this,
      i = o.data.tei_id,
      n = wx.getStorageSync("users").id,
      s = Number(o.data.givelike);
    o.data.post.user_id;
    app.util.request({
      url: "entry/wxapp/Like",
      cachetime: "0",
      data: {
        information_id: i,
        user_id: n
      },
      success: function(t) {
        console.log(t), "1" == t.data && (wx.showToast({
          title: "点赞成功",
          duration: 1e3
        }), o.reload(), o.setData({
          thumbs_ups: !0,
          thumbs_up: s + 1
        })), "不能重复点赞!" == t.data && (wx.showModal({
          title: "提示",
          content: "不能重复点赞",
          showCancel: !0,
          cancelText: "取消",
          confirmText: "确认",
          success: function(t) {},
          fail: function(t) {},
          complete: function(t) {}
        }), o.setData({
          thumbs_ups: !0
        }));
      }
    });
  },
  shou: function(t) {
    wx.reLaunch({
      url: "../index/index",
      success: function(t) {},
      fail: function(t) {},
      complete: function(t) {}
    });
  },
  post: function(t) {
    wx.reLaunch({
      url: "../fabu/fabu/fabu",
      success: function(t) {},
      fail: function(t) {},
      complete: function(t) {}
    });
  },
  onReady: function() {},
  onShow: function() {
    this.reload();
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {
    this.reload(), wx.stopPullDownRefresh();
  },
  onReachBottom: function() {},
  onShareAppMessage: function(t) {
    var e = this.data.system.is_hbzf;
    console.log(t, e);
    var o = this;
    console.log(o.data), o.setData({
      share: !0
    });
    var a = o.data.post.user_name,
      i = o.data.user_id,
      n = o.data.post_info_id,
      s = Number(o.data.post.hb_money),
      r = o.data.system.hb_content,
      c = o.data.system.hb_img;
    if (console.log(c), "" == c) var d = o.data.url2 + "addons/zh_tcwq/template/images/hongbao.jpg";
    else d = o.data.url + o.data.system.hb_img;
    if (console.log(s, r, d), "" == r) var u = o.data.user_name + "邀您一起拆" + a + "的" + o.data.system.hb_name;
    else u = (u = o.data.system.hb_content.replace("name", o.data.user_name)).replace("type", "【" + o.data.post.type_name + "】");
    if(0 < s && "button" == t.from && "1" == e){
      var title = u,
      path ="/zh_tcwq/pages/infodetial/infodetial?user_id=" + o.data.user_id + "&my_post=" + n + "&type=1",
      imageUrl=d;
        console.log("这是转发成功"), app.util.request({
          url: "entry/wxapp/HbFx",
          cachetime: "0",
          data: {
            information_id: o.data.post.id,
            user_id: i
          },
          success: function(t) {
            console.log(t);
          }
        }), console.log(t), o.setData({
          share_red: !1
        });
        var e = o.data.user_id,
          a = o.data.post_info_id;
        console.log(a, e), app.util.request({
          url: "entry/wxapp/GetHong",
          cachetime: "0",
          data: {
            id: a,
            user_id: e
          },
          success: function(t) {
            console.log("领取"), console.log(t), "error" == t.data && wx.showModal({
              title: "提示",
              content: "手慢了，" + o.data.system.hb_name + "被抢光了"
            });
          }
        }), wx.navigateTo({
          url: "../redbag/redinfo/see_rob?id=" + o.data.post_info_id,
          success: function(t) {},
          fail: function(t) {},
          complete: function(t) {}
        }), o.setData({
          share: !0,
          hb_share: !1,
          rob_redbag: !1
        });

    }else if(0 < s && "button" == t.from && "2" == e){
      var title= u,
      imageUrl='',
      path= "/zh_tcwq/pages/infodetial/infodetial?user_id=" + o.data.user_id + "&my_post=" + n + "&type=1";
        console.log("这是转发成功"), app.util.request({
          url: "entry/wxapp/HbFx",
          cachetime: "0",
          data: {
            information_id: o.data.post.id,
            user_id: i
          },
          success: function(t) {
            console.log(t);
          }
        }), console.log(t), o.setData({
          share_red: !1
        });
      
    }else if(0 < s && "menu" == t.from){
      var title= u,
      path="/zh_tcwq/pages/infodetial/infodetial?user_id=" + o.data.user_id + "&my_post=" + n + "&type=1",
      imageUrl="";
        console.log("这是转发成功"), app.util.request({
          url: "entry/wxapp/HbFx",
          cachetime: "0",
          data: {
            information_id: o.data.post.id,
            user_id: i
          },
          success: function(t) {
            console.log(t);
          }
        }), console.log(t), o.setData({
          share_red: !1
        });
      
    }else{
      var title = "【" + o.data.post.type_name + "】 " + o.data.post.details,
      imageUrl="",
      path = "/zh_tcwq/pages/infodetial/infodetial?user_id=" + o.data.user_id + "&my_post=" + n + "&type=1";
        console.log("这是转发成功"), app.util.request({
          url: "entry/wxapp/HbFx",
          cachetime: "0",
          data: {
            information_id: o.data.post.id,
            user_id: i
          },
          success: function(t) {
            console.log(t);
          }
        }), console.log(t), o.setData({
          share_red: !1
        });
    }

    return{
      title:title,
      imageUrl:imageUrl,
      path:path
    }
  },
  onShareTimeline: function (t) {
    var t = this.data.System.zf_title;
    return "" == t && (t = this.data.System.pt_name), {
      title: t,
      query: "",
    };
  },
  image: function(t) {
    if (0 == t.currentTarget.dataset.inde) {
      console.log(t);
      var e = t.detail.height,
        a = t.detail.width;
      this.setData({
        proportion: e / a,
        img_height: e,
        img_width: a
      });
    }
  },
  canvas: function(t) {
    console.log(this.data.url2 + this.data.qr_code), wx.navigateTo({
      url: "canvas?proportion=" + this.data.proportion + "&img_height=" + this.data.img_height + "&img_width=" + this.data.width + "&post_info_id=" + this.data.post_info_id + "&qr_code=" + this.data.qr_code
    });
  }
});