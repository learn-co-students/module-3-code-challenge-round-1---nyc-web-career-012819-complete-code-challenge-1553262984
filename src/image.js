class Image {
  constructor({id, url, name, like_count, comments}) {
    this.id = id;
    this.url = url;
    this.name = name;
    this.likesCount = like_count;

    comments.forEach(attributes => new Comment(attributes));
  }
}