import React, { useContext, useRef } from "react";
import { addStemInTree, removeStemFromTree } from "../../services/graphql";
import { MainContext } from "../../contexts/MainProvider";
import { encode, decode } from "../../services/utils";

export default function Stems({ cstmClass }) {
  const { initialState, setCurrentStemId, updateSelectedTree } = useContext(
    MainContext
  );
  const stemText = useRef("");

  function addStem(urlId, treeId) {
    addStemInTree(urlId, treeId, encode(stemText.current.value), tree => {
      let updatedTree = tree.find(e => e.id == treeId);
      let updatedTreeClone = { ...updatedTree, isShow: true };

      updateSelectedTree(updatedTreeClone);
    });
    stemText.current.value = "";
  }
  function deleteStem(urlId, treeId, stemId) {
    removeStemFromTree(urlId, treeId, stemId, tree => {
      let updatedTree = tree.find(e => e.id == treeId);
      let updatedTreeClone = { ...updatedTree, isShow: true };
      updateSelectedTree(updatedTreeClone);
    });
  }
  function selectCurrentStem(id) {
    setCurrentStemId(id);
  }
  return (
    <>
      {initialState.selectedTree && (
        <ul className={`collapse list-unstyled ${cstmClass}`}>
          {initialState.selectedTree.stems.length > 0 &&
            initialState.selectedTree.stems.map((stem, id) => {
              let isRequired = stem.isEdit || false;
              return (
                <li key={id} className="dropdown-toggler">
                  <a
                    className="w-100 d-flex justify-content-between"
                    onClick={() => selectCurrentStem(stem.id)}
                  >
                    <div>{decode(stem.title)}</div>
                    <div
                      className="badge badge-default delete-badge"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        deleteStem(
                          initialState.urlData.id,
                          initialState.selectedTree.id,
                          stem.id
                        )
                      }
                    >
                      X
                    </div>
                  </a>
                </li>
              );
            })}
          <div className="d-flex mt-2">
            <input
              type="text"
              className="mb-3 custm-input"
              placeholder="Add More"
              ref={stemText}
            />
            <button
              className="btn btn-sm btn-default mb-3 cstm-btn"
              onClick={() =>
                addStem(initialState.urlData.id, initialState.selectedTree.id)
              }
            >
              +
            </button>
          </div>
        </ul>
      )}
    </>
  );
}
