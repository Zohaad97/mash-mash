import React, { useState, useContext } from "react";
import Editor from "./editor";
import Tree from "./Tree/Tree";
import { MainContext } from "../contexts/MainProvider";
import * as CryptoJS from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { saveUrls } from "../services/graphql";

export default function Skeleton({ children, match }) {
  let history = useHistory();
  const { initialState, setUrlData } = useContext(MainContext);

  React.useEffect(() => {
    let pathname = match.params.id;

    if (!pathname) {
      let pass = [...crypto.getRandomValues(new Uint8Array(8))].map(
        (x, i) => (
          (i = ((x / 255) * 61) | 0),
          String.fromCharCode(i + (i > 9 ? (i > 35 ? 61 : 55) : 48))
        )
      ).join``;
      history.push(pass);
    } else if (pathname.length > 16) {
      pathname = pathname
        .trim()
        .replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, "-")
        .replace(/^(-)+|(-)+$/g, "")
        .slice(0, 15);
      history.push(pathname);
    } else {
      registerUrl(pathname);
    }
  }, [match.params.id]);
  function registerUrl(uri) {
    saveUrls(uri, e => {
      // textAreaRef.current.value = e.text;
      setUrlData(e.user);
    });
  }
  function clickMe() {
    console.log(initialState);
    let getTreeIndex = initialState.urlData.trees.findIndex(
      e => e.id == initialState.selectedTree.id
    );
    let getStemIndex = initialState.selectedTree.stems.findIndex(
      e => e.id == initialState.currentStemId
    );
    let merger = `${getTreeIndex}|${getStemIndex}|${initialState.urlData.url}`;
    var encryptedUrl = CryptoJS.AES.encrypt(merger, "123456")
      .toString()
      .replace(/\\|\//g, "ddos");
    // var encryptedUrlSHA256 = CryptoJS.AES.encrypt(merger, "123456").toString();
    navigator.clipboard.writeText(
      window.location.origin + "/read/" + encryptedUrl
    );
    toast("Link Copied!");
  }
  return (
    <div>
      <div className="wrapper d-flex align-items-stretch">
        <nav id="sidebar" className="glass-panel">
          <Tree />
        </nav>
        <div id="content" className="p-4 p-md-5 pt-5 w-100">
          <div className="mb-4">
            <h2>
              {initialState.selectedTree
                ? initialState.selectedTree.title
                : "Your tree name here"}
            </h2>
            <div>
              {initialState.currentStemId ? (
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => clickMe()}
                >
                  Get Shareble Link
                </button>
              ) : null}

              <ToastContainer />
            </div>
          </div>
          {initialState.currentStemId ? <Editor match={match} /> : null}
        </div>
      </div>
    </div>
  );
}
