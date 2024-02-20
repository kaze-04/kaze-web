"use strict";

// オープニング
const body = document.querySelector(".js_body");
const spanWrapText = (target) => {
  const nodes = [...target.childNodes]; // ノードリストを配列にする
  var returnText = ""; // 最終的に返すテキスト
  for (const node of nodes) {
    if (node.nodeType == 3) {
      //テキストの場合
      const text = node.textContent.replace(/\r?\n/g, ""); //テキストから改行コード削除
      const splitText = text.split(""); // 一文字ずつ分割
      for (const char of splitText) {
        returnText += `<span class = "js_split">${char}</span>`; // spanタグで挟んで連結
      }
    } else {
      //テキスト以外の場合
      //<br>などテキスト以外の要素をそのまま連結
      returnText += node.outerHTML;
    }
  }
  return returnText;
};
const subCopys = [...document.querySelectorAll(".js_sub-copy")];
for (const subCopy of subCopys) {
  subCopy.innerHTML = spanWrapText(subCopy);
  // spanたちを配列にし、それをプロパティとして持っておく
  subCopy.spans = subCopy.querySelectorAll("span");
}

const tl = gsap.timeline();
function OpeningAnime() {
  body.classList.toggle("is-active");
  tl.to(
    ".opening_line",
    {
      duration: 1,
      scale: 1,
      ease: "power4.inOut",
    },
    "+=.5"
  )
    .to(".opening_mask-upper", {
      duration: 0.8,
      y: "-100%",
      ease: "power4.inOut",
    })
    .to(
      ".opening_mask-under",
      {
        duration: 0.8,
        y: "100%",
        ease: "power4.inOut",
      },
      "<"
    )
    .to(
      ".opening_line",
      {
        autoAlpha: 0,
      },
      "<"
    )
    .set(".opening", {
      display: "none",
    })
    .from(".js_kv-img", {
      duration: 0.4,
      autoAlpha: 0,
    })
    .from(".js_text-bg", {
      duration: 1.2,
      scaleX: 0,
      xPercent: -150,
    })
    .from(".js_copy01", {
      duration: 0.6,
      autoAlpha: 0,
      x: -100,
    })
    .from(".js_copy02", {
      delay: 0.2,
      duration: 0.6,
      autoAlpha: 0,
      x: -100,
    })
    .from(".js_split", {
      delay: -0.4,
      stagger: 0.05,
      duration: 0.8,
      autoAlpha: 0,
      onComplete: () => {
        body.classList.toggle("is-active");
      },
    });
}

function webStorage() {
  if (sessionStorage.getItem("access")) {
    //2回目以降アクセス時の処理には関数を実行しない
    body.classList.remove("is-active");
    document.querySelector(".opening").style.display = "none";
  } else {
    //初回アクセス時の処理
    sessionStorage.setItem("access", 0);
    OpeningAnime();
  }
}
webStorage();

gsap.to(".js_header", {
  delay: 1,
  duration: 0.6,
  autoAlpha: 1,
});
gsap.to(".js_kv-message", {
  delay: 7,
  duration: 0.6,
  autoAlpha: 1,
});

// ハンバーガーメニュー
const ham = document.querySelector(".js_hamburger");
const nav = document.querySelector(".js_nav");
const covers = document.querySelectorAll(".js_cover");

ham.addEventListener("click", () => {
  ham.classList.toggle("is-open");
  nav.classList.toggle("is-active");
  body.classList.toggle("is-active");
  covers.forEach((cover) => {
    cover.classList.toggle("is-active");
  });
});
const links = document.querySelectorAll("nav a[href]");
links.forEach((link) => {
  link.addEventListener("click", () => {
    ham.click();
  });
});

// ヘッダー背景、コンタクトボタン出現
const header = document.querySelector(".js_header");
const fixBtn = document.querySelector(".js_fix-btn");
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", () => {
    if (
      document.querySelector(".top_kv").offsetHeight / 2 <
      window.pageYOffset
    ) {
      header.classList.add("is-change");
      fixBtn.classList.add("is-show");
    } else {
      header.classList.remove("is-change");
      fixBtn.classList.remove("is-show");
    }
  });
});

// KVメッセージアニメーション;
const messages = document.querySelectorAll(".js_message");
let i = 1;
function messageAppear() {
  if (i > 1) {
    i = 0;
  }
  messages.forEach((message) => {
    message.classList.remove("is-show");
  });
  messages[i].classList.add("is-show");
  i++;
}
setInterval(messageAppear, 2500);

// 要素フェードイン
const fadeEls = gsap.utils.toArray(".js_fade");
fadeEls.forEach((fadeEl) => {
  gsap.from(fadeEl, {
    autoAlpha: 0,
    y: 50,
    duration: 0.8,
    scrollTrigger: {
      trigger: fadeEl,
      start: "top 80%",
    },
  });
});
gsap.from(".top_skill-list_item", {
  autoAlpha: 0,
  y: 50,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".top_skill-list",
    start: "top 80%",
  },
  stagger: {
    each: 0.3,
  },
});

// テキストマスクアニメーション
const maskTexts = document.querySelectorAll(".js_text-mask");
maskTexts.forEach((maskText) => {
  const textMaskTL = gsap.timeline();
  textMaskTL
    .to(maskText, {
      autoAlpha: 1,
      y: 0,
      duration: 0.4,
    })
    .to(maskText, {
      delay: 0.1,
      "--translate": "0 102%",
      duration: 0.4,
    });
  ScrollTrigger.create({
    trigger: maskText,
    start: "top 80%",
    animation: textMaskTL,
    // markers: true,
  });
});

// const windowWidth = window.innerWidth;
// const windowSm = 768;
// if (windowWidth <= windowSm) {
//横幅768px以下（スマホ）に適用させるJavaScriptを記述

const workArea = document.querySelector(".js_works-area");
const workList = document.querySelector(".js_works-list");
const workItems = document.querySelectorAll(".js_works-item");
const workNum = workItems.length;
const serviceArea = document.querySelector(".js_service-area");
const serviceList = document.querySelector(".js_service-list");
const serviceItems = document.querySelectorAll(".js_service-item");
const serviceNum = serviceItems.length;
const mm = gsap.matchMedia();
window.addEventListener("load", () => {
  // 320~767
  mm.add("(min-width: 320px) and (max-width: 599px)", () => {
    gsap.set(workList, { width: workNum * 100 + "%" });
    gsap.set(workItems, { width: 100 / workNum + "%" });
    gsap.to(workItems, {
      xPercent: -115 * (workNum - 1),
      ease: "none",
      scrollTrigger: {
        trigger: workArea,
        start: "center center",
        end: "bottom top",
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    gsap.set(serviceList, { width: serviceNum * 100 + "%" });
    gsap.set(serviceItems, { width: 100 / serviceNum + "%" });
    gsap.to(serviceItems, {
      xPercent: -115 * (serviceNum - 1),
      ease: "none",
      scrollTrigger: {
        trigger: serviceArea,
        start: "center center",
        end: "bottom top",
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  });
  // 769~1080
  mm.add("(min-width: 600px) and (max-width: 1920px)", () => {
    workItems.forEach((workItem) => {
      gsap.from(workItem, {
        autoAlpha: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: workItem,
          start: "top 80%",
          // markers: true,
        },
        stagger: {
          each: 0.2,
        },
      });
    });
    serviceItems.forEach((serviceItem) => {
      gsap.from(serviceItem, {
        autoAlpha: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: serviceItem,
          start: "top 80%",
        },
      });
    });
  });
  // mm.add("(min-width: 1080px) ", () => {});
});

// // 高さを揃える要素
// const worksContents = document.querySelectorAll(".top_works_content-card");
// // 空の配列を指定。
// const heightlist = [];
// // 要素の高さを全て配列に格納
// worksContents.forEach((element) => {
//   const height = element.clientHeight;
//   heightlist.push(height);
// });
// //一番高さがある要素のheightを取得。
// const maxHeight = Math.max.apply(null, heightlist);
// // 要素にstyle属性を付与。一番高さのある要素のheightを揃える要素全てに指定。
// worksContents.forEach((element) => {
//   element.style.height = maxHeight + "px";
// });

// swiper
const swiper = new Swiper(".detail_swiper", {
  allowTouchMove: false,
  centeredSlides: true,
  loop: true,
  speed: 400,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  effect: "fade",
  fadeEffect: { crossFade: true },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
