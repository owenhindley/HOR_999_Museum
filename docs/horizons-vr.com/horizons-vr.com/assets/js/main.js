(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var VIDEO_FORMATS, lightboxContent, lightboxElement, lightboxIndex, lightboxProductionId, navigateLightboxImage, onKeyDown, resize, showLightboxImage, showLightboxVideo;

lightboxElement = null;

lightboxContent = null;

lightboxProductionId = null;

lightboxIndex = -1;

VIDEO_FORMATS = ["webm", "mp4", "ogv"];

window.addEventListener("load", (function(_this) {
  return function() {
    var isMobile, splashVideo;
    smoothScroll.init();
    resize();
    window.addEventListener("resize", resize);
    document.body.classList.add("loaded");
    lightboxElement = document.querySelector("#lightbox-modal");
    lightboxContent = document.querySelector("#lightbox-content");
    isMobile = !!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i));
    if (isMobile) {
      splashVideo = document.querySelector("#splashVideo");
      return splashVideo.parentElement.removeChild(splashVideo);
    }
  };
})(this));

showLightboxImage = (function(_this) {
  return function(productionId, index) {
    var newImg, srcUrl;
    lightboxProductionId = productionId;
    lightboxIndex = index;
    lightboxContent.innerHTML = "";
    newImg = document.createElement("img");
    srcUrl = galleryData[productionId][index].getAttribute("data-src-fullsize");
    if (srcUrl.indexOf("cloudinary") !== -1) {
      srcUrl = srcUrl.replace("/image/upload/", "/image/upload/c_limit,h_" + CLOUDINARY_LIMIT_HEIGHT + "/");
    }
    newImg.src = srcUrl;
    lightboxContent.appendChild(newImg);
    $("#modal-loading").addClass("visible");
    imagesLoaded(lightboxContent, function() {
      return $("#modal-loading").removeClass("visible");
    });
    return $("#lightbox-modal").modal('show');
  };
})(this);

showLightboxVideo = (function(_this) {
  return function(productionId, url, videoType) {
    var newIframe;
    lightboxProductionId = productionId;
    lightboxIndex = 0;
    lightboxContent.innerHTML = "";
    if (videoType === "youtube") {
      newIframe = document.createElement("iframe");
      newIframe.setAttribute("width", "100%");
      newIframe.setAttribute("src", "https://www.youtube.com/embed/" + url + "?modestbranding=1&showinfo=0&rel=0");
      newIframe.setAttribute("frameborder", "0");
      newIframe.setAttribute("allowfullscreen", "true");
    } else if (videoType === "vimeo") {
      newIframe = document.createElement("iframe");
      newIframe.setAttribute("width", "100%");
      newIframe.setAttribute("src", "https://player.vimeo.com/video/" + url + "?title=0&badge=0&byline=0&portrait=0");
      newIframe.setAttribute("frameborder", "0");
      newIframe.setAttribute("allowfullscreen", "true");
    }
    lightboxContent.appendChild(newIframe);
    return $("#lightbox-modal").modal('show');
  };
})(this);

navigateLightboxImage = (function(_this) {
  return function(direction) {
    var nextIndex, productionGalleryData;
    if (!!!lightboxProductionId) {
      return;
    }
    if (!(lightboxIndex >= 0)) {
      return;
    }
    if (!$("body").hasClass("modal-open")) {
      return;
    }
    nextIndex = lightboxIndex + direction;
    productionGalleryData = galleryData[lightboxProductionId];
    if (nextIndex < 0) {
      nextIndex = galleryData[lightboxProductionId].length - 1;
    } else if (nextIndex >= galleryData[lightboxProductionId].length) {
      nextIndex = 0;
    }
    return showLightboxImage(lightboxProductionId, nextIndex);
  };
})(this);

onKeyDown = (function(_this) {
  return function(e) {
    switch (e.keyCode) {
      case 39:
        if ($("body").hasClass("modal-open")) {
          return navigateLightboxImage(1);
        }
        break;
      case 37:
        if ($("body").hasClass("modal-open")) {
          return navigateLightboxImage(-1);
        }
        break;
      case 27:
        if ($("body").hasClass("modal-open")) {
          return $("#lightbox-modal").modal('hide');
        }
    }
  };
})(this);

resize = function() {};

window.showSection = function(id) {
  var i, j, newSection, ref, rendering, sections;
  if (rendering) {
    rendering = false;
    _h.renderer.domElement.classList.add("hidden");
  }
  sections = document.querySelectorAll(".section");
  for (i = j = 0, ref = sections.length - 1; j <= ref; i = j += 1) {
    sections[i].classList.remove("active");
  }
  newSection = document.querySelector("#section-" + id);
  if (newSection) {
    newSection.classList.add("active");
  }
  return false;
};

window.resetRendering = function() {
  var i, j, ref, rendering, results, sections;
  if (!rendering) {
    rendering = true;
    _h.renderer.domElement.classList.remove("hidden");
    update();
  }
  sections = document.querySelectorAll(".section");
  results = [];
  for (i = j = 0, ref = sections.length - 1; j <= ref; i = j += 1) {
    results.push(sections[i].classList.remove("active"));
  }
  return results;
};


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBOztBQUFBLGVBQUEsR0FBa0I7O0FBQ2xCLGVBQUEsR0FBa0I7O0FBQ2xCLG9CQUFBLEdBQXVCOztBQUN2QixhQUFBLEdBQWdCLENBQUM7O0FBRWpCLGFBQUEsR0FBZ0IsQ0FBQyxNQUFELEVBQVMsS0FBVCxFQUFnQixLQUFoQjs7QUFFaEIsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLENBQUEsU0FBQSxLQUFBO1NBQUEsU0FBQTtBQUUvQixRQUFBO0lBQUEsWUFBWSxDQUFDLElBQWIsQ0FBQTtJQUVBLE1BQUEsQ0FBQTtJQUdBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxNQUFsQztJQUVBLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQXhCLENBQTRCLFFBQTVCO0lBQ0EsZUFBQSxHQUFrQixRQUFRLENBQUMsYUFBVCxDQUF1QixpQkFBdkI7SUFDbEIsZUFBQSxHQUFrQixRQUFRLENBQUMsYUFBVCxDQUF1QixtQkFBdkI7SUFJbEIsUUFBQSxHQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBcEIsQ0FBMEIsVUFBMUIsQ0FBQSxJQUF5QyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQXBCLENBQTBCLFFBQTFCLENBQXpDLElBQWdGLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBcEIsQ0FBMEIsU0FBMUIsQ0FBaEYsSUFBd0gsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFwQixDQUEwQixPQUExQixDQUF4SCxJQUE4SixTQUFTLENBQUMsU0FBUyxDQUFDLEtBQXBCLENBQTBCLE9BQTFCLENBQTlKLElBQW9NLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBcEIsQ0FBMEIsYUFBMUIsQ0FBcE0s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QUFBOztBQUdULE1BQU0sQ0FBQyxXQUFQLEdBQXFCLFNBQUMsRUFBRDtBQUNwQixNQUFBO0VBQUEsSUFBRyxTQUFIO0lBQ0MsU0FBQSxHQUFZO0lBQ1osRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQWpDLENBQXFDLFFBQXJDLEVBRkQ7O0VBSUEsUUFBQSxHQUFXLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixVQUExQjtBQUNYLE9BQVMsMERBQVQ7SUFDQyxRQUFTLENBQUEsQ0FBQSxDQUFFLENBQUMsU0FBUyxDQUFDLE1BQXRCLENBQTZCLFFBQTdCO0FBREQ7RUFHQSxVQUFBLEdBQWEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsV0FBQSxHQUFZLEVBQW5DO0VBQ2IsSUFBRyxVQUFIO0lBQ0MsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFyQixDQUF5QixRQUF6QixFQUREOztBQUdBLFNBQU87QUFiYTs7QUFlckIsTUFBTSxDQUFDLGNBQVAsR0FBd0IsU0FBQTtBQUN2QixNQUFBO0VBQUEsSUFBRyxDQUFDLFNBQUo7SUFDQyxTQUFBLEdBQVk7SUFDWixFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBakMsQ0FBd0MsUUFBeEM7SUFDQSxNQUFBLENBQUEsRUFIRDs7RUFLQSxRQUFBLEdBQVcsUUFBUSxDQUFDLGdCQUFULENBQTBCLFVBQTFCO0FBQ1g7T0FBUywwREFBVDtpQkFDQyxRQUFTLENBQUEsQ0FBQSxDQUFFLENBQUMsU0FBUyxDQUFDLE1BQXRCLENBQTZCLFFBQTdCO0FBREQ7O0FBUHVCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImxpZ2h0Ym94RWxlbWVudCA9IG51bGxcbmxpZ2h0Ym94Q29udGVudCA9IG51bGxcbmxpZ2h0Ym94UHJvZHVjdGlvbklkID0gbnVsbFxubGlnaHRib3hJbmRleCA9IC0xXG5cblZJREVPX0ZPUk1BVFMgPSBbXCJ3ZWJtXCIsIFwibXA0XCIsIFwib2d2XCJdXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKT0+IFxuXG5cdHNtb290aFNjcm9sbC5pbml0KClcblxuXHRyZXNpemUoKTtcblxuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlc2l6ZSlcblxuXHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJsb2FkZWRcIilcblx0bGlnaHRib3hFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsaWdodGJveC1tb2RhbFwiKVxuXHRsaWdodGJveENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xpZ2h0Ym94LWNvbnRlbnRcIilcblxuXHQjIGRvIE1hc29ucnlcblxuXHRpc01vYmlsZSA9ICEhKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FuZHJvaWQvaSkgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvd2ViT1MvaSkgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBob25lL2kpIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQYWQvaSkgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBvZC9pKSB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1dpbmRvd3MgUGhvbmUvaSkpXG5cblx0IyBpZiB3ZSdyZSBub3Qgb24gbW9iaWxlLCBsb2FkIHRoZSB2aWRlb1xuXHQjIGlmIG5vdCBpc01vYmlsZVxuXHQjIFx0c3BsYXNoVmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NwbGFzaFZpZGVvXCIpXG5cdFx0XG5cdCMgXHRzcmNTdHJpbmcgPSBzcGxhc2hWaWRlby5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiKVxuXHQjIFx0Zm9yIGkgaW4gVklERU9fRk9STUFUU1xuXHQjIFx0XHR2aWRlb1NyYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzb3VyY2VcIilcblx0IyBcdFx0dmlkZW9TcmMuc2V0QXR0cmlidXRlKFwic3JjXCIsIHNyY1N0cmluZyArIFwiLlwiICsgaSlcblx0IyBcdFx0c3BsYXNoVmlkZW8uYXBwZW5kQ2hpbGQodmlkZW9TcmMpXG5cblx0IyBcdHNwbGFzaFZpZGVvLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpXG5cdCMgXHRzcGxhc2hWaWRlby5wbGF5KClcblx0IyBcdHNwbGFzaFZpZGVvLnZvbHVtZSA9IDBcblx0aWYgaXNNb2JpbGVcblx0XHRzcGxhc2hWaWRlbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3BsYXNoVmlkZW9cIilcblx0XHRzcGxhc2hWaWRlby5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHNwbGFzaFZpZGVvKVxuKVxuXG4jIGxvYWROZXh0UHJvZHVjdGlvbiA9ICgpPT5cblxuIyBcdGlmIChwcm9kdWN0aW9uX2xpc3QubGVuZ3RoKVxuIyBcdFx0bmV4dFByb2R1Y3Rpb24gPSBwcm9kdWN0aW9uX2xpc3Quc2hpZnQoKVxuXG4jIFx0XHRjb25zb2xlLmxvZyBcImxvYWRpbmcgI3tuZXh0UHJvZHVjdGlvbi5nZXRBdHRyaWJ1dGUoXCJpZFwiKX1cIlxuXG4jIFx0XHQjIGxvb3AgdGhyb3VnaCBpbWFnZXMsIHJlcGxhY2UgJ3NyYycgd2l0aCAnZGF0YS1zcmMnXG4jIFx0XHRpbWFnZUxpc3QgPSBbXS5zbGljZS5jYWxsKG5leHRQcm9kdWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbWdcIikpXG4jIFx0XHRmb3IgaW1nIGluIGltYWdlTGlzdFxuIyBcdFx0XHQjIGluc2VydCBzY2FsaW5nIHBhcmFtcyBmcm9tIENsb3VkaW5hcnlcbiMgXHRcdFx0c3JjVXJsID0gaW1nLmdldEF0dHJpYnV0ZShcImRhdGEtc3JjXCIpXG4jIFx0XHRcdGlmIChzcmNVcmwuaW5kZXhPZihcImNsb3VkaW5hcnlcIikgIT0gLTEpXG4jIFx0XHRcdFx0c3JjVXJsID0gc3JjVXJsLnJlcGxhY2UoXCIvaW1hZ2UvdXBsb2FkL1wiLCBcIi9pbWFnZS91cGxvYWQvY19zY2FsZSx3X1wiICsgQ0xPVURJTkFSWV9TQ0FMRV9XSURUSCArIFwiL1wiKVxuIyBcdFx0XHRpbWcuc2V0QXR0cmlidXRlKFwic3JjXCIsIHNyY1VybClcblxuIyBcdFx0Z3JpZEVsZW1lbnQgPSBuZXh0UHJvZHVjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLmdyaWRcIilcbiMgXHRcdGRvKGdyaWRFbGVtZW50KSAtPlxuIyBcdFx0XHRpbWFnZXNMb2FkZWQoZ3JpZEVsZW1lbnQsICgpPT5cblxuIyBcdFx0XHRcdG1zbnJ5X2dyaWRzLnB1c2gobmV3IE1hc29ucnkoZ3JpZEVsZW1lbnQsIHtcbiMgXHRcdFx0XHRcdGl0ZW1TZWxlY3RvciA6IFwiLmdyaWQtaXRlbVwiLFxuIyBcdFx0XHRcdFx0Y29sdW1uV2lkdGggOiBcIi5ncmlkLXNpemVyXCIsXG4jIFx0XHRcdFx0XHRwZXJjZW50UG9zaXRpb24gOiB0cnVlXG4jIFx0XHRcdFx0fSkpXG5cbiMgXHRcdFx0XHRncmlkRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaW1hZ2VzLWxvYWRlZFwiKVxuIyBcdFx0XHRcdGdyaWRFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5zcGlubmVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpXG5cbiMgXHRcdFx0XHQjIHNldHVwIGdhbGxlcnkgZm9yIHRoaXMgcHJvZHVjdGlvblxuXG5cdFx0XHRcdFxuIyBcdFx0XHRcdHByb2R1Y3Rpb25JZCA9IG5leHRQcm9kdWN0aW9uLmdldEF0dHJpYnV0ZShcImlkXCIpXG4jIFx0XHRcdFx0ZG8gKHByb2R1Y3Rpb25JZCkgLT5cbiMgXHRcdFx0XHRcdGdhbGxlcnlEYXRhW3Byb2R1Y3Rpb25JZF0gPSBbXVxuIyBcdFx0XHRcdFx0aW1hZ2VzID0gZ3JpZEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWl0ZW0uaW1hZ2VcIilcbiMgXHRcdFx0XHRcdGZvciBpbWcgaW4gaW1hZ2VzXG5cdFx0XHRcdFx0XHRcbiMgXHRcdFx0XHRcdFx0Z2FsbGVyeURhdGFbcHJvZHVjdGlvbklkXS5wdXNoKGltZylcblxuIyBcdFx0XHRcdFx0XHRpbWcuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKT0+XG4jIFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcbiMgXHRcdFx0XHRcdFx0XHRcdHNob3dMaWdodGJveEltYWdlKHByb2R1Y3Rpb25JZCwgZ2FsbGVyeURhdGFbcHJvZHVjdGlvbklkXS5pbmRleE9mKGUudGFyZ2V0KSlcbiMgXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZVxuIyBcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcbiMgXHRcdFx0XHRcdHZpZGVvcyA9IGdyaWRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYWN0aW9uLXZpZGVvXCIpXG4jIFx0XHRcdFx0XHRmb3IgdmlkZW8gaW4gdmlkZW9zXG4jIFx0XHRcdFx0XHRcdGRvICh2aWRlbykgLT5cbiMgXHRcdFx0XHRcdFx0XHR2aWRlby5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpPT5cbiMgXHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuIyBcdFx0XHRcdFx0XHRcdFx0c2hvd0xpZ2h0Ym94VmlkZW8ocHJvZHVjdGlvbklkLCB2aWRlby5nZXRBdHRyaWJ1dGUoXCJkYXRhLWFjdGlvbi1kYXRhXCIpLCB2aWRlby5nZXRBdHRyaWJ1dGUoXCJkYXRhLWFjdGlvbi10eXBlXCIpKVxuIyBcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlXG4jIFx0XHRcdFx0XHRcdFx0KVxuXG4jIFx0XHRcdFx0bG9hZE5leHRQcm9kdWN0aW9uKClcblxuIyBcdFx0XHRcdClcblxuIyBcdFx0XHRcdCMgc2V0dXAgYWN0aW9uKHMpIGZvciB0aGlzIHByb2R1Y3Rpb25cblxuXHRcdFx0XHRcblxuIyBcdGVsc2VcblxuIyBcdFx0IyBzZXR1cCBsaWdodGJveCBsZWZ0IC8gcmlnaHQgaGFuZGxlcnNcbiMgXHRcdCQoXCIjbW9kYWwtbmV4dFwiKS5jbGljaygoKT0+XG4jIFx0XHRcdG5hdmlnYXRlTGlnaHRib3hJbWFnZSgxKVxuIyBcdFx0XHQpXG4jIFx0XHQkKFwiI21vZGFsLXByZXZpb3VzXCIpLmNsaWNrKCgpPT5cbiMgXHRcdFx0bmF2aWdhdGVMaWdodGJveEltYWdlKC0xKVxuIyBcdFx0XHQpXG5cbiMgXHRcdGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlEb3duKVxuXG4jIFx0XHQjaGFuZGxlIG1vZGFsIGNsb3NpbmdcbiMgXHRcdCQoXCIjbGlnaHRib3gtbW9kYWxcIikub24oXCJoaWRkZW4uYnMubW9kYWxcIiwgKGUpPT5cbiMgXHRcdFx0bGlnaHRib3hDb250ZW50LmlubmVySFRNTCA9IFwiXCJcbiMgXHRcdFx0JChcIiNtb2RhbC1sb2FkaW5nXCIpLnJlbW92ZUNsYXNzKFwidmlzaWJsZVwiKVxuIyBcdFx0XHQpXG5cbiMgXHRcdGNvbnNvbGUubG9nIFwiTG9hZCBjb21wbGV0ZVwiXG5cblxuc2hvd0xpZ2h0Ym94SW1hZ2UgPSAocHJvZHVjdGlvbklkLCBpbmRleCkgPT5cblxuXHRsaWdodGJveFByb2R1Y3Rpb25JZCA9IHByb2R1Y3Rpb25JZFxuXHRsaWdodGJveEluZGV4ID0gaW5kZXhcdFxuXHRcblx0bGlnaHRib3hDb250ZW50LmlubmVySFRNTCA9IFwiXCJcblx0bmV3SW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKVxuXHRzcmNVcmwgPSBnYWxsZXJ5RGF0YVtwcm9kdWN0aW9uSWRdW2luZGV4XS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNyYy1mdWxsc2l6ZVwiKVxuXHRpZiAoc3JjVXJsLmluZGV4T2YoXCJjbG91ZGluYXJ5XCIpICE9IC0xKVxuXHRcdHNyY1VybCA9IHNyY1VybC5yZXBsYWNlKFwiL2ltYWdlL3VwbG9hZC9cIiwgXCIvaW1hZ2UvdXBsb2FkL2NfbGltaXQsaF9cIiArIENMT1VESU5BUllfTElNSVRfSEVJR0hUICsgXCIvXCIpXG5cdG5ld0ltZy5zcmMgPSBzcmNVcmxcblx0bGlnaHRib3hDb250ZW50LmFwcGVuZENoaWxkKG5ld0ltZylcblxuXHQkKFwiI21vZGFsLWxvYWRpbmdcIikuYWRkQ2xhc3MoXCJ2aXNpYmxlXCIpXG5cdGltYWdlc0xvYWRlZChsaWdodGJveENvbnRlbnQsICgpPT5cblx0XHQkKFwiI21vZGFsLWxvYWRpbmdcIikucmVtb3ZlQ2xhc3MoXCJ2aXNpYmxlXCIpXG5cdClcblx0JChcIiNsaWdodGJveC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpXG5cbnNob3dMaWdodGJveFZpZGVvID0gKHByb2R1Y3Rpb25JZCwgdXJsLCB2aWRlb1R5cGUpID0+XG5cblx0bGlnaHRib3hQcm9kdWN0aW9uSWQgPSBwcm9kdWN0aW9uSWRcblx0bGlnaHRib3hJbmRleCA9IDBcblxuXHRsaWdodGJveENvbnRlbnQuaW5uZXJIVE1MID0gXCJcIlxuXHRcblx0aWYgdmlkZW9UeXBlIGlzIFwieW91dHViZVwiXG5cdFx0bmV3SWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKVxuXHRcdG5ld0lmcmFtZS5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcblx0XHRuZXdJZnJhbWUuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvI3t1cmx9P21vZGVzdGJyYW5kaW5nPTEmc2hvd2luZm89MCZyZWw9MFwiKVxuXHRcdG5ld0lmcmFtZS5zZXRBdHRyaWJ1dGUoXCJmcmFtZWJvcmRlclwiLCBcIjBcIilcblx0XHRuZXdJZnJhbWUuc2V0QXR0cmlidXRlKFwiYWxsb3dmdWxsc2NyZWVuXCIsIFwidHJ1ZVwiKVxuXG5cdGVsc2UgaWYgdmlkZW9UeXBlIGlzIFwidmltZW9cIlxuXHRcdG5ld0lmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIilcblx0XHRuZXdJZnJhbWUuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgXCIxMDAlXCIpXG5cdFx0bmV3SWZyYW1lLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImh0dHBzOi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby8je3VybH0/dGl0bGU9MCZiYWRnZT0wJmJ5bGluZT0wJnBvcnRyYWl0PTBcIilcblx0XHRuZXdJZnJhbWUuc2V0QXR0cmlidXRlKFwiZnJhbWVib3JkZXJcIiwgXCIwXCIpXG5cdFx0bmV3SWZyYW1lLnNldEF0dHJpYnV0ZShcImFsbG93ZnVsbHNjcmVlblwiLCBcInRydWVcIilcblxuXHRsaWdodGJveENvbnRlbnQuYXBwZW5kQ2hpbGQobmV3SWZyYW1lKVxuXG5cdCQoXCIjbGlnaHRib3gtbW9kYWxcIikubW9kYWwoJ3Nob3cnKVxuXG5uYXZpZ2F0ZUxpZ2h0Ym94SW1hZ2UgPSAoZGlyZWN0aW9uKT0+XG5cdGlmIG5vdCAhIWxpZ2h0Ym94UHJvZHVjdGlvbklkIHRoZW4gcmV0dXJuXG5cdGlmIG5vdCAobGlnaHRib3hJbmRleCA+PSAwKSB0aGVuIHJldHVyblxuXHRpZiBub3QgJChcImJvZHlcIikuaGFzQ2xhc3MoXCJtb2RhbC1vcGVuXCIpIHRoZW4gcmV0dXJuXG5cblx0bmV4dEluZGV4ID0gbGlnaHRib3hJbmRleCArIGRpcmVjdGlvblxuXHRwcm9kdWN0aW9uR2FsbGVyeURhdGEgPSBnYWxsZXJ5RGF0YVtsaWdodGJveFByb2R1Y3Rpb25JZF1cblx0aWYgKG5leHRJbmRleCA8IDApIHRoZW4gbmV4dEluZGV4ID0gZ2FsbGVyeURhdGFbbGlnaHRib3hQcm9kdWN0aW9uSWRdLmxlbmd0aC0xXG5cdGVsc2UgaWYgKG5leHRJbmRleCA+PSBnYWxsZXJ5RGF0YVtsaWdodGJveFByb2R1Y3Rpb25JZF0ubGVuZ3RoKSB0aGVuIG5leHRJbmRleCA9IDBcblxuXHQjIGNvbnNvbGUubG9nKFwibmF2aWdhdGluZyBsaWdodGJveCBpbWFnZSB0byAje2xpZ2h0Ym94UHJvZHVjdGlvbklkfSA6IGluZGV4IDogI3tuZXh0SW5kZXh9XCIpXG5cblx0c2hvd0xpZ2h0Ym94SW1hZ2UobGlnaHRib3hQcm9kdWN0aW9uSWQsIG5leHRJbmRleClcblxub25LZXlEb3duID0gKGUpPT5cblx0c3dpdGNoIGUua2V5Q29kZVxuXHRcdHdoZW4gMzlcblx0XHRcdCNyaWdodCBhcnJvd1xuXHRcdFx0aWYgJChcImJvZHlcIikuaGFzQ2xhc3MoXCJtb2RhbC1vcGVuXCIpIHRoZW4gbmF2aWdhdGVMaWdodGJveEltYWdlKDEpXG5cdFx0d2hlbiAzN1xuXHRcdFx0I2xlZnQgYXJyb3dcblx0XHRcdGlmICQoXCJib2R5XCIpLmhhc0NsYXNzKFwibW9kYWwtb3BlblwiKSB0aGVuIG5hdmlnYXRlTGlnaHRib3hJbWFnZSgtMSlcblx0XHR3aGVuIDI3XG5cdFx0XHQjZXNjYXBlXG5cdFx0XHRpZiAkKFwiYm9keVwiKS5oYXNDbGFzcyhcIm1vZGFsLW9wZW5cIikgdGhlbiAkKFwiI2xpZ2h0Ym94LW1vZGFsXCIpLm1vZGFsKCdoaWRlJylcblxucmVzaXplID0gKCktPlxuXG5cbndpbmRvdy5zaG93U2VjdGlvbiA9IChpZCktPlxuXHRpZiByZW5kZXJpbmdcblx0XHRyZW5kZXJpbmcgPSBmYWxzZVxuXHRcdF9oLnJlbmRlcmVyLmRvbUVsZW1lbnQuY2xhc3NMaXN0LmFkZCBcImhpZGRlblwiXG5cblx0c2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsIFwiLnNlY3Rpb25cIlxuXHRmb3IgaSBpbiBbMC4uc2VjdGlvbnMubGVuZ3RoLTFdIGJ5IDFcblx0XHRzZWN0aW9uc1tpXS5jbGFzc0xpc3QucmVtb3ZlIFwiYWN0aXZlXCJcblxuXHRuZXdTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBcIiNzZWN0aW9uLSN7aWR9XCJcblx0aWYgbmV3U2VjdGlvblxuXHRcdG5ld1NlY3Rpb24uY2xhc3NMaXN0LmFkZCBcImFjdGl2ZVwiXG5cblx0cmV0dXJuIGZhbHNlXG5cbndpbmRvdy5yZXNldFJlbmRlcmluZyA9ICgpLT5cblx0aWYgIXJlbmRlcmluZ1xuXHRcdHJlbmRlcmluZyA9IHRydWVcblx0XHRfaC5yZW5kZXJlci5kb21FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUgXCJoaWRkZW5cIlxuXHRcdHVwZGF0ZSgpXG5cblx0c2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsIFwiLnNlY3Rpb25cIlxuXHRmb3IgaSBpbiBbMC4uc2VjdGlvbnMubGVuZ3RoLTFdIGJ5IDFcblx0XHRzZWN0aW9uc1tpXS5jbGFzc0xpc3QucmVtb3ZlIFwiYWN0aXZlXCJcblxuXG5cblxuIl19
