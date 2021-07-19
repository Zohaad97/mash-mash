export const AddTree = (id, text) => `mutation {
    addTree(id: "${id}", title: "${text}", updated_at: "0", created_at: "${Date.now()}") {
  id,
       created_at,
       updated_at,
       trees {
         id,
         title,
         created_at,
         updated_at,
         stems {
          id,
          title,
          created_at,
          updated_at,
          notes
        }
       }
    }
  }`;

export const RemoveTree = (id, treeId) => `mutation {
    removeTree(id: "${id}", treeId: "${treeId}") {
    id,
    created_at,
    updated_at,
    trees {
      id,
      title,
      created_at,
      updated_at,
      stems{
        id,
        title,
        created_at,
        updated_at,
        notes
      }
    }
        }
      }`;
export const UpdateUrlText = (id, text) =>
  `mutation {
        urls(id: "${id}", notes: "${text}", updated_at: "${Date.now()}") {
          id
          notes
        }
      }`;
export const registerPaths = pathName => `{urls(url: "${pathName}") {
  notes
  id
  url
  created_at
  updated_at,
  trees {
    id,
    created_at,
    updated_at,
    title,
    stems {
      id,
      title,
      created_at,
      updated_at,
      notes
    },
  }
}}`;
export const updateTreeName = (id, treeId, title) =>
  `mutation{
    updateTree(title:"${title}", id:"${id}",treeId:"${treeId}"){
      id,
      url,
      notes,
      updated_at
      trees {
        id,
        title,
        created_at,
        updated_at,
        stems {
          id
        }
      }
    }
  }`;
export const AddTreeStem = (urlId, treeId, title) => `mutation {
  addStem(urlId: "${urlId}", treeId: "${treeId}", title: "${title}") {
    id
    notes
    created_at
    url
    updated_at
    trees {
      id
      created_at
      updated_at
      title
      stems {
        title
        id
        notes
        created_at
        updated_at
      }
    }
  }
}
`;

export const RemoveStem = (urlId, treeId, stemId) => `mutation {
  removeStem(urlId:"${urlId}", treeId:"${treeId}",stemId:"${stemId}"){
    id
    notes
    created_at
    url
    updated_at
    trees {
      id
      created_at
      updated_at
      title
      stems {
        title
        id
        notes
        created_at
        updated_at
      }
    }
  
  }
}`;
export const UpdateStem = (urlId, treeId, stemId, notes) => `mutation {
  updateStems(urlId:"${urlId}", treeId:"${treeId}",stemId:"${stemId}", notes:"${notes}"){
    id
    notes
    created_at
    url
    updated_at
    trees {
      id
      created_at
      updated_at
      title
      stems {
        title
        id
        notes
        created_at
        updated_at
      }
    }
  
  }
}`;
