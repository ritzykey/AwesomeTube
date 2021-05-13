v = "";
thumurl = "https://i.ytimg.com/vi/replacetext/maxresdefault.jpg";

const executing = chrome.tabs.executeScript({
  code: `videoElement = document.getElementsByClassName("video-stream")[0]`,
});

function start() {
  chrome.tabs.executeScript({
    code: "_20p.startApp()",
  });
  window.close();
}

chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  let url = tabs[0].url;
  // use `url` here inside the callback because it's asynchronous!

  url = url.split("?")[1];
  let urlParams = new URLSearchParams(url);
  v = urlParams.get("v");

  if (v === null) {
    document
      .getElementsByClassName("thumbnailinpopup")[0]
      .setAttribute("src", "/src2/thumbnailPlaceholder.png");
    return;
  }

  thumurl = thumurl.replace("replacetext", v.toString());
  document
    .getElementsByClassName("thumbnailinpopup")[0]
    .setAttribute("src", thumurl);
});

const btnDownloadThumbnail = function () {
  if (v === null) {
    return;
  }
  let downloadUrl = thumurl;

  let downloading = chrome.downloads.download({
    url: downloadUrl,
    filename: "Thumbnail.jpg",
    conflictAction: "uniquify",
    saveAs: true,
  });
};

const newTabImage = function () {
  if (v === null) {
    return;
  }
  let win = window.open(thumurl, "_blank");
  win.focus();
};

function downloadSs2() {
  let title = "Screenshot.jpg";

  let canvas = document.createElement("canvas");
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  canvas
    .getContext("2d")
    .drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  let downloadLink = document.createElement("a");
  downloadLink.download = title;

  canvas.toBlob(async function (blob) {
    // download
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.click();
  }, "image/jpg");
}

function downloadSs() {
  if (v === null) {
    return;
  }
  chrome.tabs.executeScript({
    code: "downloadSs2()",
  });
}

function prevNextFnc(isPrev) {
  var frame = 30;
  frame = 1 / frame;
  if (videoElement.paused === false) {
    videoElement.pause();
  }
  if (isPrev) {
    return (videoElement.currentTime = Math.max(
      0,
      videoElement.currentTime - frame
    ));
  }
  videoElement.currentTime = Math.min(
    videoElement.duration,
    videoElement.currentTime + frame
  );
}

function prev() {
  if (v === null) {
    return;
  }
  chrome.tabs.executeScript({
    code: "prevNextFnc(true)",
  });
}

function next() {
  if (v === null) {
    return;
  }
  chrome.tabs.executeScript({
    code: "prevNextFnc(false)",
  });
}

function videoRate() {
  return videoElement.playbackRate.toString();
}

function plusRate() {
  chrome.tabs.executeScript({
    code: "videoElement.playbackRate += 0.25",
  });
  videoRate2();
}

function minusRate() {
  chrome.tabs.executeScript({
    code: "videoElement.playbackRate -= 0.25",
  });
  videoRate2();
}

function videoRate2() {
  chrome.tabs.executeScript(
    {
      code: "videoRate()",
    },
    (results) => {
      isResultsDefined = results === undefined;
      isResultsEmty = results != "";
      if (!isResultsDefined && isResultsEmty) {
        document.getElementsByClassName("playbackRate")[0].innerHTML = results;
        console.log(results + " typeof= " + typeof results);
      } else {
        document.getElementsByClassName("playbackRate")[0].innerHTML = 1;
      }
    }
  );
}

videoRate2();

isUpButton = true;

$(".fa-plus")
  .mousedown(function () {
    isUpButton = false;
    plusRate();
    timeout_id = setInterval(plusRate, 400);
  })
  .bind("mouseup mouseleave", function () {
    if (isUpButton) {
      return;
    }
    clearTimeout(timeout_id);
  });

$(".fa-minus")
  .mousedown(function () {
    isUpButton = false;
    minusRate();
    timeout_id = setInterval(minusRate, 400);
  })
  .bind("mouseup mouseleave", function () {
    if (isUpButton) {
      return;
    }
    clearTimeout(timeout_id);
  });

$("#prev")
  .mousedown(function () {
    isUpButton = false;
    prev();
    timeout_id = setInterval(prev, 200);
  })
  .bind("mouseup mouseleave", function () {
    if (isUpButton) {
      return;
    }
    clearTimeout(timeout_id);
  });

$("#next")
  .mousedown(function () {
    isUpButton = false;
    next();
    timeout_id = setInterval(next, 200);
  })
  .bind("mouseup mouseleave", function () {
    if (isUpButton) {
      return;
    }
    clearTimeout(timeout_id);
  });

document.getElementById("btnSS").addEventListener("click", downloadSs);
document.getElementById("clickme").addEventListener("click", start);
document
  .getElementsByClassName("thumbnailcontainer")[0]
  .addEventListener("click", newTabImage);
document
  .getElementById("btnDownloadThumbnail")
  .addEventListener("click", btnDownloadThumbnail);

// document.getElementsByClassName('fa-plus')[0].addEventListener('click', plusRate2);
// document.getElementsByClassName('fa-minus')[0].addEventListener('click', minusRate2);
// document.getElementById('prev').addEventListener('click', prev2);
// document.getElementById('next').addEventListener('click', next2);
