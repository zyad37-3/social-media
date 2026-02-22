// // EditPostContext.jsx
// import { createContext, useContext, useState } from "react";

// const EditPostContext = createContext();

// export function EditPostProvider({ children }) {
//   const [editingPost, setEditingPost] = useState(null);

//   const openEdit = (post) => setEditingPost(post);
//   const closeEdit = () => setEditingPost(null);

//   return (
//     <EditPostContext.Provider value={{ editingPost, openEdit, closeEdit }}>
//       {children}
//     </EditPostContext.Provider>
//   );
// }

// export function useEditPost() {
//   return useContext(EditPostContext);
// }