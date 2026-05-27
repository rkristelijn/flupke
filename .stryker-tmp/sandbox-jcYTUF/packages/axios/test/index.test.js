// @ts-nocheck
const { test } = require("node:test");
const assert = require("node:assert/strict");
const axios = require("../src/index.js");

test("exports get, post, put, patch, delete, head", () => {
  assert.equal(typeof axios.get, "function");
  assert.equal(typeof axios.post, "function");
  assert.equal(typeof axios.put, "function");
  assert.equal(typeof axios.patch, "function");
  assert.equal(typeof axios.delete, "function");
  assert.equal(typeof axios.head, "function");
});

test("exports create", () => {
  const instance = axios.create({ baseURL: "https://example.com" });
  assert.equal(typeof instance.get, "function");
  assert.equal(typeof instance.post, "function");
});

test("exports interceptors", () => {
  assert.equal(typeof axios.interceptors.request.use, "function");
  assert.equal(typeof axios.interceptors.response.use, "function");
  assert.equal(typeof axios.interceptors.request.eject, "function");
});

test("exports all and spread", () => {
  assert.equal(typeof axios.all, "function");
  assert.equal(typeof axios.spread, "function");
});

test("isAxiosError returns false for regular errors", () => {
  assert.equal(axios.isAxiosError(new Error("test")), false);
});

test("CancelToken is AbortController", () => {
  assert.equal(axios.CancelToken, AbortController);
});

test("defaults is an object", () => {
  assert.equal(typeof axios.defaults, "object");
});
