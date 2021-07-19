import React, { useEffect, useContext } from "react";
import * as CryptoJS from "crypto-js";
import { saveUrls } from "../services/graphql";
import { MainContext } from "../contexts/MainProvider";
import { decode } from "../services/utils";
export default function ReadOnly({ match }) {
  const [text, setText] = React.useState("");
  const { setUrlData } = useContext(MainContext);

  useEffect(() => {
    var id = match.params.id;
    id = id.replaceAll("ddos", "/");

    var decryptedUrl = CryptoJS.AES.decrypt(id, "123456").toString(
      CryptoJS.enc.Utf8
    );
    var uriData = decryptedUrl.split("|");
    console.log(uriData);
    saveUrls(uriData[2], e => {
      // textAreaRef.current.value = e.text;
      console.log(e);
      setUrlData(e.user);
      setText(e.user.trees[uriData[0]].stems[uriData[1]].notes);
    });
  }, []);

  return <div>{decode(text)}</div>;
}
