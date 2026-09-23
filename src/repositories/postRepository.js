// src/repositories/postRepository.js
//
// This module owns all storage access for posts.
// When this is replaced by a Prisma-backed implementation:
//   - WILL CHANGE: everything inside this file (the storage mechanism,
//     id generation, how records are found/saved/removed).
//   - WILL NOT CHANGE: the five method names, their parameters, or
//     their return shapes. postService.js will not need any edits.

const posts = new Map([
  [1, { id: 1, title: 'First post', body: 'Repository boundaries protect change.', authorId: 7 }],
  [2, { id: 2, title: 'Second post', body: 'Services should speak in domain language.', authorId: 8 }],
]);

let nextId = 3;

function findAll() {
  return [...posts.values()];
}

function findById(id) {
  return posts.get(Number(id)) || null;
}

function create(fields) {
  const post = {
    id: nextId++,
    title: fields.title,
    body: fields.body || '',
    authorId: fields.authorId,
  };
  posts.set(post.id, post);
  return post;
}

function update(id, patch) {
  const post = posts.get(Number(id));
  if (!post) return null;
  if (patch.title !== undefined) post.title = patch.title;
  if (patch.body !== undefined) post.body = patch.body;
  return post;
}

function remove(id) {
  return posts.delete(Number(id));
}

module.exports = { findAll, findById, create, update, remove };
