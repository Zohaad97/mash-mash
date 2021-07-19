import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef
} from "react";
import { debounce } from "lodash";
import { updateUrlData, saveUrls, updateStemNotes } from "../services/graphql";
import { MainContext } from "../contexts/MainProvider";
import { decode } from "../services/utils";

export default function Editor({ saveNow, match }) {
  const [stem, setStem] = useState({ notes: "Mash It!!!" });
  const [text, setText] = useState("");
  const { initialState, setUrlData, getCurrentStem, setLoader } = useContext(
    MainContext
  );
  const textAreaRef = useRef("");

  const saveWithDelay = useCallback(debounce(updateStem, 1000), [text]);
  useEffect(() => {
    if (initialState.urlData.id) {
      saveWithDelay();
    }
    return saveWithDelay.cancel;
  }, [text]);

  function handleChange(e) {
    setLoader(true);

    textAreaRef.current.value = e.target.value;
    setText(e.target.value);
  }
  function updateStem() {
    updateStemNotes(initialState, textAreaRef.current.value, e => {
      setLoader(false);
      console.log(e);
    });
  }
  function updateData() {
    updateUrlData(initialState.urlData.id, textAreaRef.current.value, e => {
      saveNow(e);
    });
  }

  useEffect(() => {
    if (initialState.currentStemId) {
      const stem = getCurrentStem(initialState.currentStemId);
      if (stem) {
        console.log("Finding");

        setStem(stem);
        textAreaRef.current.value = decode(stem.notes);
      }
    }
  }, [initialState.currentStemId]);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-12">
          <div className="glass-panel">
            <div className="row">
              <div className="col-12 p-5">
                <textarea
                  className="textarea"
                  onChange={e => handleChange(e)}
                  ref={textAreaRef}
                  rows={15}
                ></textarea>
              </div>
              <div style={{ height: "100px" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
