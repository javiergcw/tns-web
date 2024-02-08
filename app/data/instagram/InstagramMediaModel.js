// models/InstagramMedia.js
function InstagramMediaModel(data) {
    this.thumbnail_url = data.thumbnail_url;
    this.media_url = data.media_url;
    this.caption = data.caption;
    this.permalink = data.permalink;
  }
  
  module.exports = InstagramMediaModel;
  