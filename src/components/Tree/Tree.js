import React, {
  useEffect,
  useState,
  useRef,
  createRef,
  useContext
} from "react";
import {
  addTree,
  deleteTree,
  updateTree,
  addStemInTree
} from "../../services/graphql";
import Stems from "../Stems/Stems";
import { MainContext } from "../../contexts/MainProvider";
import { encode } from "../../services/utils";

export default function Tree() {
  const { updateSelectedTree, initialState, setTreeData } = useContext(
    MainContext
  );
  const [trees, setTrees] = useState(initialState.urlData.trees);
  const [edit, setEdit] = useState(false);
  const treeTextRef = useRef(null);
  const [textRefs, setTextRefs] = React.useState([]);
  useEffect(() => {
    setTrees(initialState.urlData.trees);
  }, [initialState.urlData.trees]);

  useEffect(() => {
    setTextRefs(textRefs =>
      Array(trees.length)
        .fill()
        .map((_, i) => textRefs[i] || createRef())
    );
  }, [trees.length]);

  function addTrees() {
    addTree(treeTextRef.current.value, initialState.urlData.id, e => {
      treeTextRef.current.value = "";
      setTreeData(e);
    });
  }
  function deleteTrees(treeId) {
    deleteTree(initialState.urlData.id, treeId, e => {
      setTreeData(e);
    });
  }

  function handleEdit(index) {
    trees[index].isEdit = true;
  }

  function checkIfNameIsNew(index) {
    const treeClone = trees.map(e => {
      return { ...e, isEdit: false };
    });
    if (trees[index].title != textRefs[index].current.value.trim()) {
      updateTree(
        initialState.urlData.id,
        trees[index].id,
        encode(textRefs[index].current.value.trim()),
        trees => {
          setTreeData(trees);
        }
      );
    } else {
      setEdit(false);
      setTreeData(treeClone);
    }
  }
  function toggleCollapse(index) {
    let i = 0;
    let treeClone = [...trees];
    treeClone[index].isShow = treeClone[index].isShow ? false : true;
    while (i < treeClone.length) {
      if (treeClone[i].id != treeClone[index].id) {
        treeClone[i].isShow = false;
      }
      i++;
    }
    setTreeData(treeClone);
    updateSelectedTree(treeClone[index]);
    console.log(initialState);
  }
  return (
    <div className="p-4 pt-5">
      <h4>
        <a href="index.html" className="logo text-dark">
          {initialState && initialState.urlData && initialState.urlData.url}
        </a>
      </h4>
      <ul className="list-unstyled components mb-5">
        {trees &&
          trees.map((tree, id) => {
            let isRequired = tree.isEdit || false;
            let shouldCollapse = tree.isShow || false;
            return (
              <li className="active" key={id}>
                <a
                  className="dropdown-toggler"
                  onClick={() => toggleCollapse(id)}
                >
                  <div>{tree.title}</div>
                  <div
                    className="badge badge-default delete-badge"
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteTrees(tree.id)}
                  >
                    X
                  </div>
                </a>
                <Stems cstmClass={shouldCollapse ? `show` : "hide"} />
              </li>
            );
          })}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Add Tree Name"
          className="form-control mb-2"
          ref={treeTextRef}
        />
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={addTrees}
        >
          Add Tree
        </button>
      </div>
      {/* <div className="mb-5">
        <h3 className="h6">Subscribe for newsletter</h3>
        <form action="#" className="colorlib-subscribe-form">
          <div className="form-group d-flex">
            <div className="icon">
              <span className="icon-paper-plane"></span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email Address"
            />
          </div>
        </form>
      </div> */}
    </div>
  );
}
