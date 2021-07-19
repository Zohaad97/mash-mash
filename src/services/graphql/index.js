import {
  AddTree,
  RemoveTree,
  UpdateUrlText,
  registerPaths,
  updateTreeName,
  AddTreeStem,
  RemoveStem,
  UpdateStem
} from "./queries";
import { post } from "../http";
import { encode } from "../utils";

export const addTree = (text, id, callback) => {
  let query = AddTree(id, text);
  let req = post(query);
  req
    .then(e => e.json())
    .then(resp => {
      if (resp.data.addTree && resp.data.addTree.trees) {
        callback(resp.data.addTree.trees);
      }
    });
};

export const deleteTree = (id, treeId, callback) => {
  let query = RemoveTree(id, treeId);
  let req = post(query);
  req
    .then(e => e.json())
    .then(resp => {
      if (resp.data.removeTree && resp.data.removeTree.trees) {
        callback(resp.data.removeTree.trees);
      }
    });
};

export const updateUrlData = (id, text, callback) => {
  let query = UpdateUrlText(id, text);
  let req = post(query);
  req
    .then(e => e.json())
    .then(resp => {
      callback(false);
    });
};

export const saveUrls = (uri, callback) => {
  let query = registerPaths(uri);
  let req = post(query);

  req
    .then(e => e.json())
    .then(resp => {
      callback({ text: resp.data.urls.notes, user: resp.data.urls });
    });
};
export const updateTree = (id, treeId, title, callback) => {
  let query = updateTreeName(id, treeId, title);
  let req = post(query);
  req
    .then(e => e.json())
    .then(resp => {
      callback(resp.data.updateTree.trees);
    });
};
export const addStemInTree = (urlId, treeId, title, callback) => {
  let query = AddTreeStem(urlId, treeId, title);
  let req = post(query);
  req
    .then(e => e.json())
    .then(resp => {
      callback(resp.data.addStem.trees);
    });
};

export const removeStemFromTree = (urlId, treeId, stemId, callback) => {
  let query = RemoveStem(urlId, treeId, stemId);
  let req = post(query);
  req
    .then(e => e.json())
    .then(resp => {
      callback(resp.data.removeStem.trees);
    });
};
export const updateStemNotes = (state, notes, callback) => {
  let query = UpdateStem(
    state.urlData.id,
    state.selectedTree.id,
    state.currentStemId,
    encode(notes)
  );
  let req = post(query);
  req
    .then(e => e.json())
    .then(resp => {
      callback(resp.data.updateStems.trees);
    });
};
