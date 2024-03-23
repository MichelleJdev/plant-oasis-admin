import { useState } from "react";

function useRename() {
  const [newName, setNewName] = useState("");
  const [resourceToRename, setResourceToRename] = useState(null);

  return {
    newName,
    setNewName,
    resourceToRename,
    setResourceToRename,
  };
}

export default useRename;
