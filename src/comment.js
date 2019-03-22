class Comment {
  constructor({id, content, image_id, created_at, updated_at}) {
    this.id = id;
    this.content = content;
    this.imageId = image_id;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
    this.constructor.all.push(this);
  }
}

Comment.all = []