import React, { createContext, useState, useEffect } from "react";

export const MainContext = createContext();

export default function MainProvider({ children }) {
  const [initialState, setInitialState] = useState({
    urlData: { id: 0, trees: [] },
    loader: false
  });
  function setSelectedTree(tree) {
    let state = {
      ...initialState,
      selectedTree: tree,
      currentStemId:
        tree.stems.length > 0 ? tree.stems[tree.stems.length - 1].id : 0
    };
    setInitialState(state);
  }
  function setUrlData(urlInfo) {
    let state = { ...initialState, urlData: urlInfo };
    setInitialState(state);
  }
  function setCurrentStemId(id) {
    let state = { ...initialState, currentStemId: id };
    setInitialState(state);
  }
  function setTreeData(tree) {
    let state = {
      ...initialState,
      urlData: { ...initialState.urlData, trees: tree }
    };
    setInitialState(state);
  }
  function updateSelectedTree(tree) {
    let treeClone = initialState.urlData.trees.map(item => {
      if (item.id == tree.id) {
        return (item = tree);
      } else {
        return item;
      }
    });
    let state = {
      ...initialState,
      selectedTree: tree,
      currentStemId:
        tree.stems.length > 0 ? tree.stems[tree.stems.length - 1].id : 0,
      urlData: { ...initialState.urlData, trees: treeClone }
    };
    setInitialState(state);
  }
  function setLoader(bool) {
    let state = { ...initialState, loader: bool };
    setInitialState(state);
  }
  function getCurrentStem(id) {
    if (initialState.selectedTree && initialState.selectedTree.stems) {
      return initialState.selectedTree.stems.find(e => e.id == id);
    }
  }
  const exportedData = {
    initialState,
    setUrlData,
    setCurrentStemId,
    getCurrentStem,
    setTreeData,
    setLoader,
    updateSelectedTree
  };
  return (
    <MainContext.Provider value={exportedData}>{children}</MainContext.Provider>
  );
}
