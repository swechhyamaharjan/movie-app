const project_id = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const db_id = import.meta.env.VITE_APPWRITE_DB_ID;
const collection_id = import.meta.env.VITE_APPWRITE_COLLECTION_ID;



export const updateSearchCount = async() => {
  console.log(project_id, db_id, collection_id)
}